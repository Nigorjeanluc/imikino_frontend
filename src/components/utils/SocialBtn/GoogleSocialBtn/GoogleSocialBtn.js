import React from 'react';
import { MDBBtn } from 'mdbreact';
import './GoogleSocialBtn.scss';

class GoogleSocialButton extends React.Component {
  render() {
    return (
      <MDBBtn
        className="social-btn"
        tag="a"
        size="sm"
        gradient="peach"
        rounded
        onClick={this.props.triggerLogin} {...this.props}
      >
        { this.props.children }
      </MDBBtn>
    );
  }
}

export default GoogleSocialButton;
