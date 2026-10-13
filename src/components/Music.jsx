import { useEffect, useRef, useState } from 'react'
import { CONFIG } from '../data/config.js'

// Nhạc chỉ phát sau khi người dùng đã bấm (trình duyệt chặn autoplay)
export default function Music({ armed }) {
  const a = useRef()
  const [on, setOn] = useState(false)
  const [ok, setOk] = useState(true)
  useEffect(() => {
    if (!armed || !ok) return
    a.current.volume = 0.35
    a.current.play().then(() => setOn(true)).catch(() => {})
  }, [armed])
  const toggle = () => { on ? a.current.pause() : a.current.play(); setOn(!on) }
  return (
    <>
      <audio ref={a} src={CONFIG.music} loop preload="auto" onError={() => setOk(false)} />
      {armed && ok && <button className="music" onClick={toggle} aria-label="Bật/tắt nhạc">{on ? '🔊' : '🔇'}</button>}
    </>
  )
}
