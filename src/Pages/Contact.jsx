import { useEffect, useRef, useState } from 'react';
import Footer from '../Components/Footer';
import ResumePreviewModal from '../Components/ResumePreviewModal';

import resumeFile from '../assets/Gonzales-CV.pdf';
import idPhoto from '../assets/IDPhoto.png';

import adobeIllustratorIcon from '../assets/AdobeIllustrator.svg';
import adobePhotoshopIcon from '../assets/AdobePhotoshop.svg';
import canvaIcon from '../assets/Canva.svg';
import figmaIcon from '../assets/Figma.svg';
import procreateIcon from '../assets/Procreate.png';
import videoIcon from '../assets/Video.svg';
import vsCodeIcon from '../assets/VSCode.svg';

function Contact() {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isSocialOnDark, setIsSocialOnDark] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  const pageRef = useRef(null);
  const footerRef = useRef(null);
  const cursorGridAnimationRef = useRef(null);
  const cursorGridFrameRef = useRef(0);
  const scrollFrameRef = useRef(null);
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

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  const softwareIcons = [
    {
      label: 'Adobe Illustrator',
      icon: adobeIllustratorIcon,
    },
    {
      label: 'Adobe Photoshop',
      icon: adobePhotoshopIcon,
    },
    {
      label: 'Canva',
      icon: canvaIcon,
    },
    {
      label: 'Figma',
      icon: figmaIcon,
    },
    {
      label: 'Procreate',
      icon: procreateIcon,
    },
    {
      label: 'Video Editing',
      icon: videoIcon,
    },
    {
      label: 'VS Code',
      icon: vsCodeIcon,
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

  const backCardLinks = [
    {
      label: 'Email',
      href: emailLink,
      path: 'M21.86 3.45C22.1 2.75 21.42 2.08 20.72 2.33L2.95 8.58C2.16 8.86 2.08 9.94 2.83 10.33L8.53 13.26L17.38 6.66C17.67 6.45 18.04 6.82 17.82 7.1L11.13 15.9L14.2 21.22C14.61 21.94 15.68 21.83 15.96 21.05L21.86 3.45Z',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/michael-gonzales-ba65a2361/',
      path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/MchaelRh',
      path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/chromaa.png/',
      path: 'M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z',
    },
  ];

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
    const pageElement = pageRef.current;

    if (!pageElement) return undefined;

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

    pageElement.style.setProperty('--contact-cursor-x', `${centerX}px`);
    pageElement.style.setProperty('--contact-cursor-y', `${centerY}px`);

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
          '--contact-cursor-x',
          `${cursorGridCurrentRef.current.x}px`
        );

        pageElement.style.setProperty(
          '--contact-cursor-y',
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
    const calculateScrollState = () => {
      const footerElement = footerRef.current;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

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

  useEffect(() => {
    if (!isResumeOpen) return undefined;

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isResumeOpen]);

  const handleCardFlip = () => {
    setIsCardFlipped((currentState) => !currentState);
  };

  const handleResumeOpen = (event) => {
    event.stopPropagation();
    setIsResumeOpen(true);
  };

  const handleResumeClose = () => {
    setIsResumeOpen(false);
  };

  const handleFloatingArrowClick = () => {
    window.scrollTo({
      top: isAtBottom ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const socialIconClass = `group flex h-8 w-8 items-center justify-center rounded-full transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-[#FF0000] sm:h-10 sm:w-10 sm:hover:-translate-x-1 sm:hover:translate-y-0 lg:h-auto lg:w-auto ${
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
        className={`pointer-events-none fixed inset-0 z-0 animate-[contactGridDrift_46s_linear_infinite] ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:38px_38px]`}
      />

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[contactGridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.12)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55 [mask-image:radial-gradient(circle_at_var(--contact-cursor-x,50%)_var(--contact-cursor-y,50%),black_0,black_44px,transparent_118px)] [-webkit-mask-image:radial-gradient(circle_at_var(--contact-cursor-x,50%)_var(--contact-cursor-y,50%),black_0,black_44px,transparent_118px)] md:block" />

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
          @keyframes contactGridDrift {
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

      <section className="relative z-10 px-4 pb-16 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.32em] text-[#FF0000] sm:text-[10px] sm:tracking-[0.45em]">
            Let’s do this
          </p>

          <h1
            className={`font-snellroundhand mb-5 text-5xl leading-none tracking-wide transition-colors duration-500 sm:text-6xl md:mb-7 md:text-7xl ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            Connect with Me
          </h1>

          <p
            className={`mx-auto max-w-xl text-xs font-bold leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-white/65' : 'text-black/65'
            }`}
          >
            Have an idea? Project? Or creative direction in mind? Send me a
            message and let’s collaborate.
          </p>

          <div className="mx-auto mt-10 max-w-5xl sm:mt-16">
            <button
              type="button"
              onClick={handleCardFlip}
              aria-label="Flip contact card"
              className="group block w-full text-left outline-none"
            >
              <div className="[perspective:1200px]">
                <div
                  className={`relative min-h-[390px] w-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] [transform-style:preserve-3d] sm:min-h-[620px] md:min-h-[500px] lg:min-h-[440px] ${
                    isCardFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  <div
                    className={`absolute inset-0 overflow-hidden rounded-[1.35rem] border-2 border-dotted shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-colors duration-500 [backface-visibility:hidden] sm:rounded-[1.8rem] ${
                      isDarkMode
                        ? 'border-white bg-black text-white'
                        : 'border-black bg-[#f4f4f4] text-black'
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                      <div
                        className={`h-full w-full ${
                          isDarkMode
                            ? 'bg-[radial-gradient(circle,#fff_0.8px,transparent_1px)]'
                            : 'bg-[radial-gradient(circle,#000_0.8px,transparent_1px)]'
                        } [background-size:20px_20px]`}
                      />
                    </div>

                    <div
                      className={`pointer-events-none absolute inset-0 ${
                        isDarkMode
                          ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,0,0,0.08))]'
                          : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.8),transparent_35%,rgba(255,0,0,0.05))]'
                      }`}
                    />

                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 z-20 text-2xl font-black leading-none text-[#FF0000] transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110 sm:right-7 sm:top-7 sm:text-3xl"
                    >
                      ↻
                    </span>

                    <div className="relative flex h-full flex-col justify-between px-5 py-3 sm:hidden">
                      <div className="flex min-w-0 flex-col">
                        <div className="mt-2 min-w-0 pr-10 text-center">
                          <h2
                            className={`font-snellroundhand text-[2.75rem] leading-none tracking-wide ${
                              isDarkMode ? 'text-white' : 'text-black'
                            }`}
                          >
                            Creative License
                          </h2>
                        </div>

                        <div className="mt-4 grid grid-cols-[105px_1fr] items-stretch gap-3">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-full max-w-[98px] rounded-[1.1rem] bg-transparent shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                              <div className="aspect-[3/4] w-full overflow-hidden rounded-[0.8rem] bg-[#d9d9d9]">
                                <img
                                  src={idPhoto}
                                  alt="Michael Rhoi Gonzales ID"
                                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                                  draggable="false"
                                  loading="eager"
                                  decoding="async"
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className={`rounded-2xl border-2 border-dotted px-3 py-2.5 shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-colors duration-500 ${
                              isDarkMode
                                ? 'border-white bg-black text-white'
                                : 'border-black bg-white text-black'
                            }`}
                          >
                            <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#FF0000]">
                              Creative note
                            </p>

                            <p
                              className={`mt-1.5 text-[9px] font-bold leading-relaxed ${
                                isDarkMode ? 'text-white/75' : 'text-black/75'
                              }`}
                            >
                              A detail-driven creative who turns ideas into bold
                              visuals, clean edits, and thoughtful UX
                              experiences with personality, rhythm, and purpose.
                            </p>
                          </div>
                        </div>

                        <div
                          className={`mt-8 space-y-2 ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}
                        >
                          <div className="grid grid-cols-[72px_1fr] items-end gap-2.5">
                            <p
                              className={`font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Name
                            </p>

                            <p
                              className={`truncate border-b-2 border-dotted pb-1 font-snellroundhand text-[1.45rem] leading-none text-[#FF0000] ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              Michael Rhoi Gonzales
                            </p>
                          </div>

                          <div className="grid grid-cols-[72px_1fr] items-end gap-2.5">
                            <p
                              className={`font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Age
                            </p>

                            <p
                              className={`border-b-2 border-dotted pb-1 font-mono text-[10px] font-black tracking-[0.1em] ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              21
                            </p>
                          </div>

                          <div className="grid grid-cols-[72px_1fr] items-start gap-2.5">
                            <p
                              className={`pt-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Roles
                            </p>

                            <p
                              className={`border-b-2 border-dotted pb-1.5 font-mono text-[10px] font-black leading-relaxed ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              GPX Designer / Video Editor / UX Designer
                            </p>
                          </div>

                          <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                            <p
                              className={`font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Softwares
                            </p>

                            <div className="flex flex-nowrap items-center justify-between gap-1 overflow-hidden pb-1">
                              {softwareIcons.map((software) => (
                                <img
                                  key={software.label}
                                  src={software.icon}
                                  alt={software.label}
                                  title={software.label}
                                  className="h-7 w-7 shrink-0 object-contain transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                                  draggable="false"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative hidden h-full gap-7 px-8 py-9 sm:grid md:grid-cols-[220px_1fr] md:gap-9 lg:grid-cols-[230px_1fr] lg:gap-10 lg:px-10">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-full max-w-[200px] rounded-[1.1rem] bg-transparent shadow-[0_10px_24px_rgba(0,0,0,0.14)] md:max-w-none">
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-[0.8rem] bg-[#d9d9d9]">
                            <img
                              src={idPhoto}
                              alt="Michael Rhoi Gonzales ID"
                              className="h-full w-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] sm:grayscale sm:hover:grayscale-0"
                              draggable="false"
                              loading="eager"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex min-w-0 flex-col justify-between">
                        <div className="min-w-0 pr-16 text-center md:pr-20 md:text-left">
                          <h2
                            className={`font-snellroundhand text-7xl leading-none tracking-wide md:text-6xl lg:text-[4.2rem] ${
                              isDarkMode ? 'text-white' : 'text-black'
                            }`}
                          >
                            Creative License
                          </h2>
                        </div>

                        <div
                          className={`mt-7 space-y-5 lg:mt-8 ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}
                        >
                          <div className="grid grid-cols-[110px_1fr] items-end gap-5">
                            <p
                              className={`font-mono text-xs font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Name
                            </p>

                            <p
                              className={`truncate border-b-2 border-dotted pb-1 font-snellroundhand text-3xl leading-none text-[#FF0000] sm:whitespace-nowrap lg:text-[2.1rem] ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              Michael Rhoi Gonzales
                            </p>
                          </div>

                          <div className="grid grid-cols-[110px_1fr] items-end gap-5">
                            <p
                              className={`font-mono text-xs font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Age
                            </p>

                            <p
                              className={`border-b-2 border-dotted pb-1 font-mono text-sm font-black tracking-[0.1em] ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              21
                            </p>
                          </div>

                          <div className="grid grid-cols-[110px_1fr] items-start gap-5">
                            <p
                              className={`pt-1 font-mono text-xs font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Roles
                            </p>

                            <p
                              className={`border-b-2 border-dotted pb-2 font-mono text-sm font-black leading-relaxed ${
                                isDarkMode ? 'border-white' : 'border-black'
                              }`}
                            >
                              GPX Designer / Video Editor / UX Designer
                            </p>
                          </div>

                          <div className="grid grid-cols-[110px_1fr] items-center gap-5">
                            <p
                              className={`font-mono text-xs font-bold uppercase tracking-[0.12em] ${
                                isDarkMode ? 'text-white/60' : 'text-black/60'
                              }`}
                            >
                              Softwares
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pb-1">
                              {softwareIcons.map((software) => (
                                <img
                                  key={software.label}
                                  src={software.icon}
                                  alt={software.label}
                                  title={software.label}
                                  className="h-9 w-9 object-contain transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                                  draggable="false"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`mt-7 rounded-2xl border-2 border-dotted px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-colors duration-500 lg:mt-8 ${
                            isDarkMode
                              ? 'border-white bg-black text-white'
                              : 'border-black bg-white text-black'
                          }`}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#FF0000]">
                            Creative note
                          </p>

                          <p
                            className={`mt-2 text-sm font-bold leading-relaxed ${
                              isDarkMode ? 'text-white/75' : 'text-black/75'
                            }`}
                          >
                            A detail-driven creative who turns ideas into bold
                            visuals, clean edits, and thoughtful UX experiences
                            with personality, rhythm, and purpose.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 overflow-hidden rounded-[1.35rem] border-2 border-dotted border-white bg-black px-5 py-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-[1.8rem] sm:px-8 sm:py-9 lg:px-10">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                      <div className="h-full w-full bg-[radial-gradient(circle,#FF0000_0.9px,transparent_1px)] [background-size:20px_20px]" />
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,0,0,0.22),transparent_35%,rgba(255,255,255,0.04))]" />

                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 z-20 text-2xl font-black leading-none text-[#FF0000] transition-transform duration-500 group-hover:-rotate-180 group-hover:scale-110 sm:right-7 sm:top-7 sm:text-3xl"
                    >
                      ↻
                    </span>

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="mx-auto max-w-xl pt-3 text-center sm:pt-0">
                        <h2 className="font-snellroundhand text-[3rem] leading-none tracking-wide text-white sm:text-7xl lg:text-8xl">
                          Let’s Connect
                        </h2>

                        <p className="mx-auto mt-2.5 max-w-lg text-[10px] font-bold leading-relaxed text-white/65 sm:mt-4 sm:text-xs">
                          Reach out to me, or check out my resume to know me
                          personally.
                        </p>
                      </div>

                      <div className="mt-5 grid gap-2.5 text-[10px] font-black uppercase tracking-[0.12em] sm:mt-8 sm:grid-cols-2 sm:gap-4 sm:text-sm">
                        {backCardLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.label === 'Email' ? undefined : '_blank'}
                            rel={link.label === 'Email' ? undefined : 'noreferrer'}
                            onClick={(event) => event.stopPropagation()}
                            className="group/link flex items-center justify-center gap-3 rounded-2xl border-2 border-dotted border-white bg-white px-5 py-3 text-center text-black transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-1 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white sm:py-4"
                            draggable="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/link:scale-110"
                              aria-hidden="true"
                            >
                              <path d={link.path} />
                            </svg>

                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>

                      <div className="mt-5 flex justify-center sm:mt-7">
                        <button
                          type="button"
                          onClick={handleResumeOpen}
                          className="group/resume relative bg-transparent px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-[#FF0000] sm:py-4 sm:text-sm"
                        >
                          <span className="inline-flex items-center gap-2">
                            View Resume
                            <span className="inline-block transition-transform duration-300 group-hover/resume:translate-x-1">
                              →
                            </span>
                          </span>

                          <span className="absolute bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#FF0000] transition-[width] duration-300 group-hover/resume:w-[calc(100%-2.5rem)] sm:bottom-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <ResumePreviewModal
        resumeFile={resumeFile}
        isOpen={isResumeOpen}
        onClose={handleResumeClose}
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
            onClick={(event) => event.stopPropagation()}
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

export default Contact;