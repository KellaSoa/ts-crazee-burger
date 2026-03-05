import styled from "styled-components";
import Profile from "./Profile";
import ToggleButton from "../../../reusable-ui/ToggleButton";

import ToastAdmin from "./ToastAdmin";
import { useOrderContext } from "@/context/OrderContext";
import { displayToastNotification } from "@/utils/toast";

export default function NavbarRightSide() {
  const { isModeAdmin, setIsModeAdmin } = useOrderContext();

  const handleOnToggle = () => {
    if (!isModeAdmin) return;
    displayToastNotification("Mode admin activé", "info");
    setIsModeAdmin(!isModeAdmin);
  };

  return (
    <NavbarRightSideStyled>
      <ToggleButton
        isChecked={isModeAdmin}
        labelIfUnchecked="ACTIVER LE MODE ADMIN"
        labelIfChecked="DÉSACTIVER LE MODE ADMIN"
        onToggle={handleOnToggle}
      />
      <Profile />
      <ToastAdmin />
    </NavbarRightSideStyled>
  );
}

const NavbarRightSideStyled = styled.div`
  display: flex;
  align-items: center;
  padding-right: 50px;
`;
