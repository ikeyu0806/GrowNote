import { PrismaClient } from '@prisma/client'
import { subDays } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  // まずDBをクリア
  await prisma.progressLog.deleteMany()
  await prisma.milestone.deleteMany()
  await prisma.goal.deleteMany()

  // Goalを作成
  const goal = await prisma.goal.create({
    data: {
      title: '毎日30分運動する',
      slug: 'cdd9cda6-4d43-45f9-8fa1-70d8f96dac71',
      description: '健康維持のため毎日運動を習慣化する',
      Milestone: {
        create: [
          { title: '1週間続ける'},
          { title: '1ヶ月続ける' },
          { title: '3ヶ月続ける' },
        ],
      },
    },
  })

  // 直近7日分のprogress_logsを登録
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = subDays(today, i)
    await prisma.progressLog.create({
      data: {
        goalId: goal.id,
        content: `${i + 1}日目の進捗: 運動しました`,
        date: date,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
