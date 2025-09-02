import { atom } from 'jotai'

export enum Mood {
  Good = 'good',
  Normal = 'normal',
  Bad = 'bad',
}

export const progressLogDateAtom = atom('') // ISO文字列で管理
export const progressLogContentAtom = atom('')
export const progressLogStudyTimeAtom = atom<number | ''>('')
export const progressLogProgressRateAtom = atom<number | ''>('')
export const progressLogMoodAtom = atom<Mood | ''>('')
export const progressLogGoalIdAtom = atom<number | null>(null)
export const progressLogGoalSlugAtom = atom<string>('')
