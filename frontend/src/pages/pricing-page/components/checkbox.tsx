import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import { JustifyContent } from "../../../components/flex/flex.constants";
import Box from "../../../components/box";

type CheckboxProps = {
  icon?: React.ReactNode;
  text?: string;
  price?: string;
  css?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function ControlledCheckbox({
  icon,
  text,
  price,
  css,
  children,
}: CheckboxProps) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Flex gap="2rem" justifyContent={JustifyContent.CENTER} css={css}>
        {icon}
        <Flex>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              color: ThemeColors.Primary,
              // padding: "0.5rem",
              "&.Mui-checked": {
                color: ThemeColors.Primary,
              },
              "& .MuiSvgIcon-root": { fontSize: 32 },
            }}
          />
          {text && <Title size={TitleSize.H4}>{text}</Title>}
        </Flex>
        {price && (
          <Flex
            backgroundColor={ThemeColors.Highlight}
            gap="0.5rem"
            css={{ padding: "0.4rem", borderRadius: "4px" }}
          >
            <Title
              size={TitleSize.H5}
              color={ThemeColors.Dark}
              fontWeight={FontWeight.Bold}
            >
              {price}
            </Title>
            <Title
              size={TitleSize.H6}
              css={{ opacity: 0.5, textDecoration: "line-through" }}
            >
              {price}
            </Title>
          </Flex>
        )}
      </Flex>
      {checked && children}
    </Box>
  );
}
