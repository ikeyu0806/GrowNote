import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../components/base/Modal'
import ProgressLogList from '../components/progressLog/IndexList'
import EditProgressLogForm from '../components/progressLog/EditForm'
import { useAtom } from 'jotai'
import {
  showIndexMilestoneModalAtom,
  showCreateMilestoneModalAtom,
} from '../atoms/milestoneModalAtoms'
import {
  showIndexProgressModalAtom,
  showCreateProgressModalAtom,
} from '../atoms/progressLogModalAtoms'
import { progressLogGoalSlugAtom } from '../atoms/progressLogAtoms'

export default function Dashboard() {
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showIndexMilestoneModal, setShowIndexMilestoneModal] = useAtom(
    showIndexMilestoneModalAtom,
  )
  const [showCreateMilestoneModal, setShowCreateMilestoneModal] = useAtom(
    showCreateMilestoneModalAtom,
  )
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
          key={goal.id}
          className='p-6 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4 hover:shadow-lg transition-shadow'
        >
          {/* タイトル */}
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
            {goal.title}
          </h2>

          {/* 説明 */}
          <p className='text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line'>
            {goal.description}
          </p>

          {/* アクションボタン */}
          <div className='flex flex-wrap gap-3'>
            <a
              href={`/goals/${goal.slug}/edit`}
              className='px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
            >
              編集する
            </a>

            <a
              href={`/goals/${goal.slug}/milestones`}
              className='px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800'
            >
              マイルストーン一覧
            </a>

            <a
              href={`/goals/${goal.slug}/milestones/create`}
              className='px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-xl hover:bg-pink-100 dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-800'
            >
              マイルストーン登録
            </a>

            <button
              onClick={() => {
                setShowIndexProgressModal(true)
                setProgressGoalSlug(goal.slug)
              }}
              className='px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800'
            >
              進捗一覧
            </button>

            <button
              onClick={() => {
                setShowCreateProgressModal(true)
                setProgressGoalSlug(goal.slug)
              }}
              className='px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800'
            >
              進捗登録
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={showIndexMilestoneModal}
        title='マイルストーン一覧'
        onClose={() => setShowIndexMilestoneModal(false)}
      >
        <div>マイルストーン一覧</div>
      </Modal>
      <Modal
        isOpen={showCreateMilestoneModal}
        title='マイルストーン登録'
        onClose={() => setShowCreateMilestoneModal(false)}
      >
        <div>
          マイルストーン登録
        </div>
      </Modal>
      <Modal
        isOpen={showIndexProgressModal}
        title='進捗一覧'
        onClose={() => setShowIndexProgressModal(false)}
      >
        <ProgressLogList />
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
