const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing - serve index.html for all routes
// that don't match static assets
app.get('*', (req, res) => {
  // Check if the request is for a static asset (CSS, JS, images, etc.)
  const isStaticAsset = /\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i.test(req.path);
  
  if (isStaticAsset) {
    // If it's a static asset that doesn't exist, return 404
    res.status(404).send('Static asset not found');
  } else {
    // For all other routes, serve the index.html file
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Client-side routing configured - all routes will serve index.html');
});