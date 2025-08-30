import React, { useEffect } from 'react'
import { useParams, useNavigate } from '@remix-run/react'
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

export default function EditGoal() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useAtom(goalTitleAtom)
  const [description, setDescription] = useAtom(goalDescriptionAtom)
  const [targetDate, setTargetDate] = useAtom(goalTargetDateAtom)

  // 初期値を API から取得
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/internal/goals/${slug}`,
        )
        const goal = res.data
        setTitle(goal.title || '')
        setDescription(goal.description || '')
        setTargetDate(goal.targetDate ? goal.targetDate.slice(0, 10) : '') // "2025-08-28" 形式
      } catch (err) {
        console.error('error:', err)
        alert('目標の取得に失敗しました')
      }
    }
    if (slug) fetchGoal()
  }, [slug, setTitle, setDescription, setTargetDate])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:4000/api/internal/goals/${slug}`, {
        title,
        description,
        targetDate,
      })
      alert('更新しました')
      navigate('/')
    } catch (err) {
      console.error('Error updating goal:', err)
      alert('更新に失敗しました')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？')) return
    try {
      await axios.delete(`http://localhost:4000/api/internal/goals/${slug}`)
      alert('削除しました')
      navigate('/')
    } catch (err) {
      console.error('error:', err)
      alert('削除しました')
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
        id='goalTargetDate'
        label='目標期日'
        type='date'
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <div className='flex justify-between'>
        <Button onClick={handleUpdate}>更新する</Button>
        <Button onClick={handleDelete} variant='red'>
          削除する
        </Button>
      </div>
    </>
  )
}
