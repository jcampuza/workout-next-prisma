import { isClient } from './isClient';

const setHeight = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  console.log(document.documentElement.style.getPropertyValue('--vh'));
};

export const setupViewportHeightListener = () => {
  if (isClient()) {
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
    setHeight();

    return () => {
      window.addEventListener('resize', setHeight);
      window.addEventListener('orientationchange', setHeight);
    };
  }
};
