import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function App() {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 100, height: 100 });

  // Initialize canvas
  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f5f5f5',
    });
    setCanvas(newCanvas);

    // Load a T-shirt template
    fabric.Image.fromURL('https://example.com/tshirt.png', (img) => {
      img.scaleToWidth(700);
      newCanvas.add(img);
      newCanvas.renderAll();
    });

    // Track object movement
    newCanvas.on('object:modified', (e) => {
      const obj = e.target;
      setPosition({
        x: Math.round(obj.left),
        y: Math.round(obj.top),
        width: Math.round(obj.width * obj.scaleX),
        height: Math.round(obj.height * obj.scaleY),
      });
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

      {/* 👇 Add this block for Position/Size Controls 👇 */}
      <div style={{ margin: '10px 0' }}>
        <h3>Position & Size</h3>
        <div>
          <label>X: <input type="number" value={position.x} readOnly /></label>
          <label>Y: <input type="number" value={position.y} readOnly /></label>
          <label>Width: <input type="number" value={position.width} readOnly /></label>
          <label>Height: <input type="number" value={position.height} readOnly /></label>
        </div>
      </div>

      <canvas ref={canvasRef} id="design-canvas" />
    </div>
  );
}
