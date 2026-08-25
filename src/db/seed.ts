import { db } from './index';
import { experiences, projects, skills } from './schema';

type ExperienceInsert = typeof experiences.$inferInsert;
type ProjectInsert = typeof projects.$inferInsert;
type SkillInsert = typeof skills.$inferInsert;

const skillDefinitions = [
  // Frontend temelleri, state yönetimi, UI ve test yetkinlikleri aynı uzmanlık grubu altında tutulur.
  {
    name: "React.js",
    category: "Frontend",
    iconName: "Atom",
    isFeatured: true,
  },
  {
    name: "Next.js",
    category: "Frontend",
    iconName: "PanelsTopLeft",
    isFeatured: true,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    iconName: "FileType2",
    isFeatured: true,
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    iconName: "Braces",
    isFeatured: true,
  },
  { name: "HTML5", category: "Frontend", iconName: "Code2", isFeatured: false },
  {
    name: "CSS3",
    category: "Frontend",
    iconName: "Palette",
    isFeatured: false,
  },
  {
    name: "SCSS",
    category: "Frontend",
    iconName: "Palette",
    isFeatured: false,
  },
  {
    name: "Redux",
    category: "Frontend",
    iconName: "Workflow",
    isFeatured: true,
  },
  {
    name: "TanStack Query",
    category: "Frontend",
    iconName: "RefreshCw",
    isFeatured: true,
  },
  {
    name: "Context API",
    category: "Frontend",
    iconName: "Share2",
    isFeatured: false,
  },
  {
    name: "Zustand",
    category: "Frontend",
    iconName: "Store",
    isFeatured: false,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    iconName: "Wind",
    isFeatured: true,
  },
  {
    name: "shadcn/ui",
    category: "Frontend",
    iconName: "Component",
    isFeatured: false,
  },
  {
    name: "Material UI (MUI)",
    category: "Frontend",
    iconName: "Component",
    isFeatured: false,
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    iconName: "LayoutGrid",
    isFeatured: false,
  },
  {
    name: "Emotion",
    category: "Frontend",
    iconName: "Paintbrush",
    isFeatured: false,
  },
  {
    name: "Styled-components",
    category: "Frontend",
    iconName: "Paintbrush",
    isFeatured: false,
  },
  {
    name: "Ant Design",
    category: "Frontend",
    iconName: "Component",
    isFeatured: false,
  },
  {
    name: "Vitest",
    category: "Frontend",
    iconName: "TestTube2",
    isFeatured: false,
  },
  {
    name: "Playwright",
    category: "Frontend",
    iconName: "FlaskConical",
    isFeatured: false,
  },
  {
    name: "React Testing Library",
    category: "Frontend",
    iconName: "TestTube2",
    isFeatured: false,
  },

  // Backend / Full-Stack
  {
    name: "Node.js",
    category: "Backend / Full-Stack",
    iconName: "Server",
    isFeatured: true,
  },
  {
    name: "Express.js",
    category: "Backend / Full-Stack",
    iconName: "Route",
    isFeatured: false,
  },
  {
    name: "Supabase",
    category: "Backend / Full-Stack",
    iconName: "DatabaseZap",
    isFeatured: false,
  },
  {
    name: "PHP",
    category: "Backend / Full-Stack",
    iconName: "FileCode2",
    isFeatured: false,
  },
  {
    name: "PostgreSQL",
    category: "Backend / Full-Stack",
    iconName: "Database",
    isFeatured: true,
  },
  {
    name: "MySQL",
    category: "Backend / Full-Stack",
    iconName: "Database",
    isFeatured: false,
  },
  {
    name: "SQL",
    category: "Backend / Full-Stack",
    iconName: "Database",
    isFeatured: false,
  },
  {
    name: "Drizzle ORM",
    category: "Backend / Full-Stack",
    iconName: "TableProperties",
    isFeatured: true,
  },
  {
    name: "Redis (Upstash)",
    category: "Backend / Full-Stack",
    iconName: "DatabaseZap",
    isFeatured: true,
  },
  {
    name: "REST APIs",
    category: "Backend / Full-Stack",
    iconName: "Waypoints",
    isFeatured: false,
  },
  {
    name: "Integration Testing",
    category: "Backend / Full-Stack",
    iconName: "TestTube2",
    isFeatured: false,
  },
  {
    name: "Database Management",
    category: "Backend / Full-Stack",
    iconName: "Database",
    isFeatured: false,
  },

  // DevOps / Cloud
  {
    name: "AWS",
    category: "DevOps / Cloud",
    iconName: "Cloud",
    isFeatured: false,
  },
  {
    name: "DigitalOcean",
    category: "DevOps / Cloud",
    iconName: "Cloud",
    isFeatured: false,
  },
  {
    name: "VPS Deployment",
    category: "DevOps / Cloud",
    iconName: "ServerCog",
    isFeatured: false,
  },
  {
    name: "Nginx",
    category: "DevOps / Cloud",
    iconName: "Network",
    isFeatured: false,
  },
  {
    name: "Linux Server Environments",
    category: "DevOps / Cloud",
    iconName: "Terminal",
    isFeatured: false,
  },
  {
    name: "Vercel",
    category: "DevOps / Cloud",
    iconName: "CloudUpload",
    isFeatured: false,
  },
  {
    name: "Railway",
    category: "DevOps / Cloud",
    iconName: "CloudUpload",
    isFeatured: false,
  },
  {
    name: "Netlify",
    category: "DevOps / Cloud",
    iconName: "CloudUpload",
    isFeatured: false,
  },
  {
    name: "Docker",
    category: "DevOps / Cloud",
    iconName: "Container",
    isFeatured: true,
  },
  {
    name: "GitHub Actions",
    category: "DevOps / Cloud",
    iconName: "Workflow",
    isFeatured: true,
  },
  {
    name: "GitLab CI/CD",
    category: "DevOps / Cloud",
    iconName: "Workflow",
    isFeatured: false,
  },

  // Tooling ve tasarım iş birliği
  {
    name: "Webpack",
    category: "Tooling",
    iconName: "Package",
    isFeatured: false,
  },
  {
    name: "Babel",
    category: "Tooling",
    iconName: "Languages",
    isFeatured: false,
  },
  {
    name: "Git",
    category: "Tooling",
    iconName: "GitBranch",
    isFeatured: false,
  },
  {
    name: "SonarQube",
    category: "Tooling",
    iconName: "ScanSearch",
    isFeatured: false,
  },
  {
    name: "Figma",
    category: "Tooling",
    iconName: "PenTool",
    isFeatured: false,
  },
  { name: "Zeplin", category: "Tooling", iconName: "Ruler", isFeatured: false },
  {
    name: "Adobe XD",
    category: "Tooling",
    iconName: "PenTool",
    isFeatured: false,
  },
  {
    name: "Adobe Photoshop",
    category: "Tooling",
    iconName: "Image",
    isFeatured: false,
  },
] as const;

