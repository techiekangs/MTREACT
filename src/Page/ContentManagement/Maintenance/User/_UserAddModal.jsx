import React, { useState } from 'react';
import api from "../../../../API/api.js";

export default function UserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    contactNumber: '',
    emailAddress: ''
  });

  const handleNumberOnly = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.contactNumber || !formData.emailAddress) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await api.post(
        "/Users/Detail/Add?EmployeeNumber=",
        {
          EmailAddress: formData.emailAddress,
          ContactNumber: formData.contactNumber
        },
        {
          headers: {
            "Authorization": "bearer",
            "IpAddress": "::1",
            "AppName": "MT",
          },
        }
      );

      if (response.ok) {
        alert('User added successfully!');
        setFormData({ contactNumber: '', emailAddress: '' });
        onClose(); // Close modal using parent's function
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Contact Number */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactnumber"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              onInput={handleNumberOnly}
              maxLength="11"
              placeholder="Type your contact number here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0074d9] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailaddress"
              value={formData.emailAddress}
              onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
              placeholder="Type your email address here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0074d9] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#0074d9] hover:bg-[#005fa3] text-white rounded-md font-medium transition-colors"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}