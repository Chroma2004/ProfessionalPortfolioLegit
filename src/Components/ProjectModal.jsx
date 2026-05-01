import { useEffect, useRef, useState } from 'react';

function CustomVideo({ item, className = '', onExpand, isDarkMode }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = (event) => {
    event.stopPropagation();

    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.pause();
      setIsPlaying(false);
    }

    onExpand(item);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <button
      type="button"
      aria-label={`Maximize ${item.label || item.alt}`}
      onClick={handleCardClick}
      className={`group/video relative block w-full overflow-hidden bg-transparent text-left ${className}`}
    >
      <video
        ref={videoRef}
        src={item.src}
        className="h-auto w-full object-contain"
        muted
        playsInline
        preload="metadata"
        onEnded={handleVideoEnded}
      >
        <track kind="captions" />
      </video>

      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPlaying ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={handleTogglePlay}
          className={`group/button flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 ${
            isDarkMode
              ? 'border-white bg-black/85 text-white hover:bg-white hover:text-black'
              : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black hover:text-white'
          }`}
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 transition-transform duration-300 group-hover/button:scale-110"
            >
              <path d="M7 5H10V19H7V5ZM14 5H17V19H14V5Z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-6 w-6 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:scale-110"
            >
              <path d="M8 5V19L19 12L8 5Z" />
            </svg>
          )}
        </button>
      </div>
    </button>
  );
}

