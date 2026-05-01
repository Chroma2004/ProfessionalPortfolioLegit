import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header.jsx';
import PageLoader from './Components/PageLoader.jsx';
import Home from './Pages/Home.jsx';
import Projects from './Pages/Projects.jsx';
import DesignProcess from './Pages/DesignProcess.jsx';
import Contact from './Pages/Contact.jsx';

function App() {
  const mainRef = useRef(null);
  const cursorDotRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [transitionStage, setTransitionStage] = useState('cover');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handlePageChange = (path) => {
    if (path === location.pathname || isTransitioning) return;

    setIsInitialLoad(false);
    setIsTransitioning(true);
    setTransitionStage('idle');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionStage('cover');
      });
    });

    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);

      setTimeout(() => {
        setTransitionStage('reveal');
      }, 120);

      setTimeout(() => {
        setTransitionStage('idle');
        setIsTransitioning(false);
      }, 950);
    }, 850);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setTransitionStage('reveal');

      setTimeout(() => {
        setTransitionStage('idle');
        setIsTransitioning(false);
        setIsInitialLoad(false);
      }, 800);
    }, 1400);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;

    if (!main) return;

    let followX = 0;
    let followY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const animateCursorFollow = () => {
      followX += (targetX - followX) * 0.055;
      followY += (targetY - followY) * 0.055;

      main.style.setProperty('--cursor-follow-x', `${followX}px`);
      main.style.setProperty('--cursor-follow-y', `${followY}px`);

      animationFrameId = requestAnimationFrame(animateCursorFollow);
    };

    const handleMouseMove = (event) => {
      const rect = main.getBoundingClientRect();

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      main.style.setProperty('--cursor-x', `${targetX}px`);
      main.style.setProperty('--cursor-y', `${targetY}px`);
    };

    const handleMouseEnter = () => {
      main.classList.add('is-hovered');
    };

    const handleMouseLeave = () => {
      main.classList.remove('is-hovered');
    };

    main.addEventListener('mousemove', handleMouseMove);
    main.addEventListener('mouseenter', handleMouseEnter);
    main.addEventListener('mouseleave', handleMouseLeave);

    animateCursorFollow();

    return () => {
      main.removeEventListener('mousemove', handleMouseMove);
      main.removeEventListener('mouseenter', handleMouseEnter);
      main.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;

    if (!cursorDot) return;

    const isTouchDevice = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches;

    if (isTouchDevice) {
      cursorDot.style.display = 'none';
      return;
    }

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrameId;

    const animateCursorDot = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;

      cursorDot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(animateCursorDot);
    };

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      cursorDot.style.opacity = '1';
    };

    const handleMouseDown = () => {
      cursorDot.classList.add('custom-cursor-dot-pressed');
    };

    const handleMouseUp = () => {
      cursorDot.classList.remove('custom-cursor-dot-pressed');
    };

    const handleMouseLeave = () => {
      cursorDot.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursorDot.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animateCursorDot();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <PageLoader
        transitionStage={transitionStage}
        isInitialLoad={isInitialLoad}
      />

      <div ref={cursorDotRef} className="custom-cursor-dot" />

      <main ref={mainRef} className="animated-bg min-h-screen">
        <div className="red-grid-highlight" />
        <div className="bg-vignette" />

        <Header
          onNavigate={handlePageChange}
          isTransitioning={isTransitioning}
        />

        <div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/design-process" element={<DesignProcess />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;