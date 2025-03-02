import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from './components/button';
import { ButtonSize, ButtonVariant } from './components/button/button.constants';

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
        <Button variant={ButtonVariant.SECONDARY} onClick={() => changeLanguage('en')}>English</Button>
        <Button size={ButtonSize.LARGE} onClick={() => changeLanguage('sk')}>Slovak</Button>
        <Button size={ButtonSize.SMALL} variant={ButtonVariant.WARNING} onClick={() => changeLanguage('ua')}>Ukrainian</Button>
      </div>
    </div>
  );
}

export default App;