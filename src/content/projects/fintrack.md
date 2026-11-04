---
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

## ที่มาและปัญหา (Problem & Context)

แอปบันทึกรายรับ-รายจ่ายส่วนใหญ่ใช้งานผ่านมือถือได้ดี แต่ขาดมุมมองการวิเคราะห์ข้อมูลเชิงลึกบนหน้าจอคอมพิวเตอร์ เช่น การเปรียบเทียบแนวโน้มค่าใช้จ่ายรายไตรมาส หรือการนำเข้าไฟล์รายการเดินบัญชี (CSV) มาจัดหมวดหมู่ทีละหลายร้อยรายการ

## ฟีเจอร์หลักและสถาปัตยกรรม (Solution & Architecture)

- **Batch CSV Importer**: อ่านไฟล์ CSV ฝั่งเบราว์เซอร์ ตรวจสอบความถูกต้องของแต่ละแถว และส่งเข้า Backend แบบ Batch Transaction
- **Type-Safe API Contract**: ใช้ `Zod` เป็นตัวกลางในการ Validate Request Body และสร้าง Type ให้ฝั่ง Frontend ใช้งานโดยตรง ลดโอกาสเกิด Runtime Error
- **Containerized Environment**: ใช้ `Docker Compose` จำลองฐานข้อมูล PostgreSQL สำหรับการพัฒนาและรัน Integration Test

## ความท้าทายทางเทคนิคและการแก้ปัญหา (Key Challenges & Learnings)

1. **ความแม่นยำในการคำนวณตัวเลขทางการเงิน (Floating-Point Precision)**:
   - **ปัญหาเดิม**: การใช้ `Number` ปกติของ JavaScript คำนวณทศนิยม (เช่น `0.1 + 0.2`) ทำให้เกิดค่าคลาดเคลื่อนสะสมในรายงานสรุปยอดรวม
   - **วิธีแก้**: จัดเก็บจำนวนเงินในฐานข้อมูลในหน่วยสตางค์ (`Integer` / `BigInt`) หรือชนิดข้อมูล `NUMERIC(12, 2)` ของ PostgreSQL และคำนวณผ่านไลบรารีที่ปลอดภัยก่อนแปลงแสดงผลบน UI
2. **ประสิทธิภาพในการ Query ข้อมูลย้อนหลัง**:
   - สร้าง Composite Index บนคอลัมน์ `(user_id, transaction_date)` ช่วยลดเวลา Query หน้า Dashboard จาก `380ms` เหลือต่ำกว่า `25ms`

