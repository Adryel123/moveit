import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: "40%" }} />

        <span className={styles.currentExperience} style={{ left: "40%" }}>
          40
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}