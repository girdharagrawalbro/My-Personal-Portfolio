import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const useScrollReveal = (config: { selector: string; options: any }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(config.selector);
      if (elements.length > 0) {
        ScrollReveal().reveal(elements, config.options);
      }
    }
  }, [config.selector, config.options]);
};

export default useScrollReveal;