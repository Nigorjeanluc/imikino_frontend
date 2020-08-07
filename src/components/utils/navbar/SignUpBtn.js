import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #6B92FE 30%, #C353FF 90%)',
    border: 0,
    borderRadius: 20,
    // boxShadow: '0 1px 4px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 28,
    padding: '0 30px',
  },
});

export default function NavButton(props) {
  const classes = useStyles();
  return <Button className={classes.root}>{props.text}</Button>;
}
