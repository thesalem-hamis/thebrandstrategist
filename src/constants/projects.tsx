import logo1 from "../assets/excellence.png";
import logo2 from "../assets/sola-.png";
import logo3 from "../assets/spara-.png";
import logo4 from "../assets/McKeen.png";
import naijaTechImg from "../assets/nijatech.png";

export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  year: string;
  focus: string[];
  bannerImage: string;
  link?: string;
  overview: string;
  process: string[];
  outcome: string;
}

export const PROJECTS_HEADER = {
  title: "ALL WORK",
  count: 7,
  subtitle:
    "Selected case studies across executive advisory, brand strategy, personal branding, visual identity systems, and foundation architecture.",
};

export const PROJECTS: Project[] = [
  {
    id: "mczeek-advisory",
    title: "MCZEEK ADVISORY",
    slug: "mczeek-advisory",
    subtitle: "Brand Strategy & Brand Architecture",
    description:
      "Developed the strategic brand architecture and positioning for McZeek Group and its flagship division, McZeek Advisory. The project focused on creating a scalable brand system, defining the relationship between the parent brand and its divisions, and developing a premium visual and strategic identity aligned with executive advisory services.",
    year: "2026",
    focus: [
      "Define parent-division relationship & brand hierarchy.",
      "Develop executive-level visual and strategic positioning.",
    ],
    bannerImage: logo4,
    link: "#",
    overview:
      "McZeek Advisory required a structural overhaul to articulate its high-value advisory position clearly to global market leaders. The goal was to eliminate operational confusion across sub-entities while codifying an authoritative executive brand presence.",
    process: [
      "Discovery & Brand Audit: Conducted interviews with key stakeholders to evaluate current market positioning.",
      "Brand Architecture Alignment: Structured a monolithic sub-brand hierarchy linking McZeek Group with Advisory.",
      "Visual System Construction: Designed a minimal visual framework utilizing bold typography and quiet luxury color schemes.",
      "Implementation Guidelines: Authored comprehensive documentation for all internal and external communication touchpoints.",
    ],
    outcome:
      "Created a unified, institutional-grade brand architecture that positioned McZeek Advisory to engage C-suite stakeholders seamlessly while establishing a clear foundation for future division expansion.",
  },
  {
    id: "spara",
    title: "SPARA",
    slug: "spara",
    subtitle: "Brand Strategy & Identity Development",
    description:
      "Led the strategic rebranding, repositioning, and visual identity development for SPARA, creating a cohesive brand that reflects its mission, values, and long-term vision.",
    year: "2025",
    focus: [
      "Rebrand & reposition for long-term vision and market clarity.",
      "Build design systems & implementation guidelines across touchpoints.",
    ],
    bannerImage: logo3,
    link: "#",
    overview:
      "SPARA needed to transform its visual identity to reflect its rapidly expanding market vision and align internal strategy with external touchpoints.",
    process: [
      "Strategic Positioning: Refined core mission values and value proposition messaging frameworks.",
      "Identity Redesign: Developed a modular visual identity system adaptable across digital platforms.",
      "Brand Guidelines: Compiled complete visual design rules for typography, layout grid systems, and color palette usage.",
    ],
    outcome:
      "Delivered a refreshed identity that expanded market presence, boosted brand recall, and unified communication across all operational channels.",
  },
  // {
  //   id: "my-haire",
  //   title: "MY HAIRE",
  //   slug: "my-haire",
  //   subtitle: "Personal & Business Brand Strategy",
  //   description:
  //     "Developed a comprehensive Personal Brand strategy for the Founder of My Haire, an Afro-textured hair brand, defining its positioning, target audience, messaging framework, customer experience, and long-term growth strategy.",
  //   year: "2025",
  //   focus: [
  //     "Establish founder positioning & messaging framework.",
  //     "Design customer experience strategy for brand growth.",
  //   ],
  //   bannerImage: logo3,
  //   link: "#",
  //   overview:
  //     "Positioned the founder of My Haire as a leading voice in Afro-textured hair care while aligning the corporate identity with genuine consumer trust.",
  //   process: [
  //     "Founder Persona Workshop: Identified unique narrative hooks and positioning pillars for executive authority.",
  //     "Customer Experience Mapping: Streamlined customer touchpoints from social entry to unboxing experience.",
  //     "Content Strategy: Frameworked thought leadership content strategies for market dominance.",
  //   ],
  //   outcome:
  //     "Strengthened customer connection and increased brand authority through a unified founder-led communication strategy.",
  // },
  {
    id: "winnies-school-of-excellence",
    title: "WINNIE'S SCHOOL OF EXCELLENCE",
    slug: "winnies-school-of-excellence",
    subtitle: "Brand Strategy, Visual Identity & Brand Messaging",
    description:
      "Developed the brand strategy, visual identity, and brand messaging for Winnie's School of Excellence, creating a distinctive brand that reflects the institution's commitment to educational excellence.",
    year: "2024",
    focus: [
      "Craft compelling institutional messaging & tagline.",
      "Build a cohesive identity targeting parents and stakeholders.",
    ],
    bannerImage: logo1,
    link: "#",
    overview:
      "Re-engineered the visual identity of an established educational institution to reflect academic leadership and gain trust among discerning parents.",
    process: [
      "Stakeholder Audits: Collected insights from board members, faculty, and prospective parents.",
      "Tagline & Messaging Architecture: Formulated core messaging tailored around elite student development.",
      "Visual Refinements: Crafted an institutional crest, modern typeface pairing, and brand collateral.",
    ],
    outcome:
      "Established an authoritative institutional identity that resulted in higher enrollment interest and elevated stakeholder confidence.",
  },
  {
    id: "sola-osindeinde",
    title: "SOLA OSINDEINDE",
    slug: "sola-osindeinde",
    subtitle: "Executive Personal Brand Strategy & Visual Identity",
    description:
      "Developed the personal brand strategy and visual identity for Sola Osindeinde, positioning the brand to reflect credibility, leadership, and influence.",
    year: "2024",
    focus: [
      "Position executive presence for credibility & industry influence.",
      "Create unified visual assets for digital & executive platforms.",
    ],
    bannerImage: logo2,
    link: "#",
    overview:
      "Built a distinctive personal brand ecosystem designed to elevate executive authority across global platforms and speaking networks.",
    process: [
      "Executive Profiling: Defined key authority domains, target audiences, and core value messaging.",
      "Visual Design Architecture: Created an executive identity system including press kits, digital decks, and media templates.",
      "Digital Alignment: Coordinated LinkedIn and professional channel layouts for brand consistency.",
    ],
    outcome:
      "Successfully positioned the executive for strategic industry opportunities, media appearances, and key advisory engagements.",
  },
  {
    id: "naija-telco-guy",
    title: "NAIJA TELCO GUY",
    slug: "naija-telco-guy",
    subtitle: "Personal Brand Development",
    description:
      "Developed the personal brand strategy and visual identity for Naija Telco Guy, helping establish a distinctive and credible brand within the telecommunications industry.",
    year: "2024",
    focus: [
      "Clarify thought leadership positioning in telecommunications.",
      "Refine messaging & audience engagement architecture.",
    ],
    bannerImage: naijaTechImg,
    link: "#",
    overview:
      "Constructed a unique platform persona within telecommunications to bridge complex industry technicalities with accessible public thought leadership.",
    process: [
      "Niche Identification: Targeted industry insights gaps for focused audience retention.",
      "Brand Tone Framework: Established a balance between technical expertise and approachable media commentary.",
      "Visual Assets: Built dynamic content templates for rapid social publishing.",
    ],
    outcome:
      "Expanded social reach and established thought leadership status within the regional telecommunications ecosystem.",
  },
  // {
  //   id: "life-bloom-foundation",
  //   title: "LIFE BLOOM FOUNDATION",
  //   slug: "life-bloom-foundation",
  //   subtitle: "Brand Strategy & Identity Development",
  //   description:
  //     "Developed the strategic foundation and visual identity for Life Bloom Foundation, creating a trustworthy, mission-driven brand system built to engage donors, community partners, and beneficiaries with purpose and transparency.",
  //   year: "2023",
  //   focus: [
  //     "Construct purpose-driven brand foundation for non-profit outreach.",
  //     "Establish visual trust & community stakeholder messaging.",
  //   ],
  //   bannerImage: logo3,
  //   link: "#",
  //   overview:
  //     "Engineered an impactful non-profit brand architecture focused on building immediate visual trust and operational transparency for donor engagement.",
  //   process: [
  //     "Donor Engagement Research: Analyzed non-profit trust factors and transparency communication patterns.",
  //     "Visual Identity Strategy: Formulated an approachable color palette paired with clear typography.",
  //     "Impact Reporting Templates: Designed annual report layouts and digital donation touchpoints.",
  //   ],
  //   outcome:
  //     "Delivered a purpose-built identity system that increased donor conversion rates and elevated partner trust during funding cycles.",
  // },
];