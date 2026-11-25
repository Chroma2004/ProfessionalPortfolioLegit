import { useState, useEffect } from 'react';

// ============================================================
// PROFILE IMAGE IMPORTS
// ============================================================

// Light mode images
import profileLight1 from '../assets/ProfileLight1.png';
import profileLight2 from '../assets/ProfileLight2.png';

// Dark mode images
import profileDark1 from '../assets/ProfileDark1.png';
import profileDark2 from '../assets/ProfileDark2.png';

// ============================================================
// HOME CONTACT COMPONENT
// ============================================================

function HomeContact({ isDarkMode = false, compact = false }) {
  const [isImageSwitched, setIsImageSwitched] = useState(false);

  // Reset image when switching between light and dark mode
  useEffect(() => {
    setIsImageSwitched(false);
  }, [isDarkMode]);

  // Automatically select images based on theme
  const profile1 = isDarkMode ? profileDark1 : profileLight1;
  const profile2 = isDarkMode ? profileDark2 : profileLight2;

  // Switch images when clicked or tapped
  const handleImageClick = () => {
    setIsImageSwitched((previous) => !previous);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative z-10 w-full border-0 px-2 pb-20 outline-none sm:px-4 sm:pb-28 lg:px-6 ${
        compact ? 'pt-10 sm:pt-14' : 'pt-24 sm:pt-32'
      }`}
    >
      <div className="mx-auto w-full max-w-[1800px] border-0 text-center outline-none">

        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}

        <p className="mb-3 text-[9px] font-black uppercase tracking-[0.32em] text-[#FF0000] sm:text-[10px] sm:tracking-[0.45em]">
          Let&apos;s do this
        </p>

        <h2
          id="contact-heading"
          className={`mb-2 font-snellroundhand text-5xl leading-none tracking-wide transition-colors duration-500 sm:text-6xl md:mb-3 md:text-7xl ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Connect with Me
        </h2>

        <p
          className={`mx-auto max-w-xl text-xs font-bold leading-relaxed transition-colors duration-500 sm:text-sm ${
            isDarkMode ? 'text-white/70' : 'text-black'
          }`}
        >
          Have an idea? Project? Or creative direction in mind?
          Send me a message and let&apos;s collaborate.
        </p>

        {/* ================================================== */}
        {/* PROFILE IMAGE CONTAINER */}
        {/* ================================================== */}

        <div className="mx-auto mt-2 w-full max-w-[1600px] border-0 outline-none sm:mt-3">

          <button
            type="button"
            onClick={handleImageClick}
            aria-label={
              isImageSwitched
                ? 'Show first profile image'
                : 'Show second profile image'
            }
            aria-pressed={isImageSwitched}
            className="
              group relative block w-full
              cursor-pointer
              appearance-none
              border-0 bg-transparent p-0
              outline-none
              ring-0
              shadow-none
              focus:outline-none
              focus:ring-0
              focus-visible:outline-none
              focus-visible:ring-0
            "
          >

            {/* ============================================== */}
            {/* PROFILE 1 - DEFAULT IMAGE */}
            {/* ============================================== */}

            <img
              src={profile1}
              alt={`Michael Rhoi Gonzales - ${
                isDarkMode ? 'Dark' : 'Light'
              } Mode Profile 1`}
              className={`
                block h-auto w-full
                border-0 object-contain outline-none
                transition-opacity duration-500 ease-in-out
                motion-reduce:transition-none
                group-hover:opacity-0
                ${
                  isImageSwitched
                    ? 'opacity-0'
                    : 'opacity-100'
                }
              `}
              draggable="false"
              decoding="async"
            />

            {/* ============================================== */}
            {/* PROFILE 2 - HOVER / TAP IMAGE */}
            {/* ============================================== */}

            <img
              src={profile2}
              alt={`Michael Rhoi Gonzales - ${
                isDarkMode ? 'Dark' : 'Light'
              } Mode Profile 2`}
              className={`
                pointer-events-none
                absolute inset-0
                h-full w-full
                border-0 object-contain outline-none
                transition-opacity duration-500 ease-in-out
                motion-reduce:transition-none
                group-hover:opacity-100
                ${
                  isImageSwitched
                    ? 'opacity-100'
                    : 'opacity-0'
                }
              `}
              draggable="false"
              decoding="async"
            />

          </button>

        </div>

      </div>
    </section>
  );
}

export default HomeContact;