import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/index.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

AOS.init({
  duration: 1000, // values from 0 to 3000, with step 50ms
  once: true, // whether animation should happen only once - while scrolling down
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)