export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  description: string;
  link?: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
}

export const profileData = {
  name: 'ชื่อ-นามสกุลของคุณ (Your Name)',
  handle: '@yourhandle',
  role: 'Junior Full-Stack / Frontend Developer',
  location: 'Bangkok, Thailand',
  availability: 'Open to Work — Full-time / Internship',
  resumeUrl: '/resume.pdf',
  bio: 'นักพัฒนาซอฟต์แวร์รุ่นใหม่ที่หลงใหลในการสร้าง Web Application ที่ใช้งานง่าย โหลดเร็ว และโค้ดดูแลรักษาง่าย ถนัดการพัฒนาด้วย TypeScript, React/Next.js และ Node.js พร้อมเรียนรู้เทคโนโลยีใหม่และแก้ไขปัญหาเชิงวิศวกรรมอย่างเป็นระบบ',
  highlights: [
    'พัฒนาโปรเจกต์ตั้งแต่การออกแบบ Database Schema, REST API ไปจนถึง Responsive UI',
    'ให้ความสำคัญกับ Clean Code, Type Safety (TypeScript) และ Web Performance',
    'คุ้นเคยกับ Git Workflow, Automated Testing และการทำ CI/CD เบื้องต้น',
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['TypeScript', 'JavaScript (ES6+)', 'React', 'Next.js', 'Astro', 'Tailwind CSS', 'HTML5 / CSS3'],
    },
    {
      category: 'Backend & API',
      items: ['Node.js', 'Express / Hono', 'RESTful API', 'Prisma ORM', 'Authentication (JWT / OAuth)'],
    },
    {
      category: 'Database & Tools',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Git / GitHub', 'Docker', 'Vercel / Cloudflare'],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      period: '2022 — 2026',
      title: 'วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ (B.Sc. Computer Science)',
      institution: 'มหาวิทยาลัยของคุณ (Your University)',
      description: 'เกรดเฉลี่ยสะสม (GPAX 3.xx) • วิชาเอก Software Engineering, Database Systems, Data Structures & Algorithms',
    },
    {
      period: '2025',
      title: 'Full-Stack Software Development Bootcamp / Certification',
      institution: 'ชื่อสถาบัน หรือ Online Platform (เช่น Coursera / freeCodeCamp / Bootcamp)',
      description: 'สร้างโปรเจกต์จริงแบบ End-to-End ด้วย React, TypeScript, Node.js และ PostgreSQL พร้อมฝึกทำงานร่วมกันแบบ Agile/Scrum',
      link: 'https://github.com',
    },
    {
      period: '2024',
      title: 'AWS Cloud Practitioner / Meta Frontend Developer Certificate',
      institution: 'Amazon Web Services / Coursera',
      description: 'พื้นฐานสถาปัตยกรรม Cloud, การ Deploy ระบบจริง และการจัดการความปลอดภัยเบื้องต้น',
      link: 'https://github.com',
    },
  ] satisfies EducationItem[],
  contacts: [
    {
      label: 'Email',
      value: 'youremail@example.com',
      href: 'mailto:youremail@example.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/yourusername',
      href: 'https://github.com/yourusername',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/yourusername',
      href: 'https://linkedin.com/in/yourusername',
    },
    {
      label: 'Line / Phone',
      value: '08X-XXX-XXXX (Line ID: yourlineid)',
      href: 'tel:+66800000000',
    },
  ] satisfies ContactItem[],
};

