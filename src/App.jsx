import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import wishes from './data/wishes.json'
import { CONFIG } from './data/config.js'
import NameGate from './components/NameGate.jsx'
import PuzzleGate from './components/PuzzleGate.jsx'
import Envelope from './components/Envelope.jsx'
import FinalReveal from './components/FinalReveal.jsx'
import Petals from './components/Petals.jsx'
import Music from './components/Music.jsx'

export default function App() {
  const [stage, setStage] = useState('name')
  const [girl, setGirl] = useState(null)
  const [final, setFinal] = useState(false)
  const name = girl?.name ?? ''                       // {name} = tên gọi ngắn

  // Tra theo họ tên đầy đủ; không có thì dùng _default
  const entry = wishes[girl?.fullName] ?? wishes._default
  const isObj = typeof entry === 'object'
  const wish = (isObj ? entry.text : entry).replaceAll('{name}', name)
  const from = (isObj && entry.from) || CONFIG.defaultFrom   // tên người chúc

  return (
    <>
      <Petals />
      <Music armed={stage !== 'name'} />
      <AnimatePresence mode="wait">
        {stage === 'name' && <NameGate key="n" onDone={(g) => { setGirl(g); setStage('puzzle') }} />}
        {stage === 'puzzle' && <PuzzleGate key="p" name={name} onDone={() => setStage('main')} />}
        {stage === 'main' && <Envelope key="m" name={name} wish={wish} from={from} onSurprise={() => setFinal(true)} />}
      </AnimatePresence>
      <AnimatePresence>{final && <FinalReveal name={name} onClose={() => setFinal(false)} />}</AnimatePresence>
    </>
  )
}