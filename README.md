# Wearo - Premium Modern Ecommerce Platform

Wearo is a modern, minimalist, and responsive ecommerce clothing store built with the latest web technologies. It provides a seamless shopping experience with a focus on UI/UX, fast performance, and secure payment processing.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14 (App Router), React, and Tailwind CSS.
- **Database & Authentication**: MongoDB with Mongoose for data modeling, and NextAuth.js for secure credential-based authentication.
- **State Management**: Zustand for global state management with local storage persistence (Cart, Addresses, Orders).
- **Payment Integration**: Fully integrated with Razorpay for secure checkout, including verification and status tracking.
- **Beautiful UI Components**: Utilizes Shadcn UI, Radix UI primitives, and Framer Motion for smooth animations and a premium look and feel.
- **Dynamic Routing & APIs**: Server-side rendering (SSR), static generation, and custom API routes for products, collections, orders, and payments.
- **Address Management**: Built-in flow for adding and selecting shipping addresses during checkout.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Payments:** [Razorpay Node SDK](https://github.com/razorpay/razorpay-node) / Next Script

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm/yarn/pnpm installed. You will also need a MongoDB database and Razorpay account credentials.

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up your environment variables. Create a `.env` file in the root directory and add the following keys:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: Next.js App Router core (pages, layouts, and API routes).
  - `/api`: Backend endpoints for Razorpay, auth, products, etc.
  - `/(shop)`: Main storefront routes including categories, product details, and listings.
  - `/cart`, `/checkout`, `/orders`: E-commerce interaction routes.
- `/components`: Reusable UI components (header, footer, modals, product cards).
- `/models`: Mongoose database schemas (User, Product, Order).
- `/store`: Zustand state management stores (`useCartStore`, `useAddressStore`, `useOrderStore`).
- `/lib`: Helper utilities including database connection logic and auth configuration.

## 💳 Checkout Flow

1. **Cart**: Users add items to their cart, managed locally by Zustand.
2. **Address Selection**: Before checking out, users are prompted to choose or create a delivery address via a custom modal (`AddressModal`).
3. **Razorpay Integration**: A server-side order is generated securely via the `/api/razorpay/order` route. 
4. **Payment Processing**: The frontend triggers the Razorpay script.
5. **Verification**: Payment success triggers `/api/razorpay/verify` where HMAC SHA256 signatures are validated and the order is persisted to MongoDB.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built production app.
- `npm run lint`: Lints the source code.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
