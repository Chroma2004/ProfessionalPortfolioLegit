import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

// ============================================================
// FLATTEN PROJECT MEDIA
// ============================================================

const flattenProjectMedia = (media = []) => {
  if (!Array.isArray(media)) return [];

  return media.flatMap((item) => {
    if (!item) return [];

    if (
      item.type === 'stack' &&
      Array.isArray(item.items)
    ) {
      return item.items.filter(
        (stackItem) =>
          stackItem &&
          stackItem.src &&
          (
            stackItem.type === 'image' ||
            stackItem.type === 'video'
          )
      );
    }

    if (
      item.src &&
      (
        item.type === 'image' ||
        item.type === 'video'
      )
    ) {
      return [item];
    }

    return [];
  });
};

// ============================================================
// LOADING INDICATOR
// ============================================================

function MediaLoading({
  label = 'Loading preview',
  compact = false,
}) {
  if (compact) {
    return (
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          flex items-center justify-center
          bg-white/[0.04]
        "
      >
        <span
          className="
            h-3 w-3
            animate-spin rounded-full
            border border-white/20
            border-t-[#FF0000]
            motion-reduce:animate-none
          "
        />
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        pointer-events-none
        absolute inset-0 z-10
        flex flex-col items-center justify-center
        gap-4
      "
    >
      <div
        className="
          h-8 w-8
          animate-spin rounded-full
          border-2 border-white/15
          border-t-[#FF0000]
          motion-reduce:animate-none
        "
      />

      <p
        className="
          text-[9px] font-black uppercase
          tracking-[0.25em] text-white/40
        "
      >
        {label}
      </p>
    </div>
  );
}

// ============================================================
// MEDIA ERROR
// ============================================================

function MediaError({
  label = 'Preview unavailable',
  onRetry,
  compact = false,
}) {
  if (compact) {
    return (
      <div
        className="
          absolute inset-0
          flex items-center justify-center
          bg-white/[0.04]
        "
      >
        <span className="text-xs font-black text-white/30">
          !
        </span>
      </div>
    );
  }

  return (
    <div
      className="
        absolute inset-0
        flex flex-col items-center justify-center
        gap-4 px-6 text-center
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-9 w-9 text-white/30"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M12 7V12M12 16H12.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <p
        className="
          text-[10px] font-black uppercase
          tracking-[0.2em] text-white/50
        "
      >
        {label}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="
            border border-white/30
            px-4 py-2
            text-[9px] font-black uppercase
            tracking-[0.15em]
            transition-colors duration-200
            hover:border-[#FF0000]
            hover:bg-[#FF0000]
          "
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ============================================================
// PROGRESSIVE MAIN IMAGE
//
// - Loads only the selected artwork
// - Supports WebP, PNG, JPG, JPEG, and other browser formats
// - Supports optional low-resolution placeholders
// - Smooth fade-in after loading
// - Handles cached images
// - Includes retry functionality
// ============================================================

function ProgressiveMainImage({
  src,
  alt,
  placeholderSrc,
}) {
  const imageRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // ==========================================================
  // CACHED IMAGE DETECTION
  // ==========================================================

  useEffect(() => {
    const image = imageRef.current;

    if (
      image &&
      image.complete &&
      image.naturalWidth > 0
    ) {
      setIsLoaded(true);
    }
  }, [src, retryCount]);

  // ==========================================================
  // RETRY IMAGE
  // ==========================================================

  const handleRetry = () => {
    setIsLoaded(false);
    setHasError(false);

    setRetryCount(
      (current) => current + 1
    );
  };

  return (
    <div
      className="
        relative flex h-full w-full
        items-center justify-center
        overflow-hidden
      "
    >

      {/* ================================================== */}
      {/* OPTIONAL LOW-RESOLUTION PLACEHOLDER */}
      {/* ================================================== */}

      {placeholderSrc && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          draggable="false"
          decoding="async"
          className={`
            pointer-events-none
            absolute inset-0
            m-auto max-h-full max-w-full
            object-contain
            scale-[1.02] blur-xl
            transition-opacity duration-500
            motion-reduce:transition-none
            ${
              isLoaded
                ? 'opacity-0'
                : 'opacity-100'
            }
          `}
        />
      )}

      {/* ================================================== */}
      {/* LOADING INDICATOR */}
      {/* ================================================== */}

      {!isLoaded && !hasError && (
        <MediaLoading label="Loading artwork" />
      )}

      {/* ================================================== */}
      {/* FULL-RESOLUTION IMAGE */}
      {/* ================================================== */}

      {!hasError && (
        <img
          key={`${src}-${retryCount}`}
          ref={imageRef}
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable="false"
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setIsLoaded(false);
            setHasError(true);
          }}
          className={`
            relative block
            max-h-full max-w-full
            object-contain
            transition-opacity duration-300
            ease-out
            motion-reduce:transition-none
            ${
              isLoaded
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />
      )}

      {/* ================================================== */}
      {/* ERROR STATE */}
      {/* ================================================== */}

      {hasError && (
        <MediaError
          label="Unable to load artwork"
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}

// ============================================================
// OPTIMIZED MAIN VIDEO
//
// - Only selected video is mounted
// - No background video playback
// - Metadata preload
// - Automatic cleanup when switching media
// - Pauses when browser tab becomes hidden
// - Respects reduced-motion preferences
// - Native video controls
// - Loading and error handling
// ============================================================

function OptimizedMainVideo({
  src,
  poster,
  label,
  captionsSrc,
}) {
  const videoRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // ==========================================================
  // VIDEO PLAYBACK AND CLEANUP
  // ==========================================================

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return undefined;

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    // ========================================================
    // ATTEMPT AUTOMATIC PLAYBACK
    // ========================================================

    if (
      !motionQuery.matches &&
      !document.hidden
    ) {
      video.play().catch(() => {
        // Autoplay with audio may be blocked.
        // The native play button remains available.
      });
    }

    // ========================================================
    // CHECK CACHED VIDEO
    // ========================================================

    if (video.readyState >= 2) {
      setIsLoaded(true);
    }

    // ========================================================
    // PAUSE WHEN TAB IS HIDDEN
    // ========================================================

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      }
    };

    // ========================================================
    // REDUCED MOTION
    // ========================================================

    const handleMotionChange = (event) => {
      if (event.matches) {
        video.pause();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    motionQuery.addEventListener(
      'change',
      handleMotionChange
    );

    // ========================================================
    // CLEANUP
    // ========================================================

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      motionQuery.removeEventListener(
        'change',
        handleMotionChange
      );

      video.pause();
    };
  }, [src, retryCount]);

  // ==========================================================
  // RETRY VIDEO
  // ==========================================================

  const handleRetry = () => {
    setIsLoaded(false);
    setIsBuffering(false);
    setHasError(false);

    setRetryCount(
      (current) => current + 1
    );
  };

  return (
    <div
      className="
        relative flex h-full w-full
        items-center justify-center
        overflow-hidden
      "
    >

      {/* ================================================== */}
      {/* VIDEO PLAYER */}
      {/* ================================================== */}

      {!hasError && (
        <video
          key={`${src}-${retryCount}`}
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback"
          aria-label={label || 'Project video preview'}
          onContextMenu={(event) => {
            event.preventDefault();
          }}
          onLoadedMetadata={() => {
            setIsLoaded(true);
          }}
          onLoadedData={() => {
            setIsLoaded(true);
            setIsBuffering(false);
          }}
          onCanPlay={() => {
            setIsLoaded(true);
            setIsBuffering(false);
          }}
          onPlaying={() => {
            setIsLoaded(true);
            setIsBuffering(false);
          }}
          onWaiting={() => {
            setIsBuffering(true);
          }}
          onSeeking={() => {
            setIsBuffering(true);
          }}
          onSeeked={() => {
            setIsBuffering(false);
          }}
          onPause={() => {
            setIsBuffering(false);
          }}
          onEnded={() => {
            setIsBuffering(false);
          }}
          onError={() => {
            setIsLoaded(false);
            setIsBuffering(false);
            setHasError(true);
          }}
          className={`
            portfolio-protected-video
            project-modal-video
            relative block
            max-h-full max-w-full
            object-contain
            transition-opacity duration-300
            motion-reduce:transition-none
            ${
              isLoaded || poster
                ? 'opacity-100'
                : 'opacity-70'
            }
          `}
        >
          {captionsSrc && (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang="en"
              label="English"
            />
          )}
        </video>
      )}

      {/* ================================================== */}
      {/* INITIAL VIDEO LOADING */}
      {/* ================================================== */}

      {!isLoaded && !hasError && (
        <MediaLoading label="Loading video" />
      )}

      {/* ================================================== */}
      {/* BUFFERING INDICATOR */}
      {/* ================================================== */}

      {isLoaded && isBuffering && !hasError && (
        <div
          role="status"
          aria-label="Video buffering"
          className="
            pointer-events-none
            absolute inset-0 z-10
            flex items-center justify-center
          "
        >
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-full bg-black/60
            "
          >
            <div
              className="
                h-7 w-7
                animate-spin rounded-full
                border-2 border-white/20
                border-t-[#FF0000]
                motion-reduce:animate-none
              "
            />
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* VIDEO ERROR */}
      {/* ================================================== */}

      {hasError && (
        <MediaError
          label="Unable to load video"
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}

// ============================================================
// LAZY THUMBNAIL IMAGE
//
// Loads thumbnails only when they are near the visible
// thumbnail strip.
// ============================================================

function LazyThumbnailImage({
  src,
  alt,
  priority = false,
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [shouldLoad, setShouldLoad] = useState(
    priority
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // ==========================================================
  // THUMBNAIL VISIBILITY
  // ==========================================================

  useEffect(() => {
    if (shouldLoad) return undefined;

    if (priority) {
      setShouldLoad(true);

      return undefined;
    }

    const container = containerRef.current;

    if (!container) return undefined;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);

      return undefined;
    }

    const thumbnailStrip = container.closest(
      '[data-project-thumbnail-strip]'
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);

          observer.disconnect();
        }
      },
      {
        root: thumbnailStrip || null,
        rootMargin: '0px 160px',
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, priority]);

  // ==========================================================
  // CACHED THUMBNAIL
  // ==========================================================

  useEffect(() => {
    const image = imageRef.current;

    if (
      image &&
      image.complete &&
      image.naturalWidth > 0
    ) {
      setIsLoaded(true);
    }
  }, [shouldLoad, src]);

  return (
    <div
      ref={containerRef}
      className="
        relative h-full w-full
        overflow-hidden bg-white/[0.03]
      "
    >

      {/* ================================================== */}
      {/* THUMBNAIL PLACEHOLDER */}
      {/* ================================================== */}

      {!isLoaded && !hasError && (
        <MediaLoading compact />
      )}

      {/* ================================================== */}
      {/* LAZY-LOADED THUMBNAIL */}
      {/* ================================================== */}

      {shouldLoad && !hasError && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'auto' : 'low'}
          decoding="async"
          draggable="false"
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setHasError(true);
          }}
          className={`
            block h-full w-full
            object-cover
            transition-opacity duration-300
            motion-reduce:transition-none
            ${
              isLoaded
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />
      )}

      {/* ================================================== */}
      {/* THUMBNAIL ERROR */}
      {/* ================================================== */}

      {hasError && (
        <MediaError compact />
      )}
    </div>
  );
}

// ============================================================
// OPTIMIZED VIDEO THUMBNAIL
//
// Does not load the actual MP4 file.
//
// If a poster or thumbnail image is provided, it will
// display that image instead.
// ============================================================

function VideoThumbnail({
  item,
  isActive,
}) {
  const thumbnailSrc =
    item.thumbnailSrc ||
    item.poster ||
    item.placeholderSrc;

  return (
    <div
      className="
        relative flex h-full w-full
        items-center justify-center
        overflow-hidden bg-[#171717]
      "
    >

      {/* ================================================== */}
      {/* OPTIONAL VIDEO POSTER */}
      {/* ================================================== */}

      {thumbnailSrc ? (
        <LazyThumbnailImage
          src={thumbnailSrc}
          alt={item.alt || 'Video thumbnail'}
          priority={isActive}
        />
      ) : (
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
            bg-[size:12px_12px]
          "
        />
      )}

      {/* ================================================== */}
      {/* PLAY ICON */}
      {/* ================================================== */}

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          bg-black/20
        "
      >
        <div
          className={`
            flex h-7 w-7
            items-center justify-center
            rounded-full border
            transition-colors duration-200
            sm:h-9 sm:w-9
            ${
              isActive
                ? 'border-[#FF0000] bg-[#FF0000]'
                : 'border-white/40 bg-black/60'
            }
          `}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="
              ml-0.5 h-3.5 w-3.5
              text-white sm:h-4 sm:w-4
            "
          >
            <path d="M8 5L20 12L8 19V5Z" />
          </svg>
        </div>
      </div>

      {/* ================================================== */}
      {/* VIDEO LABEL */}
      {/* ================================================== */}

      <span
        className="
          absolute bottom-1 right-1
          bg-black/80 px-1 py-0.5
          text-[7px] font-black uppercase
          tracking-wider text-white/70
        "
      >
        Video
      </span>
    </div>
  );
}

// ============================================================
// PROJECT MODAL
// ============================================================

function ProjectModal({
  project,
  onClose,
}) {
  // ==========================================================
  // STATE
  // ==========================================================

  const [activeIndex, setActiveIndex] = useState(0);

  // ==========================================================
  // REFS
  // ==========================================================

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const thumbnailStripRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const onCloseRef = useRef(onClose);

  const preloadedImagesRef = useRef(
    new Map()
  );

  // ==========================================================
  // PROJECT MEDIA
  // ==========================================================

  const media = useMemo(
    () => flattenProjectMedia(project?.media),
    [project]
  );

  const mediaCount = media.length;

  const safeActiveIndex =
    mediaCount > 0
      ? Math.min(activeIndex, mediaCount - 1)
      : 0;

  const activeMedia = media[safeActiveIndex];

  // ==========================================================
  // KEEP CLOSE CALLBACK UPDATED
  // ==========================================================

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // ==========================================================
  // RESET ACTIVE MEDIA WHEN PROJECT CHANGES
  // ==========================================================

  useEffect(() => {
    setActiveIndex(0);

    thumbnailRefs.current = [];

    preloadedImagesRef.current.clear();

    if (thumbnailStripRef.current) {
      thumbnailStripRef.current.scrollLeft = 0;
    }
  }, [project]);

  // ==========================================================
  // MODAL FOCUS MANAGEMENT
  //
  // Focuses the close button when opened and restores
  // the previous focused element when closed.
  // ==========================================================

  useEffect(() => {
    if (!project) return undefined;

    const previousFocusedElement =
      document.activeElement;

    const focusFrame = requestAnimationFrame(
      () => {
        closeButtonRef.current?.focus({
          preventScroll: true,
        });
      }
    );

    return () => {
      cancelAnimationFrame(focusFrame);

      if (
        previousFocusedElement instanceof HTMLElement &&
        previousFocusedElement.isConnected
      ) {
        previousFocusedElement.focus({
          preventScroll: true,
        });
      }
    };
  }, [project]);

  // ==========================================================
  // KEYBOARD NAVIGATION
  // ==========================================================

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      // ======================================================
      // ESCAPE — CLOSE MODAL
      // ======================================================

      if (event.key === 'Escape') {
        event.preventDefault();

        onCloseRef.current?.();

        return;
      }

      // ======================================================
      // TAB — KEEP KEYBOARD FOCUS INSIDE MODAL
      // ======================================================

      if (event.key === 'Tab') {
        const dialog = dialogRef.current;

        if (!dialog) return;

        const focusableElements = Array.from(
          dialog.querySelectorAll(
            `
              button:not([disabled]),
              a[href],
              video[controls],
              input:not([disabled]),
              select:not([disabled]),
              textarea:not([disabled]),
              [tabindex]:not([tabindex="-1"])
            `
          )
        ).filter(
          (element) =>
            element.getClientRects().length > 0
        );

        if (focusableElements.length === 0) {
          event.preventDefault();

          dialog.focus();

          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length - 1
          ];

        const activeElement =
          document.activeElement;

        if (
          event.shiftKey &&
          (
            activeElement === firstElement ||
            !dialog.contains(activeElement)
          )
        ) {
          event.preventDefault();

          lastElement.focus();

          return;
        }

        if (
          !event.shiftKey &&
          (
            activeElement === lastElement ||
            !dialog.contains(activeElement)
          )
        ) {
          event.preventDefault();

          firstElement.focus();
        }

        return;
      }

      // ======================================================
      // DO NOT INTERFERE WITH VIDEO SEEKING OR INPUTS
      // ======================================================

      const target = event.target;

      if (
        target instanceof Element &&
        target.closest(
          'video, input, textarea, select, [contenteditable="true"]'
        )
      ) {
        return;
      }

      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (mediaCount <= 1) return;

      // ======================================================
      // RIGHT ARROW — NEXT ARTWORK
      // ======================================================

      if (event.key === 'ArrowRight') {
        event.preventDefault();

        setActiveIndex(
          (current) =>
            (current + 1) % mediaCount
        );
      }

      // ======================================================
      // LEFT ARROW — PREVIOUS ARTWORK
      // ======================================================

      if (event.key === 'ArrowLeft') {
        event.preventDefault();

        setActiveIndex(
          (current) =>
            (
              current - 1 + mediaCount
            ) % mediaCount
        );
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [project, mediaCount]);

  // ==========================================================
  // PRELOAD ADJACENT IMAGES
  //
  // Preloads only the previous and next artwork.
  // Does not preload adjacent videos.
  //
  // Skips preloading on data-saving or slow connections.
  // ==========================================================

  useEffect(() => {
    if (
      !project ||
      mediaCount <= 1
    ) {
      return undefined;
    }

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    const isSlowConnection =
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g';

    if (
      connection?.saveData ||
      isSlowConnection
    ) {
      return undefined;
    }

    const previousIndex =
      (
        safeActiveIndex - 1 + mediaCount
      ) % mediaCount;

    const nextIndex =
      (
        safeActiveIndex + 1
      ) % mediaCount;

    const adjacentMedia = [
      media[previousIndex],
      media[nextIndex],
    ];

    const preloadImages = () => {
      adjacentMedia.forEach((item) => {
        if (
          !item ||
          item.type !== 'image' ||
          !item.src
        ) {
          return;
        }

        if (
          preloadedImagesRef.current.has(
            item.src
          )
        ) {
          return;
        }

        const image = new Image();

        image.decoding = 'async';
        image.fetchPriority = 'low';

        image.onerror = () => {
          if (
            preloadedImagesRef.current.get(
              item.src
            ) === image
          ) {
            preloadedImagesRef.current.delete(
              item.src
            );
          }
        };

        preloadedImagesRef.current.set(
          item.src,
          image
        );

        image.src = item.src;

        // Keep a limited number of image references
        // instead of retaining the entire gallery.

        if (
          preloadedImagesRef.current.size > 6
        ) {
          const oldestKey =
            preloadedImagesRef.current
              .keys()
              .next()
              .value;

          preloadedImagesRef.current.delete(
            oldestKey
          );
        }
      });
    };

    // ========================================================
    // WAIT BEFORE PRELOADING
    //
    // Gives the active image priority over adjacent images.
    // ========================================================

    let idleCallbackId = null;

    const preloadTimeout = setTimeout(() => {
      if (
        'requestIdleCallback' in window
      ) {
        idleCallbackId =
          window.requestIdleCallback(
            preloadImages,
            {
              timeout: 1500,
            }
          );
      } else {
        preloadImages();
      }
    }, 350);

    return () => {
      clearTimeout(preloadTimeout);

      if (
        idleCallbackId !== null &&
        'cancelIdleCallback' in window
      ) {
        window.cancelIdleCallback(
          idleCallbackId
        );
      }
    };
  }, [
    project,
    media,
    mediaCount,
    safeActiveIndex,
  ]);

  // ==========================================================
  // AUTOMATIC THUMBNAIL SCROLLING
  //
  // Keeps the currently selected artwork visible
  // without scrolling the entire modal or page.
  // ==========================================================

  useEffect(() => {
    const strip = thumbnailStripRef.current;

    const activeThumbnail =
      thumbnailRefs.current[safeActiveIndex];

    if (
      !strip ||
      !activeThumbnail
    ) {
      return undefined;
    }

    const scrollFrame = requestAnimationFrame(
      () => {
        const stripRect =
          strip.getBoundingClientRect();

        const thumbnailRect =
          activeThumbnail.getBoundingClientRect();

        const isFullyVisible =
          thumbnailRect.left >= stripRect.left &&
          thumbnailRect.right <= stripRect.right;

        if (isFullyVisible) return;

        const thumbnailCenter =
          thumbnailRect.left +
          thumbnailRect.width / 2;

        const stripCenter =
          stripRect.left +
          stripRect.width / 2;

        const scrollDistance =
          thumbnailCenter - stripCenter;

        const prefersReducedMotion =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

        strip.scrollTo({
          left:
            strip.scrollLeft +
            scrollDistance,

          behavior: prefersReducedMotion
            ? 'auto'
            : 'smooth',
        });
      }
    );

    return () => {
      cancelAnimationFrame(scrollFrame);
    };
  }, [safeActiveIndex, mediaCount, project]);

  // ==========================================================
  // CLEANUP PRELOADED IMAGE REFERENCES
  // ==========================================================

  useEffect(() => {
    const preloadedImages =
      preloadedImagesRef.current;

    return () => {
      preloadedImages.clear();
    };
  }, []);

  // ==========================================================
  // NAVIGATION HANDLERS
  // ==========================================================

  const showPrevious = () => {
    if (mediaCount <= 1) return;

    setActiveIndex(
      (current) =>
        (
          current - 1 + mediaCount
        ) % mediaCount
    );
  };

  const showNext = () => {
    if (mediaCount <= 1) return;

    setActiveIndex(
      (current) =>
        (
          current + 1
        ) % mediaCount
    );
  };

  const selectMedia = (index) => {
    if (
      index < 0 ||
      index >= mediaCount
    ) {
      return;
    }

    setActiveIndex(index);
  };

  // ==========================================================
  // CLOSE IF NO PROJECT
  // ==========================================================

  if (
    !project ||
    typeof document === 'undefined'
  ) {
    return null;
  }

  // ==========================================================
  // NAVIGATION BUTTON CLASSES
  // ==========================================================

  const navigationButtonClass = `
    absolute top-1/2 z-20
    flex h-9 w-9
    -translate-y-1/2
    items-center justify-center
    border border-white/30
    bg-black/75
    text-xl font-bold text-white
    transition-colors duration-200
    hover:border-[#FF0000]
    hover:bg-[#FF0000]
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-[#FF0000]
    sm:h-11 sm:w-11
  `;

  // ==========================================================
  // RENDER
  // ==========================================================

  return createPortal(
    <div
      role="presentation"
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/95
        px-3 py-5
        backdrop-blur-xl
        sm:px-6 sm:py-8
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      {/* ================================================== */}
      {/* MODAL STYLES */}
      {/* ================================================== */}

      <style>
        {`
          /* ================================================ */
          /* THUMBNAIL SCROLLBAR */
          /* ================================================ */

          .project-thumbnail-strip {
            scrollbar-width: thin;
            scrollbar-color:
              rgba(255, 255, 255, 0.22)
              transparent;
            overscroll-behavior-x: contain;
          }

          .project-thumbnail-strip::-webkit-scrollbar {
            height: 4px;
          }

          .project-thumbnail-strip::-webkit-scrollbar-track {
            background: transparent;
          }

          .project-thumbnail-strip::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.22);
            border-radius: 0;
          }

          .project-thumbnail-strip::-webkit-scrollbar-thumb:hover {
            background: #FF0000;
          }

          /* ================================================ */
          /* VIDEO PLAYER CONTROLS */
          /* ================================================ */

          .project-modal-video::-webkit-media-controls-overflow-button {
            display: none !important;
          }

          .project-modal-video::-webkit-media-controls-download-button {
            display: none !important;
          }

          .project-modal-video::-webkit-media-controls-picture-in-picture-button {
            display: none !important;
          }

          .project-modal-video::-webkit-media-controls-remote-playback-button {
            display: none !important;
          }

          /* ================================================ */
          /* MODAL ENTRANCE ANIMATION */
          /* ================================================ */

          @keyframes projectModalEnter {
            from {
              opacity: 0;
              transform: translate3d(0, 6px, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .project-modal-container {
            animation:
              projectModalEnter
              220ms
              cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          /* ================================================ */
          /* REDUCED MOTION */
          /* ================================================ */

          @media (prefers-reduced-motion: reduce) {
            .project-modal-container {
              animation: none;
            }

            .project-thumbnail-strip {
              scroll-behavior: auto;
            }
          }
        `}
      </style>

      {/* ================================================== */}
      {/* MODAL CONTAINER */}
      {/* ================================================== */}

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} preview`}
        tabIndex={-1}
        className="
          project-modal-container
          relative flex h-full
          max-h-[94vh]
          max-h-[94dvh]
          w-full max-w-7xl
          flex-col overflow-hidden
          border border-white/20
          bg-[#0b0b0b]
          text-white shadow-2xl
          outline-none
        "
      >

        {/* ================================================ */}
        {/* HEADER */}
        {/* ================================================ */}

        <div
          className="
            flex shrink-0
            items-center justify-between
            gap-4 border-b border-white/15
            px-4 py-4 sm:px-6
          "
        >
          <div className="min-w-0">

            {/* PROJECT PREVIEW LABEL */}

            <p
              className="
                mb-1 text-[9px]
                font-black uppercase
                tracking-[0.25em]
                text-[#FF0000]
              "
            >
              Project Preview
            </p>

            {/* PROJECT TITLE */}

            <h2
              className="
                truncate text-sm
                font-black uppercase
                tracking-[0.04em]
                sm:text-lg
              "
            >
              {project.title}
            </h2>
          </div>

          {/* CLOSE BUTTON */}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              border border-white/30
              text-xl font-bold
              transition-colors duration-200
              hover:border-[#FF0000]
              hover:bg-[#FF0000]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#FF0000]
            "
          >
            ×
          </button>
        </div>

        {/* ================================================ */}
        {/* MAIN PREVIEW */}
        {/* ================================================ */}

        {activeMedia ? (
          <>
            <div
              className="
                relative flex min-h-0 flex-1
                items-center justify-center
                overflow-hidden bg-black
                px-3 py-5
                sm:px-12 sm:py-8
              "
            >

              {/* ========================================== */}
              {/* ACTIVE VIDEO OR IMAGE */}
              {/* ========================================== */}

              {activeMedia.type === 'video' ? (

                // ==========================================
                // OPTIMIZED VIDEO
                // ==========================================

                <OptimizedMainVideo
                  key={`${safeActiveIndex}-${activeMedia.src}`}
                  src={activeMedia.src}
                  poster={
                    activeMedia.poster ||
                    activeMedia.thumbnailSrc
                  }
                  label={
                    activeMedia.alt ||
                    activeMedia.label ||
                    project.title
                  }
                  captionsSrc={
                    activeMedia.captionsSrc
                  }
                />

              ) : (

                // ==========================================
                // PROGRESSIVE IMAGE
                // ==========================================

                <ProgressiveMainImage
                  key={`${safeActiveIndex}-${activeMedia.src}`}
                  src={activeMedia.src}
                  placeholderSrc={
                    activeMedia.placeholderSrc ||
                    activeMedia.thumbnailSrc
                  }
                  alt={
                    activeMedia.alt ||
                    activeMedia.label ||
                    project.title
                  }
                />

              )}

              {/* ========================================== */}
              {/* PREVIOUS BUTTON */}
              {/* ========================================== */}

              {mediaCount > 1 && (
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous artwork"
                  className={`
                    ${navigationButtonClass}
                    left-2 sm:left-5
                  `}
                >
                  ←
                </button>
              )}

              {/* ========================================== */}
              {/* NEXT BUTTON */}
              {/* ========================================== */}

              {mediaCount > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next artwork"
                  className={`
                    ${navigationButtonClass}
                    right-2 sm:right-5
                  `}
                >
                  →
                </button>
              )}

              {/* ========================================== */}
              {/* MEDIA COUNTER */}
              {/* ========================================== */}

              {mediaCount > 1 && (
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="
                    pointer-events-none
                    absolute bottom-3 right-3
                    z-20
                    border border-white/20
                    bg-black/80
                    px-3 py-1.5
                    text-[10px] font-black
                    tracking-[0.15em]
                    text-white
                    sm:bottom-5 sm:right-5
                  "
                >
                  {
                    String(
                      safeActiveIndex + 1
                    ).padStart(2, '0')
                  }

                  {' / '}

                  {
                    String(
                      mediaCount
                    ).padStart(2, '0')
                  }
                </div>
              )}
            </div>

            {/* ============================================ */}
            {/* THUMBNAIL STRIP */}
            {/* ============================================ */}

            {mediaCount > 1 && (
              <div
                className="
                  shrink-0
                  border-t border-white/15
                  bg-[#111]
                  px-3 py-3 sm:px-5
                "
              >
                <div
                  ref={thumbnailStripRef}
                  data-project-thumbnail-strip
                  aria-label="Project artwork thumbnails"
                  className="
                    project-thumbnail-strip
                    flex items-center gap-2
                    overflow-x-auto
                    overflow-y-hidden
                    pb-1
                  "
                >
                  {media.map((item, index) => {
                    const isActive =
                      safeActiveIndex === index;

                    const isVideo =
                      item.type === 'video';

                    const isAdjacent =
                      Math.abs(
                        safeActiveIndex - index
                      ) <= 1;

                    return (
                      <button
                        key={`${item.src}-${index}`}
                        ref={(element) => {
                          thumbnailRefs.current[
                            index
                          ] = element;
                        }}
                        type="button"
                        onClick={() => {
                          selectMedia(index);
                        }}
                        aria-label={
                          `Preview ${
                            isVideo
                              ? 'video'
                              : 'artwork'
                          } ${index + 1}: ${
                            item.label ||
                            item.alt ||
                            project.title
                          }`
                        }
                        aria-pressed={isActive}
                        title={
                          item.label ||
                          item.alt ||
                          `Artwork ${index + 1}`
                        }
                        className={`
                          relative
                          h-16 w-16 shrink-0
                          overflow-hidden
                          border-2
                          transition-[opacity,border-color]
                          duration-200
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-offset-1
                          focus-visible:outline-[#FF0000]
                          sm:h-20 sm:w-20
                          ${
                            isActive
                              ? 'border-[#FF0000] opacity-100'
                              : 'border-white/20 opacity-50 hover:border-white hover:opacity-100'
                          }
                        `}
                      >

                        {/* ============================== */}
                        {/* VIDEO THUMBNAIL */}
                        {/* ============================== */}

                        {isVideo ? (
                          <VideoThumbnail
                            item={item}
                            isActive={isActive}
                          />
                        ) : (

                          // ==============================
                          // LAZY IMAGE THUMBNAIL
                          // ==============================

                          <LazyThumbnailImage
                            src={
                              item.thumbnailSrc ||
                              item.placeholderSrc ||
                              item.src
                            }
                            alt={
                              item.alt ||
                              `Artwork ${index + 1}`
                            }
                            priority={
                              isActive ||
                              isAdjacent
                            }
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (

          // ================================================
          // EMPTY PROJECT STATE
          // ================================================

          <div
            className="
              flex flex-1 flex-col
              items-center justify-center
              px-6 text-center
            "
          >
            <p
              className="
                text-xs font-black uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
              Work in Progress
            </p>

            <h3
              className="
                mt-3 text-2xl
                font-black uppercase
                sm:text-3xl
              "
            >
              Coming Soon

              <span className="text-[#FF0000]">
                .
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ProjectModal;