import { InputForm } from '../base/InputForm'
import { useAtom } from 'jotai'
import {
  milestoneTitleAtom,
  milestoneDueDateAtom,
  milestoneStatusAtom,
} from '../../atoms/milestoneAtoms'
import { milestoneGoalSlugAtom } from '../../atoms/milestoneAtoms'
import { useAtomValue } from 'jotai'
import { Button } from '../base/Button'
import axios from 'axios'

export default function EditMilestoneForm() {
  const [milestoneTitle, setMilestoneTitle] = useAtom(milestoneTitleAtom)
  const [milestoneDueDate, setMilestoneDueDate] = useAtom(milestoneDueDateAtom)
  const [milestoneStatus, setMilestoneStatus] = useAtom(milestoneStatusAtom)
  const milestoneGoalSlug = useAtomValue(milestoneGoalSlugAtom)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/internal/goals/${milestoneGoalSlug}/milestones`,
        {
          title: milestoneTitle,
          dueDate: milestoneDueDate
            ? new Date(milestoneDueDate).toISOString()
            : null,
          status: milestoneStatus,
        },
      )
      console.log('登録成功:', res.data)
      setMilestoneTitle('')
      setMilestoneDueDate('')
      //   setMilestoneStatus('')
    } catch (err) {
      alert('登録失敗しました')
      console.error('登録失敗:', err)
    }
  }

  return (
    <>
      <InputForm
        id='milestoneTitle'
        label='マイルストーンタイトル'
        type='text'
        value={milestoneTitle}
        onChange={(e) => setMilestoneTitle(e.target.value)}
      />
      <InputForm
        id='milestoneDueDate'
        label='期限日'
        type='date'
        value={milestoneDueDate}
        onChange={(e) => setMilestoneDueDate(e.target.value)}
      />
      <div className='mb-4'>
        <label htmlFor='milestoneStatus' className='block text-sm font-medium'>
          ステータス
        </label>
        <select
          id='milestoneStatus'
          value={milestoneStatus}
          onChange={(e) => setMilestoneStatus(e.target.value as any)}
          className='mt-1 block w-full border rounded-md p-2'
        >
          <option value='not_started'>未着手</option>
          <option value='in_progress'>進行中</option>
          <option value='done'>完了</option>
        </select>
      </div>
      <Button onClick={handleSubmit}>登録する</Button>
    </>
  )
}
