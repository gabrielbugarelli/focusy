import { createContext, useState } from 'react'

import { HandPalm, Play } from "phosphor-react"
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  StartCountdownButton, 
  HomeContainer,
  StopCountdownButton 
} from "./styles"

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

type CyclesContextType = {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
};

export const CyclesContext = createContext({} as CyclesContextType);

export const Home = () => {
  const [ cycles, setCycles ] = useState<Cycle[]>([]);
  const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  // const task = watch('task');
  // const isSubmitDisabled = !task;

  // const handleCreateNewCycle = (data: NewCycleFormData) => {

  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id: id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date()
  //   }

  //   setCycles( state => [...state, newCycle] );
  //   setAmountSecondsPassed(0);
  //   setActiveCycleId(id);

  //   reset();
  // };

  const markCurrentCycleAsFinished = () => {
    let finishedCycle = cycles.map(cycle => {
      if(cycle.id === activeCycleId) {
        return {...cycle, finishedDate: new Date()}
      }
      return cycle;
    });

    setCycles(finishedCycle);
  }

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

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ >
        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {
          activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} weight="bold" />
              Interromper
            </StopCountdownButton>
          ) :
          (
            <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/ >
              <Play size={24} weight="bold" />
              Começar
            </StartCountdownButton>
          )
        }
      </form>
    </HomeContainer>
  )
}