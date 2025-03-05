import React from "react";
import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import { useTranslation } from "react-i18next";

const LanguageSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSelect = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;

  select {
    width: 100%;
    padding: 0.5rem 1rem;
    appearance: none; /* Убираем стандартный стиль браузера */
    background: ${ThemeColors.Light};
    color: ${ThemeColors.Primary};
    border: 1px solid ${ThemeColors.Primary};
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${ThemeColors.Primary};
      color: #fff;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px ${ThemeColors.Primary};
    }
  }

  /* Стрелка для выпадающего списка */
  &::after {
    content: "▼";
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 0.8rem;
    color: ${ThemeColors.Primary};
  }
`;

function LanguageSwitcher() {
  const { i18n } = useTranslation("translation");

  const availableLanguages = ["en", "sk", "ua", "ru"];

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <LanguageSwitcherWrapper>
      <StyledSelect>
        <select onChange={changeLanguage} defaultValue={i18n.language}>
          {availableLanguages.map((lng) => (
            <option key={lng} value={lng}>
              {lng.toUpperCase()}
            </option>
          ))}
        </select>
      </StyledSelect>
    </LanguageSwitcherWrapper>
  );
}

export default LanguageSwitcher;

// const LanguageSwitcherWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const LanguageSelect = styled.select`
//   background: ${ThemeColors.Light};
//   color: ${ThemeColors.Primary};
//   border: 1px solid ${ThemeColors.Primary};
//   border-radius: 4px;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: ${ThemeColors.Primary};
//     color: #fff;
//   }
// `;

// function LanguageSwitcher() {
//   const { i18n } = useTranslation("translation");

//   const availableLanguages = ["en", "sk", "ua", "ru"];

//   const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedLanguage = event.target.value;
//     i18n.changeLanguage(selectedLanguage);
//   };

//   return (
//     <LanguageSwitcherWrapper>
//       <LanguageSelect onChange={changeLanguage} defaultValue={i18n.language}>
//         {availableLanguages.map((lng) => (
//           <option key={lng} value={lng}>
//             {lng.toUpperCase()}
//           </option>
//         ))}
//       </LanguageSelect>
//     </LanguageSwitcherWrapper>
//   );
// }
