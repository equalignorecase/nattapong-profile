# Nattapong Nakaom — Developer Portfolio

เว็บพอร์ตโฟลิโอส่วนตัว พัฒนาด้วย **Astro 5**, **TypeScript** และ **Tailwind CSS** เน้นความเร็วสูงแบบ Static Site Generation (SSG) พร้อมดีไซน์โทนสี Deep Ink Navy ที่รองรับทั้ง Dark และ Light Mode

---

## ⚡ จุดเด่นของโปรเจกต์ (Key Features)

- **⚡ Fast & Lightweight (SSG):** ทำงานแบบ Static 100% โหลดเร็ว ไม่มี JavaScript ที่ไม่จำเป็น
- **🐙 GitHub API Integration:** ดึงยอด Stars และ Forks แบบสดใหม่ตอน Build เว็บ ไม่ติด Rate Limit
- **📜 Certificate Modal & Tabs:** แกลเลอรีเกียรติบัตรพร้อมปุ่มสลับแท็บ และป็อปอัป Lightbox เปิดดูรูปใหญ่ รองรับการกดลูกศรคีย์บอร์ดและปัดจอมือถือ
- **🎨 Deep Ink Navy Theme:** โหมดมืดสีน้ำเงินเข้มลึก ไม่แสบตา และโหมดสว่างโทนสีอ่อนละมุน
- **📱 100% Responsive Design:** ปรับแต่งเลย์เอาต์เฉพาะสำหรับจอมือถือเล็ก (< 380px), แท็บเล็ต iPad (< 900px) และจอคอมพิวเตอร์
- **✨ Dynamic Shrink Navbar:** แถบเมนูด้านบนหดขนาดอัตโนมัติเมื่อเลื่อนหน้าจอลง พร้อมปุ่มแคปซูลไฮไลท์ตำแหน่งปัจจุบัน

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Astro 5](https://astro.build)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Variables
- **Icons:** Custom SVG Components (`Icon.astro`, `TechIcon.astro`)
- **Content:** Astro Content Collections (Markdown)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
my-profile/
├── public/
│   └── img/certificates/    # รูปภาพเกียรติบัตร (1.png - 8.jpg)
├── src/
│   ├── components/          # Reusable Astro Components
│   │   ├── CertificateModal.astro  # Lightbox Modal เกียรติบัตร
│   │   ├── Icon.astro              # ไอคอนทั่วไป (ลูกศร, กากบาท, ดาว, ฯลฯ)
│   │   ├── TechIcon.astro          # โลโก้เทคโนโลยี (Astro, React, Python, ฯลฯ)
│   │   └── ThemeToggle.astro       # ปุ่มสลับโหมด Dark/Light
│   ├── content/
│   │   └── projects/        # ข้อมูลผลงานแต่ละชิ้นในรูปแบบ Markdown (.md)
│   ├── data/
│   │   └── profile.ts       # ข้อมูลโปรไฟล์ การศึกษา และเกียรติบัตร
│   ├── layouts/
│   │   └── BaseLayout.astro # Layout หลัก (Header, Nav, Footer, Safe Area)
│   ├── pages/
│   │   └── index.astro      # หน้าแรกของเว็บไซต์
│   ├── scripts/
│   │   └── page-effects.js  # เอฟเฟกต์พิมพ์ดีด, เลื่อนปรากฏ (Stagger) และ Navbar
│   └── styles/
│       └── global.css       # ชุดสีตัวแปร และเลย์เอาต์ Responsive ทั้งหมด
├── package.json
└── astro.config.mjs
```

---

## 🚀 คำสั่งเริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development (เปิดเซิร์ฟเวอร์ทดสอบ)
```bash
npm run dev
```
เปิดเบราว์เซอร์ที่ `http://localhost:4321`

### 3. บิลด์สำหรับ Production
```bash
npm run build
```
ไฟล์พร้อมใช้งานจะถูกสร้างไว้ในโฟลเดอร์ `dist/`

### 4. ทดสอบพรีวิวผลลัพธ์บิลด์
```bash
npm run preview
```

---

## 👤 ผู้พัฒนา (Author)

- **ชื่อ:** นัฐพงษ์ นาคอ่วม (Nattapong Nakaom)
- **GitHub:** [@equalignorecase](https://github.com/equalignorecase)
- **Email:** azzzx30089@gmail.com

