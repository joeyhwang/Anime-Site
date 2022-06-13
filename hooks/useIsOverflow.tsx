import { useState, useEffect } from 'react';

const useIsOverflow = (ref: any, isVerticalOverflow: boolean, callback: any) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    const {
      clientWidth, scrollWidth, clientHeight, scrollHeight,
    } = current;

    const trigger = () => {
      const hasOverflow = isVerticalOverflow ? scrollHeight > clientHeight
        : scrollWidth > clientWidth;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref, isVerticalOverflow]);

  return isOverflow;
};

export default useIsOverflow;
