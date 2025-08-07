import { useEffect, useRef } from "react";

interface UseOutsideClickOptions {
  stopPropagation?: boolean;
}
/**
 * Custom hook to detect clicks outside of a specified element.
 *
 * @param {() => void} handler - The function to call when an outside click is detected.
 * @param {boolean} [listenCapturing=true] - Whether to listen for clicks during the capturing phase.
 * @returns {RefObject<T>} A ref object to attach to the element you want to monitor.
 */
export default function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  handler: () => void,
  listenCapturing = true,
  options?: UseOutsideClickOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (options?.stopPropagation) {
          e.stopPropagation();
        }
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing, options?.stopPropagation]);

  return ref;
}
