import { useEffect, useState } from 'react';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypeWriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            // Finished typing, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-primary-500">|</span>
    </span>
  );
}
