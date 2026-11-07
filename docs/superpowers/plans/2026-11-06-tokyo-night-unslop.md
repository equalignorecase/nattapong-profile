# Tokyo Night Unslop Implementation Plan

**Goal:** ปรับพอร์ตให้เนื้อหาผลงานเด่นขึ้น ตามแบบที่ผู้ใช้อนุมัติและสั่งให้ลงมือแล้ว

**Architecture:** ใช้ Astro และข้อมูลเดิม เปลี่ยนองค์ประกอบร่วมและ CSS ก่อนปรับทั้งสองชนิดหน้า ใช้ SVG ใน component เดียว ไม่เพิ่ม dependency

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 3

**Spec:** ../specs/2026-11-06-tokyo-night-unslop-design.md

## Global constraints

- คงลำดับเนื้อหา ภาษาไทย ข้อมูลต้นฉบับ และทั้งสองธีม
- พื้นโทนหมึก ข้อความสามระดับ น้ำเงินหนึ่งสีเน้น
- ระยะหลักสเกล 4px ปุ่มสำคัญอย่างน้อย 44px รองรับ reduced motion
- ซ่อน metrics ที่ยังไม่ยืนยัน ไม่สร้างข้อมูลหรือภาพผลงานขึ้นเอง
- ไม่เพิ่ม dependency ไม่เผยแพร่ และไม่ commit โดยไม่ได้รับคำสั่ง

## Review focus

- ชื่อไทยและชื่อโปรเจกต์ยาวต้อง wrap โดยไม่มี horizontal overflow
- มือถือเข้าถึงทุกเมนูด้วยคีย์บอร์ดและมี focus ที่มองเห็น
- theme toggle มี aria-checked ตรงกับธีมแรกโหลด และจดจำการเลือก
- เมื่อ localStorage ใช้ไม่ได้ หน้าเว็บและปุ่มสลับธีมยังทำงาน
- หน้ารายละเอียดครบทุกโปรเจกต์ ลิงก์ section กลับมาหน้าแรกถูกต้อง

## Task 1: Shared visual system and shell

Files: src/styles/global.css, src/components/Icon.astro (new), src/components/ThemeToggle.astro, src/layouts/BaseLayout.astro

Interfaces: Icon consumes name and optional class; BaseLayout keeps title, description, showBackLink; profileData unchanged

- [x] สร้าง token neutral ramp และ component styles ให้ครอบคลุม spacing → color → icons → type → layout → details → motion
- [x] ใช้ Icon SVG ขนาด/เส้นเดียว และคงชื่อจริงใน wordmark
- [x] ใช้ details/summary สำหรับเมนูมือถือที่เปิดได้โดยไม่พึ่ง JS และเพิ่ม skip link
- [x] ตั้งธีมเริ่มต้นอย่างปลอดภัยเมื่อ storage ถูกบล็อก ตั้ง aria-checked ก่อนกดปุ่มและอัปเดตทุกครั้งที่สลับ
- [x] ตรวจด้วย npm run build และ built HTML/JavaScript (ยังไม่ได้ยืนยัน UI ผ่านเบราว์เซอร์)

## Task 2: Home and project pages

Files: src/pages/index.astro, src/pages/projects/[id].astro

Interfaces: ใช้ getCollection('projects') เรียงตาม data.order และใช้ profileData เดิม

- [x] Hero แบบ split: ข้อมูลหลักและสอง action ทางซ้าย ข้อมูลเบื้องต้นแบบเรียบทางขวา
- [x] จัด project list ให้เลข mono และเนื้อหามีจังหวะ แยกปุ่มหลักกับลิงก์รอง และไม่แสดง metrics ที่ยังไม่ยืนยัน
- [x] ย่อหัวข้อ Skills/Education/Contact โดยเก็บข้อมูลรายการเดิม
- [x] หน้ารายละเอียดใช้เลขเดียวกับหน้ารวม และปรับ prose/code block ให้รองรับมือถือ
- [x] ตรวจ npm run build และ built HTML ของหน้าแรกกับรายละเอียดทั้งสามรายการ: section/link/heading ครบ และ metrics ไม่ปรากฏ

## Task 3: Verification and delivery

- [x] ตรวจ git diff --check และ npm run build
- [ ] ตรวจภาพจริงผ่าน native browser: ยังทำไม่ได้ การควบคุม Zen ถูกขัดจังหวะโดยการใช้งานพร้อมกัน จึงหยุดไม่รบกวน session ผู้ใช้
- [x] ตรวจการสลับธีม เมนูมือถือ และ keyboard focus พร้อมตรวจ contrast ของ text tokens ด้วยการคำนวณ
- [x] รายงานข้อมูลตัวอย่างและ resume ที่ยังขาด โดยไม่แก้ข้อมูลจริงเอง

## Verification scope

งานรูปลักษณ์ที่ย้อนกลับได้ใช้ build, generated HTML, การคำนวณ contrast และการตรวจ UI แทนการเพิ่มชุดทดสอบที่ตรวจซ้ำ CSS ไม่มีการเพิ่ม framework ทดสอบ

Implementation: ผู้ช่วยทำต่อใน session นี้ตามคำสั่ง “ทำเลย”

## ผลตรวจ

- npm run build ผ่าน: 4 หน้า, Astro check ไม่มี errors/warnings/hints
- built HTML: h1 หนึ่งต่อหน้า, ID ไม่ซ้ำ, local navigation ครบ และ metrics summary ไม่ถูกแสดง
- built JavaScript: เริ่มธีมและ aria ตรงกัน สลับสองครั้ง จดจำค่า และทำงานเมื่อ storage ถูกบล็อก รวม 6 กรณี; Escape/เลือกเมนูปิดเมนูตามคาด (ตรวจด้วย Node VM ไม่ใช่ browser interaction)
- text contrast บนพื้นทั้งหมด: light ต่ำสุด 4.85:1, dark ต่ำสุด 5.35:1; ปุ่มหลักผ่าน 4.5:1
- Astro dev server ตอบ HTTP 200 ที่ http://127.0.0.1:4321/
- ข้อจำกัด: ยังไม่ยืนยันภาพจริง 390px/1440px, horizontal overflow และ keyboard focus ในเบราว์เซอร์
- ยังไม่มี public/resume.pdf และข้อมูลส่วนตัว/ลิงก์ตัวอย่างต้องแทนก่อนใช้สมัครงานจริง
