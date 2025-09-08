// components/AddListingFlow.js
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ListingForm from './ListingForm';
import ImageUpload from './ImageUpload';
import ListingPreview from './ListingPreview';

const AddListingFlow = ({ onClose, onSubmit }) => {
  const [currentFlow, setCurrentFlow] = useState('form'); // 'form', 'images', 'preview', 'success'
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentFlow('images');
  };

  const handleImagesComplete = () => {
    if (images.length < 3) {
      alert('Please upload at least 3 images before continuing.');
      return;
    }
    setCurrentFlow('preview');
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        images: images.map(img => img.file), // In real app, upload to cloud storage first
        status: 'pending_approval',
        submitted_at: new Date().toISOString()
      };

      await onSubmit(submissionData);
      setCurrentFlow('success');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case 'form':
        return (
          <ListingForm
            onSubmit={handleFormSubmit}
            onCancel={onClose}
            initialData={formData}
          />
        );

      case 'images':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Add Photos</h2>
              <p className="text-slate-600">High-quality photos help your listing stand out</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <ImageUpload
                images={images}
                onImagesChange={setImages}
                maxImages={8}
                minImages={3}
              />

              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                <button
                  onClick={() => setCurrentFlow('form')}
                  className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center space-x-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Form</span>
                </button>

                <button
                  onClick={handleImagesComplete}
                  disabled={images.length < 3}
                  className={`px-8 py-3 rounded-xl transition-colors font-medium ${
                    images.length >= 3
                      ? 'bg-slate-900 hover:bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Preview
                </button>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <ListingPreview
            formData={formData}
            images={images}
            onEdit={() => setCurrentFlow('form')}
            onSubmit={handleFinalSubmit}
            onCancel={onClose}
          />
        );

      case 'success':
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl border border-slate-200 p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Listing Submitted Successfully!
              </h2>
              
              <p className="text-slate-600 mb-8 leading-relaxed">
                Your listing "<strong>{formData.title}</strong>" has been submitted for review. 
                Our team will review it within 12 hours and notify you once it's approved.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-blue-900 mb-3">What happens next?</h4>
                <ul className="text-left space-y-2 text-sm text-blue-800">
                  <li>• Quality and content review (usually within 12 hours)</li>
                  <li>• Email notification when approved</li>
                  <li>• Your listing goes live and becomes searchable</li>
                  <li>• You can manage bookings from your dashboard</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentFlow('form');
                    setFormData({});
                    setImages([]);
                  }}
                  className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                >
                  Add Another Listing
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-medium"
                >
                  Back to Listings
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to listings</span>
            </button>

            {/* Progress Indicator */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${currentFlow === 'form' ? 'bg-slate-900' : 'bg-slate-300'}`} />
              <div className={`w-3 h-3 rounded-full ${currentFlow === 'images' ? 'bg-slate-900' : 'bg-slate-300'}`} />
              <div className={`w-3 h-3 rounded-full ${currentFlow === 'preview' ? 'bg-slate-900' : 'bg-slate-300'}`} />
            </div>

            {isSubmitting && (
              <div className="flex items-center space-x-2 text-slate-600">
                <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full" />
                <span className="text-sm font-medium">Submitting...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {renderCurrentFlow()}
      </main>
    </div>
  );
};

export default AddListingFlow;