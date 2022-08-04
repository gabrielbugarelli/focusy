import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'
import { HandPalm, Play } from "phosphor-react"

import {
  CountdownContainer, 
  FormContainer, 
  Taskinput, 
  StartCountdownButton, 
  HomeContainer, 
  Separator, 
  MinutesAmountInput, 
  StopCountdownButton 
} from "./styles"

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home = () => {
  const [ cycles, setCycles ] = useState<Cycle[]>([]);
  const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null);
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = Math.floor(currentSeconds % 60);

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');
  const isSubmitDisabled = !task;

  const handleCreateNewCycle = (data: NewCycleFormData) => {

    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles( state => [...state, newCycle] );
    setAmountSecondsPassed(0);
    setActiveCycleId(id);

    reset();
  };

  const handleInterruptCycle = () => {
    let interruptedCycle = cycles.map(cycle => {
      if(cycle.id === activeCycleId) {
        return {...cycle, interruptedDate: new Date()}
      }
      return cycle;
    });

    setCycles(interruptedCycle);
    setActiveCycleId(null);
  }

  useEffect(() => {
    let interval: number;

    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if(secondsDifference >= totalSeconds) {
          let finishedCycle = cycles.map(cycle => {
            if(cycle.id === activeCycleId) {
              return {...cycle, finishedDate: new Date()}
            }
            return cycle;
          });
      
          setCycles(finishedCycle);
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if(activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task"> Vou focar em</label>
          <Taskinput 
            type="text" 
            id="task"
            list="task-suggestions"
            disabled={!!activeCycle}
            placeholder="ex: estudar inglês..."
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" step={5} 
            min={5}
            max={60}
            id="minutesAmount"
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {
          activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} weight="bold" />
              Interromper
            </StopCountdownButton>
          ) :
          (
            <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24} weight="bold" />
              Começar
            </StartCountdownButton>
          )
        }
      </form>
    </HomeContainer>
  )
}