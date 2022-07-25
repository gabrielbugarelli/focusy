import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, Taskinput, StartCountdownButton, HomeContainer, Separator, MinutesAmountInput } from "./styles"

export const Home = () => {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Vou focar em</label>
          <Taskinput type="text" id="task" placeholder="ex: estudar inglês..." />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount"/>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} weight="bold" />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}