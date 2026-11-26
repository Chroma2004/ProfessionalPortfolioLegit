import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import HomeContact from '../Components/HomeContact';
import HomeCreativeWorks from '../Components/HomeCreativeWorks';

// ============================================================
// DIGITAL ILLUSTRATION IMPORTS
// ============================================================

import illust2 from '../assets/Illustrations/ILLUST2.webp';
import illust4 from '../assets/Illustrations/ILLUST4.webp';
import illust5 from '../assets/Illustrations/ILLUST5.webp';
import illust6 from '../assets/Illustrations/ILLUST6.webp';
import illust7 from '../assets/Illustrations/ILLUST7.webp';

// ============================================================
// PIXEL ART IMPORTS
// ============================================================

import px1 from '../assets/Illustrations/COMS1.1.mp4';
import px2 from '../assets/Illustrations/PX2.webp';

// ============================================================
// GRAPHIC DESIGN IMPORTS
// ============================================================

import gpx1 from '../assets/GPX/GPX1.webp';
import gpx2 from '../assets/GPX/GPX2.webp';
import gpx3 from '../assets/GPX/GPX3.webp';
import gpx4 from '../assets/GPX/GPX4.webp';
import gpx5 from '../assets/GPX/GPX5.webp';

// ============================================================
// WEB SYSTEM IMPORTS
// ============================================================

import trackEdPreview from '../assets/System/TrackEd.webp';
import photo2yPreview from '../assets/System/Photo2y.webp';
import photo2yPreview2 from '../assets/System/Photo2y2.webp';

// ============================================================
// VIDEO EDIT IMPORTS
// ============================================================

import podDark from '../assets/VideoEdit/PodDark.mp4';
import videoEditDark from '../assets/VideoEdit/VideoEditDark.mp4';
import engagementVideoDark from '../assets/VideoEdit/EngagementVideoDark.mp4';

// ============================================================
// CONSTANTS
// ============================================================

const casualIntro = "Yo! I'm Chroma.";
const formalIntro = "If we're being formal, I'm Michael.";

const descriptionText =
  'I create designs that leave a little piece of my personality in every detail.';

const roleText = 'GPX Designer / Video Editor / UX Designer';

const email = 'michaelrhoigonzales@gmail.com';

const emailLink = `mailto:${email}?subject=${encodeURIComponent(
  'Portfolio Inquiry'
)}&body=${encodeURIComponent(
  'Hi Michael,\n\nI saw your portfolio and would like to connect with you.\n\n'
)}`;

const DEFAULT_SLIDESHOW_INTERVAL = 1900;
const OTHER_WORKS_SLIDESHOW_INTERVAL = 2000;

const CURSOR_FOLLOW_SPEED = 0.35;

// ============================================================
// CORNER DECORATIONS
// ============================================================

function CornerDecorations({ isDarkMode }) {
  const borderColor = isDarkMode
    ? 'border-white'
    : 'border-black';

  const baseClass =
    'pointer-events-none absolute z-20 h-7 w-7 transition-colors duration-500 sm:h-8 sm:w-8';

  return (
    <>
      <div
        aria-hidden="true"
        className={`${baseClass} -left-3 -top-3 border-l-[5px] border-t-[5px] sm:border-l-[6px] sm:border-t-[6px] ${borderColor}`}
      />

      <div
        aria-hidden="true"
        className={`${baseClass} -right-3 -top-3 border-r-[5px] border-t-[5px] sm:border-r-[6px] sm:border-t-[6px] ${borderColor}`}
      />

      <div
        aria-hidden="true"
        className={`${baseClass} -bottom-3 -left-3 border-b-[5px] border-l-[5px] sm:border-b-[6px] sm:border-l-[6px] ${borderColor}`}
      />

      <div
        aria-hidden="true"
        className={`${baseClass} -bottom-3 -right-3 border-b-[5px] border-r-[5px] sm:border-b-[6px] sm:border-r-[6px] ${borderColor}`}
      />
    </>
  );
}

// ============================================================
// OPTIMIZED PREVIEW IMAGE
// ============================================================

function PreviewImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsLoaded(false)}
      className={`h-full w-full object-contain transition-opacity duration-300 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      draggable="false"
      decoding="async"
      loading="eager"
    />
  );
}

// ============================================================
// OPTIMIZED PREVIEW VIDEO
// ============================================================

function PreviewVideo({ src, alt }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return undefined;

    const playVideo = () => {
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause();
      } else {
        playVideo();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    if (!document.hidden) {
      playVideo();
    }

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      videoElement.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noremoteplayback"
      onContextMenu={(event) => event.preventDefault()}
      onLoadedData={() => setIsLoaded(true)}
      className={`h-full w-full object-contain transition-opacity duration-300 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

// ============================================================
// HOME COMPONENT
// ============================================================

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

  const [
    isDesktopPreviewEnabled,
    setIsDesktopPreviewEnabled,
  ] = useState(false);

  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(false);

  // ============================================================
  // REFS
  // ============================================================

  const homeRef = useRef(null);
  const footerRef = useRef(null);
  const previewBoxRef = useRef(null);

  const introHasPlayedRef = useRef(false);

  const previewAnimationRef = useRef(null);
  const previewSlideTimerRef = useRef(null);

  const navigationTimerRef = useRef(null);
  const navigationResetTimerRef = useRef(null);

  const previewTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const previewCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const navigate = useNavigate();

  // ============================================================
  // PROJECT DATA
  // ============================================================

  const projects = useMemo(() => {
    // ==========================================================
    // DIGITAL ART PREVIEWS
    // ILLUST2, ILLUST4, ILLUST5, ILLUST6, ILLUST7
    // ==========================================================

    const digitalArtPreviews = [
      {
        type: 'image',
        src: illust2,
        alt: 'Digital Illustration 2',
      },
      {
        type: 'image',
        src: illust4,
        alt: 'Digital Illustration 4',
      },
      {
        type: 'image',
        src: illust5,
        alt: 'Digital Illustration 5',
      },
      {
        type: 'image',
        src: illust6,
        alt: 'Digital Illustration 6',
      },
      {
        type: 'image',
        src: illust7,
        alt: 'Digital Illustration 7',
      },
      {
        type: 'video',
        src: px1,
        alt: 'Pixel Art Animation Preview',
      },
      {
        type: 'image',
        src: px2,
        alt: 'Pixel Art Preview',
      },
    ];

    // ==========================================================
    // POSTER PREVIEWS
    // ==========================================================

    const posterPreviews = [
      {
        type: 'image',
        src: gpx1,
        alt: 'Poster Design 1 Preview',
      },
      {
        type: 'image',
        src: gpx2,
        alt: 'Poster Design 2 Preview',
      },
      {
        type: 'image',
        src: gpx3,
        alt: 'Poster Design 3 Preview',
      },
      {
        type: 'image',
        src: gpx4,
        alt: 'Poster Design 4 Preview',
      },
      {
        type: 'image',
        src: gpx5,
        alt: 'Poster Design 5 Preview',
      },
    ];

    // ==========================================================
    // VIDEO EDIT PREVIEWS
    // DARK VERSIONS ONLY
    // ==========================================================

    const videoPreviews = [
      {
        type: 'video',
        src: podDark,
        alt: 'Podcast Video Preview',
      },
      {
        type: 'video',
        src: videoEditDark,
        alt: 'Recruitment Video Preview',
      },
      {
        type: 'video',
        src: engagementVideoDark,
        alt: 'Engagement Video Preview',
      },
    ];

    // ==========================================================
    // WEB SYSTEM PREVIEWS
    // ==========================================================

    const webSystemPreviews = [
      {
        type: 'image',
        src: trackEdPreview,
        alt: 'TrackED Website Preview',
      },
      {
        type: 'image',
        src: photo2yPreview,
        alt: 'Photo2y Preview',
      },
      {
        type: 'image',
        src: photo2yPreview2,
        alt: 'Photo2y Preview 2',
      },
    ];

    // ==========================================================
    // COMBINED PREVIEWS
    // ==========================================================

    const combinedPreviews = [
      ...digitalArtPreviews,
      ...posterPreviews,
      ...videoPreviews,
      ...webSystemPreviews,
    ];

    // Remove duplicate media.

    const uniqueCombinedPreviews = combinedPreviews.filter(
      (item, index, array) =>
        array.findIndex(
          (preview) => preview.src === item.src
        ) === index
    );

    // ==========================================================
    // FEATURED PROJECTS
    // ==========================================================

    return [
      {
        title: 'Digital Art Projects',
        targetProjectTitle: 'Digital Projects',
        path: '/projects',
        filter: 'Illustrations',
        previewItems: digitalArtPreviews,
      },
      {
        title: 'Posters',
        targetProjectTitle: 'Posters',
        path: '/projects',
        filter: 'GPX Design',
        previewItems: posterPreviews,
      },
      {
        title: 'Video Edits',
        targetProjectTitle: 'Podcast Videos',
        path: '/projects',
        filter: 'Video Edit',
        previewItems: videoPreviews,
      },
      {
        title: 'Web Systems',
        targetProjectTitle: 'TrackED',
        path: '/projects',
        filter: 'WebSystem',
        previewItems: webSystemPreviews,
      },
      {
        title: 'Other Works',
        targetProjectTitle: null,
        path: '/projects',
        filter: 'All',
        previewItems: uniqueCombinedPreviews,
        slideshowInterval: OTHER_WORKS_SLIDESHOW_INTERVAL,
      },
    ];
  }, []);

  // ============================================================
  // SOCIAL LINKS
  // ============================================================

  const socialLinks = useMemo(
    () => [
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
    ],
    []
  );

  // ============================================================
  // REDUCED MOTION
  // ============================================================

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateReducedMotion = () => {
      setPrefersReducedMotion(
        reducedMotionQuery.matches
      );
    };

    updateReducedMotion();

    reducedMotionQuery.addEventListener(
      'change',
      updateReducedMotion
    );

    return () => {
      reducedMotionQuery.removeEventListener(
        'change',
        updateReducedMotion
      );
    };
  }, []);

  // ============================================================
  // THEME TRANSITION
  // ============================================================

  useEffect(() => {
    let timeoutId;

    const handleThemeSpread = (event) => {
      const {
        x,
        y,
        nextTheme,
        direction,
      } = event.detail;

      setThemeSpread({
        isActive: true,
        x,
        y,
        nextTheme,
        direction: direction || 'spread',
      });

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
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
      clearTimeout(timeoutId);

      window.removeEventListener(
        'portfolio-theme-transition-start',
        handleThemeSpread
      );
    };
  }, []);

  // ============================================================
  // THEME SYNC
  // ============================================================

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(
        document.documentElement.classList.contains('dark')
      );
    };

    syncTheme();

    window.addEventListener(
      'portfolio-theme-change',
      syncTheme
    );

    window.addEventListener(
      'storage',
      syncTheme
    );

    return () => {
      window.removeEventListener(
        'portfolio-theme-change',
        syncTheme
      );

      window.removeEventListener(
        'storage',
        syncTheme
      );
    };
  }, []);

  // ============================================================
  // DESKTOP PREVIEW DETECTION
  // ============================================================

  useEffect(() => {
    const desktopPreviewQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine)'
    );

    const checkDesktopPreview = () => {
      setIsDesktopPreviewEnabled(
        desktopPreviewQuery.matches
      );

      if (!desktopPreviewQuery.matches) {
        setHoveredProject(null);
      }
    };

    checkDesktopPreview();

    desktopPreviewQuery.addEventListener(
      'change',
      checkDesktopPreview
    );

    return () => {
      desktopPreviewQuery.removeEventListener(
        'change',
        checkDesktopPreview
      );
    };
  }, []);

  // ============================================================
  // OPTIMIZED CURSOR GRID
  // ============================================================

  useEffect(() => {
    const homeElement = homeRef.current;

    if (
      !homeElement ||
      !isDesktopPreviewEnabled ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    let animationFrame = null;

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        homeElement.style.setProperty(
          '--home-cursor-x',
          `${mouseX}px`
        );

        homeElement.style.setProperty(
          '--home-cursor-y',
          `${mouseY}px`
        );

        animationFrame = null;
      });
    };

    window.addEventListener(
      'pointermove',
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handleMouseMove
      );

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    isDesktopPreviewEnabled,
    prefersReducedMotion,
  ]);

  // ============================================================
  // OPTIMIZED FLOATING PROJECT PREVIEW
  // ============================================================

  useEffect(() => {
    if (
      !isDesktopPreviewEnabled ||
      prefersReducedMotion ||
      hoveredProject === null
    ) {
      return undefined;
    }

    const animatePreview = () => {
      const previewBoxElement = previewBoxRef.current;

      if (!previewBoxElement) return;

      previewCurrentRef.current.x +=
        (
          previewTargetRef.current.x -
          previewCurrentRef.current.x
        ) * CURSOR_FOLLOW_SPEED;

      previewCurrentRef.current.y +=
        (
          previewTargetRef.current.y -
          previewCurrentRef.current.y
        ) * CURSOR_FOLLOW_SPEED;

      const previewWidth = 330;
      const previewHeight = 260;

      const cursorX = previewCurrentRef.current.x;
      const cursorY = previewCurrentRef.current.y;

      const preferredX =
        cursorX + previewWidth + 40 > window.innerWidth
          ? cursorX - previewWidth - 28
          : cursorX + 28;

      const previewX = Math.max(
        12,
        Math.min(
          preferredX,
          window.innerWidth - previewWidth - 12
        )
      );

      const previewY = Math.max(
        12,
        Math.min(
          cursorY - 136,
          window.innerHeight - previewHeight - 12
        )
      );

      previewBoxElement.style.transform =
        `translate3d(${previewX}px, ${previewY}px, 0)`;

      previewAnimationRef.current =
        requestAnimationFrame(animatePreview);
    };

    previewAnimationRef.current =
      requestAnimationFrame(animatePreview);

    return () => {
      if (previewAnimationRef.current !== null) {
        cancelAnimationFrame(
          previewAnimationRef.current
        );

        previewAnimationRef.current = null;
      }
    };
  }, [
    hoveredProject,
    isDesktopPreviewEnabled,
    prefersReducedMotion,
  ]);

  // ============================================================
  // TYPING ANIMATION
  // ============================================================

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedIntroText(formalIntro);
      setTypedRoleText(roleText);
      setActiveTypingLine('done');

      return undefined;
    }

    let timeoutId;
    let cancelled = false;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, ms);
      });

    const runTypingAnimation = async () => {
      setTypedIntroText('');
      setTypedRoleText('');
      setActiveTypingLine('intro');

      while (!cancelled) {
        for (
          let index = 1;
          index <= casualIntro.length;
          index += 1
        ) {
          if (cancelled) return;

          setTypedIntroText(
            casualIntro.slice(0, index)
          );

          await wait(65);
        }

        if (cancelled) return;

        setTypedRoleText(roleText);
        setActiveTypingLine('done');

        await wait(3000);

        for (
          let index = casualIntro.length;
          index >= 0;
          index -= 1
        ) {
          if (cancelled) return;

          setTypedIntroText(
            casualIntro.slice(0, index)
          );

          await wait(35);
        }

        for (
          let index = 1;
          index <= formalIntro.length;
          index += 1
        ) {
          if (cancelled) return;

          setTypedIntroText(
            formalIntro.slice(0, index)
          );

          await wait(55);
        }

        await wait(3000);

        for (
          let index = formalIntro.length;
          index >= 0;
          index -= 1
        ) {
          if (cancelled) return;

          setTypedIntroText(
            formalIntro.slice(0, index)
          );

          await wait(30);
        }
      }
    };

    runTypingAnimation();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  // ============================================================
  // SCROLL STATE
  // ============================================================

  useEffect(() => {
    let ticking = false;
    let scrollFrame = null;

    const handleScrollState = () => {
      if (ticking) return;

      ticking = true;

      scrollFrame = requestAnimationFrame(() => {
        const footerElement = footerRef.current;

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        if (footerElement) {
          const footerRect =
            footerElement.getBoundingClientRect();

          const isMobile = viewportWidth < 640;

          const socialCheckX =
            viewportWidth - 32;

          const socialCheckY = isMobile
            ? viewportHeight - 92
            : viewportHeight / 2;

          const isOverFooter =
            footerRect.top <= socialCheckY &&
            footerRect.bottom >= socialCheckY &&
            footerRect.left <= socialCheckX &&
            footerRect.right >= socialCheckX;

          setIsSocialOnDark(isOverFooter);
        }

        const scrollPosition =
          window.scrollY + viewportHeight;

        const pageHeight =
          document.documentElement.scrollHeight;

        setIsAtBottom(
          scrollPosition >= pageHeight - 100
        );

        ticking = false;
      });
    };

    handleScrollState();

    window.addEventListener(
      'scroll',
      handleScrollState,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleScrollState
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScrollState
      );

      window.removeEventListener(
        'resize',
        handleScrollState
      );

      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  // ============================================================
  // MOBILE PROJECT INTRO
  // ============================================================

  useEffect(() => {
    if (
      introHasPlayedRef.current ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const isMobile = window.matchMedia(
      '(max-width: 639px)'
    ).matches;

    if (!isMobile) return undefined;

    introHasPlayedRef.current = true;

    const timers = [];

    projects.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setIntroProjectIndex(index);
        }, 380 + index * 140)
      );
    });

    timers.push(
      setTimeout(() => {
        setIntroProjectIndex(null);
      }, 380 + projects.length * 140 + 280)
    );

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [
    projects,
    prefersReducedMotion,
  ]);

  // ============================================================
  // PROJECT PREVIEW SLIDES
  // ============================================================

  useEffect(() => {
    clearInterval(previewSlideTimerRef.current);

    setPreviewSlideIndex(0);

    if (
      hoveredProject === null ||
      !isDesktopPreviewEnabled ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const currentProject =
      projects[hoveredProject];

    if (
      !currentProject ||
      currentProject.previewItems.length <= 1
    ) {
      return undefined;
    }

    const slideshowInterval =
      currentProject.slideshowInterval ||
      DEFAULT_SLIDESHOW_INTERVAL;

    previewSlideTimerRef.current = setInterval(() => {
      if (document.hidden) return;

      setPreviewSlideIndex(
        (currentIndex) =>
          (currentIndex + 1) %
          currentProject.previewItems.length
      );
    }, slideshowInterval);

    return () => {
      clearInterval(
        previewSlideTimerRef.current
      );
    };
  }, [
    hoveredProject,
    isDesktopPreviewEnabled,
    prefersReducedMotion,
    projects,
  ]);

  // ============================================================
  // CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      clearTimeout(navigationTimerRef.current);

      clearTimeout(
        navigationResetTimerRef.current
      );

      clearInterval(
        previewSlideTimerRef.current
      );

      if (previewAnimationRef.current !== null) {
        cancelAnimationFrame(
          previewAnimationRef.current
        );
      }
    };
  }, []);

  // ============================================================
  // PROJECT NAVIGATION
  // ============================================================

  const handleProjectNavigate = (
    event,
    project,
    index
  ) => {
    // Preserve normal browser behavior for opening new tabs.

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    if (animatingProject !== null) return;

    setHoveredProject(null);
    setAnimatingProject(index);

    const navigationDelay =
      prefersReducedMotion ? 80 : 420;

    navigationTimerRef.current = setTimeout(() => {
      navigate(project.path, {
        state: {
          filter: project.filter,
          projectTitle: project.targetProjectTitle,
          scrollToProject: Boolean(
            project.targetProjectTitle
          ),
        },
      });

      navigationResetTimerRef.current = setTimeout(() => {
        setAnimatingProject(null);
      }, 250);
    }, navigationDelay);
  };

  // ============================================================
  // PROJECT MOUSE MOVEMENT
  // ============================================================

  const handleProjectMouseMove = (
    event,
    index
  ) => {
    if (
      !isDesktopPreviewEnabled ||
      prefersReducedMotion
    ) {
      return;
    }

    if (hoveredProject !== index) {
      setHoveredProject(index);
    }

    previewTargetRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  // ============================================================
  // PROJECT MOUSE ENTER
  // ============================================================

  const handleProjectMouseEnter = (
    event,
    index
  ) => {
    if (
      !isDesktopPreviewEnabled ||
      prefersReducedMotion
    ) {
      return;
    }

    previewCurrentRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    previewTargetRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const previewBoxElement =
      previewBoxRef.current;

    if (previewBoxElement) {
      const previewWidth = 330;
      const previewHeight = 260;

      const preferredX =
        event.clientX + previewWidth + 40 >
        window.innerWidth
          ? event.clientX - previewWidth - 28
          : event.clientX + 28;

      const previewX = Math.max(
        12,
        Math.min(
          preferredX,
          window.innerWidth - previewWidth - 12
        )
      );

      const previewY = Math.max(
        12,
        Math.min(
          event.clientY - 136,
          window.innerHeight - previewHeight - 12
        )
      );

      previewBoxElement.style.transform =
        `translate3d(${previewX}px, ${previewY}px, 0)`;
    }

    setHoveredProject(index);
    setPreviewSlideIndex(0);
  };

  // ============================================================
  // PROJECT MOUSE LEAVE
  // ============================================================

  const handleProjectMouseLeave = () => {
    setHoveredProject(null);
    setPreviewSlideIndex(0);
  };

  // ============================================================
  // SCROLL BUTTON
  // ============================================================

  const handleFloatingArrowClick = () => {
    window.scrollTo({
      top: isAtBottom
        ? 0
        : document.documentElement.scrollHeight,

      behavior: prefersReducedMotion
        ? 'auto'
        : 'smooth',
    });
  };

  // ============================================================
  // PREVIEW MEDIA
  // ============================================================

  const renderPreviewMedia = () => {
    if (
      hoveredProject === null ||
      !isDesktopPreviewEnabled ||
      prefersReducedMotion
    ) {
      return null;
    }

    const currentProject =
      projects[hoveredProject];

    if (!currentProject?.previewItems?.length) {
      return null;
    }

    const currentPreview =
      currentProject.previewItems[
        previewSlideIndex %
        currentProject.previewItems.length
      ];

    if (!currentPreview) return null;

    const mediaKey =
      `${hoveredProject}-${previewSlideIndex}-${currentPreview.src}`;

    if (currentPreview.type === 'video') {
      return (
        <PreviewVideo
          key={mediaKey}
          src={currentPreview.src}
          alt={currentPreview.alt}
        />
      );
    }

    return (
      <PreviewImage
        key={mediaKey}
        src={currentPreview.src}
        alt={currentPreview.alt}
      />
    );
  };

  // ============================================================
  // SOCIAL ICON CLASSES
  // ============================================================

  const socialIconClass = `group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-[#FF0000] sm:h-10 sm:w-10 sm:hover:-translate-x-1 sm:hover:translate-y-0 lg:h-auto lg:w-auto ${
    isSocialOnDark
      ? 'text-[#FF0000]'
      : isDarkMode
        ? 'text-white'
        : 'text-black'
  }`;

  // ============================================================
  // JSX
  // ============================================================

  return (
    <div
      ref={homeRef}
      className={`relative min-h-screen select-none overflow-x-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-[#d9d9d9] text-black'
      }`}
    >

      {/* ====================================================== */}
      {/* THEME TRANSITION */}
      {/* ====================================================== */}

      {themeSpread.isActive &&
        typeof document !== 'undefined' &&
        !document.startViewTransition && (
          <div
            className={`pointer-events-none fixed inset-0 z-[49] motion-reduce:hidden ${
              themeSpread.direction === 'collapse'
                ? 'animate-[themeCircleCollapse_950ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
                : 'animate-[themeCircleSpread_950ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
            }`}
            style={{
              '--theme-spread-x': `${themeSpread.x}px`,
              '--theme-spread-y': `${themeSpread.y}px`,

              backgroundColor:
                themeSpread.nextTheme === 'dark'
                  ? '#000000'
                  : '#d9d9d9',
            }}
          />
        )}

      {/* ====================================================== */}
      {/* BACKGROUND GRID */}
      {/* ====================================================== */}

      <div
        className={`pointer-events-none fixed inset-0 z-0 sm:animate-[gridDrift_46s_linear_infinite] motion-reduce:animate-none ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] sm:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] sm:bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:34px_34px] sm:bg-[size:38px_38px]`}
      />

      {/* ====================================================== */}
      {/* CURSOR GRID */}
      {/* ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[gridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.16)_1px,transparent_1px)] bg-[size:38px_38px] opacity-60 [mask-image:radial-gradient(circle_at_var(--home-cursor-x,50%)_var(--home-cursor-y,50%),black_0,black_52px,transparent_126px)] [-webkit-mask-image:radial-gradient(circle_at_var(--home-cursor-x,50%)_var(--home-cursor-y,50%),black_0,black_52px,transparent_126px)] motion-reduce:hidden md:block" />

      {/* ====================================================== */}
      {/* BACKGROUND TEXTURE */}
      {/* ====================================================== */}

      <div
        className={`pointer-events-none fixed inset-0 z-[2] hidden sm:block ${
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

      {/* ====================================================== */}
      {/* ANIMATIONS */}
      {/* ====================================================== */}

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
              clip-path: circle(
                0px at
                var(--theme-spread-x)
                var(--theme-spread-y)
              );
            }

            100% {
              clip-path: circle(
                150vmax at
                var(--theme-spread-x)
                var(--theme-spread-y)
              );
            }
          }

          @keyframes themeCircleCollapse {
            0% {
              clip-path: circle(
                150vmax at
                var(--theme-spread-x)
                var(--theme-spread-y)
              );
            }

            100% {
              clip-path: circle(
                0px at
                var(--theme-spread-x)
                var(--theme-spread-y)
              );
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

          @media (prefers-reduced-motion: reduce) {
            .home-floating-preview {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* ====================================================== */}
      {/* INTRODUCTION */}
      {/* ====================================================== */}

      <section className="relative z-10 px-5 pt-28 text-center sm:pt-32 md:pt-36">
        <h1
          className={`font-snellroundhand mb-5 text-[4.35rem] leading-[0.88] tracking-wide transition-colors duration-500 sm:mb-6 sm:text-6xl md:mb-7 md:text-7xl lg:mb-8 lg:text-8xl ${
            isDarkMode
              ? 'text-white'
              : 'text-black'
          }`}
        >
          Portfoli
          <span className="text-[#FF0000]">
            .
          </span>
          yo
        </h1>

        <p
          className={`mx-auto w-fit rounded-full border-2 border-dotted px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] transition-colors duration-500 sm:px-6 sm:py-2.5 sm:text-xs md:text-sm ${
            isDarkMode
              ? 'border-white text-white/75'
              : 'border-black text-black/75'
          }`}
        >
          A Little Piece of Me in Every Design
        </p>

        <div className="mx-auto mt-7 flex min-h-[112px] max-w-[800px] flex-col items-center justify-center px-1 text-center transition-colors duration-500 sm:min-h-[100px] md:mt-8">

          <p
            className={`min-h-[24px] text-[15px] font-black leading-tight sm:text-lg md:text-xl ${
              isDarkMode
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {typedIntroText}

            {activeTypingLine !== 'done' && (
              <span className="ml-1 inline-block animate-pulse text-[#FF0000] motion-reduce:animate-none">
                |
              </span>
            )}
          </p>

          <p
            className={`mt-2 max-w-[620px] text-[12px] font-bold leading-[1.5] sm:text-sm ${
              isDarkMode
                ? 'text-white/80'
                : 'text-black/75'
            }`}
          >
            {descriptionText}
          </p>

          <p
            className={`mt-1 max-w-[700px] text-[10px] font-bold uppercase leading-[1.4] tracking-[0.08em] transition-colors duration-500 sm:text-xs ${
              isDarkMode
                ? 'text-white/50'
                : 'text-black/50'
            }`}
          >
            {typedRoleText}
          </p>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FLOATING PROJECT PREVIEW */}
      {/* ====================================================== */}

      <div
        ref={previewBoxRef}
        aria-hidden="true"
        className={`home-floating-preview pointer-events-none fixed left-0 top-0 z-[9998] hidden h-[260px] w-[330px] overflow-hidden border-2 border-dotted p-2 shadow-2xl backdrop-blur-sm transition-[opacity,scale,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:block ${
          hoveredProject !== null &&
          isDesktopPreviewEnabled &&
          !prefersReducedMotion
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

      {/* ====================================================== */}
      {/* FLOATING SOCIAL LINKS */}
      {/* ====================================================== */}

      <div
        className={`fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full border-2 px-3 py-2 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-5 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col sm:gap-4 sm:px-3 sm:py-5 lg:right-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
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
            target={
              social.label === 'Email'
                ? undefined
                : '_blank'
            }
            rel={
              social.label === 'Email'
                ? undefined
                : 'noopener noreferrer'
            }
            aria-label={social.label}
            className={socialIconClass}
            draggable="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${social.rotate} sm:h-6 sm:w-6`}
            >
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>

      {/* ====================================================== */}
      {/* FLOATING SCROLL BUTTON */}
      {/* ====================================================== */}

      <button
        type="button"
        aria-label={
          isAtBottom
            ? 'Scroll to top'
            : 'Scroll to bottom'
        }
        onClick={handleFloatingArrowClick}
        className={`fixed bottom-6 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 text-xl font-black backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FF0000] ${
          isDarkMode
            ? 'border-white bg-black/90 text-white hover:bg-white'
            : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black'
        } ${
          isAtBottom
            ? 'hover:-translate-y-1'
            : isDarkMode
              ? 'after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white after:opacity-30 after:animate-ping motion-reduce:after:animate-none'
              : 'after:absolute after:inset-0 after:rounded-full after:border-2 after:border-black after:opacity-30 after:animate-ping motion-reduce:after:animate-none'
        }`}
      >
        <span
          className={`relative z-10 leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isAtBottom
              ? 'rotate-0'
              : 'translate-y-[1px]'
          }`}
        >
          {isAtBottom ? '↑' : '↓'}
        </span>
      </button>

      {/* ====================================================== */}
      {/* FEATURED PROJECTS */}
      {/* ====================================================== */}

      <section
        className={`relative z-10 mx-auto mt-10 min-h-[390px] w-[90%] border-2 border-dotted px-4 pb-24 pt-8 transition-colors duration-500 sm:mt-16 sm:w-[92%] sm:px-6 sm:pb-28 md:mt-20 md:w-[94%] md:min-h-[390px] md:pb-28 md:pt-9 lg:pb-24 ${
          isDarkMode
            ? 'border-white'
            : 'border-black'
        }`}
      >
        <CornerDecorations
          isDarkMode={isDarkMode}
        />

        {/* SECTION TITLE */}

        <div className="mb-9 text-center sm:mb-14 md:mb-20">
          <h2
            className={`text-xs font-black uppercase tracking-[0.24em] transition-colors duration-500 sm:text-sm ${
              isDarkMode
                ? 'text-white'
                : 'text-black'
            }`}
          >
            FEATURED PROJECTS
          </h2>
        </div>

        {/* PROJECT LINKS */}

        <div className="mx-auto flex w-full max-w-[805px] flex-col gap-3 sm:gap-2.5">
          {projects.map((project, index) => {
            const isAnimating =
              animatingProject === index;

            const isIntroAnimating =
              introProjectIndex === index;

            const shouldFill =
              isAnimating || isIntroAnimating;

            return (
              <Link
                key={project.title}
                to={project.path}
                state={{
                  filter: project.filter,
                  projectTitle: project.targetProjectTitle,

                  scrollToProject: Boolean(
                    project.targetProjectTitle
                  ),
                }}
                onClick={(event) =>
                  handleProjectNavigate(
                    event,
                    project,
                    index
                  )
                }
                onMouseMove={(event) =>
                  handleProjectMouseMove(
                    event,
                    index
                  )
                }
                onMouseEnter={(event) =>
                  handleProjectMouseEnter(
                    event,
                    index
                  )
                }
                onMouseLeave={
                  handleProjectMouseLeave
                }
                draggable="false"
                className={`group relative flex min-h-[62px] items-center justify-between overflow-hidden border-2 bg-transparent px-4 py-4 text-left text-xs font-black transition-[transform,color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-0 sm:px-8 sm:py-5 md:px-16 md:text-sm ${
                  isDarkMode
                    ? 'border-white'
                    : 'border-black'
                } ${
                  shouldFill
                    ? isDarkMode
                      ? 'scale-[1.01] text-black'
                      : 'scale-[1.01] text-white'
                    : isDarkMode
                      ? 'text-white md:hover:scale-[1.01] md:hover:text-black'
                      : 'text-black md:hover:scale-[1.01] md:hover:text-white'
                }`}
              >

                {/* HOVER FILL */}

                <span
                  className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isDarkMode
                      ? 'bg-white'
                      : 'bg-black'
                  } ${
                    shouldFill
                      ? 'w-[240%] sm:w-[165%] md:w-[155%]'
                      : 'w-0 md:group-hover:w-[155%]'
                  }`}
                />

                {/* PROJECT TITLE */}

                <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-2">

                  <span
                    className={`inline-flex h-4 min-w-6 items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      shouldFill
                        ? 'scale-110 text-[#FF0000]'
                        : isDarkMode
                          ? 'text-white md:group-hover:scale-110 md:group-hover:text-[#FF0000]'
                          : 'text-black md:group-hover:scale-110 md:group-hover:text-[#FF0000]'
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

                  <span
                    className={
                      project.titleClassName || ''
                    }
                  >
                    {project.title}
                  </span>
                </span>

                {/* PROJECT ARROW */}

                <span
                  className={`relative z-10 text-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-2xl ${
                    shouldFill
                      ? 'translate-x-1 text-[#FF0000]'
                      : 'text-[#FF0000] md:group-hover:translate-x-1'
                  }`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ====================================================== */}
      {/* CONTACT SECTION */}
      {/* ====================================================== */}

      <div className="relative z-10 mx-auto mb-12 mt-10 w-full sm:mb-16 sm:mt-14 md:mt-16">
        <HomeContact
          isDarkMode={isDarkMode}
          compact
        />
      </div>

      {/* ====================================================== */}
      {/* CREATIVE WORKS SECTION */}
      {/* ====================================================== */}

      <HomeCreativeWorks
        isDarkMode={isDarkMode}
      />

      {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <div
        className="relative z-10"
        ref={footerRef}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Home;