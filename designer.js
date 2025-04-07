import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function App() {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [, setPosition] = useState({ x: 0, y: 0, width: 100, height: 100 });

// Update position when object moves
useEffect(() => {
  if (!canvas) return;
  canvas.on('object:moving', (e) => {
    setPosition({
      x: Math.round(e.target.left),
      y: Math.round(e.target.top),
      width: Math.round(e.target.width * e.target.scaleX),
      height: Math.round(e.target.height * e.target.scaleY),
    });
  });
}, [canvas]);

  // Initialize canvas
  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f5f5f5',
    });
    setCanvas(newCanvas);

    // Add a sample T-shirt
    const tshirtImg = new fabric.Image.fromURL(
      'https://example.com/tshirt.png', 
      (img) => {
        img.scaleToWidth(700);
        newCanvas.add(img);
        newCanvas.renderAll();
      }
    );

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
    <div>
      <h1>Custom Garment Designer</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} id="design-canvas" />
    </div>
  );
}

export default App;