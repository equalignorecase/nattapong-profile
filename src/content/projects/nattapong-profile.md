---
title: "Nattapong Profile — เว็บพอร์ตโฟลิโอด้วย Astro และ Markdown"
name: "Nattapong Profile"
tagline: "เว็บพอร์ตโฟลิโอด้วย Astro และ Markdown"
subtitle: "Astro portfolio with content collections"
year: "2026"
role: "Portfolio Website"
summary: "เว็บพอร์ตโฟลิโอที่แยกข้อมูลโปรไฟล์ออกจากหน้าเว็บ และจัดเก็บรายละเอียดโปรเจกต์ด้วย Markdown มีหน้าแรก หน้ารายละเอียดผลงาน และปุ่มสลับโหมดสี"
featured: false
order: 6
techStack:
  - "Astro"
  - "TypeScript"
  - "Tailwind CSS"
  - "Markdown"
repoUrl: "https://github.com/equalignorecase/nattapong-profile"
highlights:
  - "จัดข้อมูลโปรเจกต์ด้วย Astro Content Collections และ Markdown"
  - "ใช้ BaseLayout ร่วมกันระหว่างหน้าแรกและหน้ารายละเอียดโปรเจกต์"
  - "แยกข้อมูลโปรไฟล์ ธีม และสไตล์เพื่อดูแลเนื้อหาได้สะดวก"
liveUrl: "https://nattapong-profile.vercel.app"
---

## ภาพรวม

เว็บพอร์ตที่รวมข้อมูลแนะนำตัว ผลงาน ทักษะ การศึกษา และการติดต่อ โดยแยกข้อมูลออกจากส่วนแสดงผลเพื่อปรับเนื้อหาได้จากไฟล์

## ฟีเจอร์หลัก

- หน้าแรกสำหรับภาพรวมโปรไฟล์และรายการผลงาน
- หน้ารายละเอียดโปรเจกต์ตามเส้นทาง `projects/[id]`
- ข้อมูลโปรเจกต์แบบ Markdown ใน Astro Content Collections
- Component สำหรับสลับโหมดสี และ stylesheet กลาง

## โครงสร้างและเทคโนโลยี

ใช้ Astro, TypeScript, Tailwind CSS และ Typography plugin โครงสร้างประกอบด้วย `src/data/profile.ts`, `src/content/projects/`, `BaseLayout.astro` และ `ThemeToggle.astro`

ข้อมูลโปรไฟล์รวมอยู่ในไฟล์เดียว ส่วนรายละเอียดผลงานแยกเป็น Markdown แต่ละโปรเจกต์ ใช้ layout และสไตล์ร่วมกันเพื่อให้หน้าแรกกับหน้ารายละเอียดมีรูปแบบสอดคล้องกัน

## ดูซอร์สโค้ด

[ไฟล์โปรเจกต์และ dependencies บน GitHub](https://github.com/equalignorecase/nattapong-profile)
