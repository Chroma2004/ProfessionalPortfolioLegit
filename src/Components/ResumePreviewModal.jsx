function ResumePreviewModal({ resumeFile, isOpen, onClose }) {
  if (!isOpen) return null;

  const email = 'michaelrhoigonzales@gmail.com';

  const emailLink = `mailto:${email}?subject=Portfolio Inquiry&body=Hi Michael,%0D%0A%0D%0AI saw your resume and would like to connect with you.%0D%0A%0D%0A`;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 px-4 py-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-dotted border-white bg-black shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
          <div className="h-full w-full bg-[radial-gradient(circle,#FFFFFF_1px,transparent_1.4px)] bg-[size:18px_18px]" />
        </div>

        <div className="relative z-10 flex items-center justify-between bg-black px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#FF0000] sm:text-xs">
            Michael&apos;s Resume
          </p>

          <div className="flex items-center gap-2">
            <a
              href={resumeFile}
              download
              aria-label="Download resume"
              className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-dotted border-white text-white transition-all duration-300 hover:border-[#FF0000] sm:h-auto sm:w-auto sm:px-4 sm:py-2"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#FF0000] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

              <span className="relative z-10 block sm:hidden">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3V15M12 15L7 10M12 15L17 10M5 21H19"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="relative z-10 hidden text-[10px] font-black uppercase tracking-[0.14em] sm:block">
                Download
              </span>
            </a>

            <a
              href={emailLink}
              aria-label="Email Michael"
              className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-dotted border-white text-white transition-all duration-300 hover:border-[#FF0000] sm:h-auto sm:w-auto sm:px-4 sm:py-2"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#FF0000] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

              <span className="relative z-10 block sm:hidden">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20V18H4V6Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="relative z-10 hidden text-[10px] font-black uppercase tracking-[0.14em] sm:block">
                Email
              </span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="group flex h-9 w-9 items-center justify-center rounded-full border-2 border-dotted border-white text-xl font-black leading-none text-white transition-all duration-300 hover:border-[#FF0000] hover:bg-[#FF0000]"
            >
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90 group-hover:scale-125">
                ×
              </span>
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-1 bg-[#111] px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="h-full w-full overflow-hidden bg-[#d9d9d9]">
            <iframe
              src={`${resumeFile}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              title="Michael Rhoi Gonzales Resume"
              className="h-full w-full bg-[#d9d9d9]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreviewModal;