import { useState } from "react"

export function ExperienceBar() {
  const [progress, setProgress] = useState(0)

  return (
    <header className="experience-bar">
      <span>0 xp</span>
      <div>
        <div style={{ width: `${progress}%` }} />

        <span className="current-experience" style={{ left: `${progress}%` }}>
          {`${progress * 6} xp`}
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}