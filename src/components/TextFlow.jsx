import React, { useEffect, useRef, useState } from 'react';
import '../styles/TextFlow.css';

const TextFlow = ({ text }) => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationDuration, setAnimationDuration] = useState('0s');

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current && containerRef.current) {
        const isOverflow =
          titleRef.current.scrollWidth > containerRef.current.clientWidth;
        setIsOverflowing(isOverflow);

        if (isOverflow) {
          const duration = titleRef.current.scrollWidth / 50;
          setAnimationDuration(`${duration}s`);
        }
      }
    };

    checkOverflow();
  }, [text]);

  return (
    <div className='text_wrapper' ref={containerRef}>
      <div
        className={`text_box ${isOverflowing ? 'text_flow' : ''}`}
        ref={titleRef}
        style={{ animationDuration }}
      >
        {text}
      </div>
    </div>
  );
};

export default TextFlow;
