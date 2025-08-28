import { InputForm } from '../components/base/InputForm'
import { TextareaForm } from '../components/base/TextareaForm'
import { Button } from '../components/base/Button'

export default function CreateGoal() {
  return (
    <>
      <InputForm id='goalTitle' label='目標タイトル' />
      <TextareaForm id='goalDescription' label='説明' rows={8} />
      <InputForm id='goalTitle' label='目標期日' type='date' />
      <Button onClick={() => console.log('clicked')}>登録する</Button>
    </>
  )
}
