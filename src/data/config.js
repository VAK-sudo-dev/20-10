const BASE = import.meta.env.BASE_URL
export const CONFIG = {
  answer: { d: 20, m: 10 },
  photos: [
    // Thêm nhiều ảnh: bỏ file vào public/images/ rồi thêm { src: `${BASE}images/ten-anh.jpg` }
    { src: `${BASE}images/2.jpg`, caption: '20/10 đầu tiên của lớp' },
    { src: `${BASE}images/3.jpg`, caption: 'Chụp chung với cô Mai Lý' },
    { src: `${BASE}images/1.jpg`, caption: 'Liên hoan cuối năm lớp 10' },
  ],
  music: `${BASE}music/bg.mp3`, // bỏ file nhạc vào public/music/bg.mp3 (không có thì tự ẩn nút nhạc)
  defaultFrom: 'Các bạn nam lớp mình',
  finalText: 'Chúc {name} luôn vui vẻ, xinh đẹp\nvà luôn là chính mình.\nCảm ơn vì đã là một phần của lớp.',
}
