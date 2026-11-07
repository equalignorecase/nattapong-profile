---
title: "Laijai — เว็บบันทึกรายจ่ายพร้อมอ่านข้อมูลจากสลิป"
name: "Laijai"
tagline: "เว็บบันทึกรายจ่ายพร้อมอ่านข้อมูลจากสลิป"
subtitle: "Personal expense tracker with slip OCR"
year: "2026"
role: "Web Application"
summary: "เว็บบันทึกและวิเคราะห์รายรับ–รายจ่าย พร้อมอ่านสลิปธนาคารไทย จัดหมวดหมู่ ตั้งงบประมาณ และส่งออกรายงาน ใช้ Firebase สำหรับข้อมูลและการยืนยันตัวตน"
featured: true
order: 2
techStack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "Firebase"
  - "Tesseract.js"
  - "Gemini"
  - "Recharts"
  - "Vitest"
repoUrl: "https://github.com/equalignorecase/laijai"
highlights:
  - "อ่านข้อมูลสลิปด้วย Tesseract.js และเชื่อม Gemini เพื่อช่วยสกัดข้อมูล"
  - "แสดงแดชบอร์ด กราฟรายจ่าย งบประมาณ และรายการประจำ"
  - "ตรวจจับรายการซ้ำและส่งออกรายงาน CSV/Excel"
liveUrl: "https://laijai.vercel.app"
---

## ภาพรวม

แอปบันทึกรายจ่ายส่วนบุคคลที่เชื่อมการนำเข้าข้อมูลจากสลิปเข้ากับหน้าสรุปการเงิน ช่วยให้ตรวจข้อมูลและแก้ไขในฟอร์มก่อนบันทึกธุรกรรม

## ฟีเจอร์หลัก

- สรุปรายรับ รายจ่าย และยอดคงเหลือ พร้อมกราฟด้วย Recharts
- อัปโหลดสลิปธนาคารไทยและสกัดข้อมูลด้วย OCR และ Gemini
- ตรวจหารายการซ้ำจากข้อมูลสลิปและธุรกรรม
- จัดหมวดหมู่ ตั้งงบประมาณรายเดือน และรายการรับ–จ่ายประจำ
- ส่งออกรายงาน CSV และ Excel

## โครงสร้างและเทคโนโลยี

พัฒนาด้วย Next.js App Router, React, TypeScript และ Tailwind CSS เชื่อม Firebase Authentication และ Firestore แยกชั้นบริการสำหรับธุรกรรม งบประมาณ หมวดหมู่ รายการประจำ และรายงาน

โครงสร้างมีตัวอ่านสลิปภาษาไทยใน `src/lib/ocr/` และ API Route สำหรับอ่านสลิปด้วย AI มี Zod สำหรับ schema และ Vitest สำหรับชุดทดสอบ parser, calculations และ AI schema

## ดูซอร์สโค้ด

[README โครงสร้างโปรเจกต์ และชุดทดสอบบน GitHub](https://github.com/equalignorecase/laijai)
