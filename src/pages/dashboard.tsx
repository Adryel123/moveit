import { CompletedChallanges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import Head from 'next/head'

import styles from '../styles/pages/Dashboard.module.css'
import { ChallangeBox } from '../components/ChallangeBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../contexts/ChallengesContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface DashboardProps {
  level: number
  currentExperience: number
  challengesCompleted: number

  avatarURL: string
  name: string
}

export default function Dashboard(props: DashboardProps) {
  const routes = useRouter()

  useEffect(() => {
    if (!props.avatarURL || !props.name) {
      routes.push('/')
    }
  }, [])

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <Head>
        <title>Dashboard | move.it</title>
      </Head>

      <div className={styles.container}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile
                avatarURL={props.avatarURL}
                name={props.name}
              />
              <CompletedChallanges />
              <Countdown />
            </div>
            <div>
              <ChallangeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  const { avatarURL, name } = ctx.query

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      avatarURL: avatarURL || null,
      name: name || null,
    }
  }
}