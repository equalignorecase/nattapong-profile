---
title: "Donate Project — ระบบรับโดเนทและแจ้งเตือนสำหรับสตรีมเมอร์"
name: "Donate Project"
tagline: "ระบบรับโดเนทและแจ้งเตือนสำหรับสตรีมเมอร์"
subtitle: "PromptPay donations & OBS stream alerts"
year: "2026"
role: "Web Application"
summary: "ระบบรับโดเนทผ่าน PromptPay พร้อมแจ้งเตือนบน OBS มีหน้าจัดการโดเนทและตัวปรับแต่งหน้าตาแจ้งเตือน เชื่อมข้อมูลและการแจ้งเตือนผ่าน Supabase"
featured: true
order: 1
techStack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Supabase"
  - "PromptPay QR"
repoUrl: "https://github.com/equalignorecase/donate-project"
highlights:
  - "สร้าง QR PromptPay และเชื่อมขั้นตอนตรวจสอบสลิปผ่าน SlipOK"
  - "แสดงแจ้งเตือนใน OBS พร้อมตัวปรับแต่งและ Live Preview"
  - "จัดการข้อมูลโดเนทและการตั้งค่าผ่านหน้าแอดมิน"
liveUrl: "https://localhostvlr-donate.vercel.app"
---

## ภาพรวม

เครื่องมือรับการสนับสนุนสำหรับสตรีมเมอร์ เชื่อมหน้าส่งโดเนทกับ Overlay ที่เพิ่มเป็น Browser Source ใน OBS และมีหน้าจัดการระบบสำหรับผู้ดูแล

## ฟีเจอร์หลัก

- หน้า `/donate` สำหรับขั้นตอนส่งโดเนทและสร้าง QR PromptPay
- เชื่อมการตรวจสอบสลิปด้วย SlipOK
- หน้า `/overlay` สำหรับแสดงการแจ้งเตือนบน OBS
- หน้า `/customizer` สำหรับปรับแต่งแจ้งเตือนพร้อม Live Preview
- หน้า `/admin` สำหรับจัดการข้อมูลและทดสอบการแจ้งเตือน

## โครงสร้างและเทคโนโลยี

ใช้ Next.js, React และ TypeScript สำหรับหน้าเว็บและ API Routes ข้อมูลโดเนทและการตั้งค่าเก็บใน Supabase มี SQL migrations สำหรับเตรียมตาราง และส่งการแจ้งเตือนผ่าน Supabase Realtime private channel ตาม README

การสร้าง QR ใช้ `promptpay-qr` และ `qrcode` ใน dependencies ส่วนโครงสร้าง API แยกงานตรวจสอบสลิป การตั้งค่า และงานจัดการระบบออกจากกัน

## ดูซอร์สโค้ด

[README และรายละเอียดการติดตั้งบน GitHub](https://github.com/equalignorecase/donate-project)
