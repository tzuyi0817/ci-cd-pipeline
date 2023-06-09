'use client';

import { useEffect } from 'react';

function useServiceWork() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log(registration); 
        })
        .catch(error => {
          console.log('Registration failed with ' + error);
        });
    }
  }, []);

  return null;
}

export default useServiceWork;
