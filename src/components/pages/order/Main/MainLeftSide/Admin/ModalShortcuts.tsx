import { theme } from "@/theme/theme";
import { isMac } from "@/utils/window";
import styled from "styled-components";

type ModalShortcutsProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ModalShortcuts = ({ onClick }: ModalShortcutsProps) => {
  const raccourci = isMac() ? "⌘" : "CTRL";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    onClick && onClick(event);
  };

  return (
    <ModalShortcutStyled>
      <span className="title">💡 Pour aller plus vite :</span>
      <span className="shortcut-message i">{`${raccourci} + i : Toggle "mode" admin`}</span>
      <span className="shortcut-message j">{`${raccourci} + j : Toggle "panel" admin`}</span>
      <button onClick={handleClick}>
        <span className="shortcut-message j">Ne plus rappeler</span>
      </button>
    </ModalShortcutStyled>
  );
};

const ModalShortcutStyled = styled.div`
  border-radius: ${theme.borderRadius.round};
  position: absolute;
  z-index: 3;
  top: 30px;
  left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: ${theme.colors.dark};
  color: ${theme.colors.white};
  transition: ease-in 100ms;
  gap: 15px;

  .title {
    font-weight: ${theme.fonts.weights.bold};
    /* margin-bottom: 20px; */
  }

  .shortcut-message {
    font-size: ${theme.fonts.size.SM};
  }

  button {
    padding: 13px 58px;
    /* border-radius: ${theme.borderRadius.circle}; */
    border-radius: 25px;
    cursor: pointer;
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    background-color: transparent;

    :hover {
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
    }

    :active {
      opacity: 50%;
    }
  }

  .i {
    /* margin-bottom: 20px; */
  }
`;
