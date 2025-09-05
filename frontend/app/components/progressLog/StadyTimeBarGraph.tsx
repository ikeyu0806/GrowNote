import React, { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  BarController,
} from 'chart.js'
import { progressLogGoalSlugAtom } from '../../atoms/progressLogAtoms'
import { useAtomValue } from 'jotai'

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend)

export default function StudyTimeBarGraph() {
  const progressLogGoalSlug = useAtomValue(progressLogGoalSlugAtom)
  
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const [progressLogs, setProgressLogs] = useState<{ date: string; studyTime: number }[]>([])

  // APIからデータを取得
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:4000/api/internal/goals/${progressLogGoalSlug}/progress_logs/bar_graph`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProgressLogs(data.logs)
      } catch (err) {
        // alert(err)
        console.error(err)
      }
    }
    fetchData()
  }, [progressLogGoalSlug])

  // Chart描画
  useEffect(() => {
    if (!progressLogs.length || !chartRef.current) return

    const labels = progressLogs.map((log) =>
      new Date(log.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
    )
    const studyHours = progressLogs.map((log) => (log.studyTime ?? 0) / 60)

    const data = {
      labels,
      datasets: [
        {
          label: '勉強時間 (時間)',
          data: studyHours,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' as const },
        title: { display: true, text: '日別勉強時間' },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: '時間' },
        },
      },
    }

    const existingChart = Chart.getChart(chartRef.current)
    if (existingChart) existingChart.destroy()

    new ChartJS(chartRef.current, {
      type: 'bar',
      data,
      options,
    })
  }, [progressLogs])

  return <canvas ref={chartRef}></canvas>
}
