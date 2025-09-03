import { InputForm } from '../base/InputForm'
import { TextareaForm } from '../base/TextareaForm'
import { useAtom } from 'jotai'
import {
  progressLogDateAtom,
  progressLogContentAtom,
  progressLogProgressRateAtom,
} from '../../atoms/progressLogAtoms'
import { progressLogGoalSlugAtom } from '../../atoms/progressLogAtoms'
import { useAtomValue } from 'jotai'
import { Button } from '../base/Button'
import axios from 'axios'

export default function EditProgressLogForm() {
  const [progressLogDate, setProgressLogDate] = useAtom(progressLogDateAtom)
  const [progressLogContent, setProgressLogContent] = useAtom(
    progressLogContentAtom,
  )
  const [progressLogProgressRate, setProgressLogProgressRate] = useAtom(
    progressLogProgressRateAtom,
  )
  const progressLogGoalSlug = useAtomValue(progressLogGoalSlugAtom)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/internal/goals/${progressLogGoalSlug}/progress_logs`,
        {
          date: progressLogDate,
          content: progressLogContent,
          progressRate: progressLogProgressRate,
        },
      )
      console.log('登録成功:', res.data)
      setProgressLogContent('')
      setProgressLogProgressRate(0)
    } catch (err) {
      alert('登録失敗しました')
      console.error('登録失敗:', err)
    }
  }

  return (
    <>
      <InputForm
        id='goalTitle'
        label='対象日'
        type='date'
        value={progressLogDate}
        onChange={(e) => setProgressLogDate(e.target.value)}
      />
      <TextareaForm
        id='goalDescription'
        label='説明'
        rows={8}
        value={progressLogContent}
        onChange={(e) => setProgressLogContent(e.target.value)}
      />
      <InputForm
        id='progressLogProgressRate'
        label='学習時間'
        value={progressLogProgressRate}
        onChange={(e) => setProgressLogProgressRate(Number(e.target.value))}
        type='number'
      />
      <Button onClick={handleSubmit}>登録する</Button>
    </>
  )
}
