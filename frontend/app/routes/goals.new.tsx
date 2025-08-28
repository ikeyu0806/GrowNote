import React from 'react'
import axios from 'axios'
import { InputForm } from '../components/base/InputForm'
import { TextareaForm } from '../components/base/TextareaForm'
import { Button } from '../components/base/Button'
import { useAtom } from 'jotai'
import {
  goalTitleAtom,
  goalDescriptionAtom,
  goalTargetDateAtom,
} from '../atoms/goalAtoms'

export default function CreateGoal() {
  const [title, setTitle] = useAtom(goalTitleAtom)
  const [description, setDescription] = useAtom(goalDescriptionAtom)
  const [targetDate, setTargetDate] = useAtom(goalTargetDateAtom)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:4000/api/internal/goals', {
        title,
        description,
      })
      alert('Goal created!')
      // 成功後はフォームをリセットするなど
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error creating goal:', error)
      alert('Failed to create goal')
    }
  }

  return (
    <>
      <InputForm
        id='goalTitle'
        label='目標タイトル'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaForm
        id='goalDescription'
        label='説明'
        rows={8}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputForm
        id='goalTitle'
        label='目標期日'
        type='date'
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <Button onClick={handleSubmit}>登録する</Button>
    </>
  )
}
