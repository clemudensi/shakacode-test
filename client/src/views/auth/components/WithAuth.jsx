import React from 'react';
import LocalAuthService from './LocalAuthService';

export default function withAuth(AuthComponent) {

  return class WithAuth extends React.Component{
    constructor(props) {
      super(props);
      this.Auth  = new LocalAuthService();
    }

    userProps = () => {
      return this.Auth.loggedIn();
    };

    userToken = () => {
      return this.Auth.getToken();
    };

    tokenValidation = () => {
      return this.Auth.isTokenExpired();
    };

    render() {
      return (
          <AuthComponent history={this.props.location}
                         user={this.userProps()}
                         token={this.userToken()}
                         tokenValid={this.tokenValidation()}/>
      )
    }
  }
}

