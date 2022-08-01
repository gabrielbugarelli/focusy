import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, Taskinput, StartCountdownButton, HomeContainer, Separator, MinutesAmountInput } from "./styles"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    console.log(data);
    reset();
  };

  const task = watch('task'); 
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task"> Vou focar em</label>
          <Taskinput 
            type="text" 
            id="task" 
            list="task-suggestions" 
            placeholder="ex: estudar inglês..."
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" step={5} 
            min={5}
            max={60}
            id="minutesAmount"
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} weight="bold" />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}