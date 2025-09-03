import { useEffect, useState } from 'react'
import axios from 'axios'
import { progressLogGoalSlugAtom } from '../../atoms/progressLogAtmos'
import { useAtomValue } from 'jotai'

type ProgressLog = {
  id: string
  date: string
  content: string
  progressRate: number
  goalId: string
}

export default function ProgressLogList() {
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const progressLogGoalSlug = useAtomValue(progressLogGoalSlugAtom)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/internal/goals/${progressLogGoalSlug}/progress_logs`,
        )
        console.log(res.data)
        setProgressLogs(res.data.progressLogs)
      } catch (err) {
        setError('取得に失敗しました')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [progressLogGoalSlug])

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2 className='text-lg font-bold mb-2'>進捗ログ一覧</h2>
      {progressLogs.length === 0 ? (
        <p>進捗ログがありません</p>
      ) : (
        <ul className='space-y-4'>
          {progressLogs &&
            progressLogs.map((log) => (
              <li
                key={log.id}
                className='border p-3 rounded shadow-sm bg-white'
              >
                <p>
                  <strong>対象日:</strong> {log.date}
                </p>
                <p>
                  <strong>学習時間:</strong> {log.progressRate}
                </p>
                <p>
                  <strong>内容:</strong> {log.content}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
