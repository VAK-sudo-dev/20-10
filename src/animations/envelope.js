import gsap from 'gsap'

// Timeline mở phong thư
export function initEnvelope({ letter, photo }) {
  gsap.set(letter.current, { opacity: 0, y: 0 })
  gsap.set(photo.current, { opacity: 0, y: 0, rotate: 0, scale: 0.6 })
}

export function openEnvelope({ flap, letter, photo }, onDone) {
  const tl = gsap.timeline({ onComplete: onDone })
  tl.to(flap.current, { rotateX: 180, duration: 0.7, ease: 'power2.inOut' })
    .set(flap.current, { zIndex: 1 }, '-=0.35')
    .to(letter.current, { opacity: 1, duration: 0.2 }, '-=0.25')
    .to(letter.current, { y: -70, duration: 0.9, ease: 'back.out(1.4)' }, '<')
    .to(photo.current, { opacity: 1, scale: 1, y: -195, rotate: 7, duration: 0.9, ease: 'back.out(1.6)' }, '-=0.5')
  return tl
}

// Effect Nháy
export function idleFloat({ letter }) {
  return gsap.to(letter.current, { y: -78, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
}
