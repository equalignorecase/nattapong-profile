# Nattapong Nakaom — Developer Portfolio

เว็บพอร์ตโฟลิโอส่วนตัว พัฒนาด้วย **Astro 7**, **TypeScript** และ **Tailwind CSS** เน้นความเร็วสูงแบบ Static Site Generation (SSG) พร้อมดีไซน์โทนสี Deep Ink Navy รองรับทั้ง Dark และ Light Mode

---

## จุดเด่นของโปรเจกต์ (Key Features)

- **Fast & Lightweight (SSG):** ทำงานแบบ Static 100% โหลดเร็ว ไม่มี JavaScript ที่ไม่จำเป็น
- **GitHub API Integration:** ดึงยอด Stars และ Forks ตอน Build เว็บ ไม่ติด Rate Limit
- **Certificate Modal & Tabs:** แกลเลอรีเกียรติบัตรพร้อมปุ่มสลับแท็บ และ Lightbox ดูรูปใหญ่ รองรับคีย์บอร์ดและปัดจอมือถือ
- **Deep Ink Navy Theme:** โหมดมืดสีน้ำเงินเข้มลึก สบายตา และโหมดสว่างโทนสีนุ่มนวล
- **100% Responsive Design:** ปรับแต่งเลย์เอาต์เฉพาะสำหรับจอมือถือเล็ก (< 380px), แท็บเล็ต iPad (< 900px) และจอเดสก์ท็อป
- **Dynamic Shrink Navbar:** แถบเมนูด้านบนย่อขนาดอัตโนมัติเมื่อเลื่อนหน้าจอ พร้อมปุ่มแคปซูลไฮไลท์ตำแหน่งปัจจุบัน

---

## เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Astro 7](https://astro.build)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS Variables
- **Icons:** Custom SVG Components (`Icon.astro`, `TechIcon.astro`)
- **Content:** Astro Content Collections (Markdown)

---

## โครงสร้างโปรเจกต์ (Project Structure)

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
│   ├── styles/
│   │   └── global.css       # ชุดสีตัวแปร และเลย์เอาต์ Responsive ทั้งหมด
│   └── utils/
│       └── github.ts        # ดึงสถิติ GitHub API ตอนบิลด์
├── package.json
└── astro.config.mjs
```

---

## คำสั่งเริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดเบราว์เซอร์ที่ `http://localhost:4321`

### 3. บิลด์สำหรับ Production
```bash
npm run build
```
ไฟล์พร้อมใช้งานจะอยู่ในโฟลเดอร์ `dist/`

### 4. ทดสอบพรีวิวผลลัพธ์บิลด์
```bash
npm run preview
```

---

## ผู้พัฒนา (Author)

- **ชื่อ:** นัฐพงษ์ นาคอ่วม (Nattapong Nakaom)
- **GitHub:** [@equalignorecase](https://github.com/equalignorecase)
- **Email:** azzzx30089@gmail.com
