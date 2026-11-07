export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  description: string;
  category?: 'education' | 'competition';
  link?: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
}

export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  category?: 'award' | 'training';
}

export const profileData = {
  name: 'นัฐพงษ์ นาคอ่วม (Nattapong Nakaom)',
  handle: '@equalignorecase',
  role: 'Web Developer / Full-Stack Developer',
  location: 'Nakhon Pathom, Thailand',
  availability: 'Available for Work',
  // Add '/resume.pdf' after placing the real PDF in public/, or use its hosted URL.
  resumeUrl: '',
  bio: 'มุ่งมั่นพัฒนาเว็บแอปพลิเคชันและ API ประสิทธิภาพสูงด้วย Next.js, React, TypeScript และ Python พร้อมทักษะด้านระบบเครือข่ายและ IoT',
  highlights: [
    'รางวัลรองชนะเลิศอันดับ 3 การแข่งขันทักษะเทคโนโลยีเครือข่ายระดับชาติ (มาตรฐานเหรียญทอง) ประจำปี 2567',
    'รางวัลรองชนะเลิศอันดับ 1 ทักษะเทคโนโลยีเครือข่ายระดับภาคกลาง (มาตรฐานเหรียญทอง) ประจำปี 2567',
    'ผลการเรียนยอดเยี่ยม GPAX 3.86 (ปวส.) และ 3.81 (ปวช.) สาขาวิชาเทคโนโลยีสารสนเทศ',
    'มีประสบการณ์จริงด้าน Web Developer & IT Technical ในองค์กร (Masaru Marketing)',
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java', 'PHP'],
    },
    {
      category: 'Frontend Development',
      items: ['Astro', 'Next.js', 'React', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Three.js'],
    },
    {
      category: 'Backend & Databases',
      items: ['Express.js', 'FastAPI', 'Flask', 'MySQL', 'MongoDB', 'SQLite', 'Supabase', 'Prisma'],
    },
    {
      category: 'Cloud & Tools',
      items: ['Docker', 'AWS', 'Google Cloud', 'Vercel', 'Git', 'GitHub', 'Figma'],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      period: '2567 — 2568',
      title: 'สาขาวิชาเทคโนโลยีสารสนเทศ (ปวส.) • GPAX: 3.86',
      institution: 'วิทยาลัยอาชีวศึกษานครปฐม',
      description: 'ศึกษาการพัฒนาเว็บแอปพลิเคชันขั้นสูง สถาปัตยกรรมระบบเครือข่าย และการจัดการฐานข้อมูล',
      category: 'education',
    },
    {
      period: '2564 — 2566',
      title: 'สาขาวิชาเทคโนโลยีสารสนเทศ (ปวช.) • GPAX: 3.81',
      institution: 'วิทยาลัยอาชีวศึกษานครปฐม',
      description: 'ศึกษาพื้นฐานการเขียนโปรแกรมคอมพิวเตอร์ การจัดการฐานข้อมูล และระบบเครือข่ายเบื้องต้น',
      category: 'education',
    },
    {
      period: '2567',
      title: 'Web Developer & IT Support',
      institution: 'Masaru Marketing',
      description: 'ดูแลและพัฒนาเว็บไซต์ รวมถึงงานด้านเทคนิคและการจัดการโครงสร้างพื้นฐานระบบไอทีในองค์กร',
      category: 'education',
    },
    {
      period: '2567',
      title: 'รองชนะเลิศอันดับ 3 การแข่งขันทักษะเทคโนโลยีเครือข่ายระดับชาติ (เหรียญทอง)',
      institution: 'การแข่งขันทักษะวิชาชีพ ระดับชาติ ณ วิทยาลัยเทคนิคตรัง',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีเครือข่าย ประจำปีการศึกษา 2567 มาตรฐานเหรียญทอง',
      category: 'competition',
    },
    {
      period: '2567',
      title: 'รองชนะเลิศอันดับ 1 การแข่งขันทักษะเทคโนโลยีเครือข่ายระดับภาคกลาง (เหรียญทอง)',
      institution: 'การแข่งขันทักษะวิชาชีพ ระดับภาคกลาง ณ วิทยาลัยเทคนิคพระนครศรีอยุธยา',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีเครือข่าย ประจำปีการศึกษา 2567 มาตรฐานเหรียญทอง',
      category: 'competition',
    },
    {
      period: '2566',
      title: 'รองชนะเลิศอันดับ 3 การแข่งขันทักษะการเขียนโปรแกรมคอมพิวเตอร์ (ระดับภาคกลาง)',
      institution: 'การแข่งขันทักษะวิชาชีพ ทักษะการเขียนโปรแกรมคอมพิวเตอร์ ประจำปีการศึกษา 2566',
      description: 'แข่งขันทักษะการเขียนโปรแกรมเพื่อแก้โจทย์เชิงวิศวกรรมซอฟต์แวร์ มาตรฐานเหรียญทอง',
      category: 'competition',
    },
    {
      period: '2567',
      title: 'อบรมโครงการพัฒนาทักษะวิชาชีพขั้นสูง (IoT & Embedded Systems)',
      institution: 'Cisco Networking Academy & โครงการพัฒนาทักษะวิชาชีพขั้นสูง',
      description: 'อบรมการพัฒนาระบบสมองกลฝังตัว นวัตกรรมด้านอิเล็กทรอนิกส์ปัญญาประดิษฐ์ และระบบเครือข่าย',
      category: 'competition',
    },
  ] as EducationItem[],
  certificates: [
    {
      id: 1,
      title: 'รองชนะเลิศอันดับ 3 (ระดับชาติ)',
      issuer: 'มาตรฐานเหรียญทอง',
      date: '2567',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีเครือข่าย ประจำปีการศึกษา 2567 ณ วิทยาลัยเทคนิคตรัง',
      image: '/img/certificates/1.png',
      category: 'award',
    },
    {
      id: 5,
      title: 'รองชนะเลิศอันดับ 1 (ระดับภาคกลาง)',
      issuer: 'มาตรฐานเหรียญทอง',
      date: '2567',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีเครือข่าย ประจำปีการศึกษา 2567 ณ วิทยาลัยเทคนิคพระนครศรีอยุธยา',
      image: '/img/certificates/5.jpg',
      category: 'award',
    },
    {
      id: 3,
      title: 'รองชนะเลิศอันดับ 2 (ระดับภาคกลาง)',
      issuer: 'มาตรฐานเหรียญทอง',
      date: '2568',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีเครือข่าย ประจำปีการศึกษา 2568',
      image: '/img/certificates/3.jpg',
      category: 'award',
    },
    {
      id: 2,
      title: 'รองชนะเลิศอันดับ 3 (ระดับภาคกลาง)',
      issuer: 'มาตรฐานเหรียญทอง',
      date: '2566',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะการเขียนโปรแกรมคอมพิวเตอร์ ประจำปีการศึกษา 2566',
      image: '/img/certificates/2.jpg',
      category: 'award',
    },
    {
      id: 4,
      title: 'รองชนะเลิศอันดับ 3 (ระดับภาคกลาง)',
      issuer: 'มาตรฐานเหรียญเงิน',
      date: '2565',
      description: 'การแข่งขันทักษะวิชาชีพ ทักษะการเขียนโปรแกรมคอมพิวเตอร์ ประจำปีการศึกษา 2565',
      image: '/img/certificates/4.jpg',
      category: 'award',
    },
    {
      id: 6,
      title: 'อบรมโครงการพัฒนาทักษะวิชาชีพขั้นสูง',
      issuer: 'การพัฒนาระบบสมองกลฝังตัว',
      date: '2567',
      description: 'อบรมโครงการพัฒนาทักษะวิชาชีพขั้นสูงพร้อมสร้างนวัตกรรมด้านอิเล็กทรอนิกส์ปัญญาประดิษฐ์และข้อมูล หัวข้อ การพัฒนาระบบสมองกลฝังตัว',
      image: '/img/certificates/6.jpg',
      category: 'training',
    },
    {
      id: 7,
      title: 'อบรมโครงการพัฒนาทักษะวิชาชีพขั้นสูง',
      issuer: 'การพัฒนาระบบอินเทอร์เน็ตในทุกสิ่ง (IoT)',
      date: '2567',
      description: 'อบรมโครงการพัฒนาทักษะวิชาชีพขั้นสูงพร้อมสร้างนวัตกรรมด้านอิเล็กทรอนิกส์ปัญญาประดิษฐ์และข้อมูล หัวข้อ การพัฒนาระบบอินเทอร์เน็ตในทุกสิ่ง',
      image: '/img/certificates/7.jpg',
      category: 'training',
    },
    {
      id: 8,
      title: 'อบรมเกี่ยวกับระบบเครือข่าย',
      issuer: 'Cisco Networking Academy',
      date: '2568',
      description: 'อบรบเกี่ยวกับระบบเครือข่าย Cisco Networking Academy',
      image: '/img/certificates/8.jpg',
      category: 'training',
    },
  ] as CertificateItem[],
  contacts: [
    {
      label: 'Email',
      value: 'azzzx30089@gmail.com',
      href: 'mailto:azzzx30089@gmail.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/equalignorecase',
      href: 'https://github.com/equalignorecase',
    },
  ] satisfies ContactItem[],
};

