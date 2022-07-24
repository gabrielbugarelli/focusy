import { Clock, CheckSquare } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

export const Header = () => {
  return (
    <HeaderContainer>
      <img src="/assets/logo.png" alt="Logo" />
      <nav>
        <NavLink to="/" title="Timer">
          <Clock size={24} weight="bold"/>
        </NavLink>
        <NavLink to="/history" title="History">
          <CheckSquare size={24} weight="bold"/>
        </NavLink>
      </nav>
    </HeaderContainer>
    )
}