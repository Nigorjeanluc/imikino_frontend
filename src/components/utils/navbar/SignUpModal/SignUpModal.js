/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBBtn, MDBAlert } from 'mdbreact';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './SignUpModal.scss';
import { FacebookSocialBtn, GoogleSocialBtn } from '../../SocialBtn';
import { signup } from '../../../../redux/actions/user';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Your email is equired"),
  name: Yup.string().required("Your fullname is required").label('Name'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")
    .required('Required'),
});

const SignUpModal = (props) => {
  const error = props.errors;
  const { signup, loading } = props;
  const fClicked = () => console.log('Clicked F');

  const facebookResponse = (res) => {
    const user = {
      name: res.name,
      email: res.email,
      profileImg: res.picture.data.url,
      facebookID: res.userID,
      password: '123456789'
    };
    signup(user);
  };
  
  const responseGoogle = (res) => {
    const { profileObj } = res;
    const user = {
      name: profileObj.name,
      email: profileObj.email,
      profileImg: profileObj.imageUrl,
      googleId: profileObj.googleId,
      password: '123456789'
    };
    signup(user);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values,
  } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: (values) => signup({
      name: values.name,
      email: values.email,
      profileImg: 'https://avatars.dicebear.com/v2/jdenticon/0cf13b56bc6421c204bef398f2076e64.svg',
      password: values.passwordConfirmation
    })
  });

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <MDBRow>
            <MDBCol md="12">
              <div>
                <Button onClick={props.onHide}>
                  <FontAwesomeIcon icon={faTimes} size="2x" />
                </Button>
              </div>
              <form onSubmit={handleSubmit}>
                <p style={{ margin: 10 }} className="h4 text-center mb-4">
                  <img style={{ width: 200 }} src={require('../../../../assets/logo.png')} alt="Logo" />
                </p>
                <p className="h4 text-center mb-4">Sign Up</p>
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
                  <label className="grey-text">
                    Your full name
                  </label>
                  <input type="text" className="form-control" onBlur={handleBlur("name")} onChange={handleChange("name")} value={values.name}/>
                  {errors.name ? <p className="error-text text-center text-danger font-italic">{errors.name}</p> : ''}
                  <br />
                  <label className="grey-text">
                    Your email
                  </label>
                  <input type="text" className="form-control" onBlur={handleBlur("email")} onChange={handleChange("email")} value={values.email} />
                  {errors.email ? <p className="error-text text-center text-danger font-italic">{errors.email}</p> : ''}
                  <br />
                  <MDBRow>
                    <MDBCol md="6" sm="12">
                      <label className="grey-text">
                        Password
                      </label>
                      <input type="password" className="form-control" onBlur={handleBlur("password")} onChange={handleChange("password")} value={values.password} />
                      {errors.password ? <p className="error-text text-center text-danger font-italic">{errors.password}</p> : ''}
                    </MDBCol>
                    <MDBCol md="6" sm="12">
                      <label className="grey-text">
                        Confirm password
                      </label>
                      <input type="password" className="form-control" onBlur={handleBlur("passwordConfirmation")} onChange={handleChange("passwordConfirmation")} value={values.passwordConfirmation} />
                      {errors.passwordConfirmation ? <p className="error-text text-center text-danger font-italic">{errors.passwordConfirmation}</p> : ''}
                    </MDBCol>
                  </MDBRow>

                  <MDBBtn className="submit-btn" rounded outline color="info" type="submit">Sign Up</MDBBtn>
                </MDBCol>
                <div className="fancyy"><p class="subtitle fancy"><span>or</span></p></div>
                <div className="text-center mt-6">
                  <FacebookLogin
                    appId="294287228509651"
                    autoLoad={false}
                    fields='name, picture, email'
                    onClick={fClicked}
                    callback={facebookResponse}
                    render={(renderProps) => (
                      <FacebookSocialBtn onClick={renderProps.onClick}>
                        <FontAwesomeIcon className="mr-1" icon={faFacebookF} size="3x" /><span className="icons-text">  <span>Sign Up with facebook</span></span>
                      </FacebookSocialBtn>
                    )}
                  />
                </div>
                <div className="text-center mt-6">
                  <GoogleLogin
                    clientId="395730639240-m60eqhlsb07qf6daevrmnpsj3d1pd74o.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <GoogleSocialBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <FontAwesomeIcon className="mr-1" icon={faGoogle} size="3x" /><span className="icons-text">  <span>Sign Up with Google</span></span>
                    </GoogleSocialBtn>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </Modal.Body>
      </Modal>
    );
}

const mapStateToProps = ({
  user: {
    token,
    signup: { profile, errors, message, loading }
  }
}) => ({
  token,
  errors,
  message,
  loading,
  profile
});

export default connect(mapStateToProps, { signup })(SignUpModal);
