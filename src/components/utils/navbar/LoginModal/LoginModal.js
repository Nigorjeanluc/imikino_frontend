/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import dotenv from 'dotenv';

import './LoginModal.scss';
import { FacebookSocialBtn, GoogleSocialBtn } from '../../SocialBtn';

dotenv.config();

const fClicked = () => console.log('Clicked F');

const facebookResponse = (res) => {
  console.log(res);
};

const responseGoogle = (res) => {
  console.log(res);
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
            <div>
              <Button onClick={props.onHide}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </Button>
            </div>
            <form>
              <p style={{ margin: 10 }} className="h4 text-center mb-4">
                <img style={{ width: 200 }} src={require('../../../../assets/logo.png')} alt="Logo" />
              </p>
              <p className="h4 text-center mb-4">Sign in</p>
              <MDBCol className="form-style" md="12">
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
                </label>
                <input type="email" id="defaultFormLoginEmailEx" className="form-control" required/>
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <input type="password" id="defaultFormLoginPasswordEx" className="form-control" required/>

                <MDBBtn className="submit-btn" rounded outline color="info" type="submit">Login</MDBBtn>
              </MDBCol>
              <div className="fancyy"><p className="subtitle fancy"><span>or</span></p></div>
              <div className="text-center mt-6">
              <GoogleLogin
                clientId="AIzaSyCJnKOcCw7V76jSyQ-WZQnFtWb3-n41ZRU"
                render={(renderProps) => (
                  <GoogleSocialBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FontAwesomeIcon className="mr-1" icon={faGoogle} size="3x" /><span className="icons-text">  <span>Sign in with Google</span></span>
                </GoogleSocialBtn>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              </div>
              <div className="text-center mt-6">
                <FacebookLogin
                  appId="294287228509651"
                  autoLoad={true}
                  fields='name, picture, email'
                  onClick={fClicked}
                  callback={facebookResponse}
                  render={(renderProps) => (
                    <FacebookSocialBtn onClick={renderProps.onClick}>
                      <FontAwesomeIcon className="mr-1" icon={faFacebookF} size="3x" /><span className="icons-text">  <span>Sign in with facebook</span></span>
                    </FacebookSocialBtn>
                  )}
                />
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </Modal.Body>
    </Modal>
);

export default LoginModal;
