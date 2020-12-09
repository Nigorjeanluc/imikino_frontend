import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import LoginBtn from './LoginBtn';
import SignUpBtn from './SignUpBtn';
import Profile from './Profile';
import './Navbar.scss';

const Navbar = (props) => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });
  const { profile, loading, errors, message } = props;

  const { user, token } = localStorage;

  console.log(user, "User");
  return (
    <>
      <NavBar className="nav-font" style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <Link to="/">Amakuru</Link>
            <Link to="/transfers">Igura n'igurisha</Link>
            <Link to="/tables">Urutonde</Link>
            <Link to="/teams">Amakipe</Link>
            <Link to="/livescores">Livescores</Link>
          </NavLinks>
          <NavIcons>
            <a href="https://www.facebook.com/imikino.rw/"><FontAwesomeIcon icon={faFacebookSquare} size="2x"/></a>
            <a href="https://twitter.com/ImikinoRw"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
            <a href="/"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
            <a href="/"><FontAwesomeIcon icon={faYoutube} size="2x"/></a>
          </NavIcons>
          <NavBtn>
            {
              localStorage.token ? (
                <Profile role={JSON.parse(user).role} img={JSON.parse(user).profileImg} name={JSON.parse(user).name}/>
              ) : (
                <React.Fragment>
                  <LoginBtn text="Login" />
                  <SignUpBtn text="SignUp"/>
                </React.Fragment>
              )
            }
          </NavBtn>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
   </>
  );
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

export default connect(mapStateToProps)(Navbar);

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #1b1b2f;
  z-index: 1800;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const NavIcons = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const NavBtn = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & button {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;
