import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/theme/default"
import { GlobalStyle } from "./styles/global"
import { Router } from "./routes"
import { CyclesContextProvider } from "./contexts/CyclesContext"

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Router />
        <GlobalStyle />
      </CyclesContextProvider>
    </ThemeProvider>
  )
}