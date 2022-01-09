import { useState, useEffect } from 'react';

function getWindowWidth() {
  return window.innerWidth;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  function actualResizeHandler() {
    setWindowWidth(getWindowWidth());
  }

  useEffect(() => {
    let resizeTimeout;
    function resizeThrottler() {
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
        }, 500);
      }
    }

    window.addEventListener('resize', resizeThrottler);
    return () => window.removeEventListener('resize', resizeThrottler);
  }, []);

  return windowWidth;
}
