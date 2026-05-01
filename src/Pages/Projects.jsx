import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../Components/Footer';
import ProjectModal from '../Components/ProjectModal';

import illust1 from '../assets/Illustrations/ILLUST1.MP4';
import illust2 from '../assets/Illustrations/ILLUST2.png';
import illust3 from '../assets/Illustrations/ILLUST3.MP4';
import illust4 from '../assets/Illustrations/ILLUST4.png';
import illust5Jpeg from '../assets/Illustrations/ILLUST5.jpeg';
import illust5Png from '../assets/Illustrations/ILLUST5.png';
import illust6 from '../assets/Illustrations/ILLUST6.png';

import px1 from '../assets/Illustrations/PX1.gif';
import px2 from '../assets/Illustrations/PX2.PNG';
import px3 from '../assets/Illustrations/PX3.PNG';
import px31 from '../assets/Illustrations/PX3.1.PNG';
import px32 from '../assets/Illustrations/PX3.2.PNG';
import px33 from '../assets/Illustrations/PX3.3.PNG';
import px4 from '../assets/Illustrations/PX4.jpg';
import px41 from '../assets/Illustrations/PX4.1.jpg';
import px42 from '../assets/Illustrations/PX4.2.jpg';
import px43 from '../assets/Illustrations/PX4.3.jpg';
import px5 from '../assets/Illustrations/PX5.jpg';
import px51 from '../assets/Illustrations/PX5.1.jpg';
import px52 from '../assets/Illustrations/PX5.2.jpg';
import px53 from '../assets/Illustrations/PX5.3.jpg';

import gpx1 from '../assets/GPX/GPX1.png';
import gpx2 from '../assets/GPX/GPX2.png';
import gpx3 from '../assets/GPX/GPX3.png';
import gpx4 from '../assets/GPX/GPX4.png';
import gpx5 from '../assets/GPX/GPX5.png';
import gpx6 from '../assets/GPX/GPX6.png';
import gpx7 from '../assets/GPX/GPX7.png';
import gpx8 from '../assets/GPX/GPX8.png';
import gpx9 from '../assets/GPX/GPX9.png';
import gpx10 from '../assets/GPX/GPX10.png';
import gpx11 from '../assets/GPX/GPX11.jpg';

import internPortfolioPreview from '../assets/System/InternPortfolio.png';
import trackEdPreview from '../assets/System/TrackEd.PNG';
import ctrlAltDelightPreview from '../assets/System/Ctrl+Alt+Delight.PNG';

