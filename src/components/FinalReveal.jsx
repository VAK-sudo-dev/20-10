import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import confetti from 'canvas-confetti'
import sparkle from '../assets/sparkle.json'
import { CONFIG } from '../data/config.js'

export default function FinalReveal({ name, onClose }) {
  useEffect(() => {
    const colors = ['#F9CFDA', '#E9A8BA', '#D9AD62', '#ffffff']
    let n = 0
    const iv = setInterval(() => {
      confetti({ particleCount: 40, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors })
      confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors })
      if (++n > 12) clearInterval(iv)
    }, 350)
    return () => clearInterval(iv)
  }, [])

  const text = CONFIG.finalText.replaceAll('{name}', name)
  return (
    <motion.div className="ov final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Lottie animationData={sparkle} loop className="spark" />
      <motion.div className="big" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>20/10</motion.div>
      <motion.h2 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, type: 'spring' }}>🌸 CHÚC MỪNG 🌸</motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ whiteSpace: 'pre-line' }}>{text}</motion.p>
      <button className="btn" onClick={onClose} style={{ marginTop: 20 }}>Đóng</button>
    </motion.div>
  )
}
