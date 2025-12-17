import styled from "styled-components";
import { theme } from "../../../theme";

import Main from "./Main/Main";

import Navbar from "./Navbar/Navbar";
import { useEffect } from "react";
import { initialiseUserSession } from "./helpers/initialiseUserSession";
import { useParams } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";
import { ModalShortcuts } from "./Main/MainLeftSide/Admin/ModalShortcuts";

export default function OrderPage() {
  //state
  const { username } = useParams();
  const { setMenu, setBasket } = useOrderContext();
  useEffect(() => {
    if (username) initialiseUserSession(username, setMenu, setBasket);
  }, []);

  return (
    <OrderPageStyled>
      <ModalShortcuts />
      <div className="container">
        <Navbar />
        <Main />
      </div>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  background: ${theme.colors.primary};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;

  .container {
    background: red;
    border: 2px solid red;
    height: 95vh;
    width: 1400px;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.borderRadius.extraRound};
  }
`;
