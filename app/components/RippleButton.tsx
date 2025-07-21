'use client';

import { useRef, MouseEvent } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
}

export default function RippleButton({ 
  children, 
  className = '', 
  onClick,
  type = 'primary'
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: ${type === 'primary' ? 
        'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)' : 
        'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 70%)'
      };
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 0;
    `;

    // Add keyframes if not already added
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (button.contains(ripple)) {
        button.removeChild(ripple);
      }
    }, 600);

    // Call original onClick
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className} transition-all duration-200 hover:scale-105 active:scale-95`}
      onClick={createRipple}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
} 