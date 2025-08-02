# Active For You Charitable Trust Website

A comprehensive full-stack website for Active For You Charitable Trust, built with React, TypeScript, Supabase, and Stripe integration.

## Features

### Frontend
- **Modern React Application** with TypeScript
- **Responsive Design** using Tailwind CSS
- **SEO Optimized** with React Helmet Async
- **Error Boundaries** for graceful error handling
- **Analytics Integration** ready for Google Analytics
- **Progressive Web App** capabilities

### Backend & Database
- **Supabase Backend** with PostgreSQL database
- **Row Level Security** (RLS) for data protection
- **Real-time subscriptions** for live updates
- **Edge Functions** for serverless operations

### Payment Integration
- **Stripe Payment Processing** with secure checkout
- **Webhook Handling** for payment status updates
- **Donation Receipts** with download functionality
- **Tax Deduction** certificate generation

### Admin Features
- **Admin Dashboard** with authentication
- **Donation Management** and tracking
- **Contact Message** management
- **Newsletter Subscription** management
- **Analytics and Reporting**

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Payments**: Stripe
- **Deployment**: Netlify
- **Analytics**: Google Analytics 4 ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd active-for-you-trust
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### Database Setup

1. Create a new Supabase project
2. Run the migrations in the `supabase/migrations` folder
3. Set up authentication policies
4. Deploy edge functions

### Stripe Setup

1. Create a Stripe account
2. Get your API keys
3. Set up webhooks for payment status updates
4. Configure your webhook endpoint: `https://your-domain.com/functions/v1/webhook-stripe`

### Development

Start the development server:
```bash
npm run dev
```

### Deployment

The project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (Supabase, Stripe)
├── pages/              # Page components
└── types/              # TypeScript type definitions

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

## Key Features Implemented

### 1. Secure Payment Processing
- Stripe integration with PCI compliance
- Webhook handling for payment status updates
- Automatic receipt generation
- Tax deduction certificate support

### 2. Admin Dashboard
- Secure authentication with Supabase Auth
- Real-time donation tracking
- Contact message management
- Newsletter subscriber management

### 3. SEO & Performance
- Server-side rendering ready
- Meta tags optimization
- Image optimization
- Performance monitoring

### 4. Security Features
- Row Level Security (RLS) on all tables
- CSRF protection
- XSS protection headers
- Secure authentication flow

### 5. Analytics & Tracking
- Google Analytics 4 integration
- Custom event tracking
- Donation conversion tracking
- User behavior analytics

## Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Admin
VITE_ADMIN_EMAIL=admin@activeforyou.org
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email ACTIVEFORYOUTRUST@GMAIL.COM or call 9925255729.