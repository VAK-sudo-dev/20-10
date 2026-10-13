import { motion } from 'framer-motion'

export default function Letter({ wish, from, onClose }) {
  const lines = wish.split('\n')
  return (
    <motion.div className="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="x" onClick={onClose}>×</button>
      <motion.div className="paperfull" onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: 60, rotate: -3 }} animate={{ scale: 1, y: 0, rotate: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
        {lines.map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5 + i * 0.55, duration: 0.7 }}>{l || '\u00A0'}</motion.p>
        ))}
        <motion.p className="sign" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + lines.length * 0.55 }}>
          — {from}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}