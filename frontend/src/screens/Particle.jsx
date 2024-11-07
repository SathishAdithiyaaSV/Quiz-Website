import React, { useEffect, useRef, useState } from 'react';

const ParticleSimulator = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const emitter = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // Initial emitter position
  const [isDragging, setIsDragging] = useState(false);
  const frameCount = useRef(0); // To control emission speed

  // Initialize new particles from emitter
  const emitParticles = () => {
    // Emit a particle every 5 frames to reduce speed
    if (frameCount.current % 5 === 0) { // Emit every 5 frames (adjust this to control speed)
      const newParticle = {
        x: emitter.current.x,
        y: emitter.current.y,
        vx: (Math.random() - 0.5) * 2, // Random velocity in x-direction
        vy: (Math.random() - 0.5) * 2, // Random velocity in y-direction
      };
      particles.current.push(newParticle);
    }
    frameCount.current += 1;
  };

  // Update particle positions
  const updateParticles = () => {
    particles.current = particles.current.map((particle) => ({
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
    }));
  };

  // Render particles to canvas
  const drawParticles = (ctx) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw the particles with smaller size
    particles.current.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2); // Reduced particle size
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    });

    // Draw the emitter
    ctx.beginPath();
    ctx.arc(emitter.current.x, emitter.current.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    emitParticles(); // Emit new particles from the emitter
    updateParticles(); // Update particle positions
    drawParticles(ctx); // Render updated particles and emitter

    requestAnimationFrame(animate); // Continue animation
  };

  // Handle mouse down event for dragging the emitter
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the click is inside the emitter (within a radius of 10px)
    const dx = mouseX - emitter.current.x;
    const dy = mouseY - emitter.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < 10) {
      setIsDragging(true);
    }
  };

  // Handle mouse move event to move the emitter
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = canvasRef.current.getBoundingClientRect();
    emitter.current.x = e.clientX - rect.left;
    emitter.current.y = e.clientY - rect.top;
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Initial setup and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animate(); // Start animation loop

    // Add mouse event listeners for dragging the emitter
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup event listeners
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDragging]);

  return (
    <canvas ref={canvasRef} className="w-full h-full bg-gray-900"></canvas>
  );
};

export default ParticleSimulator;
