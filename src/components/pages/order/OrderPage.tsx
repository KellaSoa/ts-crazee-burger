import styled from "styled-components";
import { theme } from "../../../theme";

import Main from "./Main/Main";

import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";
import { initialiseUserSession } from "./helpers/initialiseUserSession";
import { useParams } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";
import { ModalShortcuts } from "./Main/MainLeftSide/Admin/ModalShortcuts";
import { getLocalStorage, setLocalStorage } from "@/utils/window";
import { useCreateKeyboardShortcut } from "@/hooks/useCreateKeyboardShortcut";

export default function OrderPage() {
  //state
  const { username } = useParams();
  const { setMenu, setBasket, isModeAdmin, setIsModeAdmin, hidePanel } =
    useOrderContext();
  const [isModalShortcutsVisible, setIsModalShortcutsVisible] = useState(
    getLocalStorage("isModalShortcutsVisible") as boolean | null
  );
  if (isModalShortcutsVisible === null) {
    setIsModalShortcutsVisible(true);
    setLocalStorage("isModalShortcutsVisible", true);
  }
  const deletePermanately = () => {
    setLocalStorage("isModalShortcutsVisible", false);
    setIsModalShortcutsVisible(false);
  };
  useCreateKeyboardShortcut("i", () => setIsModeAdmin(!isModeAdmin));
  useCreateKeyboardShortcut("j", () => hidePanel());

  useEffect(() => {
    if (username) initialiseUserSession(username, setMenu, setBasket);
  }, []);

  return (
    <OrderPageStyled>
      {isModalShortcutsVisible && isModeAdmin && (
        <ModalShortcuts onClick={deletePermanately} />
      )}
      <div className="container">
        <Navbar />
        <Main />
      </div>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  background: ${theme.colors.greyBlue};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    height: 95vh;
    width: 1400px;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.borderRadius.extraRound};
  }
`;
