import { rotate } from "@/theme/animations";
import { ColorValues, FontSizeKey, theme } from "@/theme/theme";
import { ImSpinner8 } from "react-icons/im";
import styled from "styled-components";

type LoaderProps = {
  size?: FontSizeKey;
  color?: ColorValues;
};
export const Loader = ({
  size = "SM",
  color = theme.colors.greyMedium,
}: LoaderProps) => {
  return (
    <LoaderStyled size={size ?? "SM"} color={color}>
      <ImSpinner8 className="rotate-icon" />
    </LoaderStyled>
  );
};

type LoaderStyledProps = {
  size?: FontSizeKey;
  color?: ColorValues;
};
const LoaderStyled = styled.div<LoaderStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .rotate-icon {
    font-size: ${({ size }) => theme.fonts.size[size ?? "SM"]};
    animation: ${rotate} 1s linear infinite;
    color: ${({ color }) => color || theme.colors.primary};
  }
`;
