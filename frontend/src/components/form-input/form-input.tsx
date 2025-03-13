import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import Box from "../box";

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

type FormInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formValue: string;
  name: string;
  label: string;
  placeholder: string;
  labelColor?: ThemeColors;
  css?: React.CSSProperties;
};

export default function FormInput({
  handleChange,
  formValue,
  placeholder,
  name,
  label,
  css,
  labelColor = ThemeColors.White,
}: FormInputProps) {
  return (
    <Box>
      <Label style={{ color: labelColor }}>{label}</Label>
      <Input
        type="text"
        name={name}
        placeholder={placeholder}
        value={formValue}
        onChange={handleChange}
        style={css}
      />
    </Box>
  );
}
