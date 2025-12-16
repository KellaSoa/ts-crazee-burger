import styled from "styled-components";
import Logo from "@/components/reusable-ui/Logo";
import LoginForm from "./LoginForm";
import Copyrights from "@/components/reusable-ui/Copyrights";

export default function LoginPage() {
  return (
    <LoginPageStyled>
      <div className="container">
        <Logo className={"logo-login-page"} />
        <LoginForm />
      </div>
      <Copyrights />
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .container {
    position: relative;
    right: 350px;
  }

  ::before {
    content: "";
    background: url("/images/burger-right.jpg") rgba(0, 0, 0, 0.3);
    background-size: cover;
    background-position: center;
    background-blend-mode: darken;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .logo-login-page {
    transform: scale(2.5);
  }
`;
