import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Typography, ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ButtonBase component={Link} to="/">
          <Typography variant="h5">Student</Typography>
        </ButtonBase>
      </Toolbar>
    </AppBar>
  );
};
