import React, { useEffect, useState } from 'react';
import RentalApp from './RentalApp';
import ComingSoonPage from './components/ComingSoonPage';

const DomainRouter = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if current domain is the production domain
    const currentHostname = window.location.hostname;
    
    const isProductionDomain = 
      currentHostname === 'www.rentalstore.in' || 
      currentHostname === 'rentalstore.in';

    
    setShowComingSoon(isProductionDomain);
    setLoading(false);
  }, []);

  // Show loading state briefly to avoid flash
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show coming soon page for production domain
  if (showComingSoon) {
    return <ComingSoonPage />;
  }

  // Show full app for QA/development domains
  return <RentalApp />;
};

export default DomainRouter;