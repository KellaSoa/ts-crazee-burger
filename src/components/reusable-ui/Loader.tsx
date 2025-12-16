import { rotate } from "@/theme/animations";
import { theme } from "@/theme/theme";
import { ImSpinner8 } from "react-icons/im";
import styled from "styled-components";

export const Loader = () => {
  return (
    <LoaderStyled>
      <ImSpinner8 className="rotate-icon" />
    </LoaderStyled>
  );
};

const LoaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .rotate-icon {
    font-size: ${theme.fonts.size.SM};
    animation: ${rotate} 1s linear infinite;
  }
`;
