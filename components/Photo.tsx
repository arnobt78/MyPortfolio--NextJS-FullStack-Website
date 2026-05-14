"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/SafeImage";

/**
 * Hero profile photo with dashed SVG ring.
 *
 * The ring SVG uses a 506×506 viewBox (circle r=250). The photo sits in the same pixel box as the SVG.
 * We use `object-cover` plus a circular mask so any portrait asset is cut to the ring interior only.
 *
 * Important: `mix-blend-lighten` must sit on the image (or inside the masked subtree), not on an
 * ancestor *outside* the clipping wrapper — blend modes create a separate compositing group in many
 * browsers and break `overflow-hidden` / `rounded-full` clipping, so the rectangle would still show.
 * `clip-path: circle(50% at 50% 50%)` reinforces the mask where border-radius alone is flaky.
 * `object-[center_22%]` biases framing upward for head-and-shoulders shots.
 */
const Photo = () => {
  const { t } = useLanguage();

  /** Matches the SVG element’s rendered width/height so photo and ring share one coordinate system. */
  const ringBoxClass = "w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]";

  /**
   * Circular mask: `isolate` + clip-path keeps the bitmap strictly inside the circle across browsers.
   * Tailwind arbitrary value: circle centered in the square, radius 50% of box (inscribed circle).
   */
  const photoClipClass =
    "relative h-full w-full isolate overflow-hidden rounded-full [clip-path:circle(50%_at_50%_50%)]";

  return (
    <div className="w-full h-full relative">
      <div
        className={`animate-fade-in relative mx-auto ${ringBoxClass}`}
        // mx-auto: center the fixed-size stack inside wider parents (e.g. hero grid).
      >
        {/* Photo layer: blend only on the image so the clip wrapper above still masks correctly. */}
        <div className="absolute inset-0 animate-fade-in-delayed">
          <div className={photoClipClass}>
            <SafeImage
              // src="/photo.png"
              src="/img-8-1200.png"
              alt={t("home.photoAlt")}
              fill
              priority
              sizes="(max-width: 1280px) 300px, 506px"
              className="object-cover object-[center_22%] mix-blend-lighten"
            />
          </div>
        </div>

        {/* Circle: same box as photo so stroke aligns with the covered image area. pointer-events-none keeps clicks passing through. */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full animate-spin-slow"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="15 120 25 25"
            className="animate-dash-rotate"
          />
        </svg>
      </div>
    </div>
  );
};

export default Photo;
