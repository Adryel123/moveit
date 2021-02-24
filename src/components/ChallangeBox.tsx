import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallangeBox.module.css'

export function ChallangeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext)

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ?
        (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xps</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
                onClick={resetChallenge}
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challengeSucceededButton}
              >
                Completei
               </button>
            </footer>
          </div>
        ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber desafios</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando desafios.
            </p>
          </div>
        )
      }
    </div >
  )
}