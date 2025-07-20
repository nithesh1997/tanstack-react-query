import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a new instance of QueryClient to manage all server state and caching
const client = new QueryClient();

// Wrap the app with QueryClientProvider to provide React Query context throughout the app
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <App />
    {/* React Query Devtools for debugging queries and cache */}
    <ReactQueryDevtools />
  </QueryClientProvider>,
);
