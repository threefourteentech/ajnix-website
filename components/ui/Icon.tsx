import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  d: string;
  size?: number;
};

export function Icon({ d, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export function Checkmark({ size = 14, strokeWidth = 3, ...props }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function CrossMark({ size = 14, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function WordPressMark({ size = 13, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 122 122" fill="currentColor" aria-hidden {...props}>
      <path d="M8.7 61c0 20.7 12 38.6 29.5 47.1L13.3 40.5c-3 6.3-4.6 13.2-4.6 20.5zM96.4 58.3c0-6.5-2.3-11-4.3-14.5-2.7-4.3-5.2-8-5.2-12.3 0-4.8 3.7-9.3 8.8-9.3h.7C87.3 12.4 74.7 7 60.8 7 42.1 7 25.6 16.6 15.9 31l3.7.1c5.4 0 13.9-.6 13.9-.6 2.8-.1 3.2 4 .3 4.3 0 0-2.8.3-6 .5l19.1 56.9L58.5 58.8l-8.2-22.4c-2.8-.2-5.5-.5-5.5-.5-2.8-.2-2.5-4.4.3-4.3 0 0 8.7.6 13.7.6 5.4 0 13.9-.6 13.9-.6 2.8-.1 3.2 4 .3 4.3 0 0-2.8.3-6 .5l18.9 56.4 5.2-17.4c2.4-7.4 3.3-12.7 3.3-17.1zM62.4 67.6l-15.7 45.7c4.7 1.4 9.6 2.1 14.8 2.1 6.1 0 12-1 17.4-3-.1-.2-.3-.5-.4-.7L62.4 67.6zm44.2-29.2c.2 1.7.4 3.5.4 5.5 0 5.4-1 11.5-4.1 19.2L86.4 110c16.2-9.4 27.1-27 27.1-47 0-9.4-2.4-18.3-6.6-26z" />
    </svg>
  );
}
