import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
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
        create: [
          {
            title: '動的計画法を理解する',
            dueDate: new Date('2025-09-30'),
            status: 'in_progress',
          },
          {
            title: 'グラフ理論の基礎をマスターする',
            dueDate: new Date('2025-10-31'),
            status: 'not_started',
          },
        ],
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
        create: [
          {
            title: '毎日1記事読む習慣をつける',
            dueDate: new Date('2025-09-15'),
            status: 'in_progress',
          },
          {
            title: '技術英語の専門用語を100語覚える',
            dueDate: new Date('2025-11-30'),
            status: 'not_started',
          },
        ],
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
