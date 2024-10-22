import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const Callback: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const fetchTokens = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          //localStorage.setItem('access_token', accessToken);

          //const username = user?.name || user?.email;
          //localStorage.setItem('username', username || '');

          const ticketId = localStorage.getItem('ticketId');

          if (ticketId) {
            navigate(`/tickets/${ticketId}`);
            localStorage.removeItem('ticketId');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching access token', error);
          navigate('/');
        }
      };

      fetchTokens();
    }
  }, [isAuthenticated, getAccessTokenSilently, user, navigate]);

  return (
    <LoadingSkeleton />
  );
};

export default Callback;
