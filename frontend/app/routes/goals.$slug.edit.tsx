import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from '@remix-run/react'

export default function EditGoal() {
  const { slug } = useParams()
  const [goal, setGoal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/internal/goals/${slug}`)
      .then((res) => {
        setGoal(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setDueDate(res.data.dueDate?.slice(0, 10) || '') // YYYY-MM-DD形式に整える
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('データ取得に失敗しました')
        setLoading(false)
      })
  }, [slug])

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/internal/goals/${slug}`, {
        title,
        description,
        dueDate,
      })
      alert('更新しました')
    } catch (err) {
      console.error(err)
      alert('更新に失敗しました')
    }
  }

  if (loading) return <p>読み込み中...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h1>目標編集</h1>
      <div>
        <label>
          タイトル:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          説明:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          期日:
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>更新する</button>
    </div>
  )
}
