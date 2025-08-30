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
    <>
      <div className='mb-4'>目標一覧</div>
      {goals.map((goal) => (
        <div
          class='p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 grid grid-cols-6 gap-4 mb-2'
          key={goal.id}
        >
          <div className='col-span-3'>
            {goal.title} - {goal.description}
          </div>
          <div className='col-span-3'>
            <a href={`/goals/${goal.slug}/edit`}>編集する</a>
          </div>
        </div>
      ))}
    </>
  )
}
