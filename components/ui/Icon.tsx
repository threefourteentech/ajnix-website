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

export function AjnixMark({ size = 14, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 639.88 560.28"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M211.33,361.73c-1.85,7.99-2.82,16.34-2.82,24.91c0,12.21,1.97,23.96,5.65,34.93c2.13,6.41,4.83,12.51,8.05,18.31c12.6,22.87,33.14,40.82,57.86,50.12c1.4,0.52,1.25,2.52-0.18,2.86l-78.54,19.5L187,515.9L162.3,522L8.95,560.06c-6.17,1.52-11.15-5.1-7.96-10.63l226.13-391.66l11.18-19.38L317.66,0.99c0.09-0.18,0.21-0.33,0.33-0.46c1.28-1.31,3.77-0.03,3.16,1.97L269.4,171.77l-6.96,22.69L215.7,347.39l-4.34,14.24C211.36,361.67,211.33,361.7,211.33,361.73z" />
      <path d="M373.86,386.63c0,30.13-24.21,54.58-54.25,54.94c-0.24,0.03-0.49,0.03-0.73,0.03c-30.37,0-54.98-24.6-54.98-54.98c0-30.37,24.6-54.98,54.98-54.98c0.24,0,0.49,0,0.73,0.03C349.65,332.05,373.86,356.5,373.86,386.63z" />
      <path d="M639.05,551.57c3.41,5.91-4.51,11.77-9.16,6.78L401.23,313.13l-3.58-3.83c-14.4-14.67-32.86-25.33-53.61-30.16c-7.84-1.82-16.01-2.82-24.42-2.89h-0.73c-18.13,0-35.29,4.38-50.39,12.16c-1.19,0.61-2.53-0.46-2.16-1.75l19.57-67.88l6.44-22.42l27.27-94.67l17.89-62.14c0.74-2.57,4.21-3,5.55-0.68L639.05,551.57z" />
    </svg>
  );
}
