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

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: ${ThemeColors.Accent};
  color: white;
  font-size: 16px;
  height: 150px;
  resize: none;

  &::placeholder {
    color: ${ThemeColors.White};
    opacity: 0.4;
  }
`;

type FormTextareaProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formValue: string;
  name: string;
  label: string;
  placeholder: string;
  labelColor?: ThemeColors;
  css?: React.CSSProperties;
};

export default function FormTextarea({
  handleChange,
  formValue,
  placeholder,
  name,
  label,
  css,
  labelColor = ThemeColors.White,
}: FormTextareaProps) {
  return (
    <Box>
      <Label style={{ color: labelColor }}>{label}</Label>
      <TextArea
        name={name}
        placeholder={placeholder}
        value={formValue}
        onChange={handleChange}
        style={css}
      />
    </Box>
  );
}
