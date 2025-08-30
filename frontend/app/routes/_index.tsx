import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/internal/goals')
      .then((res) => {
        setGoals(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('データ取得に失敗しました')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div>目標一覧</div>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.title} - {goal.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
