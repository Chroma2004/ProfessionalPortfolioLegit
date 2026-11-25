import { useEffect, useMemo, useState } from 'react';
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
          (stackItem.type === 'image' ||
            stackItem.type === 'video')
      );
    }

    if (
      item.type === 'image' ||
      item.type === 'video'
    ) {
      return [item];
    }

    return [];
  });
};

// ============================================================
// PROJECT MODAL
// ============================================================

function ProjectModal({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const media = useMemo(
    () => flattenProjectMedia(project?.media),
    [project]
  );

  const activeMedia = media[activeIndex];

  // ============================================================
  // RESET ACTIVE MEDIA WHEN PROJECT CHANGES
  // ============================================================

  useEffect(() => {
    setActiveIndex(0);
  }, [project]);

  // ============================================================
  // KEYBOARD NAVIGATION
  // ============================================================

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (media.length <= 1) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();

        setActiveIndex((current) =>
          (current + 1) % media.length
        );
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();

        setActiveIndex((current) =>
          (current - 1 + media.length) % media.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [project, media.length, onClose]);

  // ============================================================
  // NAVIGATION HANDLERS
  // ============================================================

  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + media.length) % media.length
    );
  };

  const showNext = () => {
    setActiveIndex(
      (current) =>
        (current + 1) % media.length
    );
  };

  // ============================================================
  // CLOSE IF NO PROJECT
  // ============================================================

  if (!project || typeof document === 'undefined') {
    return null;
  }

  // ============================================================
  // RENDER
  // ============================================================

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-3 py-5 backdrop-blur-xl sm:px-6 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} preview`}
        className="relative flex h-full max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden border border-white/20 bg-[#0b0b0b] text-white shadow-2xl"
      >
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/15 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.25em] text-[#FF0000]">
              Project Preview
            </p>

            <h2 className="truncate text-sm font-black uppercase tracking-[0.04em] sm:text-lg">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-xl font-bold transition-colors duration-200 hover:border-[#FF0000] hover:bg-[#FF0000]"
          >
            ×
          </button>
        </div>

        {/* ================================================== */}
        {/* MAIN PREVIEW */}
        {/* ================================================== */}

        {activeMedia ? (
          <>
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black px-3 py-5 sm:px-12 sm:py-8">
              {activeMedia.type === 'video' ? (
                <video
                  key={activeMedia.src}
                  src={activeMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-full max-w-full object-contain"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <img
                  key={activeMedia.src}
                  src={activeMedia.src}
                  alt={
                    activeMedia.alt ||
                    activeMedia.label ||
                    project.title
                  }
                  className="max-h-full max-w-full object-contain"
                  draggable="false"
                />
              )}

              {/* PREVIOUS BUTTON */}

              {media.length > 1 && (
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous artwork"
                  className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/75 text-xl font-bold text-white transition-colors hover:border-[#FF0000] hover:bg-[#FF0000] sm:left-5 sm:h-11 sm:w-11"
                >
                  ←
                </button>
              )}

              {/* NEXT BUTTON */}

              {media.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next artwork"
                  className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/75 text-xl font-bold text-white transition-colors hover:border-[#FF0000] hover:bg-[#FF0000] sm:right-5 sm:h-11 sm:w-11"
                >
                  →
                </button>
              )}

              {/* IMAGE COUNTER */}

              {media.length > 1 && (
                <div className="absolute bottom-3 right-3 border border-white/20 bg-black/80 px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-white sm:bottom-5 sm:right-5">
                  {String(activeIndex + 1).padStart(2, '0')}
                  {' / '}
                  {String(media.length).padStart(2, '0')}
                </div>
              )}
            </div>

            {/* ================================================== */}
            {/* THUMBNAIL STRIP */}
            {/* ================================================== */}

            {media.length > 1 && (
              <div className="shrink-0 border-t border-white/15 bg-[#111] px-3 py-3 sm:px-5">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {media.map((item, index) => {
                    const isActive = activeIndex === index;

                    return (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Preview artwork ${index + 1}`}
                        aria-pressed={isActive}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden border-2 transition-all duration-200 sm:h-20 sm:w-20 ${
                          isActive
                            ? 'border-[#FF0000] opacity-100'
                            : 'border-white/20 opacity-50 hover:border-white hover:opacity-100'
                        }`}
                      >
                        {item.type === 'video' ? (
                          <div className="relative h-full w-full">
                            <video
                              src={item.src}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-cover"
                            >
                              <track kind="captions" />
                            </video>

                            <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-lg text-white">
                              ▶
                            </span>
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            alt={item.alt || `Artwork ${index + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            draggable="false"
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
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
              Work in Progress
            </p>

            <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
              Coming Soon
              <span className="text-[#FF0000]">.</span>
            </h3>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ProjectModal;