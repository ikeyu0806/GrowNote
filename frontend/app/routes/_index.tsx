import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../components/base/Modal'
import EditProgressLogForm from '../components/progressLog/EditForm'
import { useAtom } from 'jotai'
import {
  showIndexProgressModalAtom,
  showCreateProgressModalAtom,
} from '../atoms/progressLogModalAtoms'
import { progressLogGoalSlugAtom } from '../atoms/progressLogAtmos'

export default function Dashboard() {
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showIndexProgressModal, setShowIndexProgressModal] = useAtom(
    showIndexProgressModalAtom,
  )
  const [showCreateProgressModal, setShowCreateProgressModal] = useAtom(
    showCreateProgressModalAtom,
  )
  const [progressGoalSlug, setProgressGoalSlug] = useAtom(
    progressLogGoalSlugAtom,
  )

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
      <div className='text-lg font-bold mb-4'>目標一覧</div>
      {goals.map((goal) => (
        <div
          className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 grid grid-cols-12 gap-4 mb-2'
          key={goal.id}
        >
          <div className='col-span-3'>{goal.title}</div>
          <div className='col-span-3'>{goal.description}</div>
          <div className='col-span-2'>
            <a href={`/goals/${goal.slug}/edit`}>編集する</a>
          </div>
          <div className='col-span-2'>
            <a href={`/goals/${goal.slug}/milestons`}>マイルストーン</a>
          </div>
          <div
            onClick={() => {
              setShowIndexProgressModal(true)
              setProgressGoalSlug(goal.slug)
            }}
            className='col-span-2'
          >
            進捗一覧
          </div>
          <div
            onClick={() => {
              setShowCreateProgressModal(true)
              setProgressGoalSlug(goal.slug)
            }}
            className='col-span-2'
          >
            進捗登録
          </div>
        </div>
      ))}
      <Modal
        isOpen={showIndexProgressModal}
        title='進捗一覧'
        onClose={() => setShowIndexProgressModal(false)}
      >
        <div>進捗一覧</div>
      </Modal>
      <Modal
        isOpen={showCreateProgressModal}
        title='進捗登録'
        onClose={() => setShowCreateProgressModal(false)}
      >
        <div>
          <EditProgressLogForm />
        </div>
      </Modal>
    </>
  )
}
