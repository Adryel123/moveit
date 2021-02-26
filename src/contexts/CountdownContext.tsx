import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const startInSeconds = 25 * 60
  const [time, setTime] = useState(startInSeconds)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHashFinished] = useState(false)

  // for precision reasons:
  const [inicialCanonicalTime, setInicialCanonicalTime] = useState(Date.now())

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setInicialCanonicalTime(Date.now())
    setIsActive(true)
  }

  function resetCountdown() {
    setIsActive(false)
    clearInterval(countdownTimeout)
    setHashFinished(false)
    setTime(startInSeconds)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        // Delta time
        const dTime = Math.floor((Date.now() - inicialCanonicalTime) / 1000)
        const newTime = startInSeconds - dTime
        setTime(newTime < 0 ? 0 : newTime)
      }, 1000)
    } else if (isActive && time === 0) {
      setHashFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}