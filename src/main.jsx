import React from "react";
import ReactDOM from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

// Log all the environment variables
console.log('VITE_KINDE_CLIENT_ID:', import.meta.env.VITE_KINDE_CLIENT_ID);
console.log('VITE_KINDE_DOMAIN:', import.meta.env.VITE_KINDE_DOMAIN);
console.log('VITE_KINDE_LOGOUT_URL:', import.meta.env.VITE_KINDE_LOGOUT_URL);
console.log('VITE_KINDE_REDIRECT_URL:', import.meta.env.VITE_KINDE_REDIRECT_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KindeProvider
      clientId="822dc7877be24cd083797065720e73aa"
      domain="https://aryansharma.kinde.com"
      logoutUri="https://utilize-orders.vercel.app"
      redirectUri="https://utilize-orders.vercel.app"
    >
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </KindeProvider>
  </React.StrictMode>
);
