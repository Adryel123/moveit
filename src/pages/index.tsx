import Head from 'next/head'
import { LoginForm } from '../components/LoginForm'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Login | move.it</title>
      </Head>
      <div className={styles.container}>
        <main>
          <img src="/logo-full-white.svg" alt="logo moveit" />
          <h1>Bem-vindo</h1>
          <div>
            <img src="/icons/github.svg" alt="github" />
            <p>Faça login com seu Github <br /> para começar</p>
          </div>
          <LoginForm />
        </main>
      </div>
    </>
  )
}