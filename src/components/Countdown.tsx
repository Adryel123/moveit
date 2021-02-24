import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [timeStart, setTimeStart] = useState(Date.now())
  const startInMinutes = 25 * 60

  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


  function startCountdown() {
    setTimeStart(Date.now())
    setActive(true)
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        // variação de tempo (agora - início)
        const dTime = Math.floor((Date.now() - timeStart) / 1000)
        // Tempo total do cronômetro menos variação
        setTime(startInMinutes - dTime)
      }, 1000)
    }
  }, [active, time])

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  )
}