---
name: "FinTrack"
tagline: "ระบบวิเคราะห์รายรับ–รายจ่ายส่วนบุคคล"
title: "FinTrack API & Dashboard — ระบบวิเคราะห์รายรับ-รายจ่ายส่วนบุคคล"
subtitle: "RESTful API & Interactive Expense Analytics Web App"
year: "2025"
role: "Backend & Frontend Developer"
summary: "ระบบบันทึกและวิเคราะห์ธุรกรรมทางการเงินพร้อมกราฟสรุปผลรายเดือน ระบบจัดหมวดหมู่อัตโนมัติ และการส่งออกรายงาน CSV/PDF"
featured: true
order: 2
techStack:
  - "React"
  - "TypeScript"
  - "Hono / Express"
  - "PostgreSQL"
  - "Docker"
  - "Vitest"
liveUrl: "https://example.com"
repoUrl: "https://github.com/yourusername/fintrack"
metrics: "Unit & Integration Test Coverage 88% • รองรับการประมวลผลรายการธุรกรรม > 10,000 รายการ"
highlights:
  - "ออกแบบ RESTful API ที่ตรวจสอบความถูกต้องของข้อมูลด้วย Zod Schema ทั้งฝั่ง Client และ Server"
  - "เขียน SQL Aggregation Query เพื่อสรุปยอดค่าใช้จ่ายรายหมวดหมู่และเปรียบเทียบย้อนหลัง 6 เดือน"
  - "ตั้งค่า Automated Testing ด้วย Vitest และทำ CI Pipeline บน GitHub Actions"
---

## ปัญหาที่ต้องแก้

การบันทึกรายรับ–รายจ่ายต้องมีทั้งมุมมองสรุปย้อนหลังบนคอมพิวเตอร์ และการนำเข้ารายการจากไฟล์ CSV โดยไม่ต้องกรอกธุรกรรมทีละรายการ

## ส่วนที่รับผิดชอบ

- ออกแบบ RESTful API และตรวจข้อมูลด้วย Zod ทั้ง Client และ Server
- เขียน SQL Aggregation สรุปรายหมวดหมู่และเปรียบเทียบย้อนหลัง
- พัฒนาการนำเข้า CSV แบบ Batch พร้อมตรวจข้อมูลแต่ละแถว
- ตั้งค่า Vitest, GitHub Actions และ Docker สำหรับการพัฒนาและทดสอบ

## การตัดสินใจทางเทคนิค

### ตรวจข้อมูลก่อนบันทึกเป็นชุด

อ่าน CSV ในเบราว์เซอร์ ตรวจแต่ละแถว แล้วส่งไปบันทึกด้วย Batch Transaction ใช้ Zod ร่วมกันระหว่าง Frontend และ Backend เพื่อกำหนดรูปแบบข้อมูล

### คำนวณเงินโดยระวังทศนิยม

การคำนวณด้วย `Number` เช่น `0.1 + 0.2` อาจเกิดความคลาดเคลื่อน จึงใช้การจัดเก็บในหน่วยสตางค์หรือชนิดข้อมูล `NUMERIC(12, 2)` และคำนวณด้วยวิธีที่เหมาะกับข้อมูลการเงินก่อนแสดงผล

### จัด Index ให้สอดคล้องกับการค้นหา

ใช้ Composite Index บน `(user_id, transaction_date)` ให้ตรงกับการเรียกดูธุรกรรมของผู้ใช้ตามช่วงเวลา และใช้ Docker Compose จำลอง PostgreSQL สำหรับ Integration Test

## ผลลัพธ์ของงาน

ขอบเขตผลงานครอบคลุมการบันทึกและนำเข้าธุรกรรม กราฟสรุปรายเดือน การจัดหมวดหมู่ และการส่งออกรายงาน CSV/PDF พร้อมการตรวจข้อมูลและชุดทดสอบในขั้นตอนพัฒนา
