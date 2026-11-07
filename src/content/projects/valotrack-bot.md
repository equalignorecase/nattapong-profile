---
title: "ValoTracker — บอท Discord สำหรับร้านค้าและสถิติ Valorant"
name: "ValoTracker"
tagline: "บอท Discord สำหรับร้านค้าและสถิติ Valorant"
subtitle: "Valorant Discord bot with rendered scoreboards"
year: "2026"
role: "Discord Bot"
summary: "บอท Discord สำหรับดูร้านค้าสกินประจำวัน สถิติและประวัติการแข่งขัน Valorant พร้อมภาพ Scoreboard และตารางอันดับเพื่อน รองรับการเชื่อมต่อหลายบัญชี"
featured: true
order: 3
techStack:
  - "Python"
  - "discord.py"
  - "SQLite"
  - "httpx"
  - "Pillow"
  - "cryptography"
repoUrl: "https://github.com/equalignorecase/valotrack-bot"
highlights:
  - "รองรับ Slash Commands สำหรับร้านค้าสกิน แรงค์ และประวัติการแข่งขัน"
  - "สร้างภาพ Scoreboard และตารางอันดับเพื่อนพร้อมเปลี่ยนหน้า"
  - "แยกคำสั่งเป็น cogs และบริการสำหรับเชื่อมต่อ API กับเรนเดอร์ภาพ"
---

## ภาพรวม

บอทที่นำข้อมูลเกม Valorant มาแสดงใน Discord ทั้งร้านค้าสกิน ข้อมูลผู้เล่น สถิติ และการแข่งขัน โดยแสดงผลบางส่วนเป็นภาพแทนข้อความอย่างเดียว

## ฟีเจอร์หลัก

- `/shop` สำหรับร้านค้าสกิน และคำสั่งจัดการบัญชีที่เชื่อมต่อ
- `/rank`, `/lastmatch` และ `/match` สำหรับแรงค์และประวัติการแข่งขัน
- `/live` สำหรับข้อมูลการแข่งขันที่กำลังเล่น
- `/checkrank` และ `/leaderboard` สำหรับตารางอันดับ
- การสร้างภาพ Scoreboard และภาพร้านค้าด้วย Pillow

## โครงสร้างและเทคโนโลยี

ใช้ Python และ discord.py แยกคำสั่งเป็น cogs สำหรับ auth, shop, live, stats และ general ส่วนบริการ API และ renderer อยู่ใน `services/`

ข้อมูลบัญชีจัดการผ่าน SQLite และ aiosqlite ใช้ httpx สำหรับ HTTP requests และมี cryptography ใน dependencies สำหรับงานเข้ารหัส ข้อมูลมาจากบริการของ Riot ร่วมกับ HenrikDev และ valorant-api.com ตาม README

## ดูซอร์สโค้ด

[README รายการคำสั่ง และโค้ดบอทบน GitHub](https://github.com/equalignorecase/valotrack-bot)

บอทนี้เป็นโปรเจกต์ที่ไม่เป็นทางการ ไม่ใช่ผลิตภัณฑ์ที่ได้รับการรับรองจาก Riot Games
