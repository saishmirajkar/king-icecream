import { useId } from "react";

type HomeSectionDividerProps = {
  from: string;
  to: string;
};

/**
 * A quiet scalloped edge: the departing section colour rolls into the next.
 * The SVG has no viewBox so its repeating pattern stays at a natural size on
 * small screens instead of compressing to fit the viewport.
 */
export function HomeSectionDivider({ from, to }: HomeSectionDividerProps) {
  const patternId = `king-scallop-${useId().replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="king-section-divider"
      style={{ backgroundColor: to }}
    >
      <svg
        className="king-section-divider__art"
        width="100%"
        height="36"
        focusable="false"
      >
        <defs>
          <pattern
            id={patternId}
            width="144"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0H144V27C108 27 108 5 72 5C36 5 36 27 0 27Z"
              fill={from}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
