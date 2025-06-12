# ₿ CryptoMania

**CryptoMania** — is a sleek cryptocurrency explorer app where you can find coins from around the world. It shows detailed info about any coin you search for, including historical value charts. You can search for coins, adjust how many items show per page, and select the currency for price display. The app features a trending coins page and lets you save your favorite coins by clicking a star icon, so you never lose track of them. Your saved coins are available on a dedicated route. The app also supports light/dark themes via a theme context for a smooth user experience.

## 🚀 Project Purpose

CryptoMania is a comprehensive cryptocurrency explorer built to provide users with easy access to detailed coin data and market trends. It allows users to search and browse a wide range of coins from around the world with customizable settings like pagination and currency selection, CryptoMania offers a personalized experience. The ability to save favorite coins ensures users never lose track of important assets. The project also explores React context and hooks for state management and includes a light/dark theme toggle for improved user comfort.

## 🧩 Features

- **Background Modal Routing**: Detailed coin information opens in a modal overlay, powered by React Router background routes. The modal displays price history charts, coin stats, and lets users mark coins as saved — all without losing their current page context.

- **Global Coin Search & Listing**: Browse thousands of cryptocurrencies with live search and pagination.

- **Detailed Coin View**: See in-depth data for each coin, including market stats, price changes, and description.

- **Currency Selection**: Display prices and data in various currencies (USD, EUR, GBP, and more).

- **Interactive Price Charts**: Visualize price history with customizable intervals (7, 14, 30 days) using Recharts.

- **Trending Coins**: Quick access to coins currently trending in the market.

- **Responsive UI**: Clean, mobile-friendly design with dynamic loading states and smooth interactions.

- **Theme Toggle**: Switch between light and dark modes for comfortable viewing anytime.

## ⚙️ Tech Stack

- **React (TypeScript)** — component-based UI with strong typing
- **Vite** — fast development and build tool
- **Tailwind CSS** — utility-first styling for rapid UI development
- **React Router DOM** — client-side routing with support for modal routes
- **Axios** — HTTP client for fetching coin data from external APIs
- **Recharts** — data visualization for price history charts
- **React Icons & Heroicons** — icon libraries for UI elements
- **ESLint & TypeScript ESLint** — code quality and type safety enforcement

## 📁 Data & Context

This project fetches live cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api).
Static data such as currency options, navigation links, and pagination settings are stored in the src/data folder for easy maintenance.

State management is handled via React Context to keep UI state, filters, pagination, and theme consistent across the app without prop drilling.

These contexts enable clean, cross-component data flow without prop drilling.

## 🌐 Live Demo

Check out the live version of the project here: [CryptoMania](https://calm-shortbread-41b583.netlify.app/)

Search for coins, explore trends, mark your favorites, and view price history — all in one sleek, responsive interface.
