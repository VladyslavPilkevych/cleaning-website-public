import ThemeColors from "../../utils/theme/colors";
import Box from "../box";

type SeparatorProps = {
  height?: string;
  margin?: string;
}

export default function Separator({ height, margin }: SeparatorProps) {
  return (
    <Box
      css={{
        backgroundColor: ThemeColors.Dark,
        width: "100%",
        height: height || "4px",
        margin: margin || "2rem 0",
      }}
    />
  );
}
