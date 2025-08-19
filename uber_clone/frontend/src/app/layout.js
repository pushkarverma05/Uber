import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { CaptainProvider } from "./context/CaptainContext";
import { SocketProvider } from "./context/SocketContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CaptainProvider>
        <UserProvider>
          <SocketProvider>
            {children}
            </SocketProvider>
        </UserProvider>
        </CaptainProvider>
      </body>
    </html>
  );
}