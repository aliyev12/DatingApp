import React from "react";
import App from "next/app";
import { UserContext, UserProvider, IToken } from "../contexts/UserContext";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }
}

// export default class MyApp extends App {
//   state = {
//     user: null,
//     isLoggedIn: false,
//   };

//   componentDidMount = () => {
//     this.handleLoggedIn();
//   };

//   handleLoggedIn = (tokenFromEndpoint?: string) => {
//     try {
//       const token = tokenFromEndpoint
//         ? tokenFromEndpoint
//         : localStorage.getItem("token");
//       if (token) {
//         const decodedToken: IToken = jwtDecode(token);
//         const expirationTime = decodedToken.exp * 1000;
//         const currentTime = Date.now();
//         const expired = expirationTime < currentTime;
//         if (!expired) {
//           this.setState({ isLoggedIn: true, user: decodedToken });
//         } else {
//           this.setState({ isLoggedIn: false, user: null });
//         }
//       }
//     } catch (err) {
//       this.setState({ isLoggedIn: false, user: null });
//     }
//   };

//   // signIn = (username, password) => {
//   //   localStorage.setItem('coolapp-user', username);

//   //   this.setState(
//   //     {
//   //       user: username
//   //     },
//   //     () => {
//   //       Router.push('/');
//   //     }
//   //   );
//   // };

//   // signOut = () => {
//   //   localStorage.removeItem('coolapp-user');
//   //   this.setState({
//   //     user: null
//   //   });
//   //   Router.push('/signin');
//   // };

//   render() {
//     const { Component, pageProps } = this.props;

//     const value = {
//       isLoggedIn: this.state.isLoggedIn,
//       handleLoggedIn: this.handleLoggedIn,
//       user: this.state.user,
//       // signIn: this.signIn,
//       // signOut: this.signOut,
//     };

//     return (
//       <UserContext.Provider value={value}>
//         <Component {...pageProps} />
//       </UserContext.Provider>

//     );
//   }
// }
