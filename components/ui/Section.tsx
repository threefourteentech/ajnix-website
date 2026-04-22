import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/cn';

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tight?: boolean;
  children: ReactNode;
};

export function Section({
  as: Tag = 'section',
  tight = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        'section-x',
        tight ? 'py-[72px]' : 'section-y',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
