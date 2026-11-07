---
title: "March Coffee Dashboard — แดชบอร์ดจัดการยอดขาย ออเดอร์ และสินค้าร้านกาแฟ"
name: "March Coffee Dashboard"
tagline: "แดชบอร์ดจัดการยอดขาย ออเดอร์ และสินค้าร้านกาแฟ"
subtitle: "Coffee shop management & analytics dashboard"
year: "2026"
role: "Web Application"
summary: "แดชบอร์ดร้านกาแฟสำหรับดูภาพรวมยอดขาย ออเดอร์ สินค้า และรายงาน แสดงข้อมูลผ่านกราฟและตาราง พร้อมชั้นบริการเชื่อม PostgreSQL"
featured: true
order: 4
techStack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "PostgreSQL"
  - "Recharts"
repoUrl: "https://github.com/equalignorecase/march-coffee-dashboard"
highlights:
  - "แสดงภาพรวมยอดขาย รายการออเดอร์ และข้อมูลสินค้าผ่านกราฟกับตาราง"
  - "แยกหน้าจัดการออเดอร์ สินค้า และรายงาน พร้อม API Routes"
  - "เชื่อม PostgreSQL ผ่าน pg และมีข้อมูลตัวอย่างสำรองในชั้นบริการ"
liveUrl: "https://march-coffee-dashboard.vercel.app"
---

## ภาพรวม

ระบบรวมข้อมูลสำหรับการบริหารร้านกาแฟ มีหน้าภาพรวมและหน้าสำหรับตรวจออเดอร์ สินค้า และรายงาน โดยใช้ส่วนประกอบกราฟและตารางเพื่ออ่านข้อมูลแต่ละด้าน

## ฟีเจอร์หลัก

- สรุปยอดขายและแสดงกราฟแนวโน้ม
- ดูรายการออเดอร์ล่าสุดและข้อมูลสินค้า
- แสดงข้อมูลสินค้าขายดี หมวดหมู่ยอดขาย และวิธีชำระเงิน
- แยกหน้ารายงานและหน้าเข้าสู่ระบบ

## โครงสร้างและเทคโนโลยี

ใช้ Next.js App Router, React, TypeScript, Tailwind CSS และ Recharts โครงสร้างแบ่ง page/view, UI components และ API Routes ตามงาน

ไฟล์ `src/lib/db.ts` จัดการ PostgreSQL connection pool ผ่าน `pg` และ `src/lib/db-service.ts` จัดบริการอ่านข้อมูลสำหรับ Dashboard, Orders, Products และ Reports มีการอ้างอิงข้อมูลตัวอย่างเป็น fallback จึงไม่ใช้ตัวเลขในแดชบอร์ดเป็นหลักฐานยอดขายจริง

## ดูซอร์สโค้ด

[README และโค้ดแดชบอร์ดบน GitHub](https://github.com/equalignorecase/march-coffee-dashboard)
