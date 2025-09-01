// hooks/useListingSubmission.js
import { useState } from 'react';

const useListingSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitListing = async (listingData) => {
    setIsSubmitting(true);
    try {
      // In real app, this would be an API call
      const formData = new FormData();
      
      // Append text fields
      Object.keys(listingData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, listingData[key]);
        }
      });

      // Append images
      if (listingData.images && listingData.images.length > 0) {
        listingData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      // Simulate API call
      const response = await fetch('http://localhost:5000/api/costumes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit listing');
      }

      const result = await response.json();
      
      // Add to local submissions for tracking
      setSubmissions(prev => [...prev, {
        id: result.id || Date.now(),
        ...listingData,
        status: 'pending_approval',
        submitted_at: new Date().toISOString()
      }]);

      return result;
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmissionStatus = (submissionId) => {
    const submission = submissions.find(s => s.id === submissionId);
    return submission?.status || 'unknown';
  };

  return {
    submitListing,
    submissions,
    isSubmitting,
    getSubmissionStatus
  };
};

export default useListingSubmission;