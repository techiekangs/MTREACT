import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { deleteImage } from "../../../API/ContentManagement/Image_Repository";
interface _ImageDetailsModal {
   isOpen: boolean;
  onClose: () => void;
  image: {
    CONTENT_ID?: number;
    FILE_NAME?: string;
    FILE_SIZE?: string;
    IMG_URL?: string;
    Upload_Date?: string;
    Upload_By?: string;
    ftpBase64?: string;
  } | null;
  onDelete?: () => void;
}

const ImageModal: React.FC<_ImageDetailsModal> = ({ 
  isOpen, 
  onClose, 
  image,
  onDelete 
}) => {
  if (!isOpen || !image) return null;

  const handleDelete = async () => {
    if (onDelete && window.confirm('Are you sure you want to delete this image?')) {
      await onDelete(); // Call parent's delete function
      onClose(); // Close modal after deletion
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[90vh] overflow-y-auto">
          {/* Left: Image Preview */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden min-h-[300px] md:min-h-[500px]">
            {image.ftpBase64 ? (
              <img
                src={image.ftpBase64}
                alt={image.FILE_NAME || 'Image'}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-gray-400">No Image Available</div>
            )}
          </div>

          {/* Right: Image Details */}
          <div className="flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">Image Details</h2>
              
              <div className="w-full text-left">
                <label className="text-md font-medium text-gray-500">File Name</label>
                <p className="text-gray-900 mt-1 text-lg">{image.FILE_NAME || 'N/A'}</p>
              </div>
              <div className="w-full text-left">
                <label className="text-md font-medium text-gray-500">File Size</label>
                <p className="text-gray-900 mt-1 text-lg">{image.FILE_SIZE || 'N/A'}</p>
              </div>
              <div className="w-full text-left">
                <label className="text-md font-medium text-gray-500">Created Date</label>
                <p className="text-gray-900 mt-1 text-lg">
                  {image.Upload_Date ? new Date(image.Upload_Date).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="w-full text-left">
                <label className="text-md font-medium text-gray-500">Uploaded By</label>
                <p className="text-gray-900 mt-1 text-lg">
                  {image.Upload_By ? image.Upload_By : 'N/A'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4">
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-lg"
              >
                <X className="w-5 h-5" />
                Close
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ImageModal;