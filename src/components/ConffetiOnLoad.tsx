import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiOnLoad: React.FC = () => {
  useEffect(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 15,
            angle: 340,
            spread: 200,
            origin: { x: 0, y: 0 },
        });
        
        confetti({
            particleCount: 15,
            angle: 200,
            spread: 200,
            origin: { x: 1, y: 0 },
        });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame(); // Start the animation when component loads
  }, []);

  return (
    <div>
    </div>
  );
};

export default ConfettiOnLoad;
