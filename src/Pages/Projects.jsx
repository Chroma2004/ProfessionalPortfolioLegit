import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../Components/Footer';
import ProjectModal from '../Components/ProjectModal';

// ============================================================
// DIGITAL ILLUSTRATION IMPORTS — WEBP
// ============================================================

import illust2 from '../assets/Illustrations/ILLUST2.webp';
import illust4 from '../assets/Illustrations/ILLUST4.webp';
import illust5 from '../assets/Illustrations/ILLUST5.webp';
import illust6 from '../assets/Illustrations/ILLUST6.webp';
import illust7 from '../assets/Illustrations/ILLUST7.webp';

// ============================================================
// PIXEL ART IMPORTS — WEBP
// ============================================================

import px1 from '../assets/Illustrations/COMS1.1.mp4';

import px2 from '../assets/Illustrations/PX2.webp';

import px3 from '../assets/Illustrations/PX3.webp';
import px31 from '../assets/Illustrations/PX3.1.webp';
import px32 from '../assets/Illustrations/PX3.2.webp';
import px33 from '../assets/Illustrations/PX3.3.webp';

import px4 from '../assets/Illustrations/PX4.webp';
import px41 from '../assets/Illustrations/PX4.1.webp';
import px42 from '../assets/Illustrations/PX4.2.webp';
import px43 from '../assets/Illustrations/PX4.3.webp';

import px5 from '../assets/Illustrations/PX5.webp';
import px51 from '../assets/Illustrations/PX5.1.webp';
import px52 from '../assets/Illustrations/PX5.2.webp';
import px53 from '../assets/Illustrations/PX5.3.webp';

// ============================================================
// GRAPHIC DESIGN IMPORTS — WEBP
// ============================================================

import gpx1 from '../assets/GPX/GPX1.webp';
import gpx2 from '../assets/GPX/GPX2.webp';
import gpx3 from '../assets/GPX/GPX3.webp';
import gpx4 from '../assets/GPX/GPX4.webp';
import gpx5 from '../assets/GPX/GPX5.webp';
import gpx6 from '../assets/GPX/GPX6.webp';
import gpx7 from '../assets/GPX/GPX7.webp';
import gpx8 from '../assets/GPX/GPX8.webp';
import gpx9 from '../assets/GPX/GPX9.webp';
import gpx10 from '../assets/GPX/GPX10.webp';
import gpx11 from '../assets/GPX/GPX11.webp';
import gpx12 from '../assets/GPX/GPX12.webp';
import gpx13 from '../assets/GPX/GPX13.webp';
import gpx14 from '../assets/GPX/GPX14.webp';

// ============================================================
// RECRUITMENT POSTER IMPORTS — WEBP
// ============================================================

import recruitment1 from '../assets/RecruitmentPosters/1.webp';
import recruitment2 from '../assets/RecruitmentPosters/2.webp';
import recruitment3 from '../assets/RecruitmentPosters/3.webp';
import recruitment4 from '../assets/RecruitmentPosters/4.webp';
import recruitment5 from '../assets/RecruitmentPosters/5.webp';
import recruitment6 from '../assets/RecruitmentPosters/6.webp';
import recruitment7 from '../assets/RecruitmentPosters/7.webp';
import recruitment8 from '../assets/RecruitmentPosters/8.webp';
import recruitment9 from '../assets/RecruitmentPosters/9.webp';
import recruitment10 from '../assets/RecruitmentPosters/10.webp';
import recruitment11 from '../assets/RecruitmentPosters/11.webp';
import recruitment12 from '../assets/RecruitmentPosters/12.webp';
import recruitment13 from '../assets/RecruitmentPosters/13.webp';
import recruitment14 from '../assets/RecruitmentPosters/14.webp';
import recruitment15 from '../assets/RecruitmentPosters/15.webp';

// ============================================================
// WEB SYSTEM IMPORTS — WEBP
// ============================================================

import internPortfolioPreview from '../assets/System/InternPortfolio.webp';
import trackEdPreview from '../assets/System/TrackEd.webp';
import ctrlAltDelightPreview from '../assets/System/Ctrl+Alt+Delight.webp';
import photo2yPreview from '../assets/System/Photo2y.webp';
import photo2yPreview2 from '../assets/System/Photo2y2.webp';

// ============================================================
// PODCAST VIDEO IMPORTS — DARK ONLY
// ============================================================

import podDark from '../assets/VideoEdit/PodDark.mp4';

// ============================================================
// RECRUITMENT VIDEO IMPORTS — DARK ONLY
// ============================================================

import videoEditDark from '../assets/VideoEdit/VideoEditDark.mp4';

// ============================================================
// ENGAGEMENT VIDEO IMPORTS — DARK ONLY
// ============================================================

import engagementVideoDark from '../assets/VideoEdit/EngagementVideoDark.mp4';

// ============================================================
// EVENT VIDEO EDIT IMPORTS
// ============================================================

import employeeDay from '../assets/VideoEdit/EmployeeDay.mp4';
import mentalHealth from '../assets/VideoEdit/MentalHealth.mp4';
import movieNight from '../assets/VideoEdit/MovieNight.mp4';

// ============================================================
// VIEWPORT VISIBILITY HOOK
// ============================================================

