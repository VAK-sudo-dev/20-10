import { useState } from 'react'
import { motion } from 'framer-motion'
import girls from '../data/girls.json'

const NAMES = girls.map((g) => g.fullName)
const find = (full) => girls.find((g) => g.fullName === full)
// bỏ dấu để gõ "ngoc" vẫn ra "Ngọc"
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim()

export default function NameGate({ onDone }) {
  const [v, setV] = useState('')
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const [err, setErr] = useState('')
  const q = norm(v)
  const list = q ? NAMES.filter((n) => norm(n).includes(q)).slice(0, 6) : []

  const pick = (n) => { setV(n); setOpen(false); setErr(''); onDone(find(n)) }
  const submit = () => {
    const exact = NAMES.find((n) => norm(n) === q)
    if (exact) return pick(exact)
    if (list.length) return pick(list[idx] ?? list[0])
    setErr('Không thấy họ tên này trong danh sách, kiểm tra lại nhé 🌷')
  }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') submit()
  }

  return (
    <motion.section className="screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}>
      <span className="flower">🌸</span>
      <h1>Một điều nhỏ dành cho<br />các bạn nữ trong lớp</h1>
      <p>💌 Nhập họ và tên đầy đủ của bạn để mở quà nhé 💌</p>
      <div className="namebox">
        <input value={v} placeholder="Nhập họ và tên…" autoComplete="off"
          onChange={(e) => { setV(e.target.value); setOpen(true); setIdx(0); setErr('') }}
          onFocus={() => setOpen(true)} onKeyDown={onKey} />
        {open && list.length > 0 && (
          <ul className="sugg">
            {list.map((n, i) => (
              <li key={n} className={i === idx ? 'on' : ''} onMouseDown={() => pick(n)}>{n}</li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn" onClick={submit}>Tiếp tục</button>
      <div className="hint">{err}</div>
    </motion.section>
  )
}
