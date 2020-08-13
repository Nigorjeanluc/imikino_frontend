import React from 'react';
import SocialLogin from 'react-social-login';
import { MDBBtn } from 'mdbreact';
import './FacebookSocialBtn.scss';

class FaceboolSocialBtn extends React.Component {
  render() {
    return (
      <MDBBtn
        className="social-btn"
        tag="a"
        size="sm"
        floating
        gradient="blue"
        rounded
        onClick={this.props.triggerLogin} {...this.props}
      >
        { this.props.children }
      </MDBBtn>
    );
  }
}

export default SocialLogin(FaceboolSocialBtn);
