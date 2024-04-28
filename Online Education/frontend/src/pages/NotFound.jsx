import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

const NotFound = () => {
  const bounce = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 200, friction: 10 },
  });

  return (
    <>
      <Navbar />
      <Box sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <animated.div style={bounce}>
          <Typography variant="h3" color="textSecondary" align="center" fontWeight="bold">
            Oops! Page not found.
          </Typography>
        </animated.div>
      </Box>
      <Footer />
    </>
  );
};

export default NotFound;
