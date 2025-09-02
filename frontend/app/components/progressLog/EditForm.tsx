import { InputForm } from '../base/InputForm'
import { TextareaForm } from '../base/TextareaForm'
import { useAtom } from 'jotai'
import {
  progressLogContentAtom,
  progressLogProgressRateAtom,
} from '../../atoms/progressLogAtmos'
import { progressLogGoalSlugAtom } from '../../atoms/progressLogAtmos'
import { useAtomValue } from 'jotai'
import { Button } from '../base/Button'

export default function EditProgressLogForm() {
  const [progressLogContent, setProgressLogContent] = useAtom(
    progressLogContentAtom,
  )
  const [progressLogProgressRate, setProgressLogProgressRate] = useAtom(
    progressLogProgressRateAtom,
  )
  const progressLogGoalSlug = useAtomValue(progressLogGoalSlugAtom)

  return (
    <>
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
      <Button
        onClick={console.log('clicked')}
      >登録する</Button>
    </>
  )
}
