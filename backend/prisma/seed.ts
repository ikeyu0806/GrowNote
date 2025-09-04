import { PrismaClient, MilestoneStatus } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // ユーティリティ: 連続する日付の配列を生成
  const generateMilestones = (titlePrefix: string, startDate: string) => {
    const base = new Date(startDate)
    return Array.from({ length: 7 }, (_, i) => ({
      title: `${titlePrefix} Day ${i + 1}`,
      dueDate: new Date(base.getTime() + i * 24 * 60 * 60 * 1000),
      status:
        i === 0 ? MilestoneStatus.in_progress : MilestoneStatus.not_started,
    }))
  }

  // Goal 1
  const goal1 = await prisma.goal.create({
    data: {
      slug: '11111111-1111-1111-1111-111111111111',
      title: 'アルゴリズムを習得する',
      description: '毎日少しずつアルゴリズムの問題を解いて、理解を深める',
      targetDate: new Date('2025-12-31'),
      status: 'ongoing',
      ProgressLog: {
        create: [
          {
            date: new Date('2025-08-30T12:00:00Z'),
            content: 'DP の基礎を2時間勉強した',
            studyTime: 120,
            progressRate: 20,
            mood: 'good',
          },
          {
            date: new Date('2025-08-31T12:00:00Z'),
            content: 'グラフアルゴリズムを1時間解いた',
            studyTime: 60,
            progressRate: 30,
            mood: 'normal',
          },
        ],
      },
      Milestone: {
        create: generateMilestones('アルゴリズム学習', '2025-09-01'),
      },
    },
  })

  // Goal 2
  const goal2 = await prisma.goal.create({
    data: {
      slug: '22222222-2222-2222-2222-222222222222',
      title: '英語の読解力を伸ばす',
      description: '技術記事を英語で読めるようになる',
      targetDate: new Date('2026-03-31'),
      status: 'ongoing',
      ProgressLog: {
        create: [
          {
            date: new Date('2025-08-29T09:00:00Z'),
            content: '英語記事を1本読んだ',
            studyTime: 45,
            progressRate: 10,
            mood: 'good',
          },
        ],
      },
      Milestone: {
        create: generateMilestones('英語学習', '2025-09-01'),
      },
    },
  })

  console.log({ goal1, goal2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
