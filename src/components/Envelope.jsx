import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { CONFIG } from '../data/config.js'
import { initEnvelope, openEnvelope, idleFloat } from '../animations/envelope.js'
import Letter from './Letter.jsx'
import Lightbox from './Lightbox.jsx'

export default function Envelope({ name, wish, from, onSurprise }) {   // ← SỬA: thêm `from`
  const [opened, setOpened] = useState(false)
  const [lt, setLt] = useState(false)
  const [lb, setLb] = useState(false)
  const [read, setRead] = useState(false)
  const refs = { flap: useRef(), letter: useRef(), photo: useRef() }
  const float = useRef()

  useLayoutEffect(() => { initEnvelope(refs); return () => gsap.killTweensOf([refs.letter.current, refs.photo.current, refs.flap.current]) }, [])

  const open = () => {
    if (opened) return
    setOpened(true)
    openEnvelope(refs, () => { float.current = idleFloat(refs) })
  }
  const readLetter = () => { float.current?.pause(); setLt(true); setRead(true) }
  const closeLetter = () => { setLt(false); float.current?.resume() }

  return (
    <motion.section className="screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2>Một chút yêu thương<br />dành cho {name} 🌸</h2>

      <div className={'stage' + (opened ? ' opened' : '')}>
        <div className="env-back" />
        <div className="paper letter" ref={refs.letter} onClick={readLetter}>
          <div className="lh">💌 Gửi {name}</div>
          <div className="preview">{wish}</div>
          <div className="more">Bấm để đọc thư ✨</div>
        </div>
        <div className="paper photo" ref={refs.photo} onClick={() => setLb(true)}>
          <img src={CONFIG.photos[0].src} alt="Ảnh lớp" />
          <small>Ảnh lớp mình 📸</small>
        </div>
        <div className="env-front" />
        <div className="flap" ref={refs.flap} />
        {!opened && <button className="seal" onClick={open} aria-label="Mở thư">💌</button>}
      </div>

      <div className="below">
        {!opened && <p className="hint">Bấm vào thư nhé 💌</p>}
        <AnimatePresence>
          {read && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p><b>Waitttt vẫn còn một điều nữa.</b></p>
              <button className="btn" onClick={onSurprise}>MỞ ĐIỀU BẤT NGỜ ✨</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lt && <Letter wish={wish} from={from} onClose={closeLetter} />}   {/* ← SỬA: truyền from */}
        {lb && <Lightbox photos={CONFIG.photos} onClose={() => setLb(false)} />}
      </AnimatePresence>
    </motion.section>
  )
}