import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypewriter = ({
  text,
  speed = 100,
  delay = 0,
}: UseTypewriterOptions) => {
  const [typedFor, setTypedFor] = useState(text);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  if (typedFor !== text) {
    setTypedFor(text);
    setDisplayText("");
    setCurrentIndex(0);
  }

  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, delay]);

  const isComplete = text.length === 0 || currentIndex > text.length;

  return { displayText, isComplete };
};
