'use client';

import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0;
  let mx = 0, my = 0;
  let rafId: number;

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };

    const hover = (e: Event) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest('a,button,input,select,textarea,[data-cursor]');
      if (cursorRef.current && ringRef.current) {
        if (isInteractive) {
          cursorRef.current.style.width = '20px';
          cursorRef.current.style.height = '20px';
          cursorRef.current.style.background = '#06d6a0';
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
        } else {
          cursorRef.current.style.width = '12px';
          cursorRef.current.style.height = '12px';
          cursorRef.current.style.background = '#3b7bff';
          ringRef.current.style.width = '36px';
          ringRef.current.style.height = '36px';
        }
      }
    };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', hover);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hover);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ position: 'fixed', width: 12, height: 12, borderRadius: '50%', background: '#3b7bff', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', mixBlendMode: 'screen', transition: 'width .2s, height .2s, background .2s' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: 'fixed', width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(59,123,255,0.5)', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', transition: 'width .3s, height .3s' }}
      />
    </>
  );
}
