import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-[8px] border border-rule bg-surface px-4 py-3.5 text-[15px] text-ink',
        'transition-[border-color,box-shadow] duration-150',
        'placeholder:text-ink-6',
        'focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)]',
        className,
      )}
      {...props}
    />
  );
});
