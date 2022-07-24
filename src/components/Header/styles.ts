import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 30px;
    height: 30px;
  }

  nav {
    display: flex;
    gap: 0.2rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${props => props.theme["gray-100"]};

      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;

      &:hover {
        border-bottom: 2px solid ${props => props.theme["purple-500"]};
      }

      &.active {
        color: ${props => props.theme["purple-500"]};
      }
    }
  }
`;