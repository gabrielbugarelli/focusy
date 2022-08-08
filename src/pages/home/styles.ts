import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${props => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  transition: filter 0.2s;
  &:not(:disabled):hover {
    filter: brightness(0.8);
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['red-500']};
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['purple-500']};
`;