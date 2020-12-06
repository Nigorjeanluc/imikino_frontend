/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import React, { Component, setState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBBtn, MDBAlert } from 'mdbreact';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import dotenv from 'dotenv';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './LoginModal.scss';
import { FacebookSocialBtn, GoogleSocialBtn } from '../../SocialBtn';
import { login } from '../../../../redux/actions/user';

dotenv.config();

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginModal = (props) =>{
  const error = props.errors;
  const { login, loading } = props;

  const fClicked = () => console.log('Clicked F');
  
  const facebookResponse = (res) => {
    const user = {
        name: res.name,
        email: res.email,
        profileImg: res.picture.data.url,
        facebookID: res.userID
    };
    console.log(user);
    login({email: user.email, password: '123456789'});
  };
  
  const responseGoogle = (res) => {
    console.log(res);
    const { profileObj } = res;
    const user = {
      name: profileObj.name,
      email: profileObj.email,
      profileImg: profileObj.imageUrl,
      googleId: profileObj.googleId
    };
    console.log(user);
    login({email: user.email, password: '123456789'});
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: (values) => login(values),
  });

    return (
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
              <p style={{ margin: 10 }} className="h4 text-center mb-4">
                <img style={{ width: 200 }} src={require('../../../../assets/logo.png')} alt="Logo" />
              </p>
              <p className="h4 text-center mb-4">Sign in</p>
              <MDBCol md="12">
                {
                  !loading && error ? (
                    <MDBAlert className="alert-text text-center" color="danger" dismiss>
                      <strong>{error}</strong>
                    </MDBAlert>
                  ) : ''
                }
              </MDBCol>
              <MDBCol className="form-style" md="12">
                <form onClick={handleSubmit}>
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Your email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email ? <p className="error-text text-center text-danger font-italic">{errors.email}</p> : ''}
                  <br />
                  <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                    Your password
                  </label>
                  <input
                    type="password"
                    id="defaultFormLoginPasswordEx"
                    className="form-control"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password ? <p className="error-text text-center text-danger font-italic">{errors.password}</p> : ''}

                  <MDBBtn type="submit" className="submit-btn" rounded outline color="info">Login</MDBBtn>
                </form>
              </MDBCol>
              <div className="fancyy"><p className="subtitle fancy"><span>or</span></p></div>
              <div className="text-center mt-6">
                <FacebookLogin
                  appId="294287228509651"
                  autoLoad={false}
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
              <div className="text-center mt-6">
                {/* <GoogleLogin
                  clientId="395730639240-m60eqhlsb07qf6daevrmnpsj3d1pd74o.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <GoogleSocialBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <FontAwesomeIcon className="mr-1" icon={faGoogle} size="3x" /><span className="icons-text">  <span>Sign in with Google</span></span>
                  </GoogleSocialBtn>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}
              </div>
            </MDBCol>
          </MDBRow>
        </Modal.Body>
      </Modal>);
  };

// export default LoginModal;
const mapStateToProps = ({
  user: {
    token,
    login: { profile, errors, message, loading }
  }
}) => ({
  token,
  errors,
  message,
  loading,
  profile
});

export default connect(mapStateToProps, { login })(LoginModal);
