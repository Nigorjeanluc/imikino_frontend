import React from 'react';
import styled from 'styled-components';

import logo from '../../../assets/logo.png';

const Image = styled.img`
  height: 85%;
  width: 120px;
  margin: 5px 0;
`;

function Brand() {
  return (
    <div>
      <Image src={logo} alt="Company Logo" />
    </div>
  );
}

export default Brand;
