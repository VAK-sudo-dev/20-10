import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ photos, onClose }) {
  const [i, setI] = useState(0)
  const go = (d, e) => { e.stopPropagation(); setI((i + d + photos.length) % photos.length) }
  return (
    <motion.div className="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="x" onClick={onClose}>×</button>
      <AnimatePresence mode="wait">
        <motion.figure key={i} className="fig" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}>
          <img src={photos[i].src} alt="" onClick={(e) => e.stopPropagation()} />
          {photos[i].caption && <figcaption>{photos[i].caption}</figcaption>}
        </motion.figure>
      </AnimatePresence>
      {photos.length > 1 && (
        <div className="nav" onClick={(e) => e.stopPropagation()}>
          <button onClick={(e) => go(-1, e)}>←</button>
          <span>{String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
          <button onClick={(e) => go(1, e)}>→</button>
        </div>
      )}
    </motion.div>
  )
}
