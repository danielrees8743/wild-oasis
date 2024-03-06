import { useEffect, useRef } from 'react';

function useOutsideClick(handler, options = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, options);

    return () => document.removeEventListener('click', handleClick, options);
  }, [handler, options]);

  return ref;
}

export default useOutsideClick;
