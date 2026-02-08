# FFmpeg Docs v2

A modern, interactive documentation site for FFmpeg built with React, Vite, and Tailwind CSS.

## Deployment Configuration for Client-Side Routing

**Important:** This application uses client-side routing with `wouter`. When deploying to production, you must configure your server to handle client-side routes properly to avoid 404 errors when users reload pages or access deep links directly.

### Problem
When users navigate to routes like `/installation` or `/basic-usage` and then reload the page, the server returns a 404 error because it doesn't know these routes are handled by the client-side router.

### Solution
Configure your server to serve `index.html` for all routes that don't match static assets.

### Deployment Examples

#### 1. Netlify
Create a `_redirects` file in your `public/` folder:
```
/*    /index.html   200
```

#### 2. Vercel
Create a `vercel.json` file in your project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### 3. GitHub Pages
Create a `_redirects` file in your `public/` folder:
```
/*    /index.html   200
```

#### 4. Apache (htaccess)
Create a `.htaccess` file in your `public/` folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### 5. Nginx
Add this to your server configuration:
```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/your/app/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### 6. Node.js/Express
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000);
```

#### 7. Firebase Hosting
Update your `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Development

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Previewing the Build
```bash
npm run preview
```

## Features

- **Interactive Documentation**: Clean, modern interface for FFmpeg documentation
- **Search Functionality**: Quick search across all documentation
- **Table of Contents**: Auto-generated TOC for easy navigation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Built-in theme switching
- **Code Syntax Highlighting**: Beautiful code blocks with syntax highlighting

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: wouter for client-side routing
- **Styling**: Tailwind CSS with Radix UI components
- **Build Tool**: Vite
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: Phosphor Icons

## Project Structure

```
src/
├── components/          # React components
│   ├── ArticleView.tsx  # Main content display
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Header.tsx       # App header
│   └── ...
├── data/               # Documentation content
│   ├── articles.ts      # Main documentation articles
│   ├── getting-started.ts # Getting started guide
│   └── info.ts          # Additional information
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/your-username/ffmpeg-docs/issues) section
2. Create a new issue if your problem isn't already addressed
3. Include details about your deployment environment when reporting 404 errors