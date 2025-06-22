import styled from "styled-components";
import ThemeColors from "../../../../utils/theme/colors";

export const Label = styled.label`
  font-family: "Montserrat";
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: ${ThemeColors.Primary};
`;

export const HelperText = styled.p`
  font-family: "Montserrat";
  font-weight: regular;
  margin-top: 0.5rem;
  color: ${ThemeColors.Primary};
`;

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: ThemeColors.Accent,
    cursor: "pointer",
    border: "none",
    borderRadius: 3,
    padding: "2px 5px",
    color: ThemeColors.White,
    fontFamily: "Montserrat",
    fontSize: "16px",
    width: "98%",
    boxShadow: "none",
  }),
  input: (provided: any) => ({
    ...provided,
    color: ThemeColors.White,
    fontFamily: "Montserrat",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: ThemeColors.White,
    opacity: 0.4,
    fontFamily: "Montserrat",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: ThemeColors.White,
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: ThemeColors.Light,
    borderRadius: 3,
    fontFamily: "Montserrat",
    color: ThemeColors.Secondary,
    zIndex: 100,
    width: "98%",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? ThemeColors.Primary
      : ThemeColors.Accent,
    color: ThemeColors.White,
    cursor: "pointer",
    padding: "0.5rem 1rem",
    fontSize: "16px",
    fontFamily: "Montserrat",
    fontWeight: "regular",
    transition: "all 0.2s ease-in-out",
  }),
};
