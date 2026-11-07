---
name: "TaskFlow"
tagline: "ระบบจัดการงานและติดตามโปรเจกต์แบบ Real-time"
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

## ปัญหาที่ต้องแก้

ทีมขนาดเล็กต้องการบอร์ดจัดการงานที่ไม่ซับซ้อน และเห็นสถานะตรงกันเมื่อสมาชิกย้ายงานระหว่างคอลัมน์ เพื่อหลีกเลี่ยงการทำงานซ้ำซ้อน

## ส่วนที่รับผิดชอบ

- พัฒนา Kanban Board พร้อมการลากวางและ Optimistic UI
- เชื่อมการอัปเดตสถานะระหว่างสมาชิกด้วย Socket.io
- ออกแบบ PostgreSQL Schema และ Index สำหรับการค้นหาและกรองงาน
- แยกสิทธิ์ Owner, Editor และ Viewer ในระดับ Middleware

## การตัดสินใจทางเทคนิค

### อัปเดตหน้าจอก่อนรอ API

เมื่อผู้ใช้ย้ายการ์ด หน้าจอเปลี่ยนสถานะทันที แล้วส่งข้อมูลไปบันทึกเบื้องหลัง หากบันทึกไม่สำเร็จจะ Rollback กลับไปสถานะเดิม

### แยก WebSocket ตามโปรเจกต์

ใช้ห้องตาม `projectId` เพื่อส่งการเปลี่ยนแปลงเฉพาะสมาชิกที่เปิดบอร์ดเดียวกัน และแนบ `mutationId` เพื่อแยก Event ที่เริ่มจากผู้ใช้เองออกจาก Broadcast ที่ส่งกลับมา

### เก็บลำดับด้วย Fractional Indexing

แทนการอัปเดตลำดับการ์ดหลายใบ ใช้ค่ากึ่งกลางระหว่างการ์ดก่อนหน้าและถัดไปเป็นตำแหน่งใหม่ ตัวอย่างฟังก์ชันคำนวณจากโปรเจกต์:

```typescript
// ตัวอย่างการคำนวณตำแหน่งลำดับการ์ด (Lexicographical / Fractional Indexing)
export function calculateNewPosition(prevOrder?: number, nextOrder?: number): number {
  if (prevOrder === undefined && nextOrder === undefined) return 1000;
  if (prevOrder === undefined) return nextOrder! / 2;
  if (nextOrder === undefined) return prevOrder + 1000;
  return (prevOrder + nextOrder) / 2;
}
```

## ผลลัพธ์ของงาน

ขอบเขตผลงานครอบคลุมบอร์ดที่ลากวางได้ การอัปเดตร่วมกันแบบ Real-time และการกำหนดสิทธิ์สมาชิก โดยเชื่อมการจัดการข้อมูลกับประสบการณ์ใช้งานบนหน้าจอ
