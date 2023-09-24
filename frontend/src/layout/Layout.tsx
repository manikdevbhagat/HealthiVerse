import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routes from "../routes/Routes";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
