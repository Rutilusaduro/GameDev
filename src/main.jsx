import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HallPass from './HallPass';
import { GameErrorBoundary } from './components/GameErrorBoundary.jsx';
import { TextFlagProvider } from './contexts/TextFlagContext.jsx';
import { initErrorCapture } from './utils/errorRingBuffer.js';

initErrorCapture();

function App() {
  return (
    <GameErrorBoundary>
      <TextFlagProvider>
        <HallPass />
      </TextFlagProvider>
    </GameErrorBoundary>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
