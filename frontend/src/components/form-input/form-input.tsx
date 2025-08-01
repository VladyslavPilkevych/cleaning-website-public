import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import Box from "../box";
import { CSSProperties, ChangeEvent } from "react";

const Label = styled.label`
  font-family: "Montserrat";
  font-weight: regular;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background: ${ThemeColors.Accent};
  color: white;
  font-size: 16px;

  &::placeholder {
    color: ${ThemeColors.White};
    opacity: 0.4;
  }
`;

const HelperText = styled.p`
  font-family: "Montserrat";
  width: 90%;
  font-weight: regular;
  display: block;
  margin-top: 1rem;
  position: absolute;
  color: ${ThemeColors.Primary};
`;

export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "time"
  | "datetime"
  | "datetime-local"
  | "month"
  | "week"
  | "year";

type FormInputProps = {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formValue: string;
  name: string;
  label: string;
  placeholder: string;
  labelColor?: ThemeColors;
  helperText?: string;
  css?: CSSProperties;
  type?: InputType;
};

export default function FormInput({
  handleChange,
  formValue,
  placeholder,
  name,
  label,
  css,
  labelColor = ThemeColors.White,
  helperText,
  type = "text",
}: FormInputProps) {
  return (
    <Box>
      <Label style={{ color: labelColor }}>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formValue}
        onChange={handleChange}
        style={css}
      />
      <HelperText>{helperText}</HelperText>
    </Box>
  );
}
