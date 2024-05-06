import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "next-themes";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className="mx-auto flex flex-col min-h-screen p-4 bg-primary w-full md:w-5/6 overflow-x-hidden xl:w-[900px] ">
        <h1 className="hidden">Hacker News</h1>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
