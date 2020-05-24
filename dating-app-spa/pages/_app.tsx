import React from "react";
import App from "next/app";
import { AuthProvider } from "../contexts/auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}
