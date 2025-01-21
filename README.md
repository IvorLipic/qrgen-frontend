https://qrgen-frontend.onrender.com/

The React frontend, built with ShadCN for styling, provides an interactive interface for generating and displaying QR code-based tickets. 
Key features include:

      - 1. Public homepage with form for ticket generation
      - 2. When the ticket is scanned, user is redirected to auth0 to login
      - 3. After successful login, auth0 provides the JWT token for the API ([qegen-backend](https://github.com/IvorLipic/qrgen-backend)), and ticket details are shown
