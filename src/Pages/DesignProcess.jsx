import { useEffect, useRef, useState } from 'react';

import Footer from '../Components/Footer';

function DesignProcess() {
  const [pathProgress, setPathProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isSocialOnDark, setIsSocialOnDark] = useState(false);
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  const pageRef = useRef(null);
  const mapRef = useRef(null);
  const pathRef = useRef(null);
  const footerRef = useRef(null);
  const cursorGridAnimationRef = useRef(null);
  const cursorGridFrameRef = useRef(0);
  const scrollFrameRef = useRef(null);
  const lastPathProgressRef = useRef(0);
  const lastBottomStateRef = useRef(false);
  const lastSocialStateRef = useRef(false);

  const cursorGridTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorGridCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const [pathLength, setPathLength] = useState(1);

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  const pathD =
    'M150 160 L580 160 Q640 160 640 220 L640 320 Q640 380 700 380 L1180 380 Q1240 380 1240 440 L1240 610 Q1240 670 1180 670 L760 670 Q700 670 700 730 L700 850 Q700 910 640 910 L300 910 Q240 910 240 970 L240 1120 Q240 1180 300 1180 L1030 1180 Q1090 1180 1090 1240 L1090 1330';

  const steps = [
    {
      number: '01',
      title: 'Understand',
      description:
        'I start by knowing what the project is about, who it is for, and what the design needs to solve.',
      cardX: 150,
      cardY: 280,
      markerX: 150,
      markerY: 160,
      progress: 0.04,
    },
    {
      number: '02',
      title: 'Explore',
      description:
        'I check references, design styles, and ideas that can help me find the right direction for the project.',
      cardX: 640,
      cardY: 330,
      markerX: 640,
      markerY: 220,
      progress: 0.18,
    },
    {
      number: '03',
      title: 'Organize',
      description:
        'I arrange the content, sections, priorities, and user flow so the design has a clear structure before designing.',
      cardX: 1240,
      cardY: 250,
      markerX: 1180,
      markerY: 380,
      progress: 0.32,
    },
    {
      number: '04',
      title: 'Layout',
      description:
        'I create a simple layout first to test spacing, hierarchy, and how the user will move through the design.',
      cardX: 1240,
      cardY: 780,
      markerX: 1240,
      markerY: 610,
      progress: 0.46,
    },
    {
      number: '05',
      title: 'Visual Design',
      description:
        'I apply the colors, typography, spacing, images, and small details that make the design feel complete.',
      cardX: 700,
      cardY: 560,
      markerX: 760,
      markerY: 670,
      progress: 0.58,
    },
    {
      number: '06',
      title: 'Make It Feel Real',
      description:
        'I add interactions, movement, and screen flow so the design feels closer to how users will actually experience it.',
      cardX: 240,
      cardY: 790,
      markerX: 300,
      markerY: 910,
      progress: 0.69,
    },
    {
      number: '07',
      title: 'Refining / Revisions / Fixing',
      description:
        'I review the work, fix the parts that feel off, improve spacing, adjust details, and apply feedback until it feels better.',
      cardX: 500,
      cardY: 1290,
      markerX: 300,
      markerY: 1180,
      progress: 0.82,
    },
    {
      number: '08',
      title: 'Final Output',
      description:
        'I prepare the final version, clean the files, and make sure everything is polished and ready to present or use.',
      cardX: 1090,
      cardY: 1180,
      markerX: 1090,
      markerY: 1330,
      progress: 0.94,
    },
  ];

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

    pageElement.style.setProperty('--design-cursor-x', `${centerX}px`);
    pageElement.style.setProperty('--design-cursor-y', `${centerY}px`);

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
          '--design-cursor-x',
          `${cursorGridCurrentRef.current.x}px`
        );

        pageElement.style.setProperty(
          '--design-cursor-y',
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
    if (!pathRef.current) return;

    setPathLength(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const calculateScrollState = () => {
      const mapElement = mapRef.current;
      const footerElement = footerRef.current;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      if (mapElement) {
        const rect = mapElement.getBoundingClientRect();
        const startPoint = viewportHeight * 0.28;
        const hasStarted = rect.top <= startPoint;

        let nextPathProgress = 0;

        if (hasStarted) {
          const progressDistance = rect.height - viewportHeight * 0.35;
          const rawProgress = (startPoint - rect.top) / progressDistance;
          nextPathProgress = Math.min(Math.max(rawProgress, 0), 1);
        }

        if (Math.abs(lastPathProgressRef.current - nextPathProgress) > 0.006) {
          lastPathProgressRef.current = nextPathProgress;
          setPathProgress(nextPathProgress);
        }
      }

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();

        const isMobile = viewportWidth < 640;
        const socialCheckX = viewportWidth - 32;
        const socialCheckY = isMobile ? viewportHeight - 92 : viewportHeight / 2;

        const nextSocialState =
          footerRect.top <= socialCheckY &&
          footerRect.bottom >= socialCheckY &&
          footerRect.left <= socialCheckX &&
          footerRect.right >= socialCheckX;

        if (lastSocialStateRef.current !== nextSocialState) {
          lastSocialStateRef.current = nextSocialState;
          setIsSocialOnDark(nextSocialState);
        }
      }

      const scrollPosition = window.scrollY + viewportHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const nextBottomState = scrollPosition >= pageHeight - 100;

      if (lastBottomStateRef.current !== nextBottomState) {
        lastBottomStateRef.current = nextBottomState;
        setIsAtBottom(nextBottomState);
      }
    };

    const requestScrollFrame = () => {
      if (scrollFrameRef.current) return;

      scrollFrameRef.current = requestAnimationFrame(() => {
        calculateScrollState();
        scrollFrameRef.current = null;
      });
    };

    calculateScrollState();

    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', requestScrollFrame);

    return () => {
      window.removeEventListener('scroll', requestScrollFrame);
      window.removeEventListener('resize', requestScrollFrame);

      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const handleFloatingArrowClick = () => {
    window.scrollTo({
      top: isAtBottom ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
        className={`pointer-events-none fixed inset-0 z-0 animate-[designGridDrift_46s_linear_infinite] ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:38px_38px]`}
      />

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[designGridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.12)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55 [mask-image:radial-gradient(circle_at_var(--design-cursor-x,50%)_var(--design-cursor-y,50%),black_0,black_44px,transparent_118px)] [-webkit-mask-image:radial-gradient(circle_at_var(--design-cursor-x,50%)_var(--design-cursor-y,50%),black_0,black_44px,transparent_118px)] md:block" />

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
          @keyframes designGridDrift {
            0% {
              background-position: 0px 0px, 0px 0px;
            }

            100% {
              background-position: 38px 38px, 38px 38px;
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
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.45em] text-[#FF0000]">
              From idea to polished output
            </p>

            <h1
              className={`font-snellroundhand mb-6 text-6xl leading-none tracking-wide transition-colors duration-500 md:mb-7 md:text-7xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              My Design Process
            </h1>

            <p
              className={`mx-auto max-w-xl text-xs font-bold leading-relaxed transition-colors duration-500 ${
                isDarkMode ? 'text-white/60' : 'text-black/60'
              }`}
            >
              My design process for creating a design from start to finish.
            </p>
          </div>

          <div
            ref={mapRef}
            className={`relative overflow-visible border-2 border-dotted px-5 py-12 transition-colors duration-500 sm:px-8 md:px-12 ${
              isDarkMode
                ? 'border-white bg-black/50'
                : 'border-black bg-[#d9d9d9]/50'
            }`}
          >
            <div
              className={`pointer-events-none absolute -left-3 -top-3 z-30 h-7 w-7 border-l-[5px] border-t-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-l-[6px] sm:border-t-[6px] ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            />
            <div
              className={`pointer-events-none absolute -right-3 -top-3 z-30 h-7 w-7 border-r-[5px] border-t-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-r-[6px] sm:border-t-[6px] ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            />
            <div
              className={`pointer-events-none absolute -bottom-3 -left-3 z-30 h-7 w-7 border-b-[5px] border-l-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-b-[6px] sm:border-l-[6px] ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            />
            <div
              className={`pointer-events-none absolute -bottom-3 -right-3 z-30 h-7 w-7 border-b-[5px] border-r-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-b-[6px] sm:border-r-[6px] ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={`absolute inset-0 ${
                  isDarkMode ? 'opacity-[0.11]' : 'opacity-[0.065]'
                }`}
              >
                <div
                  className={`h-full w-full ${
                    isDarkMode
                      ? 'bg-[radial-gradient(circle,#fff_1px,transparent_1px)]'
                      : 'bg-[radial-gradient(circle,#000_1px,transparent_1px)]'
                  } [background-size:22px_22px]`}
                />
              </div>

              <div
                className={`absolute inset-0 hidden md:block ${
                  isDarkMode
                    ? 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_85%_78%,rgba(255,255,255,0.06),transparent_30%)]'
                    : 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_85%_78%,rgba(0,0,0,0.06),transparent_30%)]'
                }`}
              />
            </div>

            <div className="relative mx-auto hidden min-h-[1500px] max-w-[1400px] md:block">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1400 1500"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="processPathGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1500"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FF0000" />
                    <stop offset="42%" stopColor="#FF1A1A" />
                    <stop offset="68%" stopColor="#FF4F8B" />
                    <stop offset="100%" stopColor="#FF8AC8" />
                  </linearGradient>
                </defs>

                <path
                  ref={pathRef}
                  d={pathD}
                  stroke={isDarkMode ? 'white' : 'black'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 18"
                  opacity="0.32"
                />

                <path
                  d={pathD}
                  stroke="url(#processPathGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${pathLength} ${pathLength}`}
                  strokeDashoffset={pathLength * (1 - pathProgress)}
                  opacity={pathProgress > 0.001 ? 1 : 0}
                  className="transition-[stroke-dashoffset,opacity] duration-200 ease-out will-change-[stroke-dashoffset]"
                />

                {steps.map((step) => {
                  const isReached = pathProgress >= step.progress;

                  return (
                    <g key={`connector-${step.number}`}>
                      <line
                        x1={step.markerX}
                        y1={step.markerY}
                        x2={step.cardX}
                        y2={step.cardY}
                        stroke={isDarkMode ? 'white' : 'black'}
                        strokeWidth="2"
                        strokeDasharray="6 10"
                        opacity="0.4"
                      />

                      <line
                        x1={step.markerX}
                        y1={step.markerY}
                        x2={step.cardX}
                        y2={step.cardY}
                        stroke="url(#processPathGradient)"
                        strokeWidth="3"
                        strokeDasharray="6 10"
                        opacity={isReached ? 1 : 0}
                        className="transition-opacity duration-500"
                      />

                      <circle
                        cx={step.markerX}
                        cy={step.markerY}
                        r="9"
                        fill={isReached ? '#FF0000' : isDarkMode ? '#000' : '#d9d9d9'}
                        stroke={isDarkMode ? 'white' : 'black'}
                        strokeWidth="3"
                        className="transition-[fill,stroke] duration-500"
                      />

                      <circle
                        cx={step.markerX}
                        cy={step.markerY}
                        r="3"
                        fill={isReached ? 'white' : isDarkMode ? 'white' : 'black'}
                        className="transition-[fill] duration-500"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute left-[7%] top-[7%] flex items-center gap-2">
                <span
                  className={`text-3xl transition-[color,transform] duration-500 ${
                    pathProgress > 0.02
                      ? 'scale-110 text-[#FF0000]'
                      : isDarkMode
                        ? 'text-white/40'
                        : 'text-black/40'
                  }`}
                >
                  ⚑
                </span>

                <span
                  className={`border-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${
                    isDarkMode ? 'border-white' : 'border-black'
                  } ${
                    pathProgress > 0.02
                      ? isDarkMode
                        ? 'bg-white text-black'
                        : 'bg-black text-white'
                      : isDarkMode
                        ? 'bg-black text-white'
                        : 'bg-[#d9d9d9] text-black'
                  }`}
                >
                  Start
                </span>
              </div>

              <div className="absolute left-[74%] top-[87%] flex items-center gap-2">
                <span
                  className={`text-4xl transition-[color,transform] duration-500 ${
                    pathProgress >= 0.94
                      ? 'scale-125 text-[#FF8AC8]'
                      : isDarkMode
                        ? 'text-white/40'
                        : 'text-black/40'
                  }`}
                >
                  ✦
                </span>

                <span
                  className={`border-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${
                    isDarkMode ? 'border-white' : 'border-black'
                  } ${
                    pathProgress >= 0.94
                      ? 'bg-[#FF8AC8] text-white'
                      : isDarkMode
                        ? 'bg-white text-black'
                        : 'bg-black text-white'
                  }`}
                >
                  Finish
                </span>
              </div>

              {steps.map((step, index) => {
                const isFinish = index === steps.length - 1;
                const isReached = pathProgress >= step.progress;
                const stepAccent =
                  step.progress >= 0.82
                    ? '#FF8AC8'
                    : step.progress >= 0.58
                      ? '#FF4F8B'
                      : '#FF0000';

                return (
                  <article
                    key={step.number}
                    className={`group absolute w-[250px] -translate-x-1/2 -translate-y-1/2 border-2 p-5 will-change-transform transition-[background-color,color,border-color,transform] duration-500 hover:-translate-y-[56%] ${
                      isDarkMode ? 'border-white' : 'border-black'
                    } ${
                      isReached
                        ? isDarkMode
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                        : isDarkMode
                          ? 'bg-black text-white hover:bg-white hover:text-black'
                          : 'bg-[#d9d9d9] text-black hover:bg-black hover:text-white'
                    }`}
                    style={{
                      left: `${(step.cardX / 1400) * 100}%`,
                      top: `${(step.cardY / 1500) * 100}%`,
                    }}
                  >
                    <div
                      className={`absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center border-2 text-xs font-black transition-[background-color,color,border-color] duration-500 ${
                        isDarkMode ? 'border-white' : 'border-black'
                      }`}
                      style={{
                        backgroundColor: isReached ? stepAccent : isDarkMode ? '#000' : '#d9d9d9',
                        color: isReached ? 'white' : '#FF0000',
                      }}
                    >
                      {isFinish ? '✓' : step.number}
                    </div>

                    <p
                      className="mt-3 text-[10px] font-black uppercase tracking-[0.2em]"
                      style={{
                        color: isReached ? stepAccent : '#FF0000',
                      }}
                    >
                      [{step.number}]
                    </p>

                    <h2 className="mt-2 text-lg font-black uppercase tracking-wide">
                      {step.title}
                    </h2>

                    <p
                      className={`mt-3 text-xs font-bold leading-relaxed transition-opacity duration-500 ${
                        isReached
                          ? 'opacity-85'
                          : 'opacity-70 group-hover:opacity-85'
                      }`}
                    >
                      {step.description}
                    </p>

                    <div
                      className={`mt-4 h-1 w-full border transition-[background-color,border-color] duration-500 ${
                        isDarkMode ? 'border-white' : 'border-black'
                      }`}
                      style={{
                        backgroundColor: isReached ? stepAccent : 'transparent',
                      }}
                    />
                  </article>
                );
              })}
            </div>

            <div className="relative z-10 flex flex-col gap-8 md:hidden">
              <div
                className={`mx-auto border-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${
                  isDarkMode ? 'border-white' : 'border-black'
                } ${
                  pathProgress > 0.02
                    ? isDarkMode
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                    : isDarkMode
                      ? 'bg-black text-white'
                      : 'bg-[#d9d9d9] text-black'
                }`}
              >
                Start
              </div>

              {steps.map((step, index) => {
                const isFinish = index === steps.length - 1;
                const mobileProgressStep = pathProgress * steps.length;
                const isReached = mobileProgressStep >= index + 0.5;
                const stepAccent =
                  step.progress >= 0.82
                    ? '#FF8AC8'
                    : step.progress >= 0.58
                      ? '#FF4F8B'
                      : '#FF0000';

                return (
                  <div key={step.number} className="relative pl-10">
                    <div
                      className={`absolute left-4 top-0 h-full border-l-2 border-dotted ${
                        isDarkMode ? 'border-white/40' : 'border-black/40'
                      }`}
                    />

                    <div
                      className="absolute left-4 top-0 h-full border-l-2 transition-colors duration-300"
                      style={{
                        borderColor: isReached ? stepAccent : 'transparent',
                      }}
                    />

                    <div
                      className={`absolute left-0 top-1 z-10 flex h-9 w-9 items-center justify-center border-2 text-xs font-black transition-[background-color,color,border-color] duration-300 ${
                        isDarkMode ? 'border-white' : 'border-black'
                      }`}
                      style={{
                        backgroundColor: isReached ? stepAccent : isDarkMode ? '#000' : '#d9d9d9',
                        color: isReached ? 'white' : '#FF0000',
                      }}
                    >
                      {isFinish ? '✓' : step.number}
                    </div>

                    <article
                      className={`border-2 p-5 transition-colors duration-500 ${
                        isDarkMode ? 'border-white' : 'border-black'
                      } ${
                        isReached
                          ? isDarkMode
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
                          : isDarkMode
                            ? 'bg-black text-white'
                            : 'bg-[#d9d9d9] text-black'
                      }`}
                    >
                      <p
                        className="text-[10px] font-black uppercase tracking-[0.2em]"
                        style={{
                          color: stepAccent,
                        }}
                      >
                        [{step.number}]
                      </p>

                      <h2 className="mt-2 text-lg font-black uppercase tracking-wide">
                        {step.title}
                      </h2>

                      <p className="mt-3 text-xs font-bold leading-relaxed opacity-80">
                        {step.description}
                      </p>

                      <div
                        className={`mt-4 h-1 w-full border transition-[background-color,border-color] duration-500 ${
                          isDarkMode ? 'border-white' : 'border-black'
                        }`}
                        style={{
                          backgroundColor: isReached
                            ? stepAccent
                            : 'transparent',
                        }}
                      />
                    </article>
                  </div>
                );
              })}

              <div
                className={`mx-auto border-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500 ${
                  isDarkMode ? 'border-white' : 'border-black'
                } ${
                  pathProgress >= 0.94
                    ? 'bg-[#FF8AC8] text-white'
                    : isDarkMode
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                }`}
              >
                Finish
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default DesignProcess;