const skillSeed = skillDefinitions.map(
  (skill, index): SkillInsert => ({ ...skill, order: index + 1 }),
);

const projectSeed = [
  {
    slug: "developer-portfolio-platform",
    titleTr: "Geliştirici Portföyü ve Platformu",
    titleEn: "Developer Portfolio & Platform",
    summaryTr:
      "Next.js, TypeScript, PostgreSQL ve Drizzle ORM ile geliştirilen; önbellekleme, CI/CD ve Docker altyapısına sahip kişisel geliştirici platformu.",
    summaryEn:
      "A personal developer platform built with Next.js, TypeScript, PostgreSQL, and Drizzle ORM, supported by caching, CI/CD, and Docker infrastructure.",
    descriptionTr:
      "• Next.js, TypeScript ve React Server Components kullanılarak sıfırdan kişisel geliştirici portföyü geliştirildi.\n• PostgreSQL üzerinde Drizzle ORM ile ilişkisel veritabanı şeması tasarlandı; önbellekleme ve rate limiting için Redis entegre edildi.\n• GitHub Actions ile otomatik CI/CD süreçleri kuruldu ve uygulama Docker ile konteynerleştirildi.",
    descriptionEn:
      "• Built a personal developer portfolio from scratch using Next.js, TypeScript, and React Server Components.\n• Designed a relational PostgreSQL schema with Drizzle ORM and integrated Redis for caching and rate limiting.\n• Implemented automated CI/CD workflows with GitHub Actions and containerized the application with Docker.",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "Docker",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/eryilmazyasin/portfolio-app",
    liveUrl: "https://yasineryilmaz.com",
    imageUrl: null,
    isFeatured: true,
    order: 1,
  },
  {
    slug: "easyjot",
    titleTr: "EasyJot — Kişisel Finans Takip Uygulaması",
    titleEn: "EasyJot — Personal Finance Tracker",
    summaryTr:
      "Next.js, Node.js, PostgreSQL ve Drizzle ORM ile geliştirilen, çoklu Docker konteyner mimarisine sahip full-stack finans takip uygulaması.",
    summaryEn:
      "A full-stack personal finance tracker built with Next.js, Node.js, PostgreSQL, and Drizzle ORM using a multi-container Docker architecture.",
    descriptionTr:
      "• Kişisel finans ve gider takibi için çoklu Docker konteyner mimarisine sahip full-stack bir uygulama geliştirildi.\n• PostgreSQL üzerinde Drizzle ORM ile ilişkisel veri modelleri tasarlandı ve yerel geliştirme ortamları yapılandırıldı.",
    descriptionEn:
      "• Developed a full-stack personal finance and expense tracking application with a multi-container Docker architecture.\n• Designed relational PostgreSQL models with Drizzle ORM and configured reproducible local development environments.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Docker"],
    githubUrl: "https://github.com/eryilmazyasin/easyjot",
    liveUrl: null,
    imageUrl: null,
    isFeatured: true,
    order: 2,
  },
  {
    slug: "sporcudiyetisyenim",
    titleTr: "Sporcu Diyetisyenim",
    titleEn: "Sporcu Diyetisyenim",
    summaryTr:
      "Detroit Digital ve Dimba bünyesinde tamamlanan, sporcu beslenmesi hizmetlerini tanıtan WordPress tabanlı kurumsal web sitesi.",
    summaryEn:
      "A WordPress-based corporate website presenting sports nutrition services, completed while working with Detroit Digital and Dimba.",
    descriptionTr:
      "• Sporcu beslenmesi ve diyetisyenlik hizmetlerini erişilebilir bir içerik yapısıyla sunan kurumsal WordPress web sitesi tamamlandı.\n• Proje, Detroit Digital ve Dimba bünyesindeki çalışma sürecinde yayına hazır hale getirildi.",
    descriptionEn:
      "• Completed a corporate WordPress website presenting sports nutrition and dietitian services through an accessible content structure.\n• Delivered the project to production while working with Detroit Digital and Dimba.",
    techStack: ["WordPress"],
    githubUrl: null,
    liveUrl: "https://sporcudiyetisyenim.com",
    imageUrl: null,
    isFeatured: true,
    order: 3,
  },
  {
    slug: "gencoglu-ergun",
    titleTr: "Gençoğlu Ergün Hukuk Bürosu",
    titleEn: "Gençoğlu Ergün Law Firm",
    summaryTr:
      "Detroit Digital ve Dimba bünyesinde HTML, CSS ve JavaScript kullanılarak tamamlanan kurumsal avukatlık web sitesi.",
    summaryEn:
      "A corporate law firm website completed with HTML, CSS, and JavaScript while working with Detroit Digital and Dimba.",
    descriptionTr:
      "• Hukuk bürosunun hizmetlerini ve kurumsal kimliğini açık, responsive bir arayüzle sunan web sitesi geliştirildi.\n• Frontend uygulaması HTML, CSS ve JavaScript kullanılarak Detroit Digital ve Dimba bünyesinde tamamlandı.",
    descriptionEn:
      "• Developed a responsive website presenting the law firm's services and corporate identity through a clear interface.\n• Completed the frontend implementation with HTML, CSS, and JavaScript while working with Detroit Digital and Dimba.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: null,
    liveUrl: "https://gencogluergun.av.tr",
    imageUrl: null,
    isFeatured: true,
    order: 4,
  },
] satisfies ProjectInsert[];