function Projects() {
  const location = useLocation();

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isSocialOnDark, setIsSocialOnDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayedFilter, setDisplayedFilter] = useState('All');
  const [animatingFilter, setAnimatingFilter] = useState(null);
  const [projectCardStage, setProjectCardStage] = useState('idle');
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  const pageRef = useRef(null);
  const footerRef = useRef(null);
  const projectCardRefs = useRef([]);
  const projectCardTitleRefs = useRef({});
  const cursorGridAnimationRef = useRef(null);
  const cursorGridFrameRef = useRef(0);
  const filterCollapseTimeoutRef = useRef(null);
  const filterEnterTimeoutRef = useRef(null);

  const cursorGridTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorGridCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  const filters = [
    {
      label: 'All',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 5H20M4 12H20M4 19H20"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: 'Illustrations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 16.5L8.5 12L11.5 15L16.5 9L20 12.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7C3 5.9 3.9 5 5 5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9.2H8.01"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: 'GPX Design',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 17L9 7L14 17L17 11L20 17"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 17H20"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: 'WebSystem',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 5H20V16H4V5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M8 20H16M12 16V20"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M7 9H11M7 12H14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: 'Video Edit',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M5 6H15C16.1 6 17 6.9 17 8V16C17 17.1 16.1 18 15 18H5C3.9 18 3 17.1 3 16V8C3 6.9 3.9 6 5 6Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M17 10L21 7.5V16.5L17 14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const projects = [
    {
      title: 'Digital Projects',
      role: 'Digital Illustration / Visual Design',
      category: 'Illustrations',
      description:
        'A digital illustration collection where I explored colors, character moments, backgrounds, and storytelling through Procreate.',
      tools: ['Procreate'],
      details:
        'This collection helped me practice digital drawing with a stronger focus on mood, color, composition, and storytelling. Most of the pieces were made as personal studies where I tried to keep every artwork expressive and cohesive.',
      preview: {
        type: 'image',
        src: illust2,
        alt: 'Digital Projects Preview',
        label: 'ILLUST2',
        previewPosition: 'object-[right_18%]',
      },
      media: [
        {
          type: 'stack',
          label: 'Hanni from NewJeans',
          details:
            'A color and style exploration inspired by Hanni from NewJeans. This piece challenged me to combine different visual elements while keeping the overall canvas cohesive.',
          tools: ['Procreate'],
          items: [
            {
              type: 'video',
              src: illust1,
              alt: 'Hanni from NewJeans Process',
              label: 'Hanni from NewJeans',
              details:
                'A color and style exploration inspired by Hanni from NewJeans. This piece challenged me to combine different visual elements while keeping the overall canvas cohesive.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: illust2,
              alt: 'Digital Illustration Preview',
              label: 'Digital Illustration',
              details:
                'A digital illustration study focused on character styling, color balance, and clean visual composition.',
              tools: ['Procreate'],
            },
          ],
        },
        {
          type: 'video',
          src: illust3,
          alt: 'Storytelling Illustration 1',
          label: 'Storytelling Illustration',
          details:
            'An illustration study where I explored a storytelling style and tried to capture a specific mood through composition, pose, and visual atmosphere.',
          tools: ['Procreate'],
        },
        {
          type: 'image',
          src: illust4,
          alt: 'Storytelling Illustration 2',
          label: 'Storytelling Illustration',
          details:
            'An illustration study where I explored a storytelling style and tried to capture a specific mood through composition, pose, and visual atmosphere.',
          tools: ['Procreate'],
        },
        {
          type: 'image',
          src: illust5Jpeg,
          alt: 'Background Drawing',
          label: 'Background Drawing',
          details:
            'A background drawing exploration where I practiced building atmosphere, depth, and environmental details.',
          tools: ['Procreate'],
        },
        {
          type: 'image',
          src: illust5Png,
          alt: 'Animal Illustration',
          label: 'Animal Illustration',
          details:
            'An animal illustration study focused on shape, expression, and soft visual details using Procreate.',
          tools: ['Procreate'],
        },
        {
          type: 'image',
          src: illust6,
          alt: 'Color and Element Study',
          label: 'Color and Element Study',
          details:
            'A color and element exploration that pushed me to combine different styles in one canvas while keeping the final artwork cohesive.',
          tools: ['Procreate'],
        },
      ],
    },
    {
      title: 'Pixel Art Projects',
      role: 'Pixel Art / Retro Visual Design',
      category: 'Illustrations',
      description:
        'A pixel art collection focused on animation, moody scenes, and game-style mockups inspired by retro visuals.',
      tools: ['Procreate'],
      details:
        'This project helped me explore pixel-based artwork, from small animated commissions to game-style mockups. I focused on mood, readability, and making each scene feel like it could belong in a playable world.',
      preview: {
        type: 'image',
        src: px2,
        alt: 'Pixel Art Projects Preview',
        label: 'PX2',
        previewPosition: 'object-right',
      },
      media: [
        {
          type: 'image',
          src: px1,
          alt: 'Pixel Art Animation Commission',
          label: 'Pixel Art Animation Commission',
          details:
            'A pixel art commission that pushed me to practice animation, timing, and small-frame movement while keeping the artwork readable and expressive.',
          tools: ['Procreate', 'Aseprite'],
        },
        {
          type: 'image',
          src: px2,
          alt: 'Train on a Wheat Field',
          label: 'Train on a Wheat Field',
          details:
            'A moody pixel art illustration where I explored atmosphere, quiet scenery, and a softer visual direction using a train and wheat field composition.',
          tools: ['Procreate'],
        },
        {
          type: 'stack',
          label: 'PX3 Game Concept',
          details:
            'An original game mockup concept where I explored how my own idea could look as a pixel-style game scene.',
          tools: ['Procreate'],
          items: [
            {
              type: 'image',
              src: px3,
              alt: 'PX3 Game Concept',
              label: 'PX3 Game Concept',
              details:
                'An original game mockup concept where I explored how my own idea could look as a pixel-style game scene.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px31,
              alt: 'PX3.1 Game Concept',
              label: 'PX3.1 Game Concept',
              details:
                'A continuation of the original PX3 game mockup concept, focused on scene variation and visual consistency.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px32,
              alt: 'PX3.2 Game Concept',
              label: 'PX3.2 Game Concept',
              details:
                'A continuation of the original PX3 game mockup concept, focused on scene variation and visual consistency.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px33,
              alt: 'PX3.3 Game Concept',
              label: 'PX3.3 Game Concept',
              details:
                'A continuation of the original PX3 game mockup concept, focused on scene variation and visual consistency.',
              tools: ['Procreate'],
            },
          ],
        },
        {
          type: 'stack',
          label: 'PX4 Game Redesign Concept',
          details:
            'A “what if” redesign concept where I reimagined an idea as a pixel-style game mockup with a retro interface and playful scene direction.',
          tools: ['Procreate'],
          items: [
            {
              type: 'image',
              src: px4,
              alt: 'PX4 Game Redesign Concept',
              label: 'PX4 Game Redesign Concept',
              details:
                'A “what if” redesign concept where I reimagined an idea as a pixel-style game mockup with a retro interface and playful scene direction.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px41,
              alt: 'PX4.1 Game Redesign Concept',
              label: 'PX4.1 Game Redesign Concept',
              details:
                'A variation of the PX4 game redesign concept, focused on expanding the mockup’s visual direction.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px42,
              alt: 'PX4.2 Game Redesign Concept',
              label: 'PX4.2 Game Redesign Concept',
              details:
                'A variation of the PX4 game redesign concept, focused on expanding the mockup’s visual direction.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px43,
              alt: 'PX4.3 Game Redesign Concept',
              label: 'PX4.3 Game Redesign Concept',
              details:
                'A variation of the PX4 game redesign concept, focused on expanding the mockup’s visual direction.',
              tools: ['Procreate'],
            },
          ],
        },
        {
          type: 'stack',
          label: 'PX5 Game Redesign Concept',
          details:
            'A “what if” redesign concept where I explored how an existing idea could feel like a pixel-style game world.',
          tools: ['Procreate'],
          items: [
            {
              type: 'image',
              src: px5,
              alt: 'PX5 Game Redesign Concept',
              label: 'PX5 Game Redesign Concept',
              details:
                'A “what if” redesign concept where I explored how an existing idea could feel like a pixel-style game world.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px51,
              alt: 'PX5.1 Game Redesign Concept',
              label: 'PX5.1 Game Redesign Concept',
              details:
                'A variation of the PX5 game redesign concept, focused on testing layout, scene rhythm, and pixel UI direction.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px52,
              alt: 'PX5.2 Game Redesign Concept',
              label: 'PX5.2 Game Redesign Concept',
              details:
                'A variation of the PX5 game redesign concept, focused on testing layout, scene rhythm, and pixel UI direction.',
              tools: ['Procreate'],
            },
            {
              type: 'image',
              src: px53,
              alt: 'PX5.3 Game Redesign Concept',
              label: 'PX5.3 Game Redesign Concept',
              details:
                'A variation of the PX5 game redesign concept, focused on testing layout, scene rhythm, and pixel UI direction.',
              tools: ['Procreate'],
            },
          ],
        },
      ],
    },
    {
      title: 'GPX Design Projects',
      role: 'Graphic Design / Poster Design',
      category: 'GPX Design',
      description:
        'A collection of graphic design works where I practiced posters, typography, image treatment, and layout design across different visual styles.',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
      details:
        'This collection shows my practice in graphic design through poster layouts, typography experiments, image filters, and product-style compositions. Each piece helped me build confidence with visual hierarchy and stronger design decisions.',
      preview: {
        type: 'image',
        src: gpx1,
        alt: 'Goodbye Eri Poster Preview',
        label: 'Goodbye Eri Poster',
        previewPosition: 'object-right',
      },
      media: [
        {
          type: 'image',
          src: gpx1,
          alt: 'Goodbye Eri Poster',
          label: 'Goodbye Eri Poster',
          details:
            'An exploration poster where I played with layout, visual elements, and composition. This piece helped shape my Photoshop skills and made me more comfortable building stronger poster layouts.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx2,
          alt: 'Music Poster',
          label: 'Music Poster',
          details:
            'A music poster exploration where I practiced Photoshop techniques, image treatment, and composition to create a stronger graphic poster style.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx3,
          alt: 'Photoshop Exploration Poster',
          label: 'Photoshop Exploration Poster',
          details:
            'A Photoshop exploration poster where I practiced layout, image treatment, and composition using references and assets from Envato and Pinterest.',
          tools: ['Adobe Photoshop', 'Envato', 'Pinterest'],
        },
        {
          type: 'image',
          src: gpx4,
          alt: 'Nothing Headphone 1 Poster',
          label: 'Nothing Headphone 1 Poster',
          details:
            'A product design poster for Nothing Headphone 1, created to practice product-focused layout, clean composition, and a stronger commercial poster style.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx5,
          alt: 'Academic Poster',
          label: 'Academic Poster',
          details:
            'An academic organization poster made in Canva. This helped me learn the basic fundamentals of Canva while practicing layout, hierarchy, and clean academic poster design.',
          tools: ['Canva'],
        },
        {
          type: 'image',
          src: gpx6,
          alt: 'Photoshop Poster Exploration',
          label: 'Photoshop Poster Exploration',
          details:
            'A graphic poster exploration where I practiced Photoshop techniques, image treatment, and composition to create a stronger visual design.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx7,
          alt: 'Movie Poster Plainclothes',
          label: 'Movie Poster (Plainclothes)',
          details:
            'A practice movie poster for Plainclothes, focused on creating a visually impactful composition through mood, contrast, and poster-style image treatment.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx8,
          alt: 'Ribs by Lorde Poster',
          label: 'Ribs by Lorde Poster',
          details:
            'A music poster inspired by Ribs by Lorde, where I explored Photoshop techniques and Illustrator typography to create a more expressive GPX design.',
          tools: ['Adobe Photoshop', 'Adobe Illustrator'],
        },
        {
          type: 'image',
          src: gpx9,
          alt: 'GPX Technique Exploration',
          label: 'GPX',
          details:
            'A GPX exploration where I practiced Photoshop image filters and text design in Adobe Illustrator to create a stronger mixed-tool graphic style.',
          tools: ['Adobe Photoshop', 'Adobe Illustrator'],
        },
        {
          type: 'image',
          src: gpx10,
          alt: 'Photoshop Poster Exploration',
          label: 'Photoshop Poster Exploration',
          details:
            'A graphic poster exploration where I practiced Photoshop techniques, image treatment, and composition to create a stronger visual design.',
          tools: ['Adobe Photoshop'],
        },
        {
          type: 'image',
          src: gpx11,
          alt: 'Academic Activity',
          label: 'Academic Activity',
          details:
            'An academic activity made while learning Photoshop as part of our subject. This helped me practice color techniques, editing basics, and visual control inside Photoshop.',
          tools: ['Adobe Photoshop'],
        },
      ],
    },
    {
      title: 'Internship Graphics',
      role: 'Graphic Design / Internship Visual Works',
      category: 'GPX Design',
      description:
        'A collection of graphic design works created during internship tasks, focusing on workplace visuals, announcements, layouts, and design support materials.',
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
      details:
        'This project highlights internship-related graphic design works created for workplace communication and visual support. The focus is on producing clear, presentable, and practical designs that support announcements, internal materials, and creative office-related visuals.',
      media: [],
    },
    {
      title: 'InternPortfolio',
      role: 'Personal Portfolio / Internship Application Website',
      category: 'WebSystem',
      description:
        'A personal portfolio website I built and used for my internship applications.',
      tools: ['React', 'Tailwind CSS', 'Visual Studio Code', 'DeepseekAI'],
      details:
        'InternPortfolio is my previous portfolio website that I used for internship applications. I built it to present my works, skills, and creative direction in a simple but personal way, while also improving how I structure frontend layouts.',
      liveLink: 'https://chromaportfolio.vercel.app/',
      preview: {
        type: 'image',
        src: internPortfolioPreview,
        alt: 'InternPortfolio Website Preview',
        label: 'InternPortfolio',
        previewPosition: 'object-right',
      },
      media: [],
    },
    {
      title: 'TrackED',
      role: 'Capstone Project / Web-Based Tracking System',
      category: 'WebSystem',
      description:
        'A capstone project for Cavite State University - Imus Campus, built to help professors and students monitor campus-related academic status and records.',
      tools: ['React', 'Tailwind CSS', 'MySQL', 'Hostinger', 'VSCode'],
      details:
        'TrackED is a capstone project for Cavite State University - Imus Campus. The system was designed to help both professors and students monitor academic status, records, and progress in a more organized way. Working on this project helped me polish my UX thinking and frontend development skills.',
      liveLink: 'https://trackedproject.vercel.app/',
      preview: {
        type: 'image',
        src: trackEdPreview,
        alt: 'TrackED Website Preview',
        label: 'TrackED',
        previewPosition: 'object-right',
      },
      media: [],
    },
    {
      title: 'Ctrl + Alt + Delight',
      role: 'Kiosk/POS System / Cookie Ordering System',
      category: 'WebSystem',
      description:
        'A kiosk and POS system made for an academic project, focused on ordering flow, product display, and a cleaner user experience.',
      tools: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'PHP', 'Visual Studio Code'],
      details:
        'Ctrl + Alt + Delight is a kiosk and POS system created for an academic project. I designed it around a cookie ordering experience, focusing on a clear menu layout, smooth ordering flow, and a playful interface. This project helped me improve my UX design decisions and frontend layout skills.',
      liveLink: 'https://ctrl-alt-delight-eta.vercel.app/',
      preview: {
        type: 'image',
        src: ctrlAltDelightPreview,
        alt: 'Ctrl + Alt + Delight Website Preview',
        label: 'Ctrl + Alt + Delight',
        previewPosition: 'object-right',
      },
      media: [],
    },
    {
      title: '[UPCOMING]',
      titleClassName: 'text-[#FF0000]',
      role: 'Photobooth / Interactive Photo Experience',
      category: 'WebSystem',
      description: '',
      tools: ['React', 'Tailwind CSS', 'Camera API'],
      details:
        'Photobooth is an upcoming web system concept designed for a simple and enjoyable photo-taking experience. The project will focus on camera interaction, preview flow, and a playful visual interface.',
      media: [],
    },
    {
      title: 'Promotional Video',
      role: 'Video Editing / Promotional Content',
      category: 'Video Edit',
      description:
        'An upcoming promotional video project focused on clean pacing, visual rhythm, and engaging storytelling.',
      tools: ['CapCut', 'VN Editor', 'Canva Video Editor'],
      details:
        'This upcoming video editing project will focus on creating a polished promotional video with clean cuts, smooth pacing, strong visual rhythm, and a clear storytelling flow.',
      media: [],
    },
  ];

  const filteredProjects =
    displayedFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === displayedFilter);

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/MchaelRh',
      rotate: 'group-hover:rotate-[-6deg]',
      path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/michael-gonzales-ba65a2361/',
      rotate: 'group-hover:rotate-[6deg]',
      path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/chromaa.png/',
      rotate: 'group-hover:rotate-[-6deg]',
      path: 'M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z',
    },
    {
      label: 'Email',
      href: emailLink,
      rotate: 'group-hover:rotate-[8deg]',
      path: 'M21.86 3.45C22.1 2.75 21.42 2.08 20.72 2.33L2.95 8.58C2.16 8.86 2.08 9.94 2.83 10.33L8.53 13.26L17.38 6.66C17.67 6.45 18.04 6.82 17.82 7.1L11.13 15.9L14.2 21.22C14.61 21.94 15.68 21.83 15.96 21.05L21.86 3.45Z',
    },
  ];

  useEffect(() => {
    const handleMotionMode = () => {
      setIsDesktopMotion(window.matchMedia('(min-width: 768px)').matches);
    };

    handleMotionMode();

    window.addEventListener('resize', handleMotionMode);

    return () => {
      window.removeEventListener('resize', handleMotionMode);
    };
  }, []);

  useEffect(() => {
    const incomingFilter = location.state?.filter;
    const incomingProjectTitle = location.state?.projectTitle;
    const shouldScrollToProject = location.state?.scrollToProject;

    if (!incomingFilter && !incomingProjectTitle) return;

    clearTimeout(filterCollapseTimeoutRef.current);
    clearTimeout(filterEnterTimeoutRef.current);

    const validFilter = filters.some((filter) => filter.label === incomingFilter)
      ? incomingFilter
      : 'All';

    setActiveFilter(validFilter);
    setDisplayedFilter(validFilter);
    setAnimatingFilter(null);
    setProjectCardStage('idle');

    if (!shouldScrollToProject || !incomingProjectTitle) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetCard = projectCardTitleRefs.current[incomingProjectTitle];

        if (!targetCard) return;

        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    });
  }, [location.state]);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    syncTheme();

    window.addEventListener('portfolio-theme-change', syncTheme);
    window.addEventListener('storage', syncTheme);

    return () => {
      window.removeEventListener('portfolio-theme-change', syncTheme);
      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  useEffect(() => {
    const pageElement = pageRef.current;

    if (!pageElement) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    cursorGridTargetRef.current = {
      x: centerX,
      y: centerY,
    };

    cursorGridCurrentRef.current = {
      x: centerX,
      y: centerY,
    };

    pageElement.style.setProperty('--projects-cursor-x', `${centerX}px`);
    pageElement.style.setProperty('--projects-cursor-y', `${centerY}px`);

    if (!isDesktopMotion) return undefined;

    const handleMouseMove = (event) => {
      cursorGridTargetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const animateCursorGrid = () => {
      cursorGridCurrentRef.current.x +=
        (cursorGridTargetRef.current.x - cursorGridCurrentRef.current.x) * 0.055;
      cursorGridCurrentRef.current.y +=
        (cursorGridTargetRef.current.y - cursorGridCurrentRef.current.y) * 0.055;

      cursorGridFrameRef.current += 1;

      if (cursorGridFrameRef.current % 3 === 0) {
        pageElement.style.setProperty(
          '--projects-cursor-x',
          `${cursorGridCurrentRef.current.x}px`
        );

        pageElement.style.setProperty(
          '--projects-cursor-y',
          `${cursorGridCurrentRef.current.y}px`
        );
      }

      cursorGridAnimationRef.current = requestAnimationFrame(animateCursorGrid);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    cursorGridAnimationRef.current = requestAnimationFrame(animateCursorGrid);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(cursorGridAnimationRef.current);
    };
  }, [isDesktopMotion]);

  useEffect(() => {
    const handleScrollState = () => {
      const footerElement = footerRef.current;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();

        const isMobile = viewportWidth < 640;
        const socialCheckX = viewportWidth - 32;
        const socialCheckY = isMobile ? viewportHeight - 92 : viewportHeight / 2;

        const isOverFooter =
          footerRect.top <= socialCheckY &&
          footerRect.bottom >= socialCheckY &&
          footerRect.left <= socialCheckX &&
          footerRect.right >= socialCheckX;

        setIsSocialOnDark(isOverFooter);
      }

      const scrollPosition = window.scrollY + viewportHeight;
      const pageHeight = document.documentElement.scrollHeight;

      setIsAtBottom(scrollPosition >= pageHeight - 100);
    };

    handleScrollState();

    window.addEventListener('scroll', handleScrollState, { passive: true });
    window.addEventListener('resize', handleScrollState);

    return () => {
      window.removeEventListener('scroll', handleScrollState);
      window.removeEventListener('resize', handleScrollState);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedProject]);

  useEffect(() => {
    return () => {
      clearTimeout(filterCollapseTimeoutRef.current);
      clearTimeout(filterEnterTimeoutRef.current);
    };
  }, []);

  const setCardBehindDistances = () => {
    const firstCard = projectCardRefs.current[0];

    if (!firstCard) return;

    const firstCardTop = firstCard.offsetTop;

    projectCardRefs.current.forEach((cardElement, index) => {
      if (!cardElement) return;

      const distanceToFirstCard = firstCardTop - cardElement.offsetTop;

      cardElement.style.setProperty(
        '--project-card-behind-y',
        `${distanceToFirstCard}px`
      );

      cardElement.style.setProperty('--project-card-index', index);
    });
  };

  const handleFilterClick = (filterLabel) => {
    if (animatingFilter || activeFilter === filterLabel) return;

    clearTimeout(filterCollapseTimeoutRef.current);
    clearTimeout(filterEnterTimeoutRef.current);

    setCardBehindDistances();

    setAnimatingFilter(filterLabel);
    setProjectCardStage('collapsing');

    filterCollapseTimeoutRef.current = setTimeout(() => {
      setActiveFilter(filterLabel);
      setDisplayedFilter(filterLabel);
      projectCardRefs.current = [];
      projectCardTitleRefs.current = {};
      setProjectCardStage('preparingEnter');

      requestAnimationFrame(() => {
        setCardBehindDistances();

        requestAnimationFrame(() => {
          setProjectCardStage('entering');
        });
      });

      filterEnterTimeoutRef.current = setTimeout(() => {
        setProjectCardStage('idle');
        setAnimatingFilter(null);
      }, 780);
    }, 760);
  };

  const getProjectPreviewMedia = (project) => {
    if (project.preview) return project.preview;

    if (!Array.isArray(project.media) || project.media.length === 0) return null;

    const firstMedia = project.media[0];

    if (firstMedia.type === 'stack' && Array.isArray(firstMedia.items)) {
      return firstMedia.items[0] || null;
    }

    return firstMedia;
  };

  const renderProjectPreview = (project) => {
    const previewMedia = getProjectPreviewMedia(project);

    if (!previewMedia) return null;

    const previewPositionClass =
      previewMedia.previewPosition || 'object-center';

    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] block w-[48%] overflow-hidden opacity-35 transition-opacity duration-500 group-hover:opacity-50 sm:w-[46%] md:opacity-42 md:group-hover:opacity-58 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.24)_12%,black_28%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.24)_12%,black_28%,black_100%)]">
        {previewMedia.type === 'video' ? (
          <video
            src={previewMedia.src}
            className={`h-full w-full object-cover ${previewPositionClass}`}
            muted
            playsInline
            preload="metadata"
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            src={previewMedia.src}
            alt={previewMedia.alt || project.title}
            className={`h-full w-full object-cover ${previewPositionClass}`}
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    );
  };

  const handleFloatingArrowClick = () => {
    window.scrollTo({
      top: isAtBottom ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const getFilterButtonClass = (isActive, isAnimating) => {
    if (isAnimating) {
      return `group relative flex items-center gap-2 overflow-hidden border-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
        isDarkMode ? 'border-white text-black' : 'border-black text-white'
      }`;
    }

    if (isActive) {
      return `group relative flex items-center gap-2 overflow-hidden border-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
        isDarkMode
          ? 'border-white bg-white text-black'
          : 'border-black bg-black text-white'
      }`;
    }

    return `group relative flex items-center gap-2 overflow-hidden border-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
      isDarkMode
        ? 'border-white bg-black/50 text-white hover:text-black'
        : 'border-black bg-[#d9d9d9]/50 text-black hover:text-white'
    }`;
  };

  const getProjectCardAnimationClass = (index) => {
    if (projectCardStage === 'preparingEnter') {
      return index === 0
        ? 'project-card-preparing-first'
        : 'project-card-preparing-behind';
    }

    if (projectCardStage === 'collapsing') {
      return index === 0
        ? 'animate-[projectFirstCardCover_760ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
        : 'animate-[projectCardSlideBehind_720ms_cubic-bezier(0.22,1,0.36,1)_forwards]';
    }

    if (projectCardStage === 'entering') {
      return index === 0
        ? 'animate-[projectFirstCardReveal_560ms_cubic-bezier(0.22,1,0.36,1)_both]'
        : 'animate-[projectCardSlideFromBehind_720ms_cubic-bezier(0.22,1,0.36,1)_both]';
    }

    return '';
  };

  const socialIconClass = `group flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-[#FF0000] sm:h-10 sm:w-10 sm:hover:-translate-x-1 sm:hover:translate-y-0 lg:h-auto lg:w-auto ${
    isSocialOnDark
      ? 'text-[#FF0000]'
      : isDarkMode
        ? 'text-white'
        : 'text-black'
  }`;

  return (
    <div
      ref={pageRef}
      className={`relative min-h-screen select-none overflow-x-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-black text-white' : 'bg-[#d9d9d9] text-black'
      }`}
    >
      <div
        className={`pointer-events-none fixed inset-0 z-0 animate-[projectsGridDrift_46s_linear_infinite] ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:38px_38px]`}
      />

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[projectsGridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.12)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55 [mask-image:radial-gradient(circle_at_var(--projects-cursor-x,50%)_var(--projects-cursor-y,50%),black_0,black_44px,transparent_118px)] [-webkit-mask-image:radial-gradient(circle_at_var(--projects-cursor-x,50%)_var(--projects-cursor-y,50%),black_0,black_44px,transparent_118px)] md:block" />

      <div
        className={`pointer-events-none fixed inset-0 z-[2] ${
          isDarkMode
            ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1.1px,transparent_1.3px)] opacity-[0.14] md:opacity-[0.18]'
            : 'bg-[radial-gradient(circle,rgba(0,0,0,0.12)_1.1px,transparent_1.3px)] opacity-[0.13] md:opacity-[0.16]'
        } bg-[size:20px_20px] md:bg-[size:18px_18px]`}
      />

      <div
        className={`pointer-events-none fixed inset-0 z-[3] hidden md:block ${
          isDarkMode
            ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1.25px,transparent_1.5px)] opacity-[0.16]'
            : 'bg-[radial-gradient(circle,rgba(0,0,0,0.22)_1.25px,transparent_1.5px)] opacity-[0.14]'
        } bg-[size:20px_20px] [mask-image:radial-gradient(circle_at_8%_18%,black_0,black_70px,transparent_235px),radial-gradient(circle_at_92%_72%,black_0,black_70px,transparent_255px)] [-webkit-mask-image:radial-gradient(circle_at_8%_18%,black_0,black_70px,transparent_235px),radial-gradient(circle_at_92%_72%,black_0,black_70px,transparent_255px)]`}
      />

      <style>
        {`
          @keyframes projectsGridDrift {
            0% {
              background-position: 0px 0px, 0px 0px;
            }

            100% {
              background-position: 38px 38px, 38px 38px;
            }
          }

          .project-card-preparing-first {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }

          .project-card-preparing-behind {
            opacity: 1;
            transform: translate3d(0, var(--project-card-behind-y), 0);
          }

          @keyframes projectFirstCardCover {
            0% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }

            82% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }

            100% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes projectCardSlideBehind {
            0% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }

            78% {
              opacity: 1;
              transform: translate3d(0, var(--project-card-behind-y), 0);
            }

            100% {
              opacity: 0;
              transform: translate3d(0, var(--project-card-behind-y), 0);
            }
          }

          @keyframes projectFirstCardReveal {
            0% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes projectCardSlideFromBehind {
            0% {
              opacity: 1;
              transform: translate3d(0, var(--project-card-behind-y), 0);
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.001ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.001ms !important;
            }
          }
        `}
      </style>

      <section className="relative z-10 px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1
              className={`font-snellroundhand mb-6 text-6xl leading-none tracking-wide transition-colors duration-500 md:mb-7 md:text-7xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Projects
            </h1>

            <p
              className={`text-xs font-bold transition-colors duration-500 ${
                isDarkMode ? 'text-white/70' : 'text-black'
              }`}
            >
              My Creative Works..
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.label;
              const isAnimating = animatingFilter === filter.label;
              const filterFillClass = isDarkMode ? 'bg-white' : 'bg-black';

              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => handleFilterClick(filter.label)}
                  disabled={Boolean(animatingFilter)}
                  className={getFilterButtonClass(isActive, isAnimating)}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width] duration-500 ease-out ${filterFillClass} ${
                      isAnimating
                        ? 'w-[190%]'
                        : isActive
                          ? 'w-[190%]'
                          : 'w-0 group-hover:w-[190%]'
                    }`}
                  />

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive || isAnimating
                        ? 'text-[#FF0000]'
                        : isDarkMode
                          ? 'text-white group-hover:text-[#FF0000]'
                          : 'text-black group-hover:text-[#FF0000]'
                    }`}
                  >
                    {filter.icon}
                  </span>

                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className={`grid gap-4 ${
              projectCardStage !== 'idle' ? 'pointer-events-none' : ''
            }`}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const isFirstCard = index === 0;
                const firstCardCoverClass =
                  projectCardStage !== 'idle' && isFirstCard
                    ? isDarkMode
                      ? 'bg-black'
                      : 'bg-[#d9d9d9]'
                    : 'bg-transparent';

                return (
                  <button
                    key={`${displayedFilter}-${project.title}`}
                    ref={(element) => {
                      projectCardRefs.current[index] = element;

                      if (element) {
                        projectCardTitleRefs.current[project.title] = element;
                      }
                    }}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className={`group relative overflow-hidden border-2 p-6 text-left will-change-transform transition-colors duration-500 ${firstCardCoverClass} ${getProjectCardAnimationClass(
                      index
                    )} ${
                      isDarkMode
                        ? 'border-white text-white hover:text-black'
                        : 'border-black text-black hover:text-white'
                    }`}
                    style={{
                      '--project-card-index': index,
                      '--project-card-behind-y': '0px',
                      zIndex:
                        projectCardStage !== 'idle'
                          ? isFirstCard
                            ? 100
                            : 100 - index
                          : filteredProjects.length - index,
                      animationDelay:
                        projectCardStage === 'entering'
                          ? isFirstCard
                            ? '0ms'
                            : `${Math.min(index * 34, 110)}ms`
                          : isFirstCard
                            ? '0ms'
                            : `${Math.min(index * 42, 130)}ms`,
                    }}
                  >
                    <span
                      className={`absolute left-1/2 top-1/2 z-0 aspect-square w-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width] duration-700 ease-out group-hover:w-[160%] ${
                        isDarkMode ? 'bg-white' : 'bg-black'
                      }`}
                    />

                    {renderProjectPreview(project)}

                    <div className="relative z-10 flex max-w-[62%] items-start gap-6 sm:max-w-[64%] md:max-w-[68%]">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold text-[#FF0000]">
                            [*] {String(index + 1).padStart(2, '0')}
                          </p>

                          {project.liveLink ? (
                            <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                              Live Link
                            </span>
                          ) : project.media && project.media.length > 0 ? (
                            <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                              {project.media.length} Works
                            </span>
                          ) : (
                            <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                              Upcoming
                            </span>
                          )}
                        </div>

                        <h2
                          className={`text-xl font-bold ${
                            project.titleClassName || ''
                          }`}
                        >
                          {project.title}
                        </h2>

                        <p className="mt-1 text-xs font-bold opacity-70">
                          {project.role}
                        </p>

                        {project.description ? (
                          <p className="mt-5 max-w-2xl text-sm leading-relaxed">
                            {project.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div
                className={`border-2 border-dotted p-8 text-center transition-colors duration-500 ${
                  isDarkMode ? 'border-white' : 'border-black'
                }`}
              >
                <p
                  className={`text-sm font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  No projects found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <div
        className={`fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full border-2 px-3 py-2 backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-5 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col sm:gap-4 sm:px-3 sm:py-5 lg:right-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
          isSocialOnDark
            ? 'border-[#FF0000] bg-black/60'
            : isDarkMode
              ? 'border-white bg-black/80'
              : 'border-black bg-[#d9d9d9]/90'
        }`}
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.label === 'Email' ? undefined : '_blank'}
            rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
            aria-label={social.label}
            className={socialIconClass}
            draggable="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${social.rotate} sm:h-6 sm:w-6`}
            >
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to bottom'}
        onClick={handleFloatingArrowClick}
        className={`fixed bottom-6 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 text-xl font-black backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FF0000] ${
          isDarkMode
            ? 'border-white bg-black/90 text-white hover:bg-white'
            : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black'
        } ${
          isAtBottom
            ? 'hover:-translate-y-1'
            : isDarkMode
              ? 'after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white after:opacity-30 after:animate-ping'
              : 'after:absolute after:inset-0 after:rounded-full after:border-2 after:border-black after:opacity-30 after:animate-ping'
        }`}
      >
        <span
          className={`relative z-10 leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isAtBottom ? 'rotate-0' : 'translate-y-[1px]'
          }`}
        >
          {isAtBottom ? '↑' : '↓'}
        </span>
      </button>

      <div className="relative z-10" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default Projects;