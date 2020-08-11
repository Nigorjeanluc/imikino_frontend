/* eslint-disable global-require */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './LoginModal.scss';
import SocialBtn from '../../SocialBtn';

const handleSocialLogin = (user) => {
  console.log(user);
};

const handleSocialLoginFailure = (err) => {
  console.error(err);
};

const LoginModal = (props) => (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <MDBRow>
          <MDBCol md="12">
            <form>
              <p style={{ margin: 10 }} className="h4 text-center mb-4">
                <img style={{ width: 200 }} src={require('../../../../assets/logo.png')} alt="Logo" />
              </p>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
              <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
              <div className="text-center mt-12">
                <Button onClick={props.onHide}>Close</Button>
                <MDBBtn color="indigo" type="submit">Login</MDBBtn>
              </div>
              <div className="fancyy"><p class="subtitle fancy"><span>or</span></p></div>
              <div className="text-center mt-6">
                <SocialBtn
                  provider='facebook'
                  appId='YOUR_APP_ID'
                  gradient="blue"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                >
                  <FontAwesomeIcon icon={faFacebookF} size="2x" /><span className="icons-text">  <span>Sign in with facebook</span></span>
                </SocialBtn>
              </div>
              <div className="text-center mt-6">
                <SocialBtn
                  provider='facebook'
                  appId='YOUR_APP_ID'
                  gradient="red"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                >
                  <FontAwesomeIcon icon={faGoogle} size="2x" /><span className="icons-text">  <span>Sign in with Google</span></span>
                </SocialBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </Modal.Body>
    </Modal>
);

export default LoginModal;
