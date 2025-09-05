import React, { useEffect, useRef } from 'react'
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

export default function StudyTimeBarGraph() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  // 必要なコンポーネントを登録
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
  )

  const progressLogs = [
    { date: '2025-08-25', studyTime: 120 },
    { date: '2025-08-26', studyTime: 90 },
    { date: '2025-08-27', studyTime: 150 },
    { date: '2025-08-28', studyTime: 60 },
    { date: '2025-08-29', studyTime: 180 },
    { date: '2025-08-30', studyTime: 200 },
    { date: '2025-08-31', studyTime: 100 },
  ]

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

  useEffect(() => {
    if (chartRef.current) {
      // すでにチャートが存在していれば破棄
      const existingChart = Chart.getChart(chartRef.current)
      if (existingChart) {
        existingChart.destroy()
      }

      new ChartJS(chartRef.current, {
        type: 'bar',
        data,
        options,
      })
    }
  }, [data])

  return <canvas ref={chartRef}></canvas>
}
