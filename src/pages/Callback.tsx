import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const Callback: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const ticketId = localStorage.getItem('ticketId');
      if (ticketId) {
        navigate(`/tickets/${ticketId}`);
        localStorage.removeItem('ticketId');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, isLoading]);

  return (
    <LoadingSkeleton />
  );
};

export default Callback;
