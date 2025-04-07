document.addEventListener('DOMContentLoaded', () => {
  import React, { useState, useEffect, useRef } from 'react';
  import { fabric } from 'fabric';

function App() {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);

  // Initialize canvas
  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f5f5f5',
    });
    setCanvas(newCanvas);

    // Load a T-shirt template
    fabric.Image.fromURL('https://res.cloudinary.com/dwrhiurcg/image/upload/v1744059421/Tee_front_fhqt7h.png', (img) => {
      img.scaleToWidth(700);
      newCanvas.add(img);
      newCanvas.renderAll();
    });

    return () => newCanvas.dispose();
  }, []);

  // Upload artwork
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Garment Designer</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} id="design-canvas" />
    </div>
  );
}

export default App;