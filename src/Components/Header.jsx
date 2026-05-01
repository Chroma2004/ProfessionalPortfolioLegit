import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header({ onNavigate, isTransitioning }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatingPath, setAnimatingPath] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isBurgerAnimating, setIsBurgerAnimating] = useState(false);
  const [isBulbFlickering, setIsBulbFlickering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return localStorage.getItem('portfolio-theme') === 'dark';
  });

  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }

    window.dispatchEvent(
      new CustomEvent('portfolio-theme-change', {
        detail: {
          theme: isDarkMode ? 'dark' : 'light',
        },
      })
    );
  }, [isDarkMode]);

  const toggleTheme = async (event) => {
    if (isBulbFlickering) return;

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const originX = buttonRect.left + buttonRect.width / 2;
    const originY = buttonRect.top + buttonRect.height / 2;
    const nextMode = !isDarkMode;
    const isTurningDark = nextMode;

    setIsBulbFlickering(true);

    const endRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    document.documentElement.dataset.themeTransition = isTurningDark
      ? 'to-dark'
      : 'to-light';

    window.dispatchEvent(
      new CustomEvent('portfolio-theme-transition-start', {
        detail: {
          x: originX,
          y: originY,
          nextTheme: nextMode ? 'dark' : 'light',
          direction: isTurningDark ? 'collapse' : 'spread',
        },
      })
    );

    if (!document.startViewTransition) {
      setIsDarkMode(nextMode);

      setTimeout(() => {
        delete document.documentElement.dataset.themeTransition;
        setIsBulbFlickering(false);
      }, 950);

      return;
    }

    const transition = document.startViewTransition(() => {
      setIsDarkMode(nextMode);
    });

    try {
      await transition.ready;

      if (isTurningDark) {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${endRadius}px at ${originX}px ${originY}px)`,
              `circle(0px at ${originX}px ${originY}px)`,
            ],
          },
          {
            duration: 950,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-old(root)',
          }
        );
      } else {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${endRadius}px at ${originX}px ${originY}px)`,
            ],
          },
          {
            duration: 950,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }
    } catch {
      setIsDarkMode(nextMode);
    }

    setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
      setIsBulbFlickering(false);
    }, 950);
  };

  const getDesktopLinkClass = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return 'font-black text-[#FF0000]';
    }

    return isDarkMode
      ? 'font-extrabold text-white/70 hover:text-[#FF0000]'
      : 'font-extrabold text-black/70 hover:text-[#FF0000]';
  };

  const closeMenu = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      setIsMenuOpen(false);
      setAnimatingPath(null);

      setTimeout(() => {
        setIsClosing(false);
      }, 300);
    }, 420);
  };

  const openMenu = () => {
    if (isBurgerAnimating || isMenuOpen) return;

    setIsBurgerAnimating(true);

    setTimeout(() => {
      setIsMenuOpen(true);

      setTimeout(() => {
        setIsBurgerAnimating(false);
      }, 260);
    }, 360);
  };

  const handleDesktopNavigate = (path) => {
    if (isTransitioning) return;

    closeMenu();
    onNavigate(path);
  };

  const handleMobileNavigate = (path) => {
    if (animatingPath || isClosing || isTransitioning) return;

    setAnimatingPath(path);

    setTimeout(() => {
      setIsMenuOpen(false);
      onNavigate(path);

      setTimeout(() => {
        setAnimatingPath(null);
      }, 250);
    }, 520);
  };

  const getMobileLinkClass = (path) => {
    const isAnimating = animatingPath === path;
    const isActive = location.pathname === path;

    if (isAnimating) {
      return `group relative overflow-hidden border-2 transition-colors duration-300 ${
        isDarkMode
          ? 'border-white font-black text-black'
          : 'border-black font-black text-white'
      }`;
    }

    if (isActive) {
      return `group relative overflow-hidden border-2 transition-colors duration-300 ${
        isDarkMode
          ? 'border-white bg-white font-black text-black'
          : 'border-black bg-black font-black text-white'
      }`;
    }

    return `group relative overflow-hidden border-2 transition-colors duration-300 ${
      isDarkMode
        ? 'border-white font-extrabold text-white hover:text-black'
        : 'border-black font-extrabold text-black hover:text-white'
    }`;
  };

  const headerTextClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClass = isDarkMode ? 'text-white/50' : 'text-black/50';
  const borderClass = isDarkMode ? 'border-white' : 'border-black';
  const menuFillClass = isDarkMode ? 'bg-white' : 'bg-black';
  const bulbColorClass = isDarkMode ? 'text-white' : 'text-black';
  const bulbFillClass = isDarkMode ? 'bg-white' : 'bg-black';
  const bulbHoverTextClass = isDarkMode
    ? 'hover:text-black'
    : 'hover:text-white';
  const bulbGlowClass = isDarkMode
    ? 'before:bg-white/20 after:bg-white/20'
    : 'before:bg-[#FFD84D]/45 after:bg-[#FFD84D]/35';

  const menuIconTextClass =
    isBurgerAnimating || isMenuOpen
      ? isDarkMode
        ? 'text-black'
        : 'text-white'
      : isDarkMode
        ? 'text-white hover:text-black'
        : 'text-black hover:text-white';

  const bulbButtonClass = `group/light relative flex h-8 w-8 items-center justify-center transition-transform duration-300 hover:scale-110 ${bulbColorClass}`;

  const mobileBulbButtonClass = `group/light relative flex h-11 w-11 items-center justify-center overflow-hidden border-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 ${borderClass} ${bulbColorClass} ${bulbHoverTextClass} ${
    isBulbFlickering ? 'scale-95 border-[#FF0000]' : ''
  }`;

  const bulbWrapperClass = `relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:scale-0 before:rounded-full before:blur-md before:transition-all before:duration-500 after:pointer-events-none after:absolute after:inset-1 after:scale-0 after:rounded-full after:blur-sm after:transition-all after:duration-500 group-hover/light:before:scale-100 group-hover/light:after:scale-100 ${
    isBulbFlickering ? 'animate-[bulbFlicker_720ms_steps(1,end)]' : ''
  } ${
    isDarkMode
      ? 'group-hover/light:before:opacity-40 group-hover/light:after:opacity-25'
      : 'group-hover/light:before:opacity-100 group-hover/light:after:opacity-80'
  } ${bulbGlowClass}`;

  const bulbSvgClass = `relative z-10 h-5 w-5 origin-center transition-all duration-500 ${
    isBulbFlickering
      ? 'animate-[bulbPop_720ms_cubic-bezier(0.22,1,0.36,1)]'
      : ''
  } ${
    isDarkMode
      ? 'drop-shadow-none'
      : 'drop-shadow-[0_0_8px_rgba(255,216,77,0.75)]'
  }`;

  const renderLightBulbIcon = () => (
    <span className={bulbWrapperClass}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={bulbSvgClass}
        aria-hidden="true"
      >
        <path
          d="M9 19H15"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M9.6 22H14.4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8.8 16.3H15.2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8.7 16.3C8.7 13.9 6.4 12.5 6.4 9.6C6.4 6.45 8.9 4 12 4C15.1 4 17.6 6.45 17.6 9.6C17.6 12.5 15.3 13.9 15.3 16.3"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 1.8V2.4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30' : 'opacity-100'
          }`}
        />
        <path
          d="M19.1 4.9L18.65 5.35"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30' : 'opacity-100'
          }`}
        />
        <path
          d="M21.8 11H21.2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30' : 'opacity-100'
          }`}
        />
        <path
          d="M4.9 4.9L5.35 5.35"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30' : 'opacity-100'
          }`}
        />
        <path
          d="M2.2 11H2.8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={`transition-opacity duration-300 ${
            isDarkMode ? 'opacity-30' : 'opacity-100'
          }`}
        />
      </svg>
    </span>
  );

  const renderMobileLightBulbButton = () => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={mobileBulbButtonClass}
    >
      <span
        className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${bulbFillClass} ${
          isBulbFlickering ? 'w-[170%]' : 'w-0 group-hover/light:w-[170%]'
        }`}
      />

      <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/light:rotate-12 group-hover/light:scale-110">
        {renderLightBulbIcon()}
      </span>
    </button>
  );

  return (
    <header
      className={`absolute left-0 top-0 z-50 w-full select-none px-5 py-6 transition-colors duration-500 sm:px-8 sm:py-8 ${headerTextClass}`}
    >
      <style>
        {`
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
            backface-visibility: hidden;
          }

          html[data-theme-transition='to-dark']::view-transition-old(root) {
            z-index: 2;
          }

          html[data-theme-transition='to-dark']::view-transition-new(root) {
            z-index: 1;
          }

          html[data-theme-transition='to-light']::view-transition-old(root) {
            z-index: 1;
          }

          html[data-theme-transition='to-light']::view-transition-new(root) {
            z-index: 2;
          }

          @keyframes bulbFlicker {
            0% {
              opacity: 1;
              filter: brightness(1);
            }

            8% {
              opacity: 0.35;
              filter: brightness(0.65);
            }

            16% {
              opacity: 1;
              filter: brightness(1.4);
            }

            24% {
              opacity: 0.45;
              filter: brightness(0.75);
            }

            34% {
              opacity: 1;
              filter: brightness(1.8);
            }

            48% {
              opacity: 0.55;
              filter: brightness(0.9);
            }

            62% {
              opacity: 1;
              filter: brightness(1.5);
            }

            78% {
              opacity: 0.78;
              filter: brightness(1);
            }

            100% {
              opacity: 1;
              filter: brightness(1);
            }
          }

          @keyframes bulbPop {
            0% {
              transform: scale(1) rotate(0deg);
            }

            18% {
              transform: scale(0.82) rotate(-8deg);
            }

            36% {
              transform: scale(1.16) rotate(7deg);
            }

            58% {
              transform: scale(0.94) rotate(-3deg);
            }

            78% {
              transform: scale(1.06) rotate(2deg);
            }

            100% {
              transform: scale(1) rotate(0deg);
            }
          }
        `}
      </style>

      <nav className="flex items-center justify-between text-[11px] tracking-wide">
        <button
          type="button"
          onClick={() => handleDesktopNavigate('/')}
          className={`group flex items-center gap-2 uppercase transition-colors duration-300 hover:text-[#FF0000] ${headerTextClass}`}
        >
          <span className="flex h-7 w-7 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="block h-6 w-6 origin-center animate-[spin_6s_linear_infinite] text-[#FF0000]"
              aria-hidden="true"
            >
              <line
                x1="50"
                y1="12"
                x2="50"
                y2="88"
                stroke="currentColor"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="12"
                x2="50"
                y2="88"
                stroke="currentColor"
                strokeWidth="13"
                strokeLinecap="round"
                transform="rotate(60 50 50)"
              />
              <line
                x1="50"
                y1="12"
                x2="50"
                y2="88"
                stroke="currentColor"
                strokeWidth="13"
                strokeLinecap="round"
                transform="rotate(120 50 50)"
              />
            </svg>
          </span>

          <span
            className={`font-black transition-colors duration-300 ${headerTextClass}`}
          >
            Chroma
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => handleDesktopNavigate('/')}
            className={getDesktopLinkClass('/')}
          >
            HOME
          </button>

          <span className={`translate-y-[2px] font-black ${mutedTextClass}`}>
            *
          </span>

          <button
            type="button"
            onClick={() => handleDesktopNavigate('/projects')}
            className={getDesktopLinkClass('/projects')}
          >
            PROJECTS (5)
          </button>

          <span className={`translate-y-[2px] font-black ${mutedTextClass}`}>
            *
          </span>

          <button
            type="button"
            onClick={() => handleDesktopNavigate('/design-process')}
            className={getDesktopLinkClass('/design-process')}
          >
            My Design Process
          </button>

          <span className={`translate-y-[2px] font-black ${mutedTextClass}`}>
            *
          </span>

          <button
            type="button"
            onClick={() => handleDesktopNavigate('/contact')}
            className={getDesktopLinkClass('/contact')}
          >
            CONTACT
          </button>

          {/* Desktop Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className={`ml-3 ${bulbButtonClass}`}
          >
            {renderLightBulbIcon()}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Theme Toggle */}
          {renderMobileLightBulbButton()}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => {
              if (isMenuOpen) {
                closeMenu();
              } else {
                openMenu();
              }
            }}
            className={`group relative flex h-11 w-11 items-center justify-center overflow-hidden border-2 transition-colors duration-300 md:hidden ${borderClass} ${menuIconTextClass}`}
          >
            <span
              className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${menuFillClass} ${
                isBurgerAnimating || isMenuOpen
                  ? 'w-[170%]'
                  : 'w-0 group-hover:w-[170%]'
              }`}
            />

            <span className="relative z-10 flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                  isBurgerAnimating || isMenuOpen
                    ? 'w-[11px] translate-x-[3px] -translate-y-[4px] rotate-45'
                    : 'w-5 -translate-y-[6px] rotate-0 group-hover:w-4 group-hover:translate-x-[2px]'
                }`}
              />

              <span
                className={`absolute h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                  isBurgerAnimating || isMenuOpen
                    ? 'w-5 translate-x-0 translate-y-0'
                    : 'w-5 translate-y-0 group-hover:w-[14px] group-hover:translate-x-[3px]'
                }`}
              />

              <span
                className={`absolute h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                  isBurgerAnimating || isMenuOpen
                    ? 'w-[11px] translate-x-[3px] translate-y-[4px] -rotate-45'
                    : 'w-5 translate-y-[6px] rotate-0 group-hover:w-4 group-hover:translate-x-[2px]'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isDarkMode ? 'bg-white/10' : 'bg-black/30'
        } ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[82%] max-w-[340px] border-l-2 px-5 py-6 shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          isDarkMode
            ? 'border-white bg-black text-white'
            : 'border-black bg-[#d9d9d9] text-black'
        } ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <span
            className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wide ${headerTextClass}`}
          >
            Menu

            <span className="translate-y-[2px] font-black text-[#FF0000]">
              *
            </span>
          </span>

          <div className="flex items-center gap-3">
            {renderMobileLightBulbButton()}

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className={`group relative flex h-11 w-11 items-center justify-center overflow-hidden border-2 text-lg font-black transition-colors duration-300 ${borderClass} ${
                isClosing
                  ? 'text-white'
                  : isDarkMode
                    ? 'text-white hover:text-white'
                    : 'text-black hover:text-white'
              }`}
            >
              <span
                className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 transition-all duration-500 ease-out ${
                  isClosing ? 'w-[150%]' : 'w-0 group-hover:w-[150%]'
                }`}
              />

              <span className="relative z-10 block h-4 w-4">
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 bg-current transition-all duration-300 ease-out ${
                    isClosing
                      ? 'translate-y-0 rotate-[225deg] scale-90'
                      : 'translate-y-0 rotate-45 group-hover:rotate-[135deg]'
                  }`}
                />

                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 bg-current transition-all duration-300 ease-out ${
                    isClosing
                      ? 'translate-y-0 rotate-[135deg] scale-90'
                      : 'translate-y-0 -rotate-45 group-hover:rotate-[-135deg]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs tracking-wide">
          <button
            type="button"
            onClick={() => handleMobileNavigate('/')}
            className={getMobileLinkClass('/')}
          >
            <span
              className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${menuFillClass} ${
                animatingPath === '/'
                  ? 'w-[180%]'
                  : 'w-0 group-hover:w-[180%]'
              }`}
            />

            <span className="relative z-10 flex items-center justify-between px-4 py-4">
              HOME

              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleMobileNavigate('/projects')}
            className={getMobileLinkClass('/projects')}
          >
            <span
              className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${menuFillClass} ${
                animatingPath === '/projects'
                  ? 'w-[180%]'
                  : 'w-0 group-hover:w-[180%]'
              }`}
            />

            <span className="relative z-10 flex items-center justify-between px-4 py-4">
              PROJECTS (5)

              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleMobileNavigate('/design-process')}
            className={getMobileLinkClass('/design-process')}
          >
            <span
              className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${menuFillClass} ${
                animatingPath === '/design-process'
                  ? 'w-[180%]'
                  : 'w-0 group-hover:w-[180%]'
              }`}
            />

            <span className="relative z-10 flex items-center justify-between px-4 py-4">
              My Design Process

              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleMobileNavigate('/contact')}
            className={getMobileLinkClass('/contact')}
          >
            <span
              className={`absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${menuFillClass} ${
                animatingPath === '/contact'
                  ? 'w-[180%]'
                  : 'w-0 group-hover:w-[180%]'
              }`}
            />

            <span className="relative z-10 flex items-center justify-between px-4 py-4">
              CONTACT

              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </div>

        <div
          className={`absolute bottom-6 left-5 right-5 border-t-2 border-dotted pt-4 text-[10px] font-black uppercase tracking-wide ${
            isDarkMode
              ? 'border-white text-white/60'
              : 'border-black text-black/60'
          }`}
        >
          PORTFOLI<span className="text-[#FF0000]">.</span>YO
        </div>
      </aside>
    </header>
  );
}

export default Header;