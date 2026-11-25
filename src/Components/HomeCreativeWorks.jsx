import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// RECRUITMENT POSTER IMPORTS
// ============================================================

import recruitment1 from '../assets/RecruitmentPosters/1.png';
import recruitment2 from '../assets/RecruitmentPosters/2.png';
import recruitment3 from '../assets/RecruitmentPosters/3.png';
import recruitment4 from '../assets/RecruitmentPosters/4.png';
import recruitment5 from '../assets/RecruitmentPosters/5.png';
import recruitment8 from '../assets/RecruitmentPosters/8.png';

// ============================================================
// CREATIVE POSTER IMPORTS
// ============================================================

import gpx1 from '../assets/GPX/GPX1.png';
import gpx2 from '../assets/GPX/GPX2.png';
import gpx3 from '../assets/GPX/GPX3.png';
import gpx4 from '../assets/GPX/GPX4.png';
import gpx5 from '../assets/GPX/GPX5.png';
import gpx6 from '../assets/GPX/GPX6.png';
import gpx7 from '../assets/GPX/GPX7.png';
import gpx8 from '../assets/GPX/GPX8.png';
import gpx9 from '../assets/GPX/GPX9.png';
import gpx10 from '../assets/GPX/GPX10.png';
import gpx11 from '../assets/GPX/GPX11.png';
import gpx12 from '../assets/GPX/GPX12.png';

// ============================================================
// WEB SYSTEM IMPORTS
// ============================================================

import photo2yPreview from '../assets/System/Photo2y.png';
import internPortfolioPreview from '../assets/System/InternPortfolio.png';

// ============================================================
// DIGITAL ILLUSTRATION IMPORTS
// ============================================================

import illust2 from '../assets/Illustrations/ILLUST2.png';
import illust4 from '../assets/Illustrations/ILLUST4.png';
import illust5Jpeg from '../assets/Illustrations/ILLUST5.jpeg';
import illust6 from '../assets/Illustrations/ILLUST6.png';

// ============================================================
// PIXEL ART IMPORTS
// ============================================================

import px2 from '../assets/Illustrations/PX2.PNG';
import px3 from '../assets/Illustrations/PX3.PNG';
import px4 from '../assets/Illustrations/PX4.jpg';

import px1 from '../assets/Illustrations/COMS1.1.mp4';

// ============================================================
// PODCAST VIDEO IMPORTS
// ============================================================

import podDark from '../assets/VideoEdit/PodDark.mp4';
import podLight from '../assets/VideoEdit/PodLight.mp4';

// ============================================================
// RECRUITMENT VIDEO IMPORTS
// ============================================================

import videoEditDark from '../assets/VideoEdit/VideoEditDark.mp4';
import videoEditLight from '../assets/VideoEdit/VideoEditLight.mp4';

// ============================================================
// ENGAGEMENT VIDEO IMPORTS
// ============================================================

import engagementVideoDark from '../assets/VideoEdit/EngagementVideoDark.mp4';
import engagementVideoLight from '../assets/VideoEdit/EngagementVideoLight.mp4';

// ============================================================
// EVENT VIDEO IMPORTS
// ============================================================

import employeeDay from '../assets/VideoEdit/EmployeeDay.mp4';
import mentalHealth from '../assets/VideoEdit/MentalHealth.mp4';
import movieNight from '../assets/VideoEdit/MovieNight.mp4';

// ============================================================
// SHARED BUTTON STYLE
// ============================================================

const getButtonClass = (isDarkMode) =>
  `group inline-flex items-center justify-center gap-3 border-2 px-7 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-1 ${
    isDarkMode
      ? 'border-white text-white hover:border-[#FF0000] hover:bg-[#FF0000]'
      : 'border-black text-black hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white'
  }`;

// ============================================================
// CORNER DECORATIONS
// ============================================================

const CornerDecorations = ({ isDarkMode }) => {
  const borderColor = isDarkMode
    ? 'border-white'
    : 'border-black';

  const base =
    'pointer-events-none absolute z-20 h-7 w-7 transition-colors duration-500 sm:h-8 sm:w-8';

  return (
    <>
      <span
        aria-hidden="true"
        className={`${base} -left-3 -top-3 border-l-[5px] border-t-[5px] sm:border-l-[6px] sm:border-t-[6px] ${borderColor}`}
      />

      <span
        aria-hidden="true"
        className={`${base} -right-3 -top-3 border-r-[5px] border-t-[5px] sm:border-r-[6px] sm:border-t-[6px] ${borderColor}`}
      />

      <span
        aria-hidden="true"
        className={`${base} -bottom-3 -left-3 border-b-[5px] border-l-[5px] sm:border-b-[6px] sm:border-l-[6px] ${borderColor}`}
      />

      <span
        aria-hidden="true"
        className={`${base} -bottom-3 -right-3 border-b-[5px] border-r-[5px] sm:border-b-[6px] sm:border-r-[6px] ${borderColor}`}
      />
    </>
  );
};

// ============================================================
// PROJECT LINK
// ============================================================

const ProjectLink = ({
  children,
  filter,
  projectTitle,
  className = '',
  ariaLabel,
}) => (
  <Link
    to="/projects"
    state={{
      filter,
      projectTitle,
      scrollToProject: true,
    }}
    className={className}
    aria-label={ariaLabel}
  >
    {children}
  </Link>
);

// ============================================================
// ANIMATED RED MARQUEE STRIP
// ============================================================

