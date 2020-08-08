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
          <li><a href="/" onClick={props.handleNavbar}>Livescore</a></li>
          <li><a href="/" onClick={props.handleNavbar}>Transfers</a></li>
          <li><a href="/" onClick={props.handleNavbar}>News</a></li>
          <li><a href="/" onClick={props.handleNavbar}>Tables</a></li>
          <li><a href="/" onClick={props.handleNavbar}>Teams</a></li>
        </NavLinks>
        <NavIcons>
          <li><a href="/"><FontAwesomeIcon icon={faFacebookSquare} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faTwitter} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faInstagram} size="2x"/></a></li>
          <li><a href="/"><FontAwesomeIcon icon={faYoutube} size="2x"/></a></li>
        </NavIcons>
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
