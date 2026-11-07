---
title: "TrueMoney Voucher API — API สำหรับตรวจสอบและรับซองของขวัญ TrueMoney"
name: "TrueMoney Voucher API"
tagline: "API สำหรับตรวจสอบและรับซองของขวัญ TrueMoney"
subtitle: "Python / FastAPI voucher service"
year: "2026"
role: "REST API"
summary: "บริการ API ด้วย Python และ FastAPI สำหรับตรวจสอบข้อมูลซองของขวัญและส่งคำขอรับเงิน TrueMoney มีการตรวจรูปแบบข้อมูลและเอกสาร API"
featured: false
order: 5
techStack:
  - "Python"
  - "FastAPI"
  - "Pydantic"
  - "curl_cffi"
  - "Uvicorn"
repoUrl: "https://github.com/equalignorecase/truewallet-api"
highlights:
  - "แยก endpoint สำหรับตรวจสอบซองและส่งคำขอรับเงิน"
  - "ตรวจรูปแบบเบอร์โทรและลิงก์ซอง พร้อมจัดรูปแบบข้อผิดพลาด"
  - "มี health endpoint และโครงสร้างสำหรับ deploy บน Vercel"
liveUrl: "https://localhostvlr-wallet-api.vercel.app"
liveLabel: "ดู API"
---

## ภาพรวม

บริการ Backend สำหรับเชื่อมข้อมูลซองของขวัญ TrueMoney โดยแยกขั้นตอนตรวจสอบข้อมูลออกจากคำขอรับเงิน โค้ดหลักอยู่ใน `api/index.py`

## ฟีเจอร์หลัก

- Endpoint สำหรับตรวจสอบข้อมูลซองและส่งคำขอรับเงิน
- ตัวตรวจรูปแบบเบอร์โทรและตัวดึงรหัสซองจาก URL
- Response และ error handlers สำหรับ validation กับ HTTP errors
- Endpoint แสดงสถานะบริการและเอกสาร API ของ FastAPI

## โครงสร้างและเทคโนโลยี

ใช้ Python, FastAPI และ Pydantic กำหนด request model และตรวจข้อมูล ใช้ curl_cffi สำหรับคำขอไปยังบริการภายนอก และ Uvicorn สำหรับรันในเครื่อง มี entry point และการตั้งค่าสำหรับ Vercel

## ดูซอร์สโค้ด

[README และโค้ด API บน GitHub](https://github.com/equalignorecase/truewallet-api)

เป็นโปรเจกต์ที่ไม่เป็นทางการและไม่ได้รับการรับรองจาก TrueMoney
