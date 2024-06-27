import React, { useEffect, useRef, useState } from 'react';
import '../styles/TextFlow.css';

const TextFlow = ({ text, type }) => {
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

  const renderText = () => {
    if (type === 'genre') {
      return text && Array.isArray(text)
        ? text.map((gen) => {
            return <span key={gen}>{gen}</span>;
          })
        : text;
    } else {
      return text && Array.isArray(text)
        ? text.map((txt) => {
            return <span key={txt.id}>{txt.name}</span>;
          })
        : text;
    }
  };

  return (
    <div className='text_wrapper' ref={containerRef}>
      <div
        className={`text_box ${isOverflowing ? 'text_flow' : ''}`}
        ref={titleRef}
        style={{ animationDuration }}
      >
        {renderText()}
      </div>
    </div>
  );
};

export default TextFlow;
