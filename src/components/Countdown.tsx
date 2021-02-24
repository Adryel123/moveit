import { useContext, useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { FaTimes, FaPlay, FaCheckCircle } from 'react-icons/fa'
import { ChallengesContext } from '../contexts/ChallengesContext'


let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const startInSeconds = .05 * 60
  const [time, setTime] = useState(startInSeconds)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHashFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    setIsActive(false)
    clearInterval(countdownTimeout)
    setTime(startInSeconds)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHashFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ?
        (
          <button
            disabled
            className={styles.countdownButton}
          >
            Ciclo encerrado
            <FaCheckCircle />
          </button>
        ) : (
          <>
            {isActive ?
              (
                <button
                  type="button"
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={resetCountdown}
                >
                  Abandonar ciclo
                  <FaTimes />
                </button>
              ) :
              (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                  <FaPlay />
                </button>
              )
            }
          </>
        )
      }
    </div>
  )
}