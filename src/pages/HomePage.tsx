import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

interface TicketResponse {
  qrCode: string;
}

const HomePage: React.FC = () => {
  const [oib, setOib] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const getAccessToken = async () => {
    const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_AUTH0_CLIENT_SECRET;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  
    const tokenUrl = `https://${auth0Domain}/oauth/token`;
  
    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience,
      grant_type: "client_credentials",
    };
  
    try {
      const response = await axios.post(tokenUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  };

  const fetchTicketCount = async () => {
    try {
      const response = await axios.get<{ count: number }>(
        `${import.meta.env.VITE_APP_API_BASE_URL}/tickets/count`
      );
      setTicketCount(response.data.count);
    } catch (err) {
      console.error('Error fetching ticket count:', err);
    }
  };

  const handleGenerateTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setFadeIn(false);
    setQrCodeUrl(null);

    const accessToken = await getAccessToken();
    if (!accessToken) {
      setIsLoading(false);
      console.error('Failed to retrieve access token');
      return;
    }

    try {
      const response = await axios.post<TicketResponse>(
        `${import.meta.env.VITE_APP_API_BASE_URL}/tickets/generate`,
        {
          oib,
          firstName,
          lastName, 
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,  // Add the token here
          },
        }
      );

      const qrCodeBase64 = response.data.qrCode;
      setQrCodeUrl(`data:image/png;base64,${qrCodeBase64}`);
      setError(null);
      fetchTicketCount();
    } catch (err: any) {
      if (err.response.data) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  useEffect(() => {
    fetchTicketCount();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-zinc-100 to-slate-100 min-h-screen">
      <Card className="w-full max-w-screen-md shadow-lg rounded-lg p-6">
        <p className="bg-gradient-to-r from-zinc-500 to-zinc-600 bg-clip-text text-transparent text-center font-bold text-4xl mb-4">Total Tickets Generated: {ticketCount}</p>
        <form onSubmit={handleGenerateTicket} className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="oib" className="text-lg bg-zinc-600 bg-clip-text text-transparent">OIB:</Label>
            <Input
              id="oib"
              type="text"
              value={oib}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOib(e.target.value)}
              required
              className="mt-1 text-lg"
            />
          </div>
          <div>
            <Label htmlFor="firstName" className="text-lg bg-zinc-700 bg-clip-text text-transparent">First Name:</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              required
              className="mt-1 text-lg"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-lg bg-zinc-800 bg-clip-text text-transparent">Last Name:</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              required
              className="mt-1 mb-4 text-lg"
            />
          </div>
          <Button type="submit" className='bg-gradient-to-r from-zinc-600 to-zinc-700 w-60 h-30 self-center text-xl font-bold border-spacing-5 text-slate-100'>Generate Ticket</Button>
        </form>

        {error && <Alert variant="destructive" className="mt-4">{error}</Alert>}

        {/* Wrapper container for loader and QR code */}
        <div className="flex flex-col justify-center items-center">

          {/* Loader and QR Code container */}
          <div className="relative flex justify-center items-center h-96 w-96">

            {/* Loader while QR code is being fetched */}
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* QR Code with fade-in effect */}
            {qrCodeUrl && (
              <div
                className={`absolute inset-0 flex justify-center items-center transition-opacity duration-700 ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img src={qrCodeUrl} alt="QR Code" />
              </div>
            )}
            
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;



