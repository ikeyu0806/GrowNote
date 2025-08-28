import { InputForm } from '../components/base/InputForm'
import { TextareaForm } from '../components/base/TextareaForm'
import { Button } from '../components/base/Button'
import { useAtom } from 'jotai'
import {
  goalTitleAtom,
  goalDescriptionAtom,
  goalTargetDateAtom,
} from '../atoms/goalAtoms'

export default function CreateGoal() {
  const [title, setTitle] = useAtom(goalTitleAtom)
  const [description, setDescription] = useAtom(goalDescriptionAtom)
  const [targetDate, setTargetDate] = useAtom(goalTargetDateAtom)

  return (
    <>
      <InputForm id='goalTitle' label='目標タイトル' value={title} />
      <TextareaForm
        id='goalDescription'
        label='説明'
        rows={8}
        value={description}
      />
      <InputForm
        id='goalTitle'
        label='目標期日'
        type='date'
        value={targetDate}
      />
      <Button onClick={() => console.log('clicked')}>登録する</Button>
    </>
  )
}
