import React from "react";
import { ButtonSize, ButtonType, ButtonVariant } from "./button.constants";
import ThemeColors from "../../utils/theme/colors";
import Loader from "../loader";
import Flex from "../flex";

type ButtonProps = {
  children: React.ReactNode;
  css?: React.CSSProperties;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  css,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  type = ButtonType.BUTTON,
  disabled = false,
  isLoading = false,
  onClick,
}: ButtonProps) {
  const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return {
          backgroundColor: ThemeColors.Primary,
          color: ThemeColors.Light,
        };
      case ButtonVariant.SECONDARY:
        return {
          backgroundColor: ThemeColors.Secondary,
          color: ThemeColors.Light,
        };
      case ButtonVariant.ACCENT:
        return { backgroundColor: ThemeColors.Accent, color: ThemeColors.Dark };
      case ButtonVariant.DARK:
        return { backgroundColor: ThemeColors.Dark, color: ThemeColors.Light };
      case ButtonVariant.LIGHT:
        return { backgroundColor: ThemeColors.Light, color: ThemeColors.Dark };
      case ButtonVariant.WARNING:
        return {
          backgroundColor: ThemeColors.Warning,
          color: ThemeColors.Light,
        };
      case ButtonVariant.HIGHLIGHT:
        return {
          backgroundColor: ThemeColors.Highlight,
          color: ThemeColors.Dark,
        };
      default:
        return {
          backgroundColor: ThemeColors.Primary,
          color: ThemeColors.Light,
        };
    }
  };

  const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
    switch (size) {
      case ButtonSize.SMALL:
        return { padding: "0.25rem 0.5rem", fontSize: "0.875rem" };
      case ButtonSize.MEDIUM:
        return { padding: "0.5rem 1rem", fontSize: "1rem" };
      case ButtonSize.LARGE:
        return { padding: "0.75rem 1.5rem", fontSize: "1.25rem" };
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "4px",
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
        ...css,
      }}
    >
      <Flex gap="0.5rem">
        {isLoading && <Loader />}
        {children}
      </Flex>
    </button>
  );
}
