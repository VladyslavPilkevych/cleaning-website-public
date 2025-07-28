# Multilingual Cleaning Service Platform

Multilingual Cleaning Service Platform is a modern web platform for booking professional cleaning services. It includes a responsive frontend, secure payment via Stripe (including Google Pay and Apple Pay), automated email notifications, a dynamic pricing calculator, a contact form, and an admin panel to manage and view orders. The application supports four languages: English, Slovak, Ukrainian, and Russian.

---

## Features

### Booking and Payment

- Interactive form with dynamic service selection and real-time price calculation
- Payment processing via Stripe
  - Google Pay
  - Apple Pay
  - Credit/Debit card support
  - Cash
- All orders are automatically sent to both admin and customer emails

### Email Integration

- Uses Nodemailer to send order confirmation and contact messages
- Configurable with custom SMTP credentials
- after payment via stripe email is sent to admin and customer via webhook

### Admin Panel

- Web interface to browse and manage submitted orders
- Displays order details and status

### Contact Form

- Functional contact form with email delivery
- Responsive layout for mobile and desktop users

### Multilingual Interface

- Full translation support for:
  - English
  - Slovak
  - Ukrainian
  - Russian
- Based on i18next with browser language detection and fallback mechanism

---

## Tech Stack

### Frontend

Built with:

- React 19 + TypeScript
- Material UI v6 for UI components
- Styled Components and Emotion for styling
- i18next, react-i18next, and language detector
- Stripe integration via `@stripe/react-stripe-js` and `@stripe/stripe-js`
- FullCalendar integration for time slots
- React Router DOM, Toast notifications, and Axios for HTTP calls

Main frontend dependencies:

```json
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@fullcalendar/core": "^6.1.15",
    "@fullcalendar/daygrid": "^6.1.15",
    "@fullcalendar/interaction": "^6.1.15",
    "@fullcalendar/react": "^6.1.15",
    "@fullcalendar/timegrid": "^6.1.15",
    "@mui/material": "^6.4.7",
    "@mui/x-date-pickers": "^7.27.3",
    "@stripe/react-stripe-js": "^3.6.0",
    "@stripe/stripe-js": "^7.2.0",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.126",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "axios": "^1.8.4",
    "dayjs": "^1.11.13",
    "geolib": "^3.3.4",
    "i18next": "^23.6.0",
    "i18next-browser-languagedetector": "^8.0.4",
    "i18next-http-backend": "^3.0.2",
    "lodash.debounce": "^4.0.8",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-i18next": "^15.4.1",
    "react-responsive": "^10.0.1",
    "react-router-dom": "^7.2.0",
    "react-scripts": "5.0.1",
    "react-select": "^5.10.1",
    "react-toastify": "^11.0.5",
    "stripe": "^8.202.0",
    "styled-components": "^6.1.15",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
```

### Backend

Powered by Node.js + Express. Provides APIs for:

- Handling orders and payments
- Sending transactional emails
- Connecting to Supabase database

Main backend dependencies:

```json
  "dependencies": {
    "@supabase/supabase-js": "^2.49.4",
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mysql2": "^3.14.0",
    "nodemailer": "^6.9.8",
    "stripe": "^18.0.0"
  }
```

## Additional developer information:

- [See extended documentation](./docs/README.md)

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). 

You may:
- Share and adapt the code for non-commercial purposes, as long as you give appropriate credit.

For more details, see the [LICENSE](./LICENSE) file.

