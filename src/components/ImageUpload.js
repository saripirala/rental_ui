// components/ImageUpload.js
import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Camera, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ images, onImagesChange, maxImages = 8, minImages = 3 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name
        };
        onImagesChange(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    onImagesChange(prev => prev.filter(img => img.id !== imageId));
  };

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Photos</h3>
          <p className="text-sm text-slate-500">
            Add {minImages}-{maxImages} high-quality photos. First photo will be the cover image.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {images.length}/{maxImages}
        </div>
      </div>

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-slate-400 bg-slate-50' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900 mb-2">
                Drag photos here, or <span className="text-rose-600 underline cursor-pointer">browse</span>
              </p>
              <p className="text-sm text-slate-500">
                JPG, PNG, WEBP up to 10MB each
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Cover Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-slate-900 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Cover
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>

                {/* Move Buttons */}
                <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      onClick={() => moveImage(index, index - 1)}
                      className="w-6 h-6 bg-white/80 backdrop-blur-sm rounded text-slate-600 hover:bg-white transition-colors text-xs"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      onClick={() => moveImage(index, index + 1)}
                      className="w-6 h-6 bg-white/80 backdrop-blur-sm rounded text-slate-600 hover:bg-white transition-colors text-xs"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-slate-500 mt-2 truncate">{image.name}</p>
            </div>
          ))}

          {/* Add More Button */}
          {images.length < maxImages && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center space-y-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Plus size={24} />
              <span className="text-xs font-medium">Add Photo</span>
            </button>
          )}
        </div>
      )}

      {/* Validation Message */}
      {images.length > 0 && images.length < minImages && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-700 text-sm">
            <span className="font-medium">Almost there!</span> Add {minImages - images.length} more {minImages - images.length === 1 ? 'photo' : 'photos'} to meet the minimum requirement.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;