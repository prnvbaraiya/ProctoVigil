import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";

function AdminLayout(props) {
  return (
    <>
      <Header />
      <Sidebar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default AdminLayout;