const ProjectMarquee = ({ title, reverse = false }) => {
  const repeatedTitles = Array.from(
    { length: 6 },
    (_, index) => index
  );

  return (
    <div
      className="
        relative mb-8
        -mx-4 w-[calc(100%+2rem)]
        overflow-hidden
        bg-[#FF0000]
        py-1.5
        sm:-mx-8 sm:w-[calc(100%+4rem)]
        md:-mx-12 md:w-[calc(100%+6rem)]
        lg:-mx-16 lg:w-[calc(100%+8rem)]
      "
      aria-label={title}
    >
      <div
        className={`flex w-max ${
          reverse
            ? 'project-marquee-reverse'
            : 'project-marquee-forward'
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden="true"
            className="flex shrink-0 items-center"
          >
            {repeatedTitles.map((item) => (
              <div
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-4 pr-4"
              >
                <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.15em] text-white sm:text-xs md:text-sm">
                  {title}
                </span>

                <span className="text-xs font-black text-white">
                  ✦
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// STANDARD IMAGE / VIDEO GALLERY
//
// MOBILE: 2 COLUMNS
// TABLET: 2 COLUMNS
//
// DESKTOP:
// RECRUITMENT POSTERS: 3 COLUMNS
// CREATIVE POSTERS: 4 COLUMNS
// ILLUSTRATIONS: 2 COLUMNS
// ============================================================

const ImageGallery = ({
  images,
  title,
  filter,
  projectTitle,
}) => {
  const isIllustration = filter === 'Illustrations';

  const isRecruitmentPosters =
    projectTitle === 'Recruitment Posters';

  const gridColumnClass = isIllustration
    ? 'lg:grid-cols-2'
    : isRecruitmentPosters
      ? 'lg:grid-cols-3'
      : 'lg:grid-cols-4';

  const gridSpacingClass = isRecruitmentPosters
    ? 'gap-3 p-2 sm:gap-5 sm:p-6 lg:gap-6 lg:p-8'
    : 'gap-2 p-2 sm:gap-4 sm:p-6 lg:gap-8 lg:p-8';

  return (
    <div
      className={`relative grid grid-cols-2 items-start bg-transparent ${gridColumnClass} ${gridSpacingClass}`}
    >
      {images.map((media, index) => {
        const isVideo =
          typeof media === 'string' &&
          /\.mp4(?:\?|$)/i.test(media);

        return (
          <ProjectLink
            key={`${title}-${index}`}
            filter={filter}
            projectTitle={projectTitle}
            ariaLabel={`View ${title} project ${index + 1}`}
            className="group/image relative flex min-w-0 items-center justify-center overflow-hidden bg-transparent"
          >
            {isVideo ? (
              <video
                src={media}
                className="block h-auto w-full object-contain shadow-lg transition-transform duration-500 ease-out group-hover/image:scale-[1.025]"
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(event) =>
                  event.preventDefault()
                }
                aria-label={`${title} animated preview ${index + 1}`}
              />
            ) : (
              <img
                src={media}
                alt={`${title} preview ${index + 1}`}
                className="block h-auto w-full object-contain shadow-lg transition-transform duration-500 ease-out group-hover/image:scale-[1.025]"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            )}
          </ProjectLink>
        );
      })}
    </div>
  );
};

// ============================================================
// ILLUSTRATION CATEGORY
// ============================================================

const IllustrationGallery = ({ work }) => {
  return (
    <div className="relative flex flex-col gap-10 bg-transparent p-4 sm:gap-12 sm:p-6 lg:gap-14 lg:p-8">
      {work.illustrationGroups.map((group, index) => (
        <div
          key={group.title}
          className="w-full bg-transparent"
        >
          {/* SUBCATEGORY TITLE */}

          <ProjectLink
            filter="Illustrations"
            projectTitle={group.projectTitle}
            ariaLabel={`View ${group.title}`}
            className="group/subtitle mb-5 flex w-fit items-center gap-3 sm:mb-6"
          >
            <span className="text-xs font-black text-[#FF0000] sm:text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h4 className="text-sm font-black uppercase tracking-[-0.02em] transition-transform duration-300 group-hover/subtitle:translate-x-1 sm:text-lg md:text-xl">
              {group.title}
            </h4>

            <span className="text-[#FF0000] transition-transform duration-300 group-hover/subtitle:translate-x-1">
              →
            </span>
          </ProjectLink>

          {/* SUBCATEGORY GALLERY */}

          <div className="relative w-full bg-transparent">
            <ImageGallery
              images={group.images}
              title={group.title}
              filter="Illustrations"
              projectTitle={group.projectTitle}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// WEB SYSTEM GALLERY
// ============================================================

const WebSystemGallery = ({ work, isDarkMode }) => {
  return (
    <div className="relative flex flex-col gap-10 bg-transparent p-4 sm:gap-12 sm:p-6 lg:gap-14 lg:p-8">
      {work.webSystems.map((system, index) => (
        <div
          key={system.title}
          className="w-full bg-transparent"
        >
          {/* SYSTEM TITLE */}

          <ProjectLink
            filter="WebSystem"
            projectTitle={system.projectTitle}
            ariaLabel={`View ${system.title}`}
            className="group/system mb-4 flex w-fit items-center gap-3"
          >
            <span className="text-xs font-black text-[#FF0000] sm:text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h4 className="text-sm font-black uppercase tracking-[-0.02em] transition-transform duration-300 group-hover/system:translate-x-1 sm:text-lg md:text-xl">
              {system.title}
            </h4>

            <span className="text-[#FF0000] transition-transform duration-300 group-hover/system:translate-x-1">
              →
            </span>
          </ProjectLink>

          {/* WEBSITE PREVIEW + LIVE LINK */}

          <div className="group/preview relative w-full overflow-hidden bg-transparent">
            <ProjectLink
              filter="WebSystem"
              projectTitle={system.projectTitle}
              ariaLabel={`View ${system.title} project details`}
              className="group/image block w-full overflow-hidden bg-transparent"
            >
              <img
                src={system.image}
                alt={`${system.title} website preview`}
                className="block h-auto w-full object-contain shadow-lg transition-transform duration-500 ease-out group-hover/preview:scale-[1.01]"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </ProjectLink>

            {/* LIVE WEBSITE BUTTON */}

            {system.liveLink && (
              <a
                href={system.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${system.title} live website`}
                className="
                  group/live
                  absolute bottom-3 right-3 z-20
                  inline-flex items-center justify-center gap-2
                  border-2 border-white
                  bg-black/90
                  px-3 py-2
                  text-[10px] font-black uppercase
                  tracking-[0.12em] text-white
                  shadow-lg backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                  hover:text-white
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#FF0000]
                  sm:bottom-5 sm:right-5
                  sm:gap-3 sm:px-5 sm:py-3
                  sm:text-xs
                  lg:bottom-7 lg:right-7
                "
              >
                {/* LIVE INDICATOR */}

                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0000] opacity-75 group-hover/live:bg-white motion-reduce:animate-none" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF0000] group-hover/live:bg-white" />
                </span>

                <span>Live Link</span>

                {/* EXTERNAL LINK ICON */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7H17V16" />
                </svg>
              </a>
            )}
          </div>

          {/* VIEW ALL PROJECTS AFTER INTERN PORTFOLIO */}

          {system.projectTitle === 'InternPortfolio' && (
            <div className="mt-8 flex justify-center sm:mt-10">
              <Link
                to="/projects"
                className={getButtonClass(isDarkMode)}
              >
                View All Projects

                <span className="text-[#FF0000] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// THEME-BASED VIDEO SHOWCASE
//
// AUTOMATICALLY SWITCHES BETWEEN LIGHT AND DARK VIDEO
// NO NATIVE VIDEO CONTROLS
// ============================================================

const ThemeVideoShowcase = ({
  title,
  darkVideo,
  lightVideo,
  isDarkMode,
  projectTitle,
}) => {
  const selectedVideo = isDarkMode
    ? darkVideo
    : lightVideo;

  return (
    <ProjectLink
      filter="Video Edit"
      projectTitle={projectTitle}
      ariaLabel={`View ${title}`}
      className="group/video relative block w-full overflow-hidden bg-transparent"
    >
      <video
        key={selectedVideo}
        src={selectedVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(event) =>
          event.preventDefault()
        }
        className="
          block h-auto w-full
          object-contain
          transition-transform duration-500 ease-out
          group-hover/video:scale-[1.01]
        "
        aria-label={`${title} ${
          isDarkMode ? 'dark mode' : 'light mode'
        } preview`}
      />
    </ProjectLink>
  );
};

// ============================================================
// EVENT VIDEO CARD
//
// CLEAN VIDEO PLAYER
// HIDDEN DOWNLOAD OPTION
// ============================================================

const EventVideoCard = ({
  video,
  index,
  isDarkMode,
}) => {
  return (
    <article className="group/card w-full min-w-0">

      {/* VIDEO PLAYER */}

      <div
        className={`
          relative w-full overflow-hidden
          border bg-black
          transition-colors duration-300
          ${
            isDarkMode
              ? 'border-white/15'
              : 'border-black/15'
          }
        `}
      >
        <video
          src={video.src}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          playsInline
          preload="metadata"
          onContextMenu={(event) =>
            event.preventDefault()
          }
          className="
            event-video-player
            block w-full
            aspect-video
            object-contain
          "
          aria-label={video.title}
          onPlay={(event) => {
            const currentVideo = event.currentTarget;

            // Pause other event videos when a new
            // event video starts playing.

            const gallery = currentVideo.closest(
              '[data-event-video-gallery]'
            );

            gallery
              ?.querySelectorAll('video')
              .forEach((otherVideo) => {
                if (otherVideo !== currentVideo) {
                  otherVideo.pause();
                }
              });
          }}
        />
      </div>

      {/* VIDEO TITLE */}

      <div
        className={`
          flex items-center gap-3
          border-b py-3
          transition-colors duration-300
          ${
            isDarkMode
              ? 'border-white/15'
              : 'border-black/15'
          }
        `}
      >
        {/* VIDEO NUMBER */}

        <span className="shrink-0 text-[10px] font-black text-[#FF0000] sm:text-xs">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* VIDEO NAME */}

        <h5 className="min-w-0 flex-1 text-xs font-black uppercase leading-tight tracking-[-0.02em] sm:text-sm md:text-base">
          {video.title}
        </h5>

        {/* VIDEO ICON */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-[#FF0000]"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />

          <path d="m10 9 5 3-5 3z" />
        </svg>
      </div>
    </article>
  );
};

// ============================================================
// EVENT VIDEO GALLERY
//
// MOBILE: 1 COLUMN
// TABLET: 2 COLUMNS
// DESKTOP: 3 COLUMNS
// ============================================================

const EventVideoGallery = ({
  videos,
  isDarkMode,
}) => {
  return (
    <div className="relative w-full">
      <div
        data-event-video-gallery
        className="
          grid grid-cols-1
          items-start gap-6
          sm:grid-cols-2 sm:gap-5
          lg:grid-cols-3 lg:gap-6
        "
      >
        {videos.map((video, index) => (
          <EventVideoCard
            key={video.title}
            video={video}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// VIDEO EDIT SHOWCASE
//
// 01 PODCAST VIDEOS
// 02 RECRUITMENT VIDEOS
// 03 ENGAGEMENT VIDEOS
// 04 EVENT VIDEO EDITS
// ============================================================

const VideoEditShowcase = ({
  work,
  isDarkMode,
}) => {
  return (
    <div className="relative flex w-full flex-col gap-12 bg-transparent p-4 sm:gap-14 sm:p-6 lg:gap-16 lg:p-8">

      {work.videoGroups.map((group, index) => (
        <div
          key={group.title}
          className="w-full bg-transparent"
        >

          {/* SUBCATEGORY TITLE */}

          <ProjectLink
            filter="Video Edit"
            projectTitle={group.projectTitle}
            ariaLabel={`View ${group.title}`}
            className="group/subtitle mb-5 flex w-fit items-center gap-3 sm:mb-6"
          >
            <span className="text-xs font-black text-[#FF0000] sm:text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h4 className="text-sm font-black uppercase tracking-[-0.02em] transition-transform duration-300 group-hover/subtitle:translate-x-1 sm:text-lg md:text-xl">
              {group.title}
            </h4>

            <span className="text-[#FF0000] transition-transform duration-300 group-hover/subtitle:translate-x-1">
              →
            </span>
          </ProjectLink>

          {/* THEME-BASED VIDEO SHOWCASE */}

          {group.darkVideo && group.lightVideo && (
            <div className="relative w-full bg-transparent">
              <ThemeVideoShowcase
                title={group.title}
                darkVideo={group.darkVideo}
                lightVideo={group.lightVideo}
                isDarkMode={isDarkMode}
                projectTitle={group.projectTitle}
              />
            </div>
          )}

          {/* EVENT VIDEO GALLERY */}

          {Boolean(group.eventVideos?.length) && (
            <EventVideoGallery
              videos={group.eventVideos}
              isDarkMode={isDarkMode}
            />
          )}

        </div>
      ))}
    </div>
  );
};

// ============================================================
// COMING SOON
// ============================================================

const ComingSoon = ({ isDarkMode }) => (
  <div className="relative flex min-h-[220px] flex-col items-center justify-center bg-transparent px-6 py-12 text-center sm:min-h-[280px]">
    <span
      className={`mb-4 text-[10px] font-black uppercase tracking-[0.3em] ${
        isDarkMode
          ? 'text-white/40'
          : 'text-black/40'
      }`}
    >
      Work in Progress
    </span>

    <h4 className="text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
      Coming Soon
      <span className="text-[#FF0000]">.</span>
    </h4>

    <p
      className={`mt-3 max-w-sm text-xs font-medium leading-relaxed sm:text-sm ${
        isDarkMode
          ? 'text-white/50'
          : 'text-black/50'
      }`}
    >
      New creative projects will be added here soon.
    </p>
  </div>
);

// ============================================================
// PROJECT PREVIEW GRID
// ============================================================

const ProjectPreviewGrid = ({ work, isDarkMode }) => {
  const hasImages = Boolean(
    work.images?.length
  );

  const hasWebSystems = Boolean(
    work.webSystems?.length
  );

  const hasIllustrationGroups = Boolean(
    work.illustrationGroups?.length
  );

  const hasVideoGroups = Boolean(
    work.videoGroups?.length
  );

  return (
    <div className="relative w-full bg-transparent">

      {/* STANDARD IMAGE GALLERY */}

      {hasImages && (
        <ImageGallery
          images={work.images}
          title={work.title}
          filter={work.filter}
          projectTitle={work.projectTitle}
        />
      )}

      {/* WEB SYSTEMS */}

      {hasWebSystems && (
        <WebSystemGallery
          work={work}
          isDarkMode={isDarkMode}
        />
      )}

      {/* ILLUSTRATIONS */}

      {hasIllustrationGroups && (
        <IllustrationGallery work={work} />
      )}

      {/* VIDEO EDIT SHOWCASE */}

      {hasVideoGroups && (
        <VideoEditShowcase
          work={work}
          isDarkMode={isDarkMode}
        />
      )}

      {/* COMING SOON */}

      {!hasImages &&
        !hasWebSystems &&
        !hasIllustrationGroups &&
        !hasVideoGroups && (
          <ComingSoon isDarkMode={isDarkMode} />
        )}
    </div>
  );
};

// ============================================================
// HOME CREATIVE WORKS
// ============================================================

function HomeCreativeWorks({ isDarkMode = false }) {
  const creativeWorks = useMemo(
    () => [
      // ======================================================
      // 01 SOCIAL MEDIA POSTERS
      // ======================================================

      {
        number: '01',
        title: 'Social Media Posters',

        images: [
          recruitment1,
          recruitment2,
          recruitment3,
          recruitment4,
          recruitment5,
          recruitment8,
        ],

        filter: 'GPX Design',
        projectTitle: 'Recruitment Posters',
      },

      // ======================================================
      // 02 CREATIVE POSTERS
      // ======================================================

      {
        number: '02',
        title: 'Creative Posters',

        images: [
          gpx1,
          gpx2,
          gpx3,
          gpx4,
          gpx5,
          gpx6,
          gpx7,
          gpx8,
          gpx9,
          gpx10,
          gpx11,
          gpx12,
        ],

        filter: 'GPX Design',
        projectTitle: 'Posters',
      },

      // ======================================================
      // 03 WEB SYSTEMS
      // ======================================================

      {
        number: '03',
        title: 'Web Systems',

        webSystems: [
          {
            title: 'Photo2y',
            image: photo2yPreview,
            projectTitle: 'Photo2y',
            liveLink: 'https://photo2y.vercel.app/',
          },

          {
            title: 'Intern Portfolio',
            image: internPortfolioPreview,
            projectTitle: 'InternPortfolio',
            liveLink: 'https://chromaportfolio.vercel.app/',
          },
        ],

        filter: 'WebSystem',
        projectTitle: 'Photo2y',
      },

      // ======================================================
      // 04 ILLUSTRATIONS
      // ======================================================

      {
        number: '04',
        title: 'Illustrations',

        illustrationGroups: [
          {
            title: 'Digital Projects',
            projectTitle: 'Digital Projects',

            images: [
              illust2,
              illust4,
              illust5Jpeg,
              illust6,
            ],
          },

          {
            title: 'Pixel Art Projects',
            projectTitle: 'Pixel Art Projects',

            images: [
              px2,
              px3,
              px4,
              px1,
            ],
          },
        ],

        filter: 'Illustrations',
        projectTitle: 'Digital Projects',
      },

      // ======================================================
      // 05 VIDEO EDITS
      // ======================================================

      {
        number: '05',
        title: 'Video Edits',

        videoGroups: [
          // ==================================================
          // 01 PODCAST VIDEOS
          // ==================================================

          {
            title: 'Podcast Videos',
            projectTitle: 'Podcast Videos',

            darkVideo: podDark,
            lightVideo: podLight,
          },

          // ==================================================
          // 02 RECRUITMENT VIDEOS
          // ==================================================

          {
            title: 'Recruitment Videos',
            projectTitle: 'Recruitment Videos',

            darkVideo: videoEditDark,
            lightVideo: videoEditLight,
          },

          // ==================================================
          // 03 ENGAGEMENT VIDEOS
          // ==================================================

          {
            title: 'Engagement Videos',
            projectTitle: 'Engagement Videos',

            darkVideo: engagementVideoDark,
            lightVideo: engagementVideoLight,
          },

          // ==================================================
          // 04 EVENT VIDEO EDITS
          // ==================================================

          {
            title: 'Event Video Edits',
            projectTitle: 'Event Video Edits',

            eventVideos: [
              {
                title: 'Employee Day',
                src: employeeDay,
              },

              {
                title: 'Mental Health',
                src: mentalHealth,
              },

              {
                title: 'Movie Night',
                src: movieNight,
              },
            ],
          },
        ],

        filter: 'Video Edit',
        projectTitle: 'Podcast Videos',
      },
    ],
    []
  );

  return (
    <section
      id="creative-works"
      aria-labelledby="creative-works-heading"
      className={`relative z-10 mx-auto mt-12 w-[90%] border-2 border-dotted px-4 pb-12 pt-9 transition-colors duration-500 sm:mt-16 sm:w-[92%] sm:px-8 sm:pb-16 sm:pt-12 md:w-[94%] md:px-12 lg:px-16 ${
        isDarkMode
          ? 'border-white text-white'
          : 'border-black text-black'
      }`}
    >

      {/* ====================================================== */}
      {/* ANIMATION AND VIDEO PLAYER STYLES */}
      {/* ====================================================== */}

      <style>
        {`
          /* ================================================ */
          /* MARQUEE ANIMATIONS */
          /* ================================================ */

          @keyframes projectMarqueeLeft {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          @keyframes projectMarqueeRight {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0);
            }
          }

          .project-marquee-forward {
            animation: projectMarqueeLeft 35s linear infinite;
            will-change: transform;
          }

          .project-marquee-reverse {
            animation: projectMarqueeRight 35s linear infinite;
            will-change: transform;
          }

          /* ================================================ */
          /* HIDE VIDEO THREE-DOT OPTIONS MENU */
          /* ================================================ */

          .event-video-player::-webkit-media-controls-overflow-button {
            display: none !important;
          }

          /* ================================================ */
          /* HIDE VIDEO DOWNLOAD BUTTON */
          /* ================================================ */

          .event-video-player::-webkit-media-controls-download-button {
            display: none !important;
          }

          /* ================================================ */
          /* HIDE PICTURE-IN-PICTURE BUTTON */
          /* ================================================ */

          .event-video-player::-webkit-media-controls-picture-in-picture-button {
            display: none !important;
          }

          /* ================================================ */
          /* REDUCED MOTION SUPPORT */
          /* ================================================ */

          @media (prefers-reduced-motion: reduce) {
            .project-marquee-forward,
            .project-marquee-reverse {
              animation: none;
              transform: none;
            }
          }
        `}
      </style>

      {/* CORNER DECORATIONS */}

      <CornerDecorations isDarkMode={isDarkMode} />

      {/* ====================================================== */}
      {/* SECTION HEADER */}
      {/* ====================================================== */}

      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <h2
          id="creative-works-heading"
          className="font-snellroundhand text-5xl leading-none sm:text-6xl md:text-7xl"
        >
          Creative Works
        </h2>

        <p
          className={`mx-auto mt-5 max-w-2xl text-xs font-medium leading-relaxed sm:mt-6 sm:text-sm md:text-base ${
            isDarkMode
              ? 'text-white/60'
              : 'text-black/60'
          }`}
        >
          A curated showcase of my creative projects, highlighting
          my skills in graphic design, digital illustration,
          web design, and visual storytelling.
        </p>
      </div>

      {/* ====================================================== */}
      {/* PROJECT COLLECTIONS */}
      {/* ====================================================== */}

      <div className="flex w-full flex-col gap-16 sm:gap-20">
        {creativeWorks.map((work, index) => (
          <div
            key={work.number}
            className="group w-full"
          >

            {/* ANIMATED RED MARQUEE */}

            <ProjectMarquee
              title={work.title}
              reverse={index % 2 !== 0}
            />

            {/* PROJECT NUMBER + TITLE */}

            <ProjectLink
              filter={work.filter}
              projectTitle={work.projectTitle}
              ariaLabel={`View ${work.title}`}
              className="mb-5 flex w-fit items-center gap-4 sm:mb-6 sm:gap-6"
            >
              <span className="shrink-0 text-sm font-black tracking-[0.08em] text-[#FF0000] sm:text-base md:text-lg">
                {work.number}
              </span>

              <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 sm:text-xl md:text-2xl lg:text-3xl">
                {work.title}
              </h3>
            </ProjectLink>

            {/* PROJECT PREVIEW */}

            <ProjectPreviewGrid
              work={work}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* SECTION FOOTER */}
      {/* ====================================================== */}

      <div className="mt-12 flex justify-center sm:mt-14">
        <Link
          to="/projects"
          className={getButtonClass(isDarkMode)}
        >
          View All Projects

          <span className="text-[#FF0000] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default HomeCreativeWorks;