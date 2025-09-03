import { atom } from 'jotai'

export enum MilestoneStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Done = 'done',
}

export const milestoneTitleAtom = atom('')
export const milestoneDueDateAtom = atom('') // ISO文字列 (例: "2025-09-01")
export const milestoneStatusAtom = atom<MilestoneStatus>(MilestoneStatus.NotStarted)
export const milestoneGoalIdAtom = atom<number | null>(null)
export const milestoneGoalSlugAtom = atom<string>('')