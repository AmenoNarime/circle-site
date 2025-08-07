'use client'

import { useState } from 'react'

export function FrequencyCalculator() {
  const [frequency, setFrequency] = useState(440)
  const wavelength = 343 / frequency // 音速343m/s
  
  return (
    <div className="p-4 border rounded-lg bg-gray-50 my-6">
      <h4 className="font-semibold mb-2">周波数計算機</h4>
      <input
        type="range"
        min="20"
        max="20000"
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
        className="w-full mb-2"
      />
      <p>周波数: {frequency} Hz</p>
      <p>波長: {wavelength.toFixed(3)} m</p>
    </div>
  )
}
