import { InputForm } from '../components/base/InputForm'
import { TextareaForm } from '../components/base/TextareaForm'

export default function CreateGoal() {
  return (
    <>
      <InputForm id='goalTitle' label='目標タイトル' />
      <TextareaForm id='goalDescription' label='説明' rows={8} />
    </>
  )
}
