import { ChangeEvent, FormEvent, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/router'

import styles from '../styles/components/LoginForm.module.css'
import axios from 'axios'

export function LoginForm() {
  const [githubID, setGithubID] = useState('')
  const router = useRouter()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newGithubId = e.target.value
    setGithubID(newGithubId)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await axios.get(`https://api.github.com/users/${githubID}`)
      router
        .push(
          `/dashboard?avatarURL=${response.data.avatar_url}&name=${response.data.name}`, 'dashboard')
    } catch {
      alert('usuário inválido')
      setGithubID('')
      return
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="githubId"
        id="githubId"
        placeholder="Digite seu username"
        value={githubID}
        onChange={handleChange}
      />
      <button
        disabled={githubID === ''}
        type="submit"
        className={styles.button}
      >
        <FiArrowRight />
      </button>
    </form>
  )
}