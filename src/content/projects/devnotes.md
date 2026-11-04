---
title: "DevNotes CLI & Web — เครื่องมือจดบันทึกโค้ดและค้นหาด้วยคีย์เวิร์ดความเร็วสูง"
subtitle: "Developer Snippet Manager with Instant Full-Text Search"
year: "2025"
role: "Creator & Developer"
summary: "เครื่องมือเก็บ Code Snippets และบันทึกทางเทคนิคที่รองรับการเขียนด้วย Markdown พร้อมระบบค้นหาทันที (Instant Search) และปุ่มคัดลอกคำสั่งที่ใช้บ่อย"
featured: true
order: 3
techStack:
  - "Astro"
  - "TypeScript"
  - "Tailwind CSS"
  - "SQLite"
  - "Markdown"
liveUrl: "https://example.com"
repoUrl: "https://github.com/yourusername/devnotes"
metrics: "Lighthouse Performance 100/100 • ค้นหาบทความและโค้ดได้ใน < 15ms"
highlights:
  - "สร้างระบบค้นหาแบบ Fuzzy & Full-Text Search ที่กรองตามภาษาโปรแกรมและ Tag ได้ทันที"
  - "รองรับการกดคีย์ลัด (Cmd/Ctrl + K) เพื่อเปิดหน้าต่างค้นหาแบบ Command Palette"
  - "ออกแบบ UI สไตล์มินิมอลที่อ่านง่ายทั้งโหมดสว่างและโหมดมืด"
---

## ที่มาและปัญหา (Problem & Context)

ระหว่างฝึกเขียนโปรแกรมและทำโปรเจกต์ มักจะมีคำสั่ง Terminal, การตั้งค่า Docker หรือฟังก์ชัน Utility ที่ต้องกลับมาใช้ซ้ำบ่อยๆ การเก็บไว้ในแอปจดโน้ตทั่วไปทำให้ค้นหายากและไม่มีระบบ Syntax Highlighting ที่ดีพอ

## ฟีเจอร์หลักและสถาปัตยกรรม (Solution & Architecture)

- **Command Palette (`⌘K`)**: ค้นหาทุก Snippet ด้วยคีย์บอร์ดเพียงอย่างเดียวโดยไม่ต้องจับเมาส์
- **One-Click Copy with Variables**: รองรับการใส่ตัวแปรในคำสั่ง (เช่น `docker exec -it <container_name> sh`) ให้กรอกค่าก่อนกดคัดลอกได้ทันที
- **Zero-JS Static Rendering**: ใช้ Astro สร้างหน้าเว็บแบบ Static HTML ทำให้โหลดหน้าบทความเร็วระดับเสี้ยววินาที

## ความท้าทายทางเทคนิคและการแก้ปัญหา (Key Challenges & Learnings)

1. **การทำระบบค้นหาที่รองรับทั้งภาษาไทยและคำศัพท์เทคนิคภาษาอังกฤษ**:
   - ปรับแต่ง Tokenizer สำหรับการตัดคำและทำ Index ล่วงหน้าในขั้นตอน Build Time ทำให้ผู้ใช้ค้นหาได้ทันทีโดยไม่ต้องพึ่งพาเซิร์ฟเวอร์ค้นหาภายนอก

