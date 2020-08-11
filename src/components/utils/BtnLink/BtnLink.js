import React from 'react';
import { Link } from 'react-router-dom';
import './BtnLink.scss';

function BtnLink(props) {
  return (
    <>
      <Link className={`anchor ${props.active ? 'activee' : ''}`} to={props.link}>{props.text}</Link>
    </>
  );
}

export default BtnLink;
