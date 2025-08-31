// hooks/useRouter.js
import { useState } from 'react';

const useRouter = () => {
  const [currentView, setCurrentView] = useState('home');
  const [params, setParams] = useState({});

  const navigate = (view, newParams = {}) => {
    setCurrentView(view);
    setParams(newParams);
  };

  const goBack = () => {
    setCurrentView('home');
    setParams({});
  };

  return {
    currentView,
    params,
    navigate,
    goBack
  };
};

export default useRouter;