function ExpandedMedia({ item, project, onClose, isDarkMode }) {
  const expandedVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    item?.activeIndex || 0
  );

  const isStackViewer = item?.type === 'stack-viewer';
  const stackItems = isStackViewer && Array.isArray(item.items) ? item.items : [];
  const activeItem = isStackViewer ? stackItems[activeSlideIndex] : item;
  const isVideo = activeItem?.type === 'video';

  const itemTools = Array.isArray(activeItem?.tools)
    ? activeItem.tools
    : Array.isArray(item?.tools)
      ? item.tools
      : Array.isArray(project?.tools)
        ? project.tools
        : [];

  const filteredTools = itemTools.filter(
    (tool) => tool !== 'Visual Direction' && tool !== 'Layout Design'
  );

  const hasTools = filteredTools.length > 0;

  const activeDescription =
    activeItem?.details ||
    item?.details ||
    project?.details ||
    project?.description ||
    '';

  useEffect(() => {
    setActiveSlideIndex(item?.activeIndex || 0);
    setIsPlaying(false);
  }, [item]);

  const handleToggleExpandedPlay = (event) => {
    event.stopPropagation();

    const expandedVideoElement = expandedVideoRef.current;

    if (!expandedVideoElement) return;

    if (expandedVideoElement.paused) {
      expandedVideoElement.play();
      setIsPlaying(true);
    } else {
      expandedVideoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleCloseExpanded = (event) => {
    event.stopPropagation();

    if (isMinimizing) return;

    const expandedVideoElement = expandedVideoRef.current;

    if (expandedVideoElement) {
      expandedVideoElement.pause();
    }

    setIsPlaying(false);
    setIsMinimizing(true);

    setTimeout(() => {
      onClose();
      setIsMinimizing(false);
    }, 320);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleSlideChange = (event, nextIndex) => {
    event.stopPropagation();

    const expandedVideoElement = expandedVideoRef.current;

    if (expandedVideoElement) {
      expandedVideoElement.pause();
    }

    setIsPlaying(false);
    setActiveSlideIndex(nextIndex);
  };

  const handlePreviousSlide = (event) => {
    const nextIndex =
      activeSlideIndex === 0 ? stackItems.length - 1 : activeSlideIndex - 1;

    handleSlideChange(event, nextIndex);
  };

  const handleNextSlide = (event) => {
    const nextIndex =
      activeSlideIndex === stackItems.length - 1 ? 0 : activeSlideIndex + 1;

    handleSlideChange(event, nextIndex);
  };

  if (!item || !activeItem) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-5 py-8 backdrop-blur-md ${
        isMinimizing
          ? 'animate-[modalFadeOut_0.32s_ease-in_forwards]'
          : 'animate-[modalFadeIn_0.22s_ease-out]'
      }`}
      onClick={handleCloseExpanded}
    >
      <div
        className={`group/expanded relative max-h-[88vh] w-full max-w-6xl overflow-y-auto border-2 border-dotted p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-colors duration-500 ${
          isDarkMode
            ? 'border-white bg-black text-white'
            : 'border-[#d9d9d9] bg-[#d9d9d9] text-black'
        } ${
          isMinimizing
            ? 'animate-[modalScaleOut_0.32s_cubic-bezier(0.55,0,1,0.45)_forwards]'
            : 'animate-[modalScaleIn_0.32s_cubic-bezier(0.22,1,0.36,1)]'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative z-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div
            className={`relative flex min-h-[320px] items-center justify-center overflow-hidden transition-colors duration-500 ${
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            {isVideo ? (
              <video
                key={activeItem.src}
                ref={expandedVideoRef}
                src={activeItem.src}
                className="max-h-[78vh] w-full object-contain"
                muted
                playsInline
                preload="metadata"
                onEnded={handleVideoEnded}
              >
                <track kind="captions" />
              </video>
            ) : (
              <img
                key={activeItem.src}
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[78vh] w-full object-contain"
                draggable="false"
              />
            )}

            {isStackViewer && stackItems.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={handlePreviousSlide}
                  className={`absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 text-2xl font-black shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-1 active:scale-95 ${
                    isDarkMode
                      ? 'border-white bg-black/85 text-white hover:bg-white hover:text-black'
                      : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black hover:text-white'
                  }`}
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={handleNextSlide}
                  className={`absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 text-2xl font-black shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 active:scale-95 ${
                    isDarkMode
                      ? 'border-white bg-black/85 text-white hover:bg-white hover:text-black'
                      : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black hover:text-white'
                  }`}
                >
                  ›
                </button>
              </>
            )}

            {isVideo && (
              <div
                className={`absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isPlaying
                    ? 'opacity-0 group-hover/expanded:opacity-100'
                    : 'opacity-100'
                }`}
              >
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  onClick={handleToggleExpandedPlay}
                  className={`group/button flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-[0_10px_28px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 ${
                    isDarkMode
                      ? 'border-white bg-black/85 text-white hover:bg-white hover:text-black'
                      : 'border-black bg-[#d9d9d9]/90 text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7 transition-transform duration-300 group-hover/button:scale-110"
                    >
                      <path d="M7 5H10V19H7V5ZM14 5H17V19H14V5Z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-7 w-7 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:scale-110"
                    >
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {isStackViewer && stackItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-2">
                {stackItems.map((stackItem, stackIndex) => {
                  const isActive = activeSlideIndex === stackIndex;

                  return (
                    <button
                      key={`${stackItem.alt}-${stackIndex}`}
                      type="button"
                      aria-label={`Show slide ${stackIndex + 1}`}
                      onClick={(event) => handleSlideChange(event, stackIndex)}
                      className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-90 ${
                        isActive
                          ? isDarkMode
                            ? 'w-7 bg-white shadow-[0_4px_10px_rgba(255,255,255,0.2)]'
                            : 'w-7 bg-black shadow-[0_4px_10px_rgba(0,0,0,0.24)]'
                          : isDarkMode
                            ? 'w-2.5 bg-white/40 hover:bg-white/70'
                            : 'w-2.5 bg-black/40 hover:bg-black/70'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div
            className={`flex flex-col justify-between border-2 border-dotted p-5 transition-colors duration-500 ${
              isDarkMode
                ? 'border-white bg-black/80 text-white'
                : 'border-black bg-[#d9d9d9]/95 text-black'
            }`}
          >
            <div>
              <h3 className="text-2xl font-black uppercase tracking-wide">
                {activeItem.label || activeItem.alt}
              </h3>

              <div
                className={`my-5 h-px w-full border-t-2 border-dotted ${
                  isDarkMode ? 'border-white/50' : 'border-black/50'
                }`}
              />

              <p
                className={`text-sm font-bold leading-relaxed ${
                  isDarkMode ? 'text-white/75' : 'text-black/75'
                }`}
              >
                {activeDescription}
              </p>

              {hasTools && (
                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#FF0000]">
                    Tools Used
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {filteredTools.map((tool) => (
                      <span
                        key={tool}
                        className={`border-2 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] ${
                          isDarkMode
                            ? 'border-white bg-white text-black'
                            : 'border-black bg-black text-white'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label="Minimize media"
              onClick={handleCloseExpanded}
              disabled={isMinimizing}
              className={`group relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden border-2 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none ${
                isMinimizing
                  ? 'text-white'
                  : isDarkMode
                    ? 'border-white bg-white text-black hover:text-white'
                    : 'border-black bg-black text-white hover:text-white'
              }`}
            >
              <span
                className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF0000] transition-[width] duration-500 ease-out ${
                  isMinimizing ? 'w-[170%]' : 'w-0 group-hover:w-[170%]'
                }`}
              />

              <span className="relative z-10 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
                Minimize
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const modalGlowAnimationRef = useRef(null);
  const modalGlowTargetRef = useRef({
    x: 50,
    y: 80,
  });
  const modalGlowCurrentRef = useRef({
    x: 50,
    y: 80,
  });

  const [activeStackIndexes, setActiveStackIndexes] = useState({});
  const [expandedMedia, setExpandedMedia] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return (
      localStorage.getItem('portfolio-theme') === 'dark' ||
      document.documentElement.classList.contains('dark')
    );
  });

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
    const readCurrentTheme = () => {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const htmlHasDarkClass =
        document.documentElement.classList.contains('dark');

      setIsDarkMode(savedTheme === 'dark' || htmlHasDarkClass);
    };

    const handleThemeChange = (event) => {
      if (event?.detail?.theme) {
        setIsDarkMode(event.detail.theme === 'dark');
        return;
      }

      readCurrentTheme();
    };

    readCurrentTheme();

    const observer = new MutationObserver(readCurrentTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('portfolio-theme-change', handleThemeChange);
    window.addEventListener('storage', readCurrentTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('portfolio-theme-change', handleThemeChange);
      window.removeEventListener('storage', readCurrentTheme);
    };
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement || !isDesktopMotion) return undefined;

    const handleMouseMove = (event) => {
      const rect = modalElement.getBoundingClientRect();

      modalGlowTargetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseEnter = () => {
      modalElement.classList.add('project-modal-cursor-active');
    };

    const handleMouseLeave = () => {
      modalElement.classList.remove('project-modal-cursor-active');
    };

    const animateGlow = () => {
      modalGlowCurrentRef.current.x +=
        (modalGlowTargetRef.current.x - modalGlowCurrentRef.current.x) * 0.06;
      modalGlowCurrentRef.current.y +=
        (modalGlowTargetRef.current.y - modalGlowCurrentRef.current.y) * 0.06;

      modalElement.style.setProperty(
        '--project-modal-cursor-x',
        `${modalGlowCurrentRef.current.x}px`
      );

      modalElement.style.setProperty(
        '--project-modal-cursor-y',
        `${modalGlowCurrentRef.current.y}px`
      );

      modalGlowAnimationRef.current = requestAnimationFrame(animateGlow);
    };

    modalGlowAnimationRef.current = requestAnimationFrame(animateGlow);

    modalElement.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
    modalElement.addEventListener('mouseenter', handleMouseEnter);
    modalElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(modalGlowAnimationRef.current);

      modalElement.removeEventListener('mousemove', handleMouseMove);
      modalElement.removeEventListener('mouseenter', handleMouseEnter);
      modalElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [project, isDesktopMotion]);

  if (!project) return null;

  const hasMedia = Array.isArray(project.media) && project.media.length > 0;
  const hasPreview = Boolean(project.preview?.src);
  const isWebSystem = project.category === 'WebSystem';
  const hasLiveLink = Boolean(project.liveLink);

  const filteredTools = Array.isArray(project.tools)
    ? project.tools.filter(
        (tool) => tool !== 'Visual Direction' && tool !== 'Layout Design'
      )
    : [];

  const hasTools = filteredTools.length > 0;

  const handleAnimatedClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 360);
  };

  const handleStackChange = (stackKey, nextIndex) => {
    setActiveStackIndexes((currentIndexes) => ({
      ...currentIndexes,
      [stackKey]: nextIndex,
    }));
  };

  const handleExpandMedia = (item) => {
    setExpandedMedia(item);
  };

  const handleExpandStack = (stackItem, activeIndex) => {
    setExpandedMedia({
      type: 'stack-viewer',
      label: stackItem.label,
      details: stackItem.details,
      tools: stackItem.tools,
      items: stackItem.items,
      activeIndex,
    });
  };

  const renderTitleGradient = (title) => (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 translate-y-4 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-14 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/media:translate-y-0 group-hover/media:opacity-100 group-hover/stack:translate-y-0 group-hover/stack:opacity-100">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white">
        {title}
      </p>
    </div>
  );

  const renderImage = (item, className = '', onClickOverride = null) => (
    <button
      type="button"
      aria-label={`Maximize ${item.label || item.alt}`}
      onClick={onClickOverride || (() => handleExpandMedia(item))}
      className="group/media relative block w-full overflow-hidden bg-transparent text-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
    >
      <img
        src={item.src}
        alt={item.alt}
        className={`h-auto w-full object-contain ${className}`}
        draggable="false"
        loading="lazy"
        decoding="async"
      />

      {renderTitleGradient(item.label || item.alt)}
    </button>
  );

  const renderMediaElement = (
    item,
    className = '',
    onClickOverride = null
  ) => {
    if (item.type === 'video') {
      return (
        <div className="group/media relative transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]">
          <CustomVideo
            item={item}
            className={className}
            onExpand={onClickOverride ? () => onClickOverride() : handleExpandMedia}
            isDarkMode={isDarkMode}
          />

          {renderTitleGradient(item.label || item.alt)}
        </div>
      );
    }

    return renderImage(item, className, onClickOverride);
  };

  const getMasonryImageClass = (index) => {
    const pattern = [
      'rounded-[18px]',
      'rounded-[18px]',
      'rounded-[14px]',
      'rounded-[20px]',
      'rounded-[14px]',
      'rounded-[18px]',
      'rounded-[16px]',
      'rounded-[20px]',
    ];

    return pattern[index % pattern.length];
  };

  const renderPinterestStack = (item, index) => {
    const stackKey = `${project.title}-stack-${index}`;
    const activeIndex = activeStackIndexes[stackKey] || 0;
    const activeItem = item.items[activeIndex];

    return (
      <div
        key={stackKey}
        className="relative mb-7 block w-full break-inside-avoid bg-transparent"
      >
        <div className="group/stack relative block w-full overflow-hidden rounded-[18px] bg-transparent text-left">
          <div className="relative">
            {renderMediaElement(
              activeItem,
              'rounded-[18px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stack:scale-[1.01]',
              () => handleExpandStack(item, activeIndex)
            )}

            {item.items.length > 1 && (
              <div
                className={`pointer-events-none absolute right-3 top-3 z-40 rounded-full px-3 py-2 text-[8px] font-black uppercase tracking-[0.14em] shadow-[0_4px_12px_rgba(0,0,0,0.18)] ${
                  isDarkMode
                    ? 'bg-black/90 text-white'
                    : 'bg-[#d9d9d9]/90 text-black'
                }`}
              >
                {activeIndex + 1}/{item.items.length}
              </div>
            )}

            {renderTitleGradient(activeItem.label || activeItem.alt)}
          </div>
        </div>

        {item.items.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {item.items.map((stackItem, stackIndex) => {
              const isActive = activeIndex === stackIndex;

              return (
                <button
                  key={`${stackKey}-${stackItem.alt}-${stackIndex}`}
                  type="button"
                  aria-label={`Show stacked artwork ${stackIndex + 1}`}
                  onClick={() => handleStackChange(stackKey, stackIndex)}
                  className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-90 ${
                    isActive
                      ? isDarkMode
                        ? 'w-7 bg-white shadow-[0_4px_10px_rgba(255,255,255,0.2)]'
                        : 'w-7 bg-black shadow-[0_4px_10px_rgba(0,0,0,0.24)]'
                      : isDarkMode
                        ? 'w-2.5 bg-white/30 hover:bg-white/60'
                        : 'w-2.5 bg-black/30 hover:bg-black/60'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderPinterestItem = (item, index) => {
    if (item.type === 'stack') {
      return renderPinterestStack(item, index);
    }

    return (
      <div
        key={`${project.title}-pinterest-${item.alt}-${index}`}
        className="mb-7 break-inside-avoid"
      >
        <div className="overflow-visible bg-transparent">
          {renderMediaElement(
            item,
            `${getMasonryImageClass(
              index
            )} transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`
          )}
        </div>
      </div>
    );
  };

  const renderWebSystemPanel = () => (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {hasPreview && (
        <div
          className={`overflow-hidden border-2 border-dotted p-3 ${
            isDarkMode
              ? 'border-white bg-white/5'
              : 'border-black bg-black/5'
          }`}
        >
          <img
            src={project.preview.src}
            alt={project.preview.alt || project.title}
            className="max-h-[520px] w-full object-contain"
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div
        className={`border-2 border-dotted p-5 ${
          isDarkMode
            ? 'border-white bg-black/70'
            : 'border-black bg-[#d9d9d9]/80'
        }`}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF0000]">
          Web System
        </p>

        <h3 className="mt-3 text-2xl font-black uppercase tracking-wide">
          {project.title}
        </h3>

        <p
          className={`mt-4 text-sm font-bold leading-relaxed ${
            isDarkMode ? 'text-white/75' : 'text-black/75'
          }`}
        >
          {project.details || project.description}
        </p>

        {hasTools && (
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#FF0000]">
              Tools Used
            </p>

            <div className="flex flex-wrap gap-2">
              {filteredTools.map((tool) => (
                <span
                  key={tool}
                  className={`border-2 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] ${
                    isDarkMode
                      ? 'border-white bg-white text-black'
                      : 'border-black bg-black text-white'
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasLiveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className={`group mt-8 flex w-full items-center justify-center gap-2 overflow-hidden border-2 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
              isDarkMode
                ? 'border-white bg-white text-black hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white'
                : 'border-black bg-black text-white hover:border-[#FF0000] hover:bg-[#FF0000]'
            }`}
          >
            View Live Website
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center px-5 py-8 backdrop-blur-sm transition-colors duration-500 ${
          isDarkMode ? 'bg-black/80' : 'bg-black/70'
        } ${
          isClosing
            ? 'animate-[modalFadeOut_0.36s_ease-in_forwards]'
            : 'animate-[modalFadeIn_0.22s_ease-out]'
        }`}
        onClick={handleAnimatedClose}
      >
        <div
          ref={modalRef}
          className={`relative max-h-[88vh] w-full max-w-6xl overflow-hidden border-2 border-dotted p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] transition-colors duration-500 sm:p-8 ${
            isDarkMode
              ? 'border-white bg-black text-white'
              : 'border-black bg-[#d9d9d9] text-black'
          } ${
            isClosing
              ? 'animate-[modalScaleOut_0.36s_cubic-bezier(0.55,0,1,0.45)_forwards]'
              : 'animate-[modalScaleIn_0.32s_cubic-bezier(0.22,1,0.36,1)]'
          }`}
          style={{
            '--project-modal-cursor-x': '50%',
            '--project-modal-cursor-y': '80%',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className={`pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle,currentColor_1.15px,transparent_1.35px)] bg-[size:14px_14px] ${
              isDarkMode
                ? 'text-white opacity-[0.06]'
                : 'text-black opacity-[0.07]'
            }`}
          />

          {isDarkMode && isDesktopMotion && (
            <div className="project-modal-cursor-glow pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700" />
          )}

          <div
            className={`pointer-events-none absolute inset-0 z-0 ${
              isDarkMode
                ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.045),transparent_36%,rgba(255,0,0,0.06))]'
                : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.24),transparent_36%,rgba(0,0,0,0.045))]'
            }`}
          />

          <style>
            {`
              @keyframes modalFadeIn {
                from {
                  opacity: 0;
                }

                to {
                  opacity: 1;
                }
              }

              @keyframes modalFadeOut {
                from {
                  opacity: 1;
                }

                to {
                  opacity: 0;
                }
              }

              @keyframes modalScaleIn {
                from {
                  opacity: 0;
                  transform: translateY(14px) scale(0.97);
                }

                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }

              @keyframes modalScaleOut {
                from {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }

                to {
                  opacity: 0;
                  transform: translateY(10px) scale(0.97);
                }
              }

              .project-modal-cursor-glow {
                background:
                  radial-gradient(
                    circle at var(--project-modal-cursor-x) var(--project-modal-cursor-y),
                    rgba(255, 0, 0, 0.16) 0%,
                    rgba(255, 0, 0, 0.08) 12%,
                    rgba(255, 0, 0, 0.03) 24%,
                    transparent 40%
                  );
              }

              .project-modal-cursor-active .project-modal-cursor-glow {
                opacity: 1;
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

          <div className="relative z-10 max-h-[calc(88vh-2.5rem)] overflow-y-auto pr-1 sm:max-h-[calc(88vh-4rem)]">
            <button
              type="button"
              aria-label="Close project details"
              onClick={handleAnimatedClose}
              disabled={isClosing}
              className={`group absolute right-0 top-0 z-30 flex h-10 w-10 items-center justify-center overflow-hidden border-2 text-lg font-black transition-colors duration-300 disabled:pointer-events-none ${
                isClosing
                  ? 'text-white'
                  : isDarkMode
                    ? 'border-white bg-black text-white hover:text-white'
                    : 'border-black bg-[#d9d9d9] text-black hover:text-white'
              }`}
            >
              <span
                className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 transition-[width] duration-500 ease-out ${
                  isClosing ? 'w-[150%]' : 'w-0 group-hover:w-[150%]'
                }`}
              />

              <span className="relative z-10 block h-4 w-4">
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 bg-current transition-transform duration-300 ease-out ${
                    isClosing
                      ? 'translate-y-0 rotate-[225deg] scale-90'
                      : 'translate-y-0 rotate-45 group-hover:rotate-[135deg]'
                  }`}
                />

                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 bg-current transition-transform duration-300 ease-out ${
                    isClosing
                      ? 'translate-y-0 rotate-[135deg] scale-90'
                      : 'translate-y-0 -rotate-45 group-hover:rotate-[-135deg]'
                  }`}
                />
              </span>
            </button>

            <div className="pr-14">
              <h2 className="text-3xl font-black uppercase tracking-wide sm:text-4xl">
                {project.title}
              </h2>

              <p
                className={`mt-2 text-xs font-black uppercase tracking-[0.2em] ${
                  isDarkMode ? 'text-white/60' : 'text-black/60'
                }`}
              >
                {project.role}
              </p>
            </div>

            {!isWebSystem && hasTools && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <p className="mr-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FF0000]">
                  Tools Used
                </p>

                {filteredTools.map((tool) => (
                  <span
                    key={tool}
                    className={`border-2 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 ${
                      isDarkMode
                        ? 'border-white bg-white text-black'
                        : 'border-black bg-black text-white'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}

            <div
              className={`my-6 h-px w-full border-t-2 border-dotted ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            />

            {isWebSystem && renderWebSystemPanel()}

            {!isWebSystem && hasMedia && (
              <div className="columns-1 gap-7 sm:columns-2 lg:columns-3">
                {project.media.map((item, index) =>
                  renderPinterestItem(item, index)
                )}
              </div>
            )}

            {!isWebSystem && !hasMedia && (
              <div
                className={`border-2 border-dotted p-8 text-center ${
                  isDarkMode
                    ? 'border-white bg-black/70'
                    : 'border-black bg-[#d9d9d9]/80'
                }`}
              >
                <p
                  className={`text-xs font-black uppercase tracking-[0.2em] ${
                    isDarkMode ? 'text-white/60' : 'text-black/60'
                  }`}
                >
                  Works will be added soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {expandedMedia && !isWebSystem && (
        <ExpandedMedia
          item={expandedMedia}
          project={project}
          onClose={() => setExpandedMedia(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}

export default ProjectModal;