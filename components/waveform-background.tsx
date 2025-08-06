"use client"

import { useEffect, useRef } from "react"

export default function WaveformBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set up gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(147, 112, 219, 0.15)") // 藤色
      gradient.addColorStop(0.5, "rgba(138, 43, 226, 0.2)") // 紫色
      gradient.addColorStop(1, "rgba(147, 112, 219, 0.15)") // 藤色

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.lineCap = "round"

      // Draw simple waveforms (back to original)
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath()

        const amplitude = 30 + layer * 20
        const frequency = 0.01 + layer * 0.005
        const speed = 0.02 + layer * 0.01
        const yOffset = canvas.height * (0.3 + layer * 0.2)

        for (let x = 0; x < canvas.width; x += 2) {
          const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude * Math.sin(time * 0.001 + layer)

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      // Draw simple audio bars
      for (let i = 0; i < 50; i++) {
        const x = (canvas.width / 50) * i
        const height = Math.abs(Math.sin(time * 0.01 + i * 0.1)) * 100 + 10
        const opacity = 0.1 + Math.abs(Math.sin(time * 0.005 + i * 0.05)) * 0.1

        ctx.fillStyle = `rgba(147, 112, 219, ${opacity})` // 藤色で統一
        ctx.fillRect(x, canvas.height - height, 3, height)
      }

      time += 1
      animationId = requestAnimationFrame(drawWaveform)
    }

    resize()
    drawWaveform()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6b21a8 50%, #7c2d12 100%)" }}
    />
  )
}
