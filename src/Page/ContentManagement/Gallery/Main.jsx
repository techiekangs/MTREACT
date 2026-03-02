import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { getImageList, deleteImage } from "../../../API/ContentManagement/Image_Repository";
import Modal from "../../../Components/Common/Modal";
import ImageModal from "./_ImageDetailsModal";
import { fetchFTPImage } from "../../../API/ContentManagement/NAS_Repository";

export default function Gallery() {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [loadedImages, setLoadedImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [modalVariant, setModalVariant] = useState('default');

    useEffect(() => {
        const fetchImageList = async () => {
            try {
                const res = await getImageList("");
                console.log("response images:", res.Images);
                setImages(res.Images || []);
            } catch (error) {
                console.error("❌ Failed to load images:", error);
                setModalTitle("Error");
                setModalContent(`Failed to load images: ${error.message}`);
                setModalVariant("error");
                setModalOpen(true);
            }
        };

        fetchImageList();
    }, []);

    useEffect(() => {
        if (images?.length > 0) loadAllFTPImages();
    }, [images]);

    useEffect(() => {
        let filtered = [...loadedImages];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(img =>
                img.FILE_NAME?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.Upload_Date) - new Date(a.Upload_Date));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.Upload_Date) - new Date(b.Upload_Date));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.FILE_NAME?.localeCompare(b.FILE_NAME));
        }

        setFilteredImages(filtered);
    }, [loadedImages, searchTerm, sortBy]);

    const loadAllFTPImages = async () => {
        setLoading(true);
        try {
            const updated = await Promise.all(
                images.map(async (img) => {
                    // Skip if deleted, already loaded, or missing data
                    if (img.isDeleted || img.ftpBase64 || !img.IMG_URL || !img.FILE_NAME) {
                        return img;
                    }
                    
                    try {
                        const base64 = await fetchFTPImage(img.IMG_URL, img.FILE_NAME);
                        const pureBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
                        return { ...img, ftpBase64: base64, FILE_BYTE: pureBase64 };
                    } catch (error) {
                        console.error(`Failed to load image ${img.FILE_NAME}:`, error);
                        // Return the image without ftpBase64 instead of breaking
                        return { ...img, loadError: true };
                    }
                })
            );
            setLoadedImages(updated);
        } catch (error) {
            console.error("Failed to load FTP images:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (img) => {
        setSelectedImage(img);
        setIsImageModalOpen(true); // ← FIXED: Open the modal
    };

    const handleDeleteImage = async () => {
        if (!selectedImage || !selectedImage.CONTENT_ID) return;

        try {
            // Call API to delete image
            const result = await deleteImage(selectedImage);

            if (result.Description === "Fine!") {
                // Remove image from both state arrays
                setImages(prevImages =>
                    prevImages.filter(img => img.CONTENT_ID !== selectedImage.CONTENT_ID)
                );
                setLoadedImages(prevImages =>
                    prevImages.filter(img => img.CONTENT_ID !== selectedImage.CONTENT_ID)
                );

                console.log(`✅ Image ${selectedImage.FILE_NAME} deleted successfully`);

                // Show success message
                setModalTitle("Success");
                setModalContent("Image deleted successfully!");
                setModalVariant("success");
                setModalOpen(true);
            } else {
                throw new Error(result.Description || "Failed to delete image");
            }
        } catch (error) {
            console.error("❌ Failed to delete image:", error);

            // Show error message
            setModalTitle("Error");
            setModalContent(`Failed to delete image: ${error.message}`);
            setModalVariant("error");
            setModalOpen(true);
        }
    };

    return (
        <div className="bg-sky-100 flex flex-col flex-1 p-7 overflow-x-hidden">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-2 gap-4">
                {/* Search */}
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Add Images Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Images
                </button>
            </div>

            {/* Sort Dropdown */}
            <div className="mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="newest">Sort: Newest</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option value="name">Sort: Name</option>
                </select>
            </div>

            {/* Content Area - Gallery Grid */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">Loading images...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredImages.map((img, index) => (
                            <div
                                key={img.CONTENT_ID || index}
                                onClick={() => handleImageClick(img)}
                                className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                            >
                                {img.ftpBase64 ? (
                                    <img
                                        src={img.ftpBase64}
                                        alt={img.FILE_NAME}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        {img.loadError ? 'Failed to Load' : 'No Image'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredImages.length === 0 && (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">No images found</p>
                    </div>
                )}
            </div>

            {/* Image Details Modal */}
            <ImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                image={selectedImage}
                onDelete={handleDeleteImage}
            />

            {/* Error/Success Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                content={modalContent}
                variant={modalVariant}
            />
        </div>
    );
}