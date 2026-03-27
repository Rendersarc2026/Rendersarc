'use client';

import { useEffect, useRef } from 'react';

export function ParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 400; // Reduced for a cleaner look

    class Particle {
      x!: number;
      y!: number;
      z!: number;
      prevX!: number;
      prevY!: number;
      prevZ!: number;
      color!: string;
      speed!: number;

      constructor() {
        this.reset();
        this.z = Math.random() * 2000;
        this.prevZ = this.z;
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 3;
        this.y = (Math.random() - 0.5) * height * 3;
        this.z = 2000;
        this.prevX = this.x;
        this.prevY = this.y;
        this.prevZ = this.z;
        
        // Vibrant palette: Red, Blue, Purple/Magenta
        const colors = ['#FF4D4D', '#4D8BFF', '#A855F7', '#EC4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 4 + 1;
      }

      update() {
        this.prevX = this.x;
        this.prevY = this.y;
        this.prevZ = this.z;
        this.z -= this.speed;

        // Subtle swirling
        const angle = 0.001;
        const currentX = this.x;
        const currentY = this.y;
        this.x = currentX * Math.cos(angle) - currentY * Math.sin(angle);
        this.y = currentX * Math.sin(angle) + currentY * Math.cos(angle);

        if (this.z <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const fov = 300;
        
        // current projection
        const scale = fov / (fov + this.z);
        const px = this.x * scale + width / 2;
        const py = this.y * scale + height / 2;
        
        // previous projection
        const scalePrev = fov / (fov + this.prevZ);
        const pxPrev = this.prevX * scalePrev + width / 2;
        const pyPrev = this.prevY * scalePrev + height / 2;

        ctx.beginPath();
        ctx.moveTo(pxPrev, pyPrev);
        ctx.lineTo(px, py);
        
        ctx.strokeStyle = this.color;
        // Dots/Short strokes
        ctx.lineWidth = Math.max(1, 4 * scale);
        ctx.lineCap = 'round';
        
        const alpha = Math.min(1, (2000 - this.z) / 1000);
        ctx.globalAlpha = alpha * 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationFrameId: number;

    const render = () => {
      // Black background for dark mode
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
