import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CONFIG } from '../data/config.js'

export default function PuzzleGate({ name, onDone }) {
  const [d, setD] = useState(''), [m, setM] = useState('')
  const [ok, setOk] = useState(false), [bad, setBad] = useState(0)

  const check = () => {
    if (+d === CONFIG.answer.d && +m === CONFIG.answer.m) {
      setOk(true)
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.4 }, colors: ['#F9CFDA', '#E9A8BA', '#D9AD62'] })
      setTimeout(onDone, 2600)
    } else setBad((b) => b + 1)
  }

  return (
    <motion.section className="screen" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: 'blur(8px)' }}>
      {!ok ? (
        <>
          <h2>Chào {name} 🌷</h2>
          <p>🔐 Giải câu đố để mở khóa:<br /><b>Ngày đặc biệt dành cho phái nữ ở Việt Nam là ngày nào?</b></p>
          <motion.div className="row" key={bad} animate={bad ? { x: [0, -10, 10, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}>
            <input className="num" inputMode="numeric" maxLength={2} placeholder="ngày" value={d} onChange={(e) => setD(e.target.value)} />
            <b>/</b>
            <input className="num" inputMode="numeric" maxLength={2} placeholder="tháng" value={m} onChange={(e) => setM(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()} />
          </motion.div>
          <button className="btn" onClick={check}>Mở khóa</button>
          <div className="hint">{bad ? 'Chưa đúng rồi, thử lại nhé 🌷' : ''}</div>
        </>
      ) : (
        <>
          <motion.h2 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>✓ Chính xác!</motion.h2>
          <div className="burst">
            {'20/10'.split('').map((c, i) => (
              <motion.span key={i} initial={{ y: 0, opacity: 1 }}
                animate={{ y: 260, x: (i - 2) * 50, rotate: (i - 2) * 80, opacity: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 1.3, ease: 'easeIn' }}>{c}</motion.span>
            ))}
          </div>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>✨ Cánh cửa đã được mở ✨</motion.h2>
        </>
      )}
    </motion.section>
  )
}
