'use client'

import { useState } from 'react'

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(440)

  const playTone = () => {
    if (isPlaying) return

    setIsPlaying(true)
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 1)
    
    setTimeout(() => {
      setIsPlaying(false)
    }, 1000)
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50 my-6">
      <h4 className="font-semibold mb-2">Web Audio API サンプル</h4>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          周波数: {frequency} Hz
        </label>
        <input
          type="range"
          min="200"
          max="800"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full mb-2"
        />
      </div>
      <button
        onClick={playTone}
        disabled={isPlaying}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isPlaying ? '再生中...' : '音を再生'}
      </button>
    </div>
  )
}