const experienceSeed = [
  {
    company: "Hotel Management Automation",
    companyUrl: null,
    location: "Istanbul, Türkiye",
    type: "Freelance / Remote",
    roleTr: "Full-Stack Geliştirici",
    roleEn: "Full-Stack Developer",
    descriptionTr:
      "• React.js ve TypeScript ile Node.js kullanarak özel bir otel yönetim ve rezervasyon sistemi sıfırdan geliştirildi.\n• Kullanıcı kimlik doğrulaması Context API ile yönetildi; veri çekme süreçleri TanStack Query ve Axios ile optimize edildi.\n• Oda ve rezervasyon durumları için ilişkisel MySQL veritabanı tasarlandı ve uygulama özel bir sunucuya dağıtıldı.",
    descriptionEn:
      "• Built a custom hotel management and reservation system from scratch using React.js, TypeScript, and Node.js.\n• Managed user authentication with Context API and optimized data fetching with TanStack Query and Axios.\n• Designed a relational MySQL database for room and booking states and deployed the application to a private server.",
    startDate: "2023",
    endDate: null,
    isCurrent: true,
    order: 1,
  },
  {
    company: "Metus",
    companyUrl: null,
    location: "Istanbul, Türkiye",
    type: "Full-time",
    roleTr: "Frontend Geliştirici",
    roleEn: "Frontend Developer",
    descriptionTr:
      "• Metance ürününde React.js ile yeni özellikler geliştirildi, karmaşık hatalar çözüldü ve UI/UX durumları iyileştirildi.\n• Daha yüksek sayfa yükleme performansı ve sürdürülebilirlik için Metance landing page Next.js ile geliştirildi ve optimize edildi.\n• TypeScript, TanStack Query ve Context API ile state ve veri akışı yönetildi; gerçek zamanlı veri akışı ve anlık güncellemeler için SignalR/WebSockets entegre edildi.\n• Kod kalitesi ve yerel build güvenilirliğini artırmak amacıyla AI araçları, Docker ve SonarQube tabanlı DevOps süreçleri kullanıldı.",
    descriptionEn:
      "• Contributed to Metance with React.js by delivering new features, resolving complex bugs, and improving UI/UX states.\n• Built and optimized the Metance landing page with Next.js to improve page-load performance and maintainability.\n• Managed state and data flow with TypeScript, TanStack Query, and Context API; integrated SignalR/WebSockets for real-time streaming and instant updates.\n• Integrated AI tools and DevOps workflows with Docker and SonarQube to improve code quality and local build reliability.",
    startDate: "08/2021",
    endDate: "09/2026",
    isCurrent: false,
    order: 2,
  },
  {
    company: "Akinon",
    companyUrl: "https://akinon.com",
    location: "Istanbul, Türkiye",
    type: "Full-time",
    roleTr: "Frontend Geliştirici",
    roleEn: "Frontend Developer",
    descriptionTr:
      "• Vakko, A101, English Home ve DS Damat dahil yüksek trafikli e-ticaret markaları için frontend geliştirmeleri ve hata düzeltmeleri gerçekleştirildi.\n• JavaScript, HTML, CSS ve SCSS ile responsive UI bileşenleri geliştirildi; frontend arayüzleri backend tarafında Python/Jinja şablonlarıyla entegre edildi.\n• Büyük ölçekli e-ticaret sistemlerinde tarayıcı uyumluluğu sorunları giderildi ve web performansı optimize edildi.",
    descriptionEn:
      "• Implemented frontend enhancements and bug fixes for high-traffic e-commerce brands including Vakko, A101, English Home, and DS Damat.\n• Developed responsive UI components with JavaScript, HTML, CSS, and SCSS and integrated frontend layouts with Python/Jinja backend templates.\n• Resolved cross-browser compatibility issues and optimized web performance across large-scale e-commerce systems.",
    startDate: "09/2020",
    endDate: "08/2021",
    isCurrent: false,
    order: 3,
  },
  {
    company: "Detroit Digital",
    companyUrl: null,
    location: "Istanbul, Türkiye",
    type: "Full-time",
    roleTr: "Frontend Geliştirici",
    roleEn: "Frontend Developer",
    descriptionTr:
      "• Kurumsal ve e-ticaret web siteleri pixel-perfect ve responsive tasarım yaklaşımıyla sıfırdan geliştirilerek yayına alındı.\n• HTML, CSS, JavaScript, PHP, Laravel ve WordPress kullanılarak birden fazla müşteri projesinin dağıtım ve düzenli bakım süreçleri yönetildi.",
    descriptionEn:
      "• Developed and launched corporate and e-commerce websites from scratch with pixel-perfect, responsive implementations.\n• Managed deployments and ongoing maintenance for multiple client projects using HTML, CSS, JavaScript, PHP, Laravel, and WordPress.",
    startDate: "04/2019",
    endDate: "07/2020",
    isCurrent: false,
    order: 4,
  },
] satisfies ExperienceInsert[];

async function main() {
  console.log("Starting database seeding...");

  // Tüm portfolyo verisi tek transaction içinde yenilenir; herhangi bir hata eski veriyi koruyacak şekilde rollback oluşturur.
  await db.transaction(async (transaction) => {
    console.log("Cleaning existing portfolio records...");
    await transaction.delete(projects);
    await transaction.delete(experiences);
    await transaction.delete(skills);

    // İletişim mesajları kullanıcı verisi olduğu için seed sırasında bilinçli olarak silinmez.
    console.log("Inserting portfolio data...");
    await transaction.insert(skills).values(skillSeed);
    await transaction.insert(projects).values(projectSeed);
    await transaction.insert(experiences).values(experienceSeed);
  });

  console.log("Database seeding completed successfully.");
  process.exit(0);
}

main().catch((error) => {
  console.error("An error occurred during database seeding:", error);
  process.exit(1);
});
