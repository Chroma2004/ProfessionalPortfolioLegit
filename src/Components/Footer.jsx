import { useEffect, useRef, useState } from 'react';

import adobeIllustratorIcon from '../assets/AdobeIllustrator.svg';
import adobePhotoshopIcon from '../assets/AdobePhotoshop.svg';
import canvaIcon from '../assets/Canva.svg';
import cssIcon from '../assets/CSS.svg';
import figmaIcon from '../assets/Figma.svg';
import htmlIcon from '../assets/HTML.svg';
import procreateIcon from '../assets/Procreate.png';
import reactIcon from '../assets/react.svg';
import saturnImage from '../assets/saturn.PNG';
import tailwindIcon from '../assets/TailwindCSS.svg';
import videoIcon from '../assets/Video.svg';
import vsCodeIcon from '../assets/VSCode.svg';

function Footer() {
  const [activeSkillIndex, setActiveSkillIndex] = useState(null);
  const [hasAnimatedSkills, setHasAnimatedSkills] = useState(false);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState(null);

  const footerRef = useRef(null);
  const footerGlowAnimationRef = useRef(null);

  const footerGlowTargetRef = useRef({
    x: 50,
    y: 80,
  });

  const footerGlowCurrentRef = useRef({
    x: 50,
    y: 80,
  });

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your portfolio and would like to connect with you.%0D%0A%0D%0A`;

  const skills = [
    {
      name: 'Figma',
      icon: figmaIcon,
      color: '#F24E1E',
      type: 'asset',
    },
    {
      name: 'Canva',
      icon: canvaIcon,
      color: '#00C4CC',
      type: 'asset',
    },
    {
      name: 'Photoshop',
      icon: adobePhotoshopIcon,
      color: '#31A8FF',
      type: 'asset',
    },
    {
      name: 'Illustrator',
      icon: adobeIllustratorIcon,
      color: '#FF9A00',
      type: 'asset',
    },
    {
      name: 'Procreate',
      icon: procreateIcon,
      color: '#FFFFFF',
      type: 'asset',
    },
    {
      name: 'Video Editing',
      icon: videoIcon,
      color: '#FF0000',
      type: 'asset',
    },
    {
      name: 'VS Code',
      icon: vsCodeIcon,
      color: '#007ACC',
      type: 'asset',
    },
    {
      name: 'HTML',
      icon: htmlIcon,
      color: '#E34F26',
      type: 'asset',
    },
    {
      name: 'CSS',
      icon: cssIcon,
      color: '#1572B6',
      type: 'asset',
    },
    {
      name: 'React',
      icon: reactIcon,
      color: '#61DAFB',
      type: 'asset',
    },
    {
      name: 'Tailwind CSS',
      icon: tailwindIcon,
      color: '#06B6D4',
      type: 'asset',
    },
    {
      name: 'Bubble.io',
      color: '#FFFFFF',
      type: 'bubble',
    },
  ];

  const SectionTitle = ({ icon, children }) => (
    <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-white">
      <span className="text-sm text-[#FF0000]">{icon}</span>
      {children}
    </h3>
  );

  const BubbleIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="13"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="8.5" cy="10.5" r="1.15" fill="currentColor" />
      <circle
        cx="17.8"
        cy="7"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="18"
        cy="18"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );

  useEffect(() => {
    const footerElement = footerRef.current;

    if (!footerElement || hasAnimatedSkills) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedSkills) return;

        setHasAnimatedSkills(true);

        skills.forEach((_, index) => {
          setTimeout(() => {
            setActiveSkillIndex(index);
          }, index * 220);
        });

        setTimeout(() => {
          setActiveSkillIndex(null);
        }, skills.length * 220 + 450);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimatedSkills, skills.length]);

  useEffect(() => {
    const footerElement = footerRef.current;

    if (!footerElement) return;

    const handleMouseMove = (event) => {
      const rect = footerElement.getBoundingClientRect();

      footerGlowTargetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseEnter = () => {
      footerElement.classList.add('footer-cursor-active');
    };

    const handleMouseLeave = () => {
      footerElement.classList.remove('footer-cursor-active');
    };

    const animateGlow = () => {
      footerGlowCurrentRef.current.x +=
        (footerGlowTargetRef.current.x - footerGlowCurrentRef.current.x) * 0.08;
      footerGlowCurrentRef.current.y +=
        (footerGlowTargetRef.current.y - footerGlowCurrentRef.current.y) * 0.08;

      footerElement.style.setProperty(
        '--footer-cursor-x',
        `${footerGlowCurrentRef.current.x}px`
      );

      footerElement.style.setProperty(
        '--footer-cursor-y',
        `${footerGlowCurrentRef.current.y}px`
      );

      footerGlowAnimationRef.current = requestAnimationFrame(animateGlow);
    };

    footerGlowAnimationRef.current = requestAnimationFrame(animateGlow);

    footerElement.addEventListener('mousemove', handleMouseMove);
    footerElement.addEventListener('mouseenter', handleMouseEnter);
    footerElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(footerGlowAnimationRef.current);

      footerElement.removeEventListener('mousemove', handleMouseMove);
      footerElement.removeEventListener('mouseenter', handleMouseEnter);
      footerElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setHasCopiedEmail(true);

      setTimeout(() => {
        setHasCopiedEmail(false);
      }, 1600);
    } catch {
      setHasCopiedEmail(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative mx-auto mt-24 w-full select-none overflow-hidden bg-black px-5 py-16 text-white sm:px-8 sm:py-20 md:mt-28 lg:mt-32"
      style={{
        '--footer-cursor-x': '50%',
        '--footer-cursor-y': '80%',
      }}
    >
      {/* Subtle moving red halftone gradient background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] opacity-55">
        <div className="absolute inset-0 animate-[footerHalftoneDrift_24s_linear_infinite] bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.34)_1.25px,transparent_1.45px)] bg-[length:14px_14px] [mask-image:linear-gradient(to_top,black,rgba(0,0,0,0.58),rgba(0,0,0,0.18),transparent)]" />

        <div className="absolute inset-x-0 bottom-0 h-full animate-[footerGlowPulse_10s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,0,0.28),rgba(255,0,0,0.09)_38%,transparent_74%)]" />
      </div>

      {/* Cursor-following red glow */}
      <div className="footer-cursor-glow pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700" />

      <style>
        {`
          @keyframes footerHalftoneDrift {
            0% {
              background-position: 0 0;
              transform: translate3d(0, 0, 0);
            }

            50% {
              background-position: 22px -18px;
              transform: translate3d(-4px, 3px, 0);
            }

            100% {
              background-position: 44px -36px;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes footerGlowPulse {
            0%, 100% {
              opacity: 0.68;
              transform: scale(1);
            }

            50% {
              opacity: 0.9;
              transform: scale(1.035);
            }
          }

          @keyframes saturnFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(-8deg);
            }

            50% {
              transform: translate3d(0, -8px, 0) rotate(-4deg);
            }
          }

          .footer-cursor-glow {
            background:
              radial-gradient(
                circle at var(--footer-cursor-x) var(--footer-cursor-y),
                rgba(255, 0, 0, 0.22) 0%,
                rgba(255, 0, 0, 0.11) 10%,
                rgba(255, 0, 0, 0.045) 22%,
                transparent 38%
              );
          }

          .footer-cursor-active .footer-cursor-glow {
            opacity: 1;
          }
        `}
      </style>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <img
            src={saturnImage}
            alt="Saturn decoration"
            className="h-16 w-16 object-contain animate-[saturnFloat_5s_ease-in-out_infinite] sm:h-20 sm:w-20 md:h-24 md:w-24"
            draggable="false"
          />

          <h2 className="font-neonderthaw text-center text-6xl tracking-wide text-white sm:text-7xl md:text-8xl">
            About ( me )
          </h2>
        </div>

        <div className="mt-14 grid gap-10 text-[11px] font-bold leading-relaxed sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-12">
          <div>
            <SectionTitle icon="☎">Contact</SectionTitle>

            <p className="text-white/80">Michael Rhoi Gonzales</p>

            <p className="text-white/80">
              UX Designer / Product Designer / Graphic Designer / Video Editor
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={emailLink}
                className="text-white/80 transition-colors duration-300 hover:text-[#FF0000]"
              >
                {email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={hasCopiedEmail ? 'Email copied' : 'Copy email'}
                title={hasCopiedEmail ? 'Copied' : 'Copy email'}
                className={`group relative flex h-6 w-6 items-center justify-center transition-all duration-300 ${
                  hasCopiedEmail
                    ? 'text-[#FF0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.75)]'
                    : 'text-white/70 hover:text-[#FF0000]'
                }`}
              >
                {hasCopiedEmail ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <SectionTitle icon="★">Core Strengths</SectionTitle>

            <p className="text-white/80">Creative Direction</p>
            <p className="text-white/80">User-Centered Thinking</p>
            <p className="text-white/80">Problem Solving</p>
            <p className="text-white/80">Visual Attention to Detail</p>
          </div>

          <div>
            <SectionTitle icon="文">Languages</SectionTitle>

            <p className="text-white/80">English</p>
            <p className="text-white/80">Filipino / Tagalog</p>
          </div>

          <div>
            <SectionTitle icon="⌂">Education</SectionTitle>

            <p className="text-white/80">
              Cavite State University — Imus Campus
            </p>

            <p className="text-white/80">
              Bachelor of Science in Information Technology
            </p>

            <p className="text-white/80">
              Focused on UX Design, Graphic Design, Video Editing, and Frontend
              Development
            </p>
          </div>

          <div>
            <SectionTitle icon="↗">Experience</SectionTitle>

            <p className="text-white/80">Web and Landing Page Design</p>
            <p className="text-white/80">User Interface Design</p>
            <p className="text-white/80">Brand and Graphic Design</p>
            <p className="text-white/80">Short-Form Video Editing</p>
            <p className="text-white/80">Frontend Development</p>
          </div>

          <div>
            <SectionTitle icon="⌘">Creative Toolkit</SectionTitle>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => {
                const isActive = activeSkillIndex === index;
                const isHovered = hoveredSkillIndex === index;
                const shouldHighlight = isHovered || isActive;

                return (
                  <span
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkillIndex(index)}
                    onMouseLeave={() => setHoveredSkillIndex(null)}
                    className={`group flex h-9 items-center justify-center gap-2 border px-2.5 text-[10px] transition-all duration-300 ${
                      isActive
                        ? 'scale-110 border-[#FF0000] text-[#FF0000] shadow-[0_0_14px_rgba(255,0,0,0.55)]'
                        : 'border-white/80 text-white hover:border-[#FF0000] hover:text-[#FF0000]'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center transition-all duration-300 ${
                        shouldHighlight
                          ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,0,0,0.45)]'
                          : 'grayscale'
                      }`}
                    >
                      {skill.type === 'bubble' ? (
                        <span className="text-white">
                          <BubbleIcon />
                        </span>
                      ) : (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="h-4 w-4 object-contain"
                          draggable="false"
                        />
                      )}
                    </span>

                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/20 pt-6 text-[10px] font-bold uppercase tracking-wide text-white/40 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p>Michael Rhoi Gonzales</p>

            <a
              href={emailLink}
              className="block transition-colors duration-300 hover:text-[#FF0000]"
            >
              {email}
            </a>
          </div>

          <p>@Chroma</p>

          <div className="sm:text-right">
            <p>Portfolio</p>
            <p>Creative Work with a Human Touch</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;