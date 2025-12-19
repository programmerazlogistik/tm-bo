import { RootProvider } from "fumadocs-ui/provider";
import "fumadocs-ui/style.css";

import "./globals.scss";

export const metadata = {
  title: "Muatrans Shipper UI Documentation",
  description: "Component library and documentation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={"font-sans"} suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <RootProvider
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
