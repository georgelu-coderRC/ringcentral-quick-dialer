import React from "react";

export default function CallBar({ visible, text, inCall, onHangup }) {
  if (!visible) return null;
  if (inCall) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3 text-neutral-w0"
        style={{ background: "#1A2B47" }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
          <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/>
        </svg>
        <span className="typography-detailBold flex-1 truncate" title={text}>{text}</span>
        <button
          onClick={onHangup}
          aria-label="Hang up"
          className="w-8 h-8 rounded-full bg-danger-f text-neutral-w0 flex items-center justify-center hover:bg-danger-high-contrast transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 12.27c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 7.78 7.46 6 12 6s8.66 1.78 11.71 4.86c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
          </svg>
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-t border-neutral-b0-t10 bg-neutral-w0">
      <div className="w-7 h-7 rounded-full bg-primary-t10 text-primary-f flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/>
        </svg>
      </div>
      <span className="typography-detail flex-1 truncate text-neutral-b0" title={text}>{text}</span>
    </div>
  );
}
