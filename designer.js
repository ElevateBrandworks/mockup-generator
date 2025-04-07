document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('canvas');
  
  // Load mockup (hosted on Cloudinary)
  fabric.Image.fromURL('https://res.cloudinary.com/dwrhiurcg/image/upload/v1744059421/Tee_front_fhqt7h.png', (img) => {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  });

  // Handle image upload
  document.getElementById('upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.set({ left: 0, top: 0, scaleX: 0, scaleY: 0 });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  });

  // Save design data
  document.getElementById('save').addEventListener('click', () => {
    const designData = {
      image: canvas.toDataURL({ format: 'png' }),
      objects: canvas.toJSON(), // Saves positions/sizes
    };
    // Submit to Squarespace form (next step)
    console.log(designData);
  });
});