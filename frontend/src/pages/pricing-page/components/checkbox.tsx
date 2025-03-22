import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import ThemeColors from "../../../utils/theme/colors";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import { FontWeight } from "../../../utils/theme/fonts";
import {
  FlexDirection,
  JustifyContent,
} from "../../../components/flex/flex.constants";
import Box from "../../../components/box";
import { useMediaQuery } from "react-responsive";
import { ChangeFormDataType } from "../pricing-page";

type CheckboxProps = {
  icon?: React.ReactNode;
  text?: string;
  price?: string;
  css?: React.CSSProperties;
  children?: React.ReactNode;
  formData?: boolean | null;
  handleChangeFormData?: ChangeFormDataType;
  name?: string;
};

export default function ControlledCheckbox({
  icon,
  text,
  price,
  css,
  children,
  formData,
  name,
  handleChangeFormData,
}: CheckboxProps) {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [checked, setChecked] = React.useState(formData || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (name && handleChangeFormData) {
      handleChangeFormData(name, event.target.checked);
    }
  };

  return (
    <Box>
      <Flex
        gap={isMobile ? "1rem" : "2rem"}
        justifyContent={JustifyContent.CENTER}
        css={css}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
      >
        {!isTablet && icon}
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
          {text && (
            <Title size={isMobile ? TitleSize.H5 : TitleSize.H4}>{text}</Title>
          )}
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
