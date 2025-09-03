import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtomValue } from 'jotai'
import { milestoneGoalSlugAtom } from '../../atoms/milestoneAtoms'

type Milestone = {
  id: number
  slug: string
  title: string
  dueDate?: string
  status: 'not_started' | 'in_progress' | 'done'
}

export default function MilestoneList() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const milestoneGoalSlug = useAtomValue(milestoneGoalSlugAtom)

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/internal/goals/${milestoneGoalSlug}/milestones`,
        )
        console.log(res.data)
        setMilestones(res.data.milestones)
      } catch (err) {
        setError('マイルストーンの取得に失敗しました')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (milestoneGoalSlug) {
      fetchMilestones()
    }
  }, [milestoneGoalSlug])

  if (loading) return <p>読み込み中...</p>
  if (error) return <p className='text-red-500'>{error}</p>

  return (
    <div>
      <h2 className='text-lg font-bold mb-2'>マイルストーン一覧</h2>
      {milestones.length === 0 ? (
        <p>マイルストーンがありません</p>
      ) : (
        <ul className='space-y-4'>
          {milestones.map((milestone) => (
            <li
              key={milestone.id}
              className='border p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow'
            >
              <p>
                <strong>タイトル:</strong> {milestone.title}
              </p>
              <p>
                <strong>期日:</strong>{' '}
                {milestone.dueDate
                  ? new Date(milestone.dueDate).toLocaleDateString()
                  : '未設定'}
              </p>
              <p>
                <strong>ステータス:</strong>{' '}
                {milestone.status === 'not_started'
                  ? '未着手'
                  : milestone.status === 'in_progress'
                    ? '進行中'
                    : '完了'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