const useMediaVisibility = ({
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const elementRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasBeenVisible(true);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting &&
          entry.intersectionRatio > 0;

        setIsVisible(visible);

        if (visible) {
          setHasBeenVisible(true);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return {
    elementRef,
    isVisible,
    hasBeenVisible,
  };
};

// ============================================================
// PROGRESSIVE IMAGE COMPONENT
// ============================================================

const ProgressiveImage = ({
  src,
  alt = '',
  placeholderSrc,
  className = '',
  priority = false,
}) => {
  const imageRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const image = imageRef.current;

    if (
      image?.complete &&
      image.naturalWidth > 0
    ) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* LOW-RESOLUTION PLACEHOLDER */}

      {placeholderSrc && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          draggable="false"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`
            absolute inset-0
            ${className}
            scale-105 blur-xl
            transition-opacity duration-500
            motion-reduce:transition-none
            ${isLoaded ? 'opacity-0' : 'opacity-100'}
          `}
        />
      )}

      {/* DEFAULT LOADING PLACEHOLDER */}

      {!placeholderSrc && !isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            animate-pulse
            bg-current opacity-[0.04]
            motion-reduce:animate-none
          "
        />
      )}

      {/* FULL-RESOLUTION IMAGE */}

      {!hasError && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setHasError(true);
          }}
          className={`
            ${className}
            transition-[opacity,filter]
            duration-500 ease-out
            motion-reduce:transition-none
            ${
              isLoaded
                ? 'opacity-100 blur-0'
                : 'opacity-0 blur-sm'
            }
          `}
        />
      )}

      {/* IMAGE ERROR FALLBACK */}

      {hasError && (
        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
            Preview unavailable
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================
// LAZY VIDEO COMPONENT
// ============================================================

const LazyVideo = ({
  src,
  className = '',
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  ariaLabel,
  ariaHidden = false,
}) => {
  const videoRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    elementRef,
    isVisible,
    hasBeenVisible,
  } = useMediaVisibility({
    rootMargin: '0px',
    threshold: 0.01,
  });

  // ==========================================================
  // PLAYBACK VISIBILITY CONTROL
  // ==========================================================

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !hasBeenVisible) return;

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const syncPlayback = () => {
      if (!isVisible || document.hidden) {
        video.pause();

        return;
      }

      if (autoPlay && motionQuery.matches) {
        video.pause();

        return;
      }

      if (autoPlay) {
        video.play().catch(() => {
          // Browser may restrict automatic playback.
        });
      }
    };

    syncPlayback();

    document.addEventListener(
      'visibilitychange',
      syncPlayback
    );

    motionQuery.addEventListener(
      'change',
      syncPlayback
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        syncPlayback
      );

      motionQuery.removeEventListener(
        'change',
        syncPlayback
      );

      video.pause();
    };
  }, [
    isVisible,
    hasBeenVisible,
    autoPlay,
    src,
  ]);

  // ==========================================================
  // CACHED VIDEO DETECTION
  // ==========================================================

  useEffect(() => {
    const video = videoRef.current;

    if (
      video &&
      video.readyState >= 2
    ) {
      setIsLoaded(true);
    }
  }, [hasBeenVisible]);

  return (
    <div
      ref={elementRef}
      className="relative h-full w-full overflow-hidden"
    >

      {/* VIDEO LOADING PLACEHOLDER */}

      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            animate-pulse
            bg-current opacity-[0.04]
            motion-reduce:animate-none
          "
        />
      )}

      {/* OPTIONAL VIDEO POSTER */}

      {poster && !hasBeenVisible && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable="false"
          className={className}
        />
      )}

      {/* VIDEO SOURCE IS ONLY ATTACHED WHEN VISIBLE */}

      {hasBeenVisible && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback"
          aria-label={ariaLabel}
          aria-hidden={ariaHidden || undefined}
          onLoadedData={() => {
            setIsLoaded(true);
          }}
          onCanPlay={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setHasError(true);
          }}
          onContextMenu={(event) => {
            event.preventDefault();
          }}
          className={`
            portfolio-protected-video
            ${className}
            transition-opacity duration-500
            motion-reduce:transition-none
            ${
              isLoaded || controls || poster
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />
      )}

      {/* VIDEO ERROR FALLBACK */}

      {hasError && (
        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
            Video unavailable
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================
// DIGITAL ILLUSTRATION MEDIA COLLECTION
//
// Only existing illustration files are included.
// ============================================================

const digitalIllustrationMedia = [
  {
    type: 'image',
    src: illust2,
    alt: 'Digital Illustration 02',
    label: 'Digital Illustration 02',
  },
  {
    type: 'image',
    src: illust4,
    alt: 'Digital Illustration 04',
    label: 'Digital Illustration 04',
  },
  {
    type: 'image',
    src: illust5,
    alt: 'Digital Illustration 05',
    label: 'Digital Illustration 05',
  },
  {
    type: 'image',
    src: illust6,
    alt: 'Digital Illustration 06',
    label: 'Digital Illustration 06',
  },
  {
    type: 'image',
    src: illust7,
    alt: 'Digital Illustration 07',
    label: 'Digital Illustration 07',
  },
];

// ============================================================
// VIDEO MEDIA COLLECTIONS
// ============================================================

const podcastVideoMedia = [
  {
    type: 'video',
    src: podDark,
    alt: 'Podcast Video Showcase',
    label: 'Podcast Video Showcase',
  },
];

const recruitmentVideoMedia = [
  {
    type: 'video',
    src: videoEditDark,
    alt: 'Recruitment Video Showcase',
    label: 'Recruitment Video Showcase',
  },
];

const engagementVideoMedia = [
  {
    type: 'video',
    src: engagementVideoDark,
    alt: 'Engagement Video Showcase',
    label: 'Engagement Video Showcase',
  },
];

const eventVideoMedia = [
  {
    type: 'video',
    src: employeeDay,
    alt: 'Employee Day',
    label: 'Employee Day',
  },
  {
    type: 'video',
    src: mentalHealth,
    alt: 'Mental Health',
    label: 'Mental Health',
  },
  {
    type: 'video',
    src: movieNight,
    alt: 'Movie Night',
    label: 'Movie Night',
  },
];

// ============================================================
// PROJECTS COMPONENT
// ============================================================

function Projects() {
  const location = useLocation();

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isSocialOnDark, setIsSocialOnDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [activeFilter, setActiveFilter] = useState('Illustrations');
  const [displayedFilter, setDisplayedFilter] = useState('Illustrations');

  const [animatingFilter, setAnimatingFilter] = useState(null);
  const [projectCardStage, setProjectCardStage] = useState('idle');

  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  // ============================================================
  // REFS
  // ============================================================

  const pageRef = useRef(null);
  const footerRef = useRef(null);

  const projectCardRefs = useRef([]);
  const projectCardTitleRefs = useRef({});

  const cursorGridAnimationRef = useRef(null);
  const cursorGridFrameRef = useRef(0);

  const filterCollapseTimeoutRef = useRef(null);
  const filterEnterTimeoutRef = useRef(null);

  const filterFirstFrameRef = useRef(null);
  const filterSecondFrameRef = useRef(null);

  const cursorGridTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorGridCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  // ============================================================
  // EMAIL
  // ============================================================

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  // ============================================================
  // FILTERS
  // ============================================================

  const filters = useMemo(
    () => [
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
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        label: 'Others',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
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
    ],
    []
  );

  // ============================================================
  // PROJECT DATA
  // ============================================================

  const projects = useMemo(
    () => [
      // ======================================================
      // 01 DIGITAL PROJECTS
      // ======================================================

      {
        title: 'Digital Projects',
        role: 'Digital Illustration',
        category: 'Illustrations',

        description:
          'A digital illustration collection where I explored colors, character moments, backgrounds, and storytelling through Procreate.',

        tools: ['Procreate'],

        preview: {
          type: 'image',
          src: illust2,
          alt: 'Digital Projects Preview',
          label: 'ILLUST2',
          previewPosition: 'object-[right_18%]',
        },

        media: digitalIllustrationMedia,
      },

      // ======================================================
      // 02 PIXEL ART PROJECTS
      // ======================================================

      {
        title: 'Pixel Art Projects',
        role: 'Pixel Art',
        category: 'Illustrations',

        description:
          'A pixel art collection focused on animation, moody scenes, and game-style mockups inspired by retro visuals.',

        tools: ['Procreate', 'Aseprite'],

        preview: {
          type: 'image',
          src: px2,
          alt: 'Pixel Art Projects Preview',
          label: 'PX2',
          previewPosition: 'object-right',
        },

        media: [
          {
            type: 'video',
            src: px1,
            alt: 'Pixel Art Animation Commission',
            label: 'Pixel Art Animation Commission',
          },
          {
            type: 'image',
            src: px2,
            alt: 'Train on a Wheat Field',
            label: 'Train on a Wheat Field',
          },
          {
            type: 'stack',
            label: 'PX3 Game Concept',

            items: [
              {
                type: 'image',
                src: px3,
                alt: 'PX3 Game Concept',
                label: 'PX3 Game Concept',
              },
              {
                type: 'image',
                src: px31,
                alt: 'PX3.1 Game Concept',
                label: 'PX3.1 Game Concept',
              },
              {
                type: 'image',
                src: px32,
                alt: 'PX3.2 Game Concept',
                label: 'PX3.2 Game Concept',
              },
              {
                type: 'image',
                src: px33,
                alt: 'PX3.3 Game Concept',
                label: 'PX3.3 Game Concept',
              },
            ],
          },
          {
            type: 'stack',
            label: 'PX4 Game Redesign Concept',

            items: [
              {
                type: 'image',
                src: px4,
                alt: 'PX4 Game Redesign Concept',
                label: 'PX4 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px41,
                alt: 'PX4.1 Game Redesign Concept',
                label: 'PX4.1 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px42,
                alt: 'PX4.2 Game Redesign Concept',
                label: 'PX4.2 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px43,
                alt: 'PX4.3 Game Redesign Concept',
                label: 'PX4.3 Game Redesign Concept',
              },
            ],
          },
          {
            type: 'stack',
            label: 'PX5 Game Redesign Concept',

            items: [
              {
                type: 'image',
                src: px5,
                alt: 'PX5 Game Redesign Concept',
                label: 'PX5 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px51,
                alt: 'PX5.1 Game Redesign Concept',
                label: 'PX5.1 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px52,
                alt: 'PX5.2 Game Redesign Concept',
                label: 'PX5.2 Game Redesign Concept',
              },
              {
                type: 'image',
                src: px53,
                alt: 'PX5.3 Game Redesign Concept',
                label: 'PX5.3 Game Redesign Concept',
              },
            ],
          },
        ],
      },

      // ======================================================
      // 03 POSTERS
      // ======================================================

      {
        title: 'Posters',
        role: 'Graphic Design',
        category: 'GPX Design',

        description:
          'A collection of graphic design works where I practiced posters, typography, image treatment, and layout design across different visual styles.',

        tools: ['Adobe Photoshop', 'Adobe Illustrator'],

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
          },
          {
            type: 'image',
            src: gpx2,
            alt: 'Music Poster',
            label: 'Music Poster',
          },
          {
            type: 'image',
            src: gpx3,
            alt: 'Photoshop Exploration Poster',
            label: 'Photoshop Exploration Poster',
          },
          {
            type: 'image',
            src: gpx4,
            alt: 'Nothing Headphone 1 Poster',
            label: 'Nothing Headphone 1 Poster',
          },
          {
            type: 'image',
            src: gpx5,
            alt: 'Academic Poster',
            label: 'Academic Poster',
          },
          {
            type: 'image',
            src: gpx6,
            alt: 'Photoshop Poster Exploration',
            label: 'Photoshop Poster Exploration',
          },
          {
            type: 'image',
            src: gpx7,
            alt: 'Movie Poster Plainclothes',
            label: 'Movie Poster (Plainclothes)',
          },
          {
            type: 'image',
            src: gpx8,
            alt: 'Ribs by Lorde Poster',
            label: 'Ribs by Lorde Poster',
          },
          {
            type: 'image',
            src: gpx9,
            alt: 'GPX Technique Exploration',
            label: 'GPX',
          },
          {
            type: 'image',
            src: gpx10,
            alt: 'Photoshop Poster Exploration',
            label: 'Photoshop Poster Exploration',
          },
          {
            type: 'image',
            src: gpx11,
            alt: 'Academic Activity',
            label: 'Academic Activity',
          },
          {
            type: 'image',
            src: gpx12,
            alt: 'Graphic Design Poster 12',
            label: 'Graphic Design Poster 12',
          },
          {
            type: 'image',
            src: gpx13,
            alt: 'Graphic Design Poster 13',
            label: 'Graphic Design Poster 13',
          },
          {
            type: 'image',
            src: gpx14,
            alt: 'Graphic Design Poster 14',
            label: 'Graphic Design Poster 14',
          },
        ],
      },

      // ======================================================
      // 04 RECRUITMENT POSTERS
      // ======================================================

      {
        title: 'Recruitment Posters',
        role: 'Recruitment Materials',
        category: 'GPX Design',

        description:
          'A collection of recruitment posters created to promote job opportunities, hiring events, and career-related announcements.',

        tools: ['Adobe Photoshop', 'Canva', 'AI Assistance'],

        preview: {
          type: 'image',
          src: recruitment1,
          alt: 'Recruitment Posters Preview',
          label: 'Recruitment Posters',
          previewPosition: 'object-center',
        },

        media: [
          recruitment1,
          recruitment2,
          recruitment3,
          recruitment4,
          recruitment5,
          recruitment6,
          recruitment7,
          recruitment8,
          recruitment9,
          recruitment10,
          recruitment11,
          recruitment12,
          recruitment13,
          recruitment14,
          recruitment15,
        ].map((src, index) => ({
          type: 'image',
          src,
          alt: `Recruitment Poster ${index + 1}`,
          label: `Recruitment Poster ${String(index + 1).padStart(2, '0')}`,
        })),
      },

      // ======================================================
      // 05 INTERN PORTFOLIO
      // ======================================================

      {
        title: 'InternPortfolio',
        role: 'Internship Application Website',
        category: 'WebSystem',

        description:
          'A personal portfolio website I built and used for my internship applications.',

        tools: [
          'React',
          'Tailwind CSS',
          'Visual Studio Code',
          'DeepseekAI',
        ],

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

      // ======================================================
      // 06 TRACKED
      // ======================================================

      {
        title: 'TrackED',
        role: 'Web-Based Tracking System',
        category: 'WebSystem',

        description:
          'A capstone project for Cavite State University - Imus Campus, built to help professors and students monitor campus-related academic status and records.',

        tools: [
          'React',
          'Tailwind CSS',
          'MySQL',
          'Hostinger',
          'VSCode',
        ],

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

      // ======================================================
      // 07 CTRL + ALT + DELIGHT
      // ======================================================

      {
        title: 'Ctrl + Alt + Delight',
        role: 'Cookie Ordering System',
        category: 'WebSystem',

        description:
          'A kiosk and POS system made for an academic project, focused on ordering flow, product display, and a cleaner user experience.',

        tools: [
          'React',
          'Tailwind CSS',
          'HTML',
          'CSS',
          'PHP',
          'Visual Studio Code',
        ],

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

      // ======================================================
      // 08 PHOTO2Y
      // ======================================================

      {
        title: 'Photo2y',
        role: 'Photobooth Web App',
        category: 'WebSystem',

        description:
          'A fun passion project and simple photobooth web app made for taking playful photo strips with filters, stickers, and customizable strip designs.',

        tools: ['React', 'Tailwind CSS', 'Camera API', 'Vite'],

        liveLink: 'https://photo2y.vercel.app/',

        preview: {
          type: 'image',
          src: photo2yPreview,
          alt: 'Photo2y Photobooth Web App Preview',
          label: 'Photo2y',
          previewPosition: 'object-right',
        },

        media: [
          {
            type: 'image',
            src: photo2yPreview,
            alt: 'Photo2y Main Preview',
            label: 'Photo2y Main Preview',
          },
          {
            type: 'image',
            src: photo2yPreview2,
            alt: 'Photo2y Customization Preview',
            label: 'Photo2y Customization Preview',
          },
        ],
      },

      // ======================================================
      // 09 PODCAST VIDEOS
      // ======================================================

      {
        title: 'Podcast Videos',
        role: 'Podcast Video Editing',
        category: 'Video Edit',

        description:
          'A showcase of podcast video editing focused on conversational storytelling, visual presentation, pacing, and engaging video content.',

        tools: ['CapCut'],

        preview: {
          type: 'video',
          src: podDark,
          alt: 'Podcast Video Preview',
          label: 'Podcast Videos',
          previewPosition: 'object-center',
        },

        media: podcastVideoMedia,
      },

      // ======================================================
      // 10 RECRUITMENT VIDEOS
      // ======================================================

      {
        title: 'Recruitment Videos',
        role: 'Promotional Video Editing',
        category: 'Video Edit',

        description:
          'A collection of recruitment video edits created to promote job opportunities, hiring events, and career-related announcements through short-form visual content.',

        tools: [
          'CapCut',
          'AI Assistance',
          'Canva Video Editor',
        ],

        preview: {
          type: 'video',
          src: videoEditDark,
          alt: 'Recruitment Video Preview',
          label: 'Recruitment Videos',
          previewPosition: 'object-center',
        },

        media: recruitmentVideoMedia,
      },

      // ======================================================
      // 11 ENGAGEMENT VIDEOS
      // ======================================================

      {
        title: 'Engagement Videos',
        role: 'Social Media Video Editing',
        category: 'Video Edit',

        description:
          'A collection of social media video edits focused on employee engagement, interactive content, entertainment, and creative storytelling.',

        tools: [
          'CapCut',
          'AI Assistance',
          'Canva Video Editor',
        ],

        preview: {
          type: 'video',
          src: engagementVideoDark,
          alt: 'Engagement Video Preview',
          label: 'Engagement Videos',
          previewPosition: 'object-center',
        },

        media: engagementVideoMedia,
      },

      // ======================================================
      // 12 EVENT VIDEO EDITS
      // ======================================================

      {
        title: 'Event Video Edits',
        role: 'Event Video Editing',
        category: 'Video Edit',

        description:
          'A collection of event video edits highlighting employee activities, workplace initiatives, and memorable moments through visual storytelling.',

        tools: [
          'CapCut',
          'AI Assistance',
          'Canva Video Editor',
        ],

        preview: {
          type: 'video',
          src: employeeDay,
          alt: 'Event Video Edits Preview',
          label: 'Event Video Edits',
          previewPosition: 'object-center',
        },

        media: eventVideoMedia,
      },

      // ======================================================
      // 13 OTHERS
      // ======================================================

      {
        title: 'Others',
        role: 'Other Creative Works',
        category: 'Others',

        description:
          'A collection of personal projects, creative experiments, and other works that explore different styles and ideas.',

        tools: [
          'Adobe Photoshop',
          'Adobe Illustrator',
          'Canva',
          'Procreate',
        ],

        media: [],
      },
    ],
    []
  );

  // ============================================================
  // FILTERED PROJECTS
  // ============================================================

  const filteredProjects = useMemo(() => {
    if (displayedFilter === 'All') return projects;

    return projects.filter(
      (project) => project.category === displayedFilter
    );
  }, [displayedFilter, projects]);

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
    [emailLink]
  );

  // ============================================================
  // REDUCED MOTION
  // ============================================================

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateReducedMotion = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches);
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
  // DESKTOP MOTION
  // ============================================================

  useEffect(() => {
    const desktopMotionQuery = window.matchMedia(
      '(min-width: 768px)'
    );

    const handleMotionMode = () => {
      setIsDesktopMotion(desktopMotionQuery.matches);
    };

    handleMotionMode();

    desktopMotionQuery.addEventListener(
      'change',
      handleMotionMode
    );

    return () => {
      desktopMotionQuery.removeEventListener(
        'change',
        handleMotionMode
      );
    };
  }, []);

  // ============================================================
  // NAVIGATION FROM HOME / HEADER
  // ============================================================

  useEffect(() => {
    const incomingFilter = location.state?.filter;
    const incomingProjectTitle = location.state?.projectTitle;

    const shouldScrollToProject =
      location.state?.scrollToProject;

    clearTimeout(filterCollapseTimeoutRef.current);
    clearTimeout(filterEnterTimeoutRef.current);

    cancelAnimationFrame(filterFirstFrameRef.current);
    cancelAnimationFrame(filterSecondFrameRef.current);

    if (!incomingFilter && !incomingProjectTitle) {
      setActiveFilter('Illustrations');
      setDisplayedFilter('Illustrations');
      setAnimatingFilter(null);
      setProjectCardStage('idle');

      return;
    }

    const validFilter = filters.some(
      (filter) => filter.label === incomingFilter
    )
      ? incomingFilter
      : 'Illustrations';

    setActiveFilter(validFilter);
    setDisplayedFilter(validFilter);
    setAnimatingFilter(null);
    setProjectCardStage('idle');

    if (!shouldScrollToProject || !incomingProjectTitle) return;

    const projectTitleAliases = {
      'Internship Graphics': 'Recruitment Posters',

      'Podcast': 'Podcast Videos',
      'Podcast Video': 'Podcast Videos',
      'Podcast Video Edits': 'Podcast Videos',
      'Podcast Showcase': 'Podcast Videos',

      'Promotional Video': 'Recruitment Videos',
      'Recruitment Video': 'Recruitment Videos',

      'Engagement Video': 'Engagement Videos',

      'Individual Videos': 'Event Video Edits',
      'Event Videos': 'Event Video Edits',
      'Employee Day': 'Event Video Edits',
      'Mental Health': 'Event Video Edits',
      'Movie Night': 'Event Video Edits',
    };

    const targetTitle =
      projectTitleAliases[incomingProjectTitle] ||
      incomingProjectTitle;

    let firstFrame;
    let secondFrame;

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const targetCard =
          projectCardTitleRefs.current[targetTitle];

        if (!targetCard) return;

        targetCard.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [
    location.key,
    location.state,
    filters,
    prefersReducedMotion,
  ]);

  // ============================================================
  // THEME
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

    window.addEventListener('storage', syncTheme);

    return () => {
      window.removeEventListener(
        'portfolio-theme-change',
        syncTheme
      );

      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  // ============================================================
  // CURSOR GRID
  // ============================================================

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

    pageElement.style.setProperty(
      '--projects-cursor-x',
      `${centerX}px`
    );

    pageElement.style.setProperty(
      '--projects-cursor-y',
      `${centerY}px`
    );

    if (!isDesktopMotion || prefersReducedMotion) {
      return undefined;
    }

    let isAnimating = false;

    const animateCursorGrid = () => {
      const target = cursorGridTargetRef.current;
      const current = cursorGridCurrentRef.current;

      const differenceX = target.x - current.x;
      const differenceY = target.y - current.y;

      current.x += differenceX * 0.06;
      current.y += differenceY * 0.06;

      cursorGridFrameRef.current += 1;

      if (cursorGridFrameRef.current % 4 === 0) {
        pageElement.style.setProperty(
          '--projects-cursor-x',
          `${current.x}px`
        );

        pageElement.style.setProperty(
          '--projects-cursor-y',
          `${current.y}px`
        );
      }

      if (
        Math.abs(differenceX) < 0.5 &&
        Math.abs(differenceY) < 0.5
      ) {
        current.x = target.x;
        current.y = target.y;

        pageElement.style.setProperty(
          '--projects-cursor-x',
          `${target.x}px`
        );

        pageElement.style.setProperty(
          '--projects-cursor-y',
          `${target.y}px`
        );

        isAnimating = false;
        cursorGridAnimationRef.current = null;

        return;
      }

      cursorGridAnimationRef.current =
        requestAnimationFrame(animateCursorGrid);
    };

    const handleMouseMove = (event) => {
      cursorGridTargetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!isAnimating) {
        isAnimating = true;

        cursorGridAnimationRef.current =
          requestAnimationFrame(animateCursorGrid);
      }
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      if (cursorGridAnimationRef.current !== null) {
        cancelAnimationFrame(
          cursorGridAnimationRef.current
        );
      }

      cursorGridAnimationRef.current = null;
      isAnimating = false;
    };
  }, [isDesktopMotion, prefersReducedMotion]);

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
          const socialCheckX = viewportWidth - 32;

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
        scrollFrame = null;
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

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(handleScrollState)
        : null;

    if (pageRef.current) {
      resizeObserver?.observe(pageRef.current);
    }

    return () => {
      window.removeEventListener(
        'scroll',
        handleScrollState
      );

      window.removeEventListener(
        'resize',
        handleScrollState
      );

      resizeObserver?.disconnect();

      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  // ============================================================
  // MODAL
  // ============================================================

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener(
      'keydown',
      handleEscapeKey
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleEscapeKey
      );
    };
  }, [selectedProject]);

  // ============================================================
  // VIDEO PLAYER RESTRICTIONS
  // ============================================================

  useEffect(() => {
    if (!selectedProject) return undefined;

    const protectedVideos = new Map();

    const preventVideoContextMenu = (event) => {
      event.preventDefault();
    };

    const configureVideoPlayers = () => {
      const videos = document.querySelectorAll(
        'video[controls]'
      );

      videos.forEach((video) => {
        if (protectedVideos.has(video)) return;

        protectedVideos.set(video, {
          controlsList: video.getAttribute('controlsList'),

          disablePictureInPicture:
            video.disablePictureInPicture,

          disableRemotePlayback:
            video.disableRemotePlayback,

          hadProtectedClass:
            video.classList.contains(
              'portfolio-protected-video'
            ),
        });

        video.setAttribute(
          'controlsList',
          'nodownload noremoteplayback'
        );

        video.disablePictureInPicture = true;
        video.disableRemotePlayback = true;

        video.classList.add(
          'portfolio-protected-video'
        );

        video.addEventListener(
          'contextmenu',
          preventVideoContextMenu
        );
      });
    };

    configureVideoPlayers();

    const observer = new MutationObserver(
      configureVideoPlayers
    );

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();

      protectedVideos.forEach((previous, video) => {
        if (previous.controlsList === null) {
          video.removeAttribute('controlsList');
        } else {
          video.setAttribute(
            'controlsList',
            previous.controlsList
          );
        }

        video.disablePictureInPicture =
          previous.disablePictureInPicture;

        video.disableRemotePlayback =
          previous.disableRemotePlayback;

        if (!previous.hadProtectedClass) {
          video.classList.remove(
            'portfolio-protected-video'
          );
        }

        video.removeEventListener(
          'contextmenu',
          preventVideoContextMenu
        );
      });

      protectedVideos.clear();
    };
  }, [selectedProject]);

  // ============================================================
  // CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      clearTimeout(filterCollapseTimeoutRef.current);
      clearTimeout(filterEnterTimeoutRef.current);

      cancelAnimationFrame(filterFirstFrameRef.current);
      cancelAnimationFrame(filterSecondFrameRef.current);

      if (cursorGridAnimationRef.current !== null) {
        cancelAnimationFrame(
          cursorGridAnimationRef.current
        );
      }
    };
  }, []);

  // ============================================================
  // CARD ANIMATIONS
  // ============================================================

  const setCardBehindDistances = () => {
    const firstCard = projectCardRefs.current[0];

    if (!firstCard) return;

    const firstCardTop = firstCard.offsetTop;

    projectCardRefs.current.forEach(
      (cardElement, index) => {
        if (!cardElement) return;

        const distanceToFirstCard =
          firstCardTop - cardElement.offsetTop;

        cardElement.style.setProperty(
          '--project-card-behind-y',
          `${distanceToFirstCard}px`
        );

        cardElement.style.setProperty(
          '--project-card-index',
          index
        );
      }
    );
  };

  const handleFilterClick = (filterLabel) => {
    if (
      animatingFilter ||
      activeFilter === filterLabel
    ) {
      return;
    }

    clearTimeout(filterCollapseTimeoutRef.current);
    clearTimeout(filterEnterTimeoutRef.current);

    cancelAnimationFrame(filterFirstFrameRef.current);
    cancelAnimationFrame(filterSecondFrameRef.current);

    if (
      !isDesktopMotion ||
      prefersReducedMotion
    ) {
      projectCardRefs.current = [];
      projectCardTitleRefs.current = {};

      setActiveFilter(filterLabel);
      setDisplayedFilter(filterLabel);
      setAnimatingFilter(null);
      setProjectCardStage('idle');

      return;
    }

    setCardBehindDistances();

    setAnimatingFilter(filterLabel);
    setProjectCardStage('collapsing');

    filterCollapseTimeoutRef.current = setTimeout(
      () => {
        projectCardRefs.current = [];
        projectCardTitleRefs.current = {};

        setActiveFilter(filterLabel);
        setDisplayedFilter(filterLabel);

        setProjectCardStage('preparingEnter');

        filterFirstFrameRef.current =
          requestAnimationFrame(() => {
            setCardBehindDistances();

            filterSecondFrameRef.current =
              requestAnimationFrame(() => {
                setProjectCardStage('entering');
              });
          });

        filterEnterTimeoutRef.current = setTimeout(
          () => {
            setProjectCardStage('idle');
            setAnimatingFilter(null);
          },
          740
        );
      },
      620
    );
  };

  // ============================================================
  // PROJECT PREVIEWS
  // ============================================================

  const getProjectPreviewMedia = (project) => {
    if (project.preview) return project.preview;

    if (
      !Array.isArray(project.media) ||
      project.media.length === 0
    ) {
      return null;
    }

    const firstMedia = project.media[0];

    if (
      firstMedia.type === 'stack' &&
      Array.isArray(firstMedia.items)
    ) {
      return firstMedia.items[0] || null;
    }

    return firstMedia;
  };

  const renderProjectPreview = (project, index) => {
    const previewMedia = getProjectPreviewMedia(project);

    if (!previewMedia?.src) return null;

    const previewPositionClass =
      previewMedia.previewPosition || 'object-center';

    const mediaClassName = `
      block h-full w-full
      object-cover
      ${previewPositionClass}
    `;

    return (
      <div
        className="
          pointer-events-none
          absolute inset-y-0 right-0 z-[1]
          block w-[48%]
          overflow-hidden
          opacity-28
          transition-opacity duration-300
          sm:w-[46%]
          md:opacity-42
          md:group-hover:opacity-58
          [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.24)_12%,black_28%,black_100%)]
          [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.24)_12%,black_28%,black_100%)]
        "
      >
        {previewMedia.type === 'video' ? (

          <LazyVideo
            key={previewMedia.src}
            src={previewMedia.src}
            poster={previewMedia.poster}
            className={mediaClassName}
            autoPlay={false}
            loop={false}
            muted
            controls={false}
            ariaHidden
          />

        ) : (

          <ProgressiveImage
            key={previewMedia.src}
            src={previewMedia.src}
            placeholderSrc={previewMedia.placeholderSrc}
            alt={previewMedia.alt || project.title}
            className={mediaClassName}
            priority={index === 0}
          />

        )}
      </div>
    );
  };

  // ============================================================
  // PROJECT CLICK HANDLER
  // ============================================================

  const handleProjectClick = (project) => {
    if (
      project.category === 'WebSystem' &&
      project.liveLink
    ) {
      window.open(
        project.liveLink,
        '_blank',
        'noopener,noreferrer'
      );

      return;
    }

    setSelectedProject(project);
  };

  // ============================================================
  // FLOATING ARROW
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
  // FILTER BUTTON CLASSES
  // ============================================================

  const getFilterButtonClass = (
    isActive,
    isAnimating
  ) => {
    if (isAnimating) {
      return `group relative flex items-center gap-2 overflow-hidden border-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
        isDarkMode
          ? 'border-white text-black'
          : 'border-black text-white'
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
        ? 'border-white bg-black/50 text-white md:hover:text-black'
        : 'border-black bg-[#d9d9d9]/50 text-black md:hover:text-white'
    }`;
  };

  // ============================================================
  // PROJECT CARD ANIMATION CLASSES
  // ============================================================

  const getProjectCardAnimationClass = (index) => {
    if (
      !isDesktopMotion ||
      prefersReducedMotion
    ) {
      return '';
    }

    if (projectCardStage === 'preparingEnter') {
      return index === 0
        ? 'project-card-preparing-first'
        : 'project-card-preparing-behind';
    }

    if (projectCardStage === 'collapsing') {
      return index === 0
        ? 'animate-[projectFirstCardCover_620ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
        : 'animate-[projectCardSlideBehind_600ms_cubic-bezier(0.22,1,0.36,1)_forwards]';
    }

    if (projectCardStage === 'entering') {
      return index === 0
        ? 'animate-[projectFirstCardReveal_460ms_cubic-bezier(0.22,1,0.36,1)_both]'
        : 'animate-[projectCardSlideFromBehind_620ms_cubic-bezier(0.22,1,0.36,1)_both]';
    }

    return '';
  };

  // ============================================================
  // SOCIAL ICON CLASSES
  // ============================================================

  const socialIconClass = `group flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:text-[#FF0000] sm:h-10 sm:w-10 sm:hover:-translate-x-1 sm:hover:translate-y-0 lg:h-auto lg:w-auto ${
    isSocialOnDark
      ? 'text-[#FF0000]'
      : isDarkMode
        ? 'text-white'
        : 'text-black'
  }`;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      ref={pageRef}
      className={`relative min-h-screen select-none overflow-x-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-black text-white'
          : 'bg-[#d9d9d9] text-black'
      }`}
    >

      {/* ====================================================== */}
      {/* BACKGROUND GRID */}
      {/* ====================================================== */}

      <div
        className={`pointer-events-none fixed inset-0 z-0 sm:animate-[projectsGridDrift_46s_linear_infinite] motion-reduce:animate-none ${
          isDarkMode
            ? 'bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] sm:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] sm:bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)]'
        } bg-[size:34px_34px] sm:bg-[size:38px_38px]`}
      />

      {/* ====================================================== */}
      {/* CURSOR GRID */}
      {/* ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-[1] hidden animate-[projectsGridDrift_46s_linear_infinite] bg-[linear-gradient(rgba(255,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.12)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55 [mask-image:radial-gradient(circle_at_var(--projects-cursor-x,50%)_var(--projects-cursor-y,50%),black_0,black_44px,transparent_118px)] [-webkit-mask-image:radial-gradient(circle_at_var(--projects-cursor-x,50%)_var(--projects-cursor-y,50%),black_0,black_44px,transparent_118px)] motion-reduce:hidden md:block" />

      {/* ====================================================== */}
      {/* DOT TEXTURE */}
      {/* ====================================================== */}

      <div
        className={`pointer-events-none fixed inset-0 z-[2] hidden sm:block ${
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

      {/* ====================================================== */}
      {/* ANIMATIONS AND VIDEO PLAYER STYLES */}
      {/* ====================================================== */}

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
            transform: translate3d(
              0,
              var(--project-card-behind-y, 0px),
              0
            );
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
              transform: translate3d(
                0,
                var(--project-card-behind-y, 0px),
                0
              );
            }

            100% {
              opacity: 0;
              transform: translate3d(
                0,
                var(--project-card-behind-y, 0px),
                0
              );
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
              transform: translate3d(
                0,
                var(--project-card-behind-y, 0px),
                0
              );
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          /* HIDE VIDEO THREE-DOT MENU */

          .portfolio-protected-video::-webkit-media-controls-overflow-button {
            display: none !important;
          }

          /* HIDE VIDEO DOWNLOAD BUTTON */

          .portfolio-protected-video::-webkit-media-controls-download-button {
            display: none !important;
          }

          /* HIDE PICTURE-IN-PICTURE BUTTON */

          .portfolio-protected-video::-webkit-media-controls-picture-in-picture-button {
            display: none !important;
          }

          /* REDUCED MOTION */

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

      {/* ====================================================== */}
      {/* PROJECTS SECTION */}
      {/* ====================================================== */}

      <section className="relative z-10 px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-5xl">

          {/* PAGE HEADING */}

          <div className="mb-12 text-center">
            <h1
              className={`mb-6 font-snellroundhand text-6xl leading-none tracking-wide transition-colors duration-500 md:mb-7 md:text-7xl ${
                isDarkMode
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              Projects
            </h1>
          </div>

          {/* ================================================== */}
          {/* FILTER BUTTONS */}
          {/* ================================================== */}

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => {
              const isActive =
                activeFilter === filter.label;

              const isAnimating =
                animatingFilter === filter.label;

              const filterFillClass = isDarkMode
                ? 'bg-white'
                : 'bg-black';

              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() =>
                    handleFilterClick(filter.label)
                  }
                  disabled={Boolean(animatingFilter)}
                  aria-pressed={isActive}
                  className={getFilterButtonClass(
                    isActive,
                    isAnimating
                  )}
                >

                  {/* CIRCLE FILL */}

                  <span
                    className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width] duration-300 ease-out ${filterFillClass} ${
                      isAnimating
                        ? 'w-[190%]'
                        : isActive
                          ? 'w-[190%]'
                          : 'w-0 md:group-hover:w-[190%]'
                    }`}
                  />

                  {/* FILTER ICON */}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive || isAnimating
                        ? 'text-[#FF0000]'
                        : isDarkMode
                          ? 'text-white md:group-hover:text-[#FF0000]'
                          : 'text-black md:group-hover:text-[#FF0000]'
                    }`}
                  >
                    {filter.icon}
                  </span>

                  {/* FILTER LABEL */}

                  <span className="relative z-10">
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* PROJECT CARDS */}
          {/* ================================================== */}

          <div
            className={`grid gap-4 ${
              projectCardStage !== 'idle'
                ? 'pointer-events-none'
                : ''
            }`}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map(
                (project, index) => {
                  const isFirstCard = index === 0;

                  const firstCardCoverClass =
                    projectCardStage !== 'idle' &&
                    isFirstCard
                      ? isDarkMode
                        ? 'bg-black'
                        : 'bg-[#d9d9d9]'
                      : 'bg-transparent';

                  const isWebSystem =
                    project.category === 'WebSystem' &&
                    Boolean(project.liveLink);

                  const isVideoProject =
                    project.category === 'Video Edit';

                  const mediaCount =
                    project.media?.length || 0;

                  return (
                    <button
                      key={`${displayedFilter}-${project.title}`}
                      ref={(element) => {
                        projectCardRefs.current[index] = element;

                        if (element) {
                          projectCardTitleRefs.current[
                            project.title
                          ] = element;
                        } else {
                          delete projectCardTitleRefs.current[
                            project.title
                          ];
                        }
                      }}
                      type="button"
                      disabled={projectCardStage !== 'idle'}
                      onClick={() =>
                        handleProjectClick(project)
                      }
                      aria-label={
                        isWebSystem
                          ? `Open ${project.title} live website in a new tab`
                          : `Preview ${project.title}`
                      }
                      className={`group relative overflow-hidden border-2 p-5 text-left transition-colors duration-300 md:p-6 ${
                        projectCardStage !== 'idle'
                          ? 'md:will-change-transform'
                          : ''
                      } ${firstCardCoverClass} ${getProjectCardAnimationClass(
                        index
                      )} ${
                        isDarkMode
                          ? 'border-white text-white md:hover:text-black'
                          : 'border-black text-black md:hover:text-white'
                      }`}
                      style={{
                        '--project-card-index': index,

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
                              : `${Math.min(index * 28, 90)}ms`
                            : isFirstCard
                              ? '0ms'
                              : `${Math.min(index * 34, 100)}ms`,
                      }}
                    >

                      {/* HOVER FILL */}

                      <span
                        className={`absolute left-1/2 top-1/2 z-0 aspect-square w-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width] duration-500 ease-out md:group-hover:w-[160%] ${
                          isDarkMode
                            ? 'bg-white'
                            : 'bg-black'
                        }`}
                      />

                      {/* OPTIMIZED IMAGE / VIDEO PREVIEW */}

                      {renderProjectPreview(project, index)}

                      {/* CARD CONTENT */}

                      <div className="relative z-10 flex max-w-[64%] items-start gap-6 sm:max-w-[64%] md:max-w-[68%]">
                        <div>

                          {/* NUMBER AND STATUS */}

                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <p className="text-xs font-bold text-[#FF0000]">
                              [*]{' '}
                              {String(index + 1).padStart(2, '0')}
                            </p>

                            {project.liveLink ? (
                              <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                                Live Link ↗
                              </span>
                            ) : isVideoProject && mediaCount > 0 ? (
                              <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                                {mediaCount === 1
                                  ? 'Video Showcase'
                                  : `${mediaCount} Videos`}
                              </span>
                            ) : mediaCount > 0 ? (
                              <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                                {mediaCount}{' '}
                                {mediaCount === 1
                                  ? 'Work'
                                  : 'Works'}
                              </span>
                            ) : (
                              <span className="border border-[#FF0000] px-2 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF0000]">
                                Upcoming
                              </span>
                            )}
                          </div>

                          {/* PROJECT TITLE */}

                          <h2
                            className={`text-lg font-bold sm:text-xl ${
                              project.titleClassName || ''
                            }`}
                          >
                            {project.title}
                          </h2>

                          {/* PROJECT ROLE */}

                          <p className="mt-1 text-xs font-bold opacity-70">
                            {project.role}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                }
              )
            ) : (
              <div
                className={`border-2 border-dotted p-8 text-center transition-colors duration-500 ${
                  isDarkMode
                    ? 'border-white'
                    : 'border-black'
                }`}
              >
                <p
                  className={`text-sm font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isDarkMode
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  No projects found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROJECT PREVIEW MODAL */}
      {/* ====================================================== */}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ====================================================== */}
      {/* SOCIAL LINKS */}
      {/* ====================================================== */}

      <div
        className={`fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full border-2 px-3 py-2 backdrop-blur-sm transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-5 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col sm:gap-4 sm:px-3 sm:py-5 lg:right-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
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
      {/* FLOATING SCROLL ARROW */}
      {/* ====================================================== */}

      <button
        type="button"
        aria-label={
          isAtBottom
            ? 'Scroll to top'
            : 'Scroll to bottom'
        }
        onClick={handleFloatingArrowClick}
        className={`fixed bottom-6 left-1/2 z-50 flex h-11 w-11 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 text-xl font-black backdrop-blur-sm transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FF0000] ${
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

export default Projects;