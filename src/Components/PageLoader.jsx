import loaderLogo from '../assets/saturn.PNG';

function PageLoader({ transitionStage, isInitialLoad }) {
  const isCovering = transitionStage === 'cover';
  const isRevealing = transitionStage === 'reveal';
  const isIdle = transitionStage === 'idle';
  const shouldShowTransitionArrow = !isInitialLoad && (isCovering || isRevealing);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${
        isIdle ? 'invisible' : 'visible'
      }`}
    >
      <style>
        {`
          @keyframes loaderPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(0.94);
              opacity: 0.78;
            }
          }

          @keyframes loaderTextRise {
            0% {
              transform: translateY(10px);
              opacity: 0;
            }

            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes loaderDotFade {
            0%, 20% {
              opacity: 0.2;
              transform: translateY(0);
            }

            50% {
              opacity: 1;
              transform: translateY(-2px);
            }

            100% {
              opacity: 0.2;
              transform: translateY(0);
            }
          }

          @keyframes loaderArrowUp {
            0%, 100% {
              transform: translateY(5px);
              opacity: 0.45;
            }

            50% {
              transform: translateY(-5px);
              opacity: 1;
            }
          }

          @keyframes loaderArrowDown {
            0%, 100% {
              transform: translateY(-5px);
              opacity: 0.45;
            }

            50% {
              transform: translateY(5px);
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        className={`absolute inset-0 bg-black will-change-transform ${
          isCovering
            ? 'translate-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]'
            : isRevealing
              ? 'translate-y-full transition-transform duration-[950ms] ease-[cubic-bezier(0.83,0,0.17,1)]'
              : 'translate-y-full'
        }`}
      >
        {shouldShowTransitionArrow && (
          <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FF0000] text-[#FF0000] ${
                isRevealing
                  ? 'animate-[loaderArrowDown_1s_ease-in-out_infinite]'
                  : 'animate-[loaderArrowUp_1s_ease-in-out_infinite]'
              }`}
            >
              {isRevealing ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M12 5V19M12 19L6 13M12 19L18 13"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M12 19V5M12 5L6 11M12 5L18 11"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </div>
        )}

        {isInitialLoad && isCovering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                src={loaderLogo}
                alt="Portfoli.YO"
                className="h-20 w-20 animate-[loaderPulse_2s_ease-in-out_infinite] object-contain drop-shadow-[0_0_18px_rgba(255,0,0,0.55)]"
                draggable="false"
              />

              <div className="animate-[loaderTextRise_0.7s_ease-out_forwards] text-[10px] font-black uppercase tracking-[0.35em] text-white/70">
                Portfoli<span className="text-[#FF0000]">.</span>YO
                <span className="ml-1 inline-flex tracking-normal text-[#FF0000]">
                  <span className="animate-[loaderDotFade_1.2s_ease-in-out_infinite]">
                    .
                  </span>
                  <span className="animate-[loaderDotFade_1.2s_ease-in-out_0.15s_infinite]">
                    .
                  </span>
                  <span className="animate-[loaderDotFade_1.2s_ease-in-out_0.3s_infinite]">
                    .
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageLoader;