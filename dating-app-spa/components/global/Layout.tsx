import * as React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import Navbar from "./navbar/Navbar";
import { customTabsStyles } from "../../utils/customTabsStyles";
import { ToastContainer } from "react-toastify";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
  <div>
    <GlobalStyle />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <ToastContainer
      position="top-right"
      autoClose={50000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
    <Container className="mt-5">{children}</Container>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;

    body {
      font-size: 1.6rem;

      .btn, .lead, .h5, h5, .dropdown-menu, .form-control {
        font-size: 1.6rem;
      }

      .h4, h4 {
        font-size: 1.8rem;
      }
    }

    ${customTabsStyles}
  }
`;
