import React from "react";
import App from "next/app";
import { GlobalProvider } from "../contexts/global/GlobalContext";
import { AuthProvider } from "../contexts/auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/lib/style.css";
import "../utils/style.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <GlobalProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </GlobalProvider>
    );
  }
}
