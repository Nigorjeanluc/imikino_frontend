import React from 'react';
import { Card } from 'react-bootstrap';
import './Title.scss';

function Title(props) {
  return (
    <>
      <Card className="title" body><h1>{props.text}</h1></Card>
    </>
  );
}

export default Title;
