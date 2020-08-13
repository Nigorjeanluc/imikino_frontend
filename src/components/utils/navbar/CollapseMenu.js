import React from 'react';
import styled from 'styled-components';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import LoginBtn from './LoginBtn';
import SignUpBtn from './SignUpBtn';

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
      }}
      >
        <NavLinks>
          <li><Link to="/livescores" onClick={props.handleNavbar}>Livescores</Link></li>
          <li><Link to="/transfers" onClick={props.handleNavbar}>Transfers</Link></li>
          <li><Link to="/news" onClick={props.handleNavbar}>News</Link></li>
          <li><Link to="/tables" onClick={props.handleNavbar}>Tables</Link></li>
          <li><Link to="/teams" onClick={props.handleNavbar}>Teams</Link></li>
        </NavLinks>
        <NavIcons>
          <li><a href="/"><FontAwesomeIcon icon={faFacebookSquare} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faTwitter} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faInstagram} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faYoutube} size="2x"/></a></li>
        </NavIcons>
        <NavBtn>
          <LoginBtn text="Login" />
          <SignUpBtn text="SignUp"/>
        </NavBtn>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
  z-index: 5;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;

const NavIcons = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    display: inline;
    margin-right: 10px;
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
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
  }
`;
