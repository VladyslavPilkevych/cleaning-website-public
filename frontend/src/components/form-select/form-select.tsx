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

const Select = styled.select`
  width: 75%;
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

  option {
    background: ${ThemeColors.Accent};
    color: white;
  }
`;

type FormSelectProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  formValue: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  labelColor?: ThemeColors;
  css?: React.CSSProperties;
};

export default function FormSelect({
  handleChange,
  formValue,
  name,
  label,
  options,
  css,
  labelColor = ThemeColors.Primary,
}: FormSelectProps) {
  return (
    <Box>
      <Label style={{ color: labelColor }}>{label}</Label>
      <Select
        name={name}
        value={formValue}
        onChange={handleChange}
        style={css}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
}
