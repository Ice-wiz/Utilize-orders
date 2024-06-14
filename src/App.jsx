import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

export default function App() {

// Log all the environment variables
console.log('VITE_KINDE_CLIENT_ID:', import.meta.env.VITE_KINDE_CLIENT_ID);
console.log('VITE_KINDE_DOMAIN:', import.meta.env.VITE_KINDE_DOMAIN);
console.log('VITE_KINDE_LOGOUT_URL:', import.meta.env.VITE_KINDE_LOGOUT_URL);
console.log('VITE_KINDE_REDIRECT_URL:', import.meta.env.VITE_KINDE_REDIRECT_URL);


  
  const { isLoading, isAuthenticated } = useKindeAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return isAuthenticated ? <LoggedIn /> : <LoggedOut />;
}

// CSS for the loader
<style jsx>{`
  .loader {
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`}</style>
