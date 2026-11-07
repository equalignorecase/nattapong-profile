# Portfolio Content Implementation Plan

**Goal:** หน้าแรกอ่านเร็วสำหรับ HR หน้ารายละเอียดอธิบายการตัดสินใจสำหรับทีมเทคนิค ตามข้อเสนอที่ผู้ใช้สั่ง “จัดการ”
**Architecture:** คง Astro, Anuphan, Tokyo Night, light/dark และลำดับ section เพิ่มชื่อสั้นและคำอธิบายไทยใน collection เดิม ใช้ techStack เป็นหลักฐานเชื่อมทักษะกับโปรเจกต์ ไม่เพิ่ม dependency
**Spec:** ข้อเสนอห้าข้อในบทสนทนา: ข้อมูลจริง, Hero กระชับ, รายการโปรเจกต์อ่านง่าย, ทักษะเชื่อมหลักฐาน, case study มีปัญหา/ความรับผิดชอบ/การตัดสินใจ/ผลลัพธ์

## Constraints / review focus

- ไม่สร้างข้อมูลส่วนตัว ภาพหน้าจอ ลิงก์ หรือผลวัดประสิทธิภาพขึ้นเอง
- รอข้อมูลจริงผ่านคำถาม async ระหว่างทำงานส่วนอื่น หากยังไม่มี เก็บต้นฉบับและทำรายการสิ่งที่ต้องเติม
- คง route เดิมและ title เดิมสำหรับ metadata; ชื่อสั้นใช้ใน UI
- ทักษะเชื่อมกับ techStack ที่ระบุไว้เท่านั้น ไม่อนุมานว่าใช้ React เพราะใช้ Next.js
- ชื่อยาวและ skill links ต้อง wrap; section/heading/anchor ไม่ซ้ำ
- ไม่มี resume.pdf ต้องไม่แสดงปุ่มไปยังไฟล์ที่ไม่มี ตั้ง resumeUrl ว่างและใช้ติดต่อเป็น action รองแทน

## Tasks

- [x] เพิ่ม name/tagline ให้ schema และข้อมูลทั้งสามโปรเจกต์; ย่อ Hero โดยคงเนื้อหาหลัก
- [x] หน้าแรก: สอง highlights ต่อโปรเจกต์ เทคโนโลยีสี่รายการและลิงก์ดูทั้งหมด; skill evidence links จาก techStack
- [x] หน้ารายละเอียด: ชื่อสั้น คำอธิบาย และสารบัญ case study; ปรับ Markdown จากข้อเท็จจริงเดิมโดยไม่เพิ่ม metrics
- [x] CSS: skill evidence และสารบัญ responsive คง palette และ focus เดิม
- [x] ตรวจ build, generated HTML, local links และ skill evidence
- [ ] ตรวจภาพจริง: native browser tool timeout และรีเซ็ต kernel จึงยังไม่ยืนยัน layout/keyboard ในเบราว์เซอร์
- [x] บันทึกรายการข้อมูลและหลักฐานที่ยังต้องเติม แล้วรายงานข้อจำกัดการตรวจ

## Validation

งานเนื้อหา/รูปลักษณ์ที่ย้อนกลับได้ตรวจ build และ generated HTML โดยไม่เพิ่ม test framework ตรวจโครง heading, ทุก route/anchor, จำนวน highlights, tech overflow link และการไม่แสดงปุ่ม resume ที่ไฟล์ยังขาด

## Verification results

- npm run build: 4 หน้า, 0 errors, 0 warnings, 0 hints
- generated HTML: ตรวจทุก route/anchor, h1 หนึ่งต่อหน้าและ IDs ไม่ซ้ำ
- หน้าแรก: ชื่อสั้นครบ 3 โปรเจกต์, highlights สองข้อ, techStack สี่รายการพร้อมลิงก์ไปดูทั้งหมด
- ทักษะ: ตรวจ TypeScript, React, Next.js, Astro, Prisma ORM และ Express / Hono ว่าเชื่อมเฉพาะโปรเจกต์ที่มี techStack ตรงกัน
- หน้ารายละเอียด: สารบัญสี่หัวข้อเข้าถึง section จริงครบทั้งสามโปรเจกต์
- ไม่แสดงปุ่มไป resume.pdf ที่ยังไม่มี และไม่แสดง performance metrics ที่ยังไม่ยืนยัน
- git diff --check ผ่าน
- เครื่องมือควบคุม Zen timeout: ยังไม่ยืนยันภาพจริง/overflow ที่ขนาดมือถือ
- dev server รอบนี้ใช้ http://127.0.0.1:4322/ เนื่องจาก 4321 ถูกใช้งานอยู่
- ข้อมูลส่วนตัว/ลิงก์จริงยังไม่ได้รับ ดู docs/portfolio-content-checklist.md
