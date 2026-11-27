"use client";

import { Cookie } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { setPreferenceCookie } from "../../lib/theme.ts";

export const COOKIE_NOTICE_COOKIE = "cookie-notice";

const subscribe = () => () => {};

function hasCookie(name: string) {
  return document.cookie.split("; ").some((part) => part.startsWith(`${name}=`));
}

export type CookieNoticeLabels = {
  /** The notice's name for screen readers. */
  region: string;
  title: string;
  dismiss: string;
  /** The link to `policyHref`. */
  details: string;
};

const DEFAULT_LABELS: CookieNoticeLabels = {
  region: "Cookie notice",
  title: "Cookies",
  dismiss: "Got it",
  details: "Cookie details",
};

/**
 * For sites with only essential cookies, so there is nothing to consent to. Hidden on the server
 * render and shown after hydration, so pages need no cookie plumbing.
 */
export function CookieNotice({
  policyHref,
  cookieName = COOKIE_NOTICE_COOKIE,
  labels: labelOverrides,
  children = "This site uses only essential cookies, to keep you signed in and remember your preferences. It does not use analytics or tracking cookies.",
}: {
  /** Link to the cookie section of the privacy notice. */
  policyHref?: string;
  cookieName?: string;
  labels?: Partial<CookieNoticeLabels>;
  children?: React.ReactNode;
}) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const seen = useSyncExternalStore(
    subscribe,
    () => hasCookie(cookieName),
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);
  if (seen || dismissed) return null;

  const dismiss = () => {
    setPreferenceCookie(cookieName, "dismissed");
    setDismissed(true);
  };

  return (
    <section
      aria-label={labels.region}
      className="card reveal fixed inset-x-4 bottom-4 z-30 p-4 shadow-xl sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
    >
      <div className="flex gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
          <Cookie className="size-4.5" aria-hidden />
        </span>
        <div className="text-sm">
          <h2 className="font-semibold">{labels.title}</h2>
          <p className="mt-1 leading-relaxed text-foreground-muted">{children}</p>
          <div className="mt-4 flex items-center gap-4">
            <button type="button" className="btn btn-primary h-9 px-4" onClick={dismiss}>
              {labels.dismiss}
            </button>
            {policyHref && (
              <a href={policyHref} className="link">
                {labels.details}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
