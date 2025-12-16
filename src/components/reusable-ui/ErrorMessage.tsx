import { theme } from "@/theme/theme";
import styled from "styled-components";

type ErrorMessageProps = {
  error: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <ErrorMessageStyled>{error}</ErrorMessageStyled>;
};
const ErrorMessageStyled = styled.span`
  color: ${theme.colors.red};
  font-family: ${theme.fonts.family.openSans};
  font-size: ${theme.fonts.size.P0};
`;
