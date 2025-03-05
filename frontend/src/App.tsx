import React from 'react';
import Header from './components/header';
import AppRoutes from './utils/routes';
import Box from './components/box';

function App() {
  
  return (
    <Box>
      <Header />
      <AppRoutes />
    </Box>
  );
}

// const { t, i18n } = useTranslation('translation');

// const changeLanguage = (lng: string) => {
//   i18n.changeLanguage(lng);
// };


// <div style={{ textAlign: 'center', marginTop: '50px' }}>
//   <h1>{t('welcome')}</h1>
//   <p>{t('description')}</p>

//   <div>
//     <Button variant={ButtonVariant.SECONDARY} onClick={() => changeLanguage('en')}>English</Button>
//     <Button size={ButtonSize.LARGE} onClick={() => changeLanguage('sk')}>Slovak</Button>
//     <Button size={ButtonSize.SMALL} variant={ButtonVariant.WARNING} onClick={() => changeLanguage('ua')}>Ukrainian</Button>
//   </div>
// </div>

export default App;