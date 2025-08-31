import { InputForm } from '../base/InputForm'
import { useAtom } from 'jotai'
import { progressLogProgressRateAtom } from '../../atoms/progressLogAtmos'

export default function EditProgressLogForm() {
  const [progressLogProgressRate, setProgressLogProgressRate] = useAtom(
    progressLogProgressRateAtom,
  )

  return (
    <>
      <InputForm
        id='progressLogProgressRate'
        label='学習時間'
        value={progressLogProgressRateAtom}
        onChange={(e) => setProgressLogProgressRate(e.target.value)}
        type='number'
      />
    </>
  )
}
