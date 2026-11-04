---
title: "TaskFlow — ระบบจัดการงานและติดตามโปรเจกต์แบบ Real-time"
subtitle: "Full-Stack Collaborative Kanban Board & Issue Tracker"
year: "2026"
role: "Full-Stack Developer"
summary: "เว็บแอปพลิเคชันสำหรับจัดการงานแบบ Kanban Board รองรับการลากวาง (Drag & Drop), การอัปเดตสถานะแบบ Real-time ผ่าน WebSockets และการจัดการสิทธิ์ผู้ใช้งานแต่ละทีม"
featured: true
order: 1
techStack:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
  - "Node.js"
  - "PostgreSQL"
  - "Prisma"
  - "Socket.io"
liveUrl: "https://example.com"
repoUrl: "https://github.com/yourusername/taskflow"
metrics: "ลดเวลา Sync สถานะงานในทีมจำลองลง 40% • Response Time เฉลี่ย < 120ms"
highlights:
  - "ออกแบบ Optimistic UI สำหรับการลากวางการ์ด (Drag & Drop) ให้ลื่นไหลโดยไม่ต้องรอ API ตอบกลับ"
  - "เชื่อมต่อระบบ Real-time Sync ด้วย Socket.io เมื่อสมาชิกในทีมแก้ไขบอร์ดเดียวกัน"
  - "ออกแบบ Database Schema บน PostgreSQL พร้อมทำ Indexing สำหรับการค้นหาและกรองงาน"
---

## ที่มาและปัญหา (Problem & Context)

ในการทำโปรเจกต์กลุ่มช่วงเรียนและฝึกงาน ปัญหาที่พบบ่อยคือเครื่องมือจัดการงานทั่วไปมีความซับซ้อนเกินความจำเป็นสำหรับทีมขนาดเล็ก (3–6 คน) หรือขาดการอัปเดตหน้าจอแบบทันทีเมื่อเพื่อนร่วมทีมย้ายสถานะงาน ทำให้เกิดการทำงานซ้ำซ้อนและข้อมูลไม่ตรงกัน

โปรเจกต์ **TaskFlow** จึงถูกพัฒนาขึ้นเพื่อเป็นระบบจัดการงานแบบ Kanban ที่เบา เร็ว และเน้นประสบการณ์ใช้งานของนักพัฒนา (Keyboard-first & Real-time Sync)

## ฟีเจอร์หลักและสถาปัตยกรรม (Solution & Architecture)

- **Optimistic Drag & Drop**: ใช้หลักการอัปเดต State บนหน้าเว็บทันทีที่ผู้ใช้ลากการ์ดเปลี่ยนคอลัมน์ แล้วส่งคำสั่งบันทึกเข้าฐานข้อมูลเบื้องหลัง หากเกิดข้อผิดพลาดระบบจะ Rollback อัตโนมัติ
- **Real-time Room Broadcasting**: แยกห้องเชื่อมต่อ WebSocket ตาม `projectId` เพื่อลดภาระของเซิร์ฟเวอร์และส่งข้อมูลเฉพาะคนที่เปิดดูโปรเจกต์เดียวกัน
- **Role-Based Access Control (RBAC)**: แยกสิทธิ์ระหว่าง Owner, Editor และ Viewer ในระดับ Middleware

```typescript
// ตัวอย่างการคำนวณตำแหน่งลำดับการ์ด (Lexicographical / Fractional Indexing)
export function calculateNewPosition(prevOrder?: number, nextOrder?: number): number {
  if (prevOrder === undefined && nextOrder === undefined) return 1000;
  if (prevOrder === undefined) return nextOrder! / 2;
  if (nextOrder === undefined) return prevOrder + 1000;
  return (prevOrder + nextOrder) / 2;
}
```

## ความท้าทายทางเทคนิคและการแก้ปัญหา (Key Challenges & Learnings)

1. **ปัญหาการเรียงลำดับการ์ดในฐานข้อมูล (Card Reordering)**:
   - **ปัญหาเดิม**: เมื่อย้ายการ์ดจากตำแหน่งที่ 10 ไปตำแหน่งที่ 2 ต้องใช้คำสั่ง `UPDATE` แก้ไขลำดับของการ์ดใบอื่นทั้งหมดในคอลัมน์ ทำให้เกิดคอขวดเมื่อมีการ์ดจำนวนมาก
   - **วิธีแก้**: เปลี่ยนมาใช้ระบบ **Fractional Indexing** (เก็บค่าลำดับเป็นเลขทศนิยมกึ่งกลางระหว่างการ์ดก่อนหน้าและถัดไป) ทำให้การย้ายการ์ดใช้การอัปเดตฐานข้อมูลเพียง `1 Row` เสมอ
2. **การจัดการ Race Condition ระหว่าง Optimistic UI กับ WebSocket**:
   - เพิ่ม `mutationId` แนบไปกับ Event เพื่อป้องกันไม่ให้หน้าจอของคนที่เพิ่งลากการ์ดกระตุกซ้ำเมื่อได้รับ Broadcast กลับมาจากเซิร์ฟเวอร์

