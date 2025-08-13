import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { CaptainProvider } from "./context/CaptainContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CaptainProvider>
        <UserProvider>
          {children}
        </UserProvider>
        </CaptainProvider>
      </body>
    </html>
  );
}