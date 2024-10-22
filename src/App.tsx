import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TicketPage from './pages/TicketPage';
import Callback from './pages/Callback';
import LogoutButton from './components/auth/LogoutButton';
import HomeButton from './components/HomeButton';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_OIDC_CLIENT_ID;

const App: React.FC = () => {
  return (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    cacheLocation="localstorage"
  > 
      <Router>
        <div className='flex justify-center space-x-40 p-4 bg-gradient-to-r from-zinc-100 to-slate-100'>
          <HomeButton/>
          <LogoutButton />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets/:ticketId" element={<TicketPage />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
  </Auth0Provider>  
  );
};

export default App;



