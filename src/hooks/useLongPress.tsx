import { useCallback, useRef } from "react";

export const useLongPress = (
  callback: (e?: React.MouseEvent<Element, MouseEvent>) => void,
  ms: number = 300
): {
  onTouchStart: () => void;
  onTouchEnd: () => void;
} => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      callback();
    }, ms);
  }, [callback, ms]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
  };
};
export default useLongPress;
