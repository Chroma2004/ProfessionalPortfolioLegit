import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

import projectPreview4 from '../assets/project-preview-4.png';
import projectPreview5 from '../assets/project-preview-5.png';

import illust5 from '../assets/Illustrations/ILLUST5.jpeg';
import px1 from '../assets/Illustrations/COMS1.1.mp4';
import px2 from '../assets/Illustrations/PX2.PNG';

import gpx1 from '../assets/GPX/GPX1.png';
import gpx2 from '../assets/GPX/GPX2.png';
import gpx3 from '../assets/GPX/GPX3.png';
import gpx4 from '../assets/GPX/GPX4.png';
import gpx5 from '../assets/GPX/GPX5.png';

import trackEdPreview from '../assets/System/TrackEd.PNG';

function Home() {
  const [animatingProject, setAnimatingProject] = useState(null);
  const [introProjectIndex, setIntroProjectIndex] = useState(null);
  const [isSocialOnDark, setIsSocialOnDark] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [themeSpread, setThemeSpread] = useState({
    isActive: false,
    x: 0,
    y: 0,
    nextTheme: 'dark',
    direction: 'spread',
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  const [typedIntroText, setTypedIntroText] = useState('');
  const [typedRoleText, setTypedRoleText] = useState('');
  const [activeTypingLine, setActiveTypingLine] = useState('intro');

  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewSlideIndex, setPreviewSlideIndex] = useState(0);
  const [isDesktopPreviewEnabled, setIsDesktopPreviewEnabled] = useState(false);

  const homeRef = useRef(null);
  const footerRef = useRef(null);
  const previewBoxRef = useRef(null);
  const introHasPlayedRef = useRef(false);
  const previewAnimationRef = useRef(null);
  const previewSlideTimerRef = useRef(null);
  const cursorGridAnimationRef = useRef(null);
  const cursorGridFrameRef = useRef(0);

  const previewTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const previewCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorGridTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorGridCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate();

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  const introText =
    'Hey! I’m Michael, I create designs with that human touch';

  const roleText =
    'UX Designer / Product Designer / Graphic Designer / Video Editor';

  const projects = [
    {
      title: 'Digital Art Projects',
      targetProjectTitle: 'Digital Projects',
      path: '/projects',
      filter: 'Illustrations',
      previewItems: [
        {
          type: 'image',
          src: illust5,
          alt: 'Illust5 Preview',
        },
        {
          type: 'video',
          src: px1,
          alt: 'COMS1.1 Preview',
        },
        {
          type: 'image',
          src: px2,
          alt: 'Px2 Preview',
        },
      ],
    },
    {
      title: 'Personal GPX Designs',
      targetProjectTitle: 'GPX Design Projects',
      path: '/projects',
      filter: 'GPX Design',
      previewItems: [
        {
          type: 'image',
          src: gpx1,
          alt: 'Personal GPX Design 1 Preview',
        },
        {
          type: 'image',
          src: gpx2,
          alt: 'Personal GPX Design 2 Preview',
        },
        {
          type: 'image',
          src: gpx3,
          alt: 'Personal GPX Design 3 Preview',
        },
        {
          type: 'image',
          src: gpx4,
          alt: 'Personal GPX Design 4 Preview',
        },
        {
          type: 'image',
          src: gpx5,
          alt: 'Personal GPX Design 5 Preview',
        },
      ],
    },
    {
      title: 'TrackED',
      targetProjectTitle: 'TrackED',
      path: '/projects',
      filter: 'WebSystem',
      previewItems: [
        {
          type: 'image',
          src: trackEdPreview,
          alt: 'TrackED Website Preview',
        },
      ],
    },
    {
      title: 'Internship Graphics',
      targetProjectTitle: 'Internship Graphics',
      path: '/projects',
      filter: 'GPX Design',
      previewItems: [
        {
          type: 'image',
          src: projectPreview4,
          alt: 'Internship Graphics Preview',
        },
      ],
    },
    {
      title: '[UPCOMING]',
      titleClassName: 'text-[#FF0000]',
      targetProjectTitle: '[UPCOMING]',
      path: '/projects',
      filter: 'WebSystem',
      previewItems: [
        {
          type: 'image',
          src: projectPreview5,
          alt: 'Upcoming Photobooth Preview',
        },
      ],
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
    const handleThemeSpread = (event) => {
      const { x, y, nextTheme, direction } = event.detail;

      setThemeSpread({
        isActive: true,
        x,
        y,
        nextTheme,
        direction: direction || 'spread',
      });

      setTimeout(() => {
        setThemeSpread((currentSpread) => ({
          ...currentSpread,
          isActive: false,
        }));
      }, 950);
    };

    window.addEventListener(
      'portfolio-theme-transition-start',
      handleThemeSpread
    );

    return () => {
      window.removeEventListener(
        'portfolio-theme-transition-start',
        handleThemeSpread
      );
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
    const checkDesktopPreview = () => {
      setIsDesktopPreviewEnabled(window.matchMedia('(min-width: 768px)').matches);
    };

    checkDesktopPreview();

    window.addEventListener('resize', checkDesktopPreview);

    return () => {
      window.removeEventListener('resize', checkDesktopPreview);
    };
  }, []);

  useEffect(() => {
    const homeElement = homeRef.current;

    if (!homeElement) return;

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

    homeElement.style.setProperty('--home-cursor-x', `${centerX}px`);
    homeElement.style.setProperty('--home-cursor-y', `${centerY}px`);

    const handleMouseMove = (event) => {
      if (!isDesktopPreviewEnabled) return;

      cursorGridTargetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const animateCursorGrid = () => {
      cursorGridCurrentRef.current.x +=
        (cursorGridTargetRef.current.x - cursorGridCurrentRef.current.x) * 0.05;
      cursorGridCurrentRef.current.y +=
        (cursorGridTargetRef.current.y - cursorGridCurrentRef.current.y) * 0.05;

      cursorGridFrameRef.current += 1;

      if (cursorGridFrameRef.current % 3 === 0) {
        homeElement.style.setProperty(
          '--home-cursor-x',
          `${cursorGridCurrentRef.current.x}px`
        );

        homeElement.style.setProperty(
          '--home-cursor-y',
          `${cursorGridCurrentRef.current.y}px`
        );
      }

      cursorGridAnimationRef.current = requestAnimationFrame(animateCursorGrid);
    };

    if (isDesktopPreviewEnabled) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      cursorGridAnimationRef.current = requestAnimationFrame(animateCursorGrid);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(cursorGridAnimationRef.current);
    };
  }, [isDesktopPreviewEnabled]);

  useEffect(() => {
    if (!isDesktopPreviewEnabled) return undefined;

    const animatePreview = () => {
      const previewBoxElement = previewBoxRef.current;

      previewCurrentRef.current.x +=
        (previewTargetRef.current.x - previewCurrentRef.current.x) * 0.13;
      previewCurrentRef.current.y +=
        (previewTargetRef.current.y - previewCurrentRef.current.y) * 0.13;

      if (previewBoxElement) {
        previewBoxElement.style.transform = `translate3d(${
          previewCurrentRef.current.x + 28
        }px, ${previewCurrentRef.current.y - 136}px, 0)`;
      }

      previewAnimationRef.current = requestAnimationFrame(animatePreview);
    };

    previewAnimationRef.current = requestAnimationFrame(animatePreview);

    return () => {
      cancelAnimationFrame(previewAnimationRef.current);
    };
  }, [isDesktopPreviewEnabled]);

  const renderTypedIntroText = () => {
    const name = 'Michael';
    const nameStartIndex = introText.indexOf(name);
    const nameEndIndex = nameStartIndex + name.length;

    if (nameStartIndex === -1) {
      return typedIntroText;
    }

    const beforeName = typedIntroText.slice(0, nameStartIndex);
    const typedName = typedIntroText.slice(nameStartIndex, nameEndIndex);
    const afterName = typedIntroText.slice(nameEndIndex);

    return (
      <>
        {beforeName}
        {typedName && (
          <span className="animate-[michaelSoftColorShift_24s_ease-in-out_infinite] font-black">
            {typedName}
          </span>
        )}
        {afterName}
      </>
    );
  };

  useEffect(() => {
    let introIndex = 0;
    let roleIndex = 0;
    let roleTimer;

    setTypedIntroText('');
    setTypedRoleText('');
    setActiveTypingLine('intro');

    const introTimer = setInterval(() => {
      introIndex += 1;
      setTypedIntroText(introText.slice(0, introIndex));

      if (introIndex >= introText.length) {
        clearInterval(introTimer);

        setTimeout(() => {
          setActiveTypingLine('role');

          roleTimer = setInterval(() => {
            roleIndex += 1;
            setTypedRoleText(roleText.slice(0, roleIndex));

            if (roleIndex >= roleText.length) {
              clearInterval(roleTimer);

              setTimeout(() => {
                setActiveTypingLine('done');
              }, 450);
            }
          }, 24);
        }, 280);
      }
    }, 26);

    return () => {
      clearInterval(introTimer);
      clearInterval(roleTimer);
    };
  }, []);

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
    if (introHasPlayedRef.current) return;

    const isMobile = window.matchMedia('(max-width: 639px)').matches;

    if (!isMobile) return;

    introHasPlayedRef.current = true;

    const timers = [];

    projects.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setIntroProjectIndex(index);
        }, 380 + index * 150)
      );
    });

    timers.push(
      setTimeout(() => {
        setIntroProjectIndex(null);
      }, 380 + projects.length * 150 + 340)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [projects.length]);

  useEffect(() => {
    clearInterval(previewSlideTimerRef.current);
    setPreviewSlideIndex(0);

    if (hoveredProject === null || !isDesktopPreviewEnabled) return undefined;

    const currentProject = projects[hoveredProject];

    if (!currentProject || currentProject.previewItems.length <= 1) {
      return undefined;
    }

    previewSlideTimerRef.current = setInterval(() => {
      setPreviewSlideIndex((currentIndex) =>
        (currentIndex + 1) % currentProject.previewItems.length
      );
    }, 1900);

    return () => {
      clearInterval(previewSlideTimerRef.current);
    };
  }, [hoveredProject, isDesktopPreviewEnabled]);

  const handleProjectNavigate = (event, project, index) => {
    event.preventDefault();

    if (animatingProject !== null) return;

    setHoveredProject(null);
    setAnimatingProject(index);

    setTimeout(() => {
      navigate(project.path, {
        state: {
          filter: project.filter,
          projectTitle: project.targetProjectTitle,
          scrollToProject: true,
        },
      });

      setTimeout(() => {
        setAnimatingProject(null);
      }, 250);
    }, 420);
  };

  const handleProjectMouseMove = (event, index) => {
    if (!isDesktopPreviewEnabled) return;

    if (hoveredProject !== index) {
      setHoveredProject(index);
    }

    previewTargetRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleProjectMouseEnter = (event, index) => {
    if (!isDesktopPreviewEnabled) return;

    previewCurrentRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    previewTargetRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const previewBoxElement = previewBoxRef.current;

    if (previewBoxElement) {
      previewBoxElement.style.transform = `translate3d(${event.clientX + 28}px, ${
        event.clientY - 136
      }px, 0)`;
    }

    setHoveredProject(index);
    setPreviewSlideIndex(0);
  };

  const handleProjectMouseLeave = () => {
    if (!isDesktopPreviewEnabled) return;

    setHoveredProject(null);
    setPreviewSlideIndex(0);
  };

  const handleFloatingArrowClick = () => {
    window.scrollTo({
      top: isAtBottom ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const renderPreviewMedia = () => {
    if (hoveredProject === null) return null;

    const currentProject = projects[hoveredProject];
    const currentPreview =
      currentProject.previewItems[
        previewSlideIndex % currentProject.previewItems.length
      ];

    if (!currentPreview) return null;

    if (currentPreview.type === 'video') {
      return (
        <video
          key={`${hoveredProject}-${previewSlideIndex}-${currentPreview.src}`}
          src={currentPreview.src}
          className="h-full w-full animate-[previewFade_500ms_ease-out] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        >
          <track kind="captions" />
        </video>
      );
    }

    return (
      <img
        key={`${hoveredProject}-${previewSlideIndex}-${currentPreview.src}`}
        src={currentPreview.src}
        alt={currentPreview.alt}
        className="h-full w-full animate-[previewFade_500ms_ease-out] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        draggable="false"
        loading="lazy"
        decoding="async"
      />
    );
  };

  const socialIconClass = `group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-[#FF0000] sm:h-10 sm:w-10 sm:hover:-translate-x-1 sm:hover:translate-y-0 lg:h-auto lg:w-auto ${
    isSocialOnDark
      ? 'text-[#FF0000]'
      : isDarkMode
        ? 'text-white'
        : 'text-black'
  }`;

  return (
    <div
      ref={homeRef}
      className={`relative min-h-screen select-none overflow-x-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-black text-white' : 'bg-[#d9d9d9] text-black'
      }`}
    >
      {themeSpread.isActive && !document.startViewTransition && (
        <div
          className={`pointer-events-none fixed inset-0 z-[49] ${
            themeSpread.direction === 'collapse'
              ? 'animate-[themeCircleCollapse_950ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
              : 'animate-[themeCircleSpread_950ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
          }`}
          style={{
            '--theme-spread-x': `${themeSpread.x}px`,
            '--theme-spread-y': `${themeSpread.y}px`,
            backgroundColor:
              themeSpread.nextTheme === 'dark' ? '#000000' : '#d9d9d9',
          }}
        />
      )}

      <div
        className={`pointer-events-none fixed inset-0 z-0 animate-[gridDrift_46s_linear_infinite] ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:38px_38px]`}
      />

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[gridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.16)_1px,transparent_1px)] bg-[size:38px_38px] opacity-60 [mask-image:radial-gradient(circle_at_var(--home-cursor-x,50%)_var(--home-cursor-y,50%),black_0,black_52px,transparent_126px)] [-webkit-mask-image:radial-gradient(circle_at_var(--home-cursor-x,50%)_var(--home-cursor-y,50%),black_0,black_52px,transparent_126px)] md:block" />

      <div
        className={`pointer-events-none fixed inset-0 z-[2] ${
          isDarkMode
            ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1.05px,transparent_1.25px)] opacity-[0.12] md:opacity-[0.16]'
            : 'bg-[radial-gradient(circle,rgba(0,0,0,0.12)_1.05px,transparent_1.25px)] opacity-[0.12] md:opacity-[0.15]'
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
          @keyframes gridDrift {
            0% {
              background-position: 0px 0px, 0px 0px;
            }

            100% {
              background-position: 38px 38px, 38px 38px;
            }
          }

          @keyframes themeCircleSpread {
            0% {
              clip-path: circle(0px at var(--theme-spread-x) var(--theme-spread-y));
            }

            100% {
              clip-path: circle(150vmax at var(--theme-spread-x) var(--theme-spread-y));
            }
          }

          @keyframes themeCircleCollapse {
            0% {
              clip-path: circle(150vmax at var(--theme-spread-x) var(--theme-spread-y));
            }

            100% {
              clip-path: circle(0px at var(--theme-spread-x) var(--theme-spread-y));
            }
          }

          @keyframes previewFade {
            0% {
              opacity: 0;
              transform: scale(0.985);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes michaelSoftColorShift {
            0%, 100% {
              color: #ff0000;
              text-shadow: 0 0 5px rgba(255, 0, 0, 0.1);
            }

            25% {
              color: #ff7a3d;
              text-shadow: 0 0 5px rgba(255, 122, 61, 0.09);
            }

            50% {
              color: #d9a900;
              text-shadow: 0 0 5px rgba(217, 169, 0, 0.08);
            }

            75% {
              color: #4a96ff;
              text-shadow: 0 0 5px rgba(74, 150, 255, 0.09);
            }
          }
        `}
      </style>

      <section className="relative z-10 px-5 pt-28 text-center sm:pt-32 md:pt-36">
        <h1
          className={`font-snellroundhand mb-5 text-[4.35rem] leading-[0.88] tracking-wide transition-colors duration-500 sm:mb-6 sm:text-6xl md:mb-7 md:text-7xl lg:mb-8 lg:text-8xl ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Portfoli<span className="text-[#FF0000]">.</span>yo
        </h1>

        <p
          className={`mx-auto w-fit rounded-full border-2 border-dotted px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] transition-colors duration-500 sm:px-6 sm:py-2.5 sm:text-xs md:text-sm ${
            isDarkMode
              ? 'border-white text-white/75'
              : 'border-black text-black/75'
          }`}
        >
          Creative Work with a Human Touch
        </p>

        <p
          className={`mx-auto mt-7 flex min-h-[96px] max-w-[800px] flex-col items-center justify-center px-1 text-[13px] font-bold leading-relaxed transition-colors duration-500 sm:min-h-[82px] sm:text-sm md:mt-8 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          <span className="max-w-[320px] sm:max-w-none">
            {renderTypedIntroText()}
            {activeTypingLine === 'intro' && (
              <span className="ml-1 inline-block animate-pulse text-[#FF0000]">
                |
              </span>
            )}
          </span>

          <span
            className={`mt-2 max-w-[310px] text-[11px] font-black uppercase tracking-[0.08em] transition-colors duration-500 sm:mt-1 sm:max-w-none sm:text-sm sm:font-bold sm:normal-case sm:tracking-normal ${
              isDarkMode ? 'text-white/65' : 'text-black/60'
            }`}
          >
            {typedRoleText}
            {activeTypingLine === 'role' && (
              <span className="ml-1 inline-block animate-pulse text-[#FF0000]">
                |
              </span>
            )}
          </span>
        </p>
      </section>

      <div
        ref={previewBoxRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden h-[260px] w-[330px] overflow-hidden border-2 border-dotted p-2 shadow-2xl backdrop-blur-sm transition-[opacity,scale,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:block ${
          hoveredProject !== null
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        } ${
          isDarkMode
            ? 'border-white bg-black/92'
            : 'border-black bg-[#d9d9d9]/95'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          {renderPreviewMedia()}
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full border-2 px-3 py-2 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-5 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col sm:gap-4 sm:px-3 sm:py-5 lg:right-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
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
        className={`fixed bottom-6 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 text-xl font-black backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FF0000] ${
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

      <section
        className={`relative z-10 mx-auto mt-10 min-h-[390px] w-[90%] border-2 border-dotted px-4 pb-24 pt-8 transition-colors duration-500 sm:mt-16 sm:w-[92%] sm:px-6 sm:pb-28 md:mt-20 md:w-[94%] md:min-h-[390px] md:pb-28 md:pt-9 lg:pb-24 ${
          isDarkMode ? 'border-white' : 'border-black'
        }`}
      >
        <div
          className={`absolute -left-3 -top-3 h-7 w-7 border-l-[5px] border-t-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-l-[6px] sm:border-t-[6px] ${
            isDarkMode ? 'border-white' : 'border-black'
          }`}
        />
        <div
          className={`absolute -right-3 -top-3 h-7 w-7 border-r-[5px] border-t-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-r-[6px] sm:border-t-[6px] ${
            isDarkMode ? 'border-white' : 'border-black'
          }`}
        />
        <div
          className={`absolute -bottom-3 -left-3 h-7 w-7 border-b-[5px] border-l-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-b-[6px] sm:border-l-[6px] ${
            isDarkMode ? 'border-white' : 'border-black'
          }`}
        />
        <div
          className={`absolute -bottom-3 -right-3 h-7 w-7 border-b-[5px] border-r-[5px] transition-colors duration-500 sm:h-8 sm:w-8 sm:border-b-[6px] sm:border-r-[6px] ${
            isDarkMode ? 'border-white' : 'border-black'
          }`}
        />

        <div className="mb-9 text-center sm:mb-14 md:mb-20">
          <h2
            className={`text-xs font-black uppercase tracking-[0.24em] transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            My Works
          </h2>

          <p
            className={`mt-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-500 ${
              isDarkMode ? 'text-white/45' : 'text-black/45'
            }`}
          >
            Selected Projects
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[805px] flex-col gap-3 sm:gap-2.5">
          {projects.map((project, index) => {
            const isAnimating = animatingProject === index;
            const isIntroAnimating = introProjectIndex === index;
            const shouldFill = isAnimating || isIntroAnimating;

            return (
              <Link
                key={project.title}
                to={project.path}
                state={{
                  filter: project.filter,
                  projectTitle: project.targetProjectTitle,
                  scrollToProject: true,
                }}
                onClick={(event) => handleProjectNavigate(event, project, index)}
                onMouseMove={(event) => handleProjectMouseMove(event, index)}
                onMouseEnter={(event) => handleProjectMouseEnter(event, index)}
                onMouseLeave={handleProjectMouseLeave}
                draggable="false"
                className={`group relative flex min-h-[62px] items-center justify-between overflow-hidden border-2 bg-transparent px-4 py-4 text-left text-xs font-black transition-[transform,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-0 sm:px-8 sm:py-5 md:px-16 md:text-sm ${
                  isDarkMode ? 'border-white' : 'border-black'
                } ${
                  shouldFill
                    ? isDarkMode
                      ? 'scale-[1.01] text-black'
                      : 'scale-[1.01] text-white'
                    : isDarkMode
                      ? 'text-white hover:scale-[1.01] hover:text-black'
                      : 'text-black hover:scale-[1.01] hover:text-white'
                }`}
              >
                <span
                  className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  } ${
                    shouldFill
                      ? 'w-[240%] sm:w-[165%] md:w-[155%]'
                      : 'w-0 group-hover:w-[240%] sm:group-hover:w-[165%] md:group-hover:w-[155%]'
                  }`}
                />

                <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:group-hover:translate-x-2">
                  <span
                    className={`inline-flex h-4 min-w-6 items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      shouldFill
                        ? 'scale-110 text-[#FF0000]'
                        : isDarkMode
                          ? 'text-white group-hover:scale-110 group-hover:text-[#FF0000]'
                          : 'text-black group-hover:scale-110 group-hover:text-[#FF0000]'
                    }`}
                  >
                    <span className="relative inline-flex items-center justify-center leading-none">
                      <span>[</span>
                      <span className="-mx-[1px] inline-flex translate-y-[2px] items-center justify-center leading-none">
                        *
                      </span>
                      <span>]</span>
                    </span>
                  </span>

                  <span className={project.titleClassName || ''}>
                    {project.title}
                  </span>
                </span>

                <span
                  className={`relative z-10 text-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-2xl ${
                    shouldFill
                      ? 'translate-x-1 text-[#FF0000]'
                      : 'text-[#FF0000] group-hover:translate-x-1'
                  }`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="relative z-10" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;