import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export function Layout() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
