import styled from "styled-components";
import { marioCoinFloat } from "@/theme/animations";
import { theme } from "@/theme/theme";

type PriceAnimatedProps = {
  isVisible: boolean;
  onAnimationEnd?: () => void;
  className?: string;
  price: number;
};

export default function PriceAnimated({
  isVisible,
  onAnimationEnd,
  className,
  price,
}: PriceAnimatedProps) {
  if (!isVisible) return null;

  return (
    <PriceAnimatedStyled onAnimationEnd={onAnimationEnd} className={className}>
      {price.toFixed(2)}€
    </PriceAnimatedStyled>
  );
}

const PriceAnimatedStyled = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  pointer-events: none;
  z-index: 2;
  animation: ${marioCoinFloat} 1s ease-out forwards; // plus furtif et dynamique
  /* animation: ${marioCoinFloat} 1.6s cubic-bezier(0.4, 1.4, 0.6, 1) both; */

  transform-origin: center;
  background-color: ${theme.colors.success};
  border-radius: ${theme.borderRadius.round};
  padding: 2px 6px;
  color: ${theme.colors.white};
  font-size: ${theme.fonts.size.P0};
`;
