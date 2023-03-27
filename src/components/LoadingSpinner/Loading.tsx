import Box from '@mui/material/Box';
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <Box sx={styles}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};

const styles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Loading;
