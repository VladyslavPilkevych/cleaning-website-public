import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation('translation');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>

      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('sk')}>Slovak</button>
        <button onClick={() => changeLanguage('ua')}>Ukrainian</button>
      </div>
    </div>
  );
}

export default App;