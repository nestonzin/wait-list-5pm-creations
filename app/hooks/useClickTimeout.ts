import { useState } from "react";

export const useClickTimeout = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const CLICK_WINDOW = 3000;

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTime > CLICK_WINDOW) {
      setClickCount(1);
    } else {
      setClickCount((prev) => prev + 1);
    }
    setLastClickTime(now);

    if (clickCount >= 4) {
      setIsTimeout(true);
      setTimeout(() => {
        setIsTimeout(false);
        setClickCount(0);
      }, 60000);
      return true;
    }
    return false;
  };

  return { isTimeout, handleClick };
};
