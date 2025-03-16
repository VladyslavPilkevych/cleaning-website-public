import React from 'react';
import Header from './components/header';
import AppRoutes from './utils/routes';
import Box from './components/box';
import Footer from './components/footer';

function App() {
  
  return (
    <Box css={{overflowX: 'hidden'}}>
      <Header />
      <AppRoutes />
      <Footer />
    </Box>
  );
}

export default App;