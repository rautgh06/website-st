import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import './index.css';

// Dynamically handle subfolder routing conflicts for GitHub Pages
const isSubfolder = window.location.pathname.includes('/website-st');
if (isSubfolder && !window.location.hash) {
  // Gracefully point the internal window address framework back to root
  window.history.replaceState(null, '', '/website-st/');
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
