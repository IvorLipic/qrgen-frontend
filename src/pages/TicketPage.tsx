import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

interface Ticket {
  oib: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

const TicketPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        // Check if the user is authenticated
        if (!isAuthenticated) {
          // If not authenticated, redirect to Auth0 login page
          loginWithRedirect({
            authorizationParams: {
              redirect_uri: window.location.origin + `/callback`,  // Redirect back to the callback after login
            },
          });
          return;
        }

        // If authenticated, fetch the access token
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get<{ ticket: Ticket }>(
          `${import.meta.env.VITE_APP_API_BASE_URL}/tickets/${ticketId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,  // Pass access token in the header
            },
          }
        );

        // Store the ticket details and username
        setTicket(response.data.ticket);
        //setUsername(user?.name || user?.email || "Unknown User"); // Get the username from Auth0 user data
        setError(null);
      } catch (err: any) {
        setError(err.response?.data || 'Error fetching ticket details.');
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };

    localStorage.setItem('ticketId', ticketId || '');
    fetchTicketDetails();
    
  }, [ticketId, isAuthenticated, loginWithRedirect, getAccessTokenSilently, user]);

  if (loading) {
    return (
      <LoadingSkeleton />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (ticket) {
    return (
      <div className='bg-gradient-to-r from-zinc-100 to-slate-100 min-h-screen'>
        <div className="max-w-lg mx-auto p-6 text-center bg-gradient-to-r from-slate-200 to-zinc-100 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 tracking-wide">Ticket Information</h1>
          <div className="bg-gradient-to-r from-zinc-100 to-slate-200 p-4 rounded-lg shadow-lg text-xl tracking-tight">
            <p><strong>OIB:</strong> {ticket.oib}</p>
            <p><strong>First Name:</strong> {ticket.firstName}</p>
            <p><strong>Last Name:</strong> {ticket.lastName}</p>
            <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
          <p className='mt-8 text-2xl bg-gradient-to-r from-zinc-950 to-slate-800 bg-clip-text text-transparent'><strong>Username:</strong> {user?.name || user?.email || "Unknown User"}</p> 
        </div>
      </div>
    );
  }
};

export default TicketPage;
