import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';

const Image = styled.img`
  height: 85%;
  width: 120px;
  margin: 5px 0;
`;

function Brand() {
  return (
    <div>
      <Link to="/"><Image src={logo} alt="Company Logo" /></Link>
    </div>
  );
}

export default Brand;
