import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import KasszaContextProvider from './context/kasszaContext.tsx';
import CartContextProvider from './context/cartContext.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import BasicModalDialog from './Home.tsx';
import App from './App.tsx';
import TicketsContextProvider from './context/ticketContext.tsx';
import RentalContextProvider from './context/rentalContext.tsx';

const root = document.getElementById('root');

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <KasszaContextProvider>
        <RentalContextProvider>
          <CartContextProvider>
            <TicketsContextProvider>
              <Routes>
                <Route path="/" element={<BasicModalDialog />} />
                <Route path="/home" element={<App />} />
              </Routes>
            </TicketsContextProvider>
          </CartContextProvider>
        </RentalContextProvider>
      </KasszaContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
