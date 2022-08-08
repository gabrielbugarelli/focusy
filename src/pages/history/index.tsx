import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles"

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Estudar NodeJS</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td> 
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Estudar Clean Architecture</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td> 
                <Status statusColor="yellow">Em progresso</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}