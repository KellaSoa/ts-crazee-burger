import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import TextInput from "../../reusable-ui/TextInput";
import Button from "../../reusable-ui/Button";
import { theme } from "../../../theme";
import { authenticateUser } from "../../../api/user";
import Welcome from "./Welcome";
import { loginFormValidator } from "./loginFormValidator";
import { ErrorMessage } from "@/components/reusable-ui/ErrorMessage";

export default function LoginForm() {
  // state
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // comportements
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginFormValidator.safeParse(username);
    if (!result.success) {
      setHasError(true);
      setError(result.error.issues[0].message);
      return;
    }
    setIsLoading(true);

    try {
      const userReceived = await authenticateUser(username);
      setTimeout(() => {
        setUsername("");
        navigate(`order/${userReceived.username}`);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // affichage
  return (
    <LoginFormStyled action="submit" onSubmit={handleSubmit} noValidate>
      <Welcome />
      <div>
        <TextInput
          value={username}
          onChange={handleChange}
          placeholder={"Entrez votre prénom"}
          Icon={<BsPersonCircle />}
          className="input-login"
          version="normal"
          required
        />
        {hasError && <ErrorMessage error={error} />}
        <Button
          isLoading={isLoading}
          label={"Accéder à mon espace"}
          Icon={<IoChevronForward />}
        />
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  text-align: center;
  max-width: 500px;
  min-width: 400px;
  margin: 0px auto;
  padding: 40px ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.round};
  font-family: "Amatic SC", cursive;

  hr {
    border: 1.5px solid ${theme.colors.loginLine};
    margin-bottom: ${theme.gridUnit * 5}px;
  }

  h1 {
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P5};
  }

  h2 {
    margin: 20px 10px 10px;
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P4};
  }

  .input-login {
    margin: 18px 0; // must be handled in Parent
  }
`;
