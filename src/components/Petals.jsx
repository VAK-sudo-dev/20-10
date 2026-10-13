import { useEffect, useRef } from 'react'

// Cánh hoa rơi vẽ bằng canvas (nhẹ, ~30 hạt)
export default function Petals() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current, cx = cv.getContext('2d')
    let W, H, raf
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight }
    size(); addEventListener('resize', size)
    const mk = (y) => ({ x: Math.random() * W, y, s: 6 + Math.random() * 8, v: 0.6 + Math.random() * 1.2, w: Math.random() * 6, r: Math.random() * 6, c: Math.random() > 0.5 ? '#F9CFDA' : '#E9A8BA' })
    const P = Array.from({ length: 30 }, () => mk(Math.random() * H))
    const loop = () => {
      cx.clearRect(0, 0, W, H)
      for (const p of P) {
        p.y += p.v; p.w += 0.02; p.x += Math.sin(p.w) * 0.8; p.r += 0.02
        if (p.y > H + 20) Object.assign(p, mk(-20))
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.globalAlpha = 0.7; cx.fillStyle = p.c
        cx.beginPath(); cx.ellipse(0, 0, p.s, p.s / 2, 0, 0, 7); cx.fill(); cx.restore()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])
  return <canvas ref={ref} className="petals" />
}
