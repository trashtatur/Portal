let previousBodyPaddingRight;
let previousBodyOverflowSetting;

  export const scrollToTop = (): void => {
    window.scroll(
      {
        top: 0,
        behavior: 'smooth',
      },
    );
  }

  export const scrollToPositionY = (positionY: number) => {
    window.scroll({
      top: positionY,
      behavior: 'smooth',
    });
  }

  export const disableBodyScrollingByUser = (): void => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      previousBodyPaddingRight = document.documentElement.style.paddingRight;
      document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
    }

    previousBodyOverflowSetting = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
  }

  export const enableBodyScrollingByUser = (): void => {
    document.documentElement.style.paddingRight = previousBodyPaddingRight;
    document.documentElement.style.overflow = previousBodyOverflowSetting;
  }

  export const getWindowScrollY = (): number => window.pageYOffset;

  /**
   * @param {function(event: Event): void} listener
   */
  export const addWindowScrollListener = (listener) => {
    window.addEventListener('scroll', listener);
  }

  export const removeWindowScrollListener = (listener) => {
    window.removeEventListener('scroll', listener);
  }
