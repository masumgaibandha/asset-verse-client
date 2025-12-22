# AssetVerse — Corporate Asset Management System

## Purpose
AssetVerse is a B2B HR & Asset Management platform that helps companies track assets (laptops, chairs, etc.), manage employee requests, and maintain assignment/return history with package-based limits.

## Live URL
- Client: https://asset-verse-b5fc2.web.app
- Server: https://assetverse-server-tau.vercel.app
          

## Key Features
- HR registration with default free employee credit, package upgrade via Stripe
- Role-based dashboards (HR / Employee) with protected routes
- HR: Asset CRUD + server-side pagination + search/filter
- Employee: Request assets from multiple companies, view assigned assets, return returnable assets
- Employee: My Team with company dropdown + upcoming birthdays (current month)
- HR analytics (Recharts): Returnable vs Non-returnable + Top 5 requested assets
- Payment history tracking + duplicate transaction protection

## Tech Stack / Packages
- React + React Router
- Firebase Auth
- TanStack React Query
- Axios
- DaisyUI + TailwindCSS
- Recharts
- SweetAlert2
- react-to-print (or your PDF/print package)

## Environment Variables
Create a `.env.local` file:
```env
VITE_apiBaseUrl=<YOUR_SERVER_URL>
VITE_image_host_key=<IMGBB_KEY>
VITE_FIREBASE_apiKey=...
VITE_FIREBASE_authDomain=...
VITE_FIREBASE_projectId=...
VITE_FIREBASE_storageBucket=...
VITE_FIREBASE_messagingSenderId=...
VITE_FIREBASE_appId=...

Test Credentials

HR / Admin Account
Email: hr@testcompany.com
Password: Test12345

Employee Account
Email: employee@testcompany.com
Password: Test12345
