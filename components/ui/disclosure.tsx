import type { ComponentProps, ReactNode } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from 'cn';
import { buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

// Native details keeps legal navigation usable without JavaScript. The trigger
// shares the shadcn Button recipe rather than maintaining a second button style.
function Disclosure({
  title,
  variant = 'secondary',
  className,
  children,
  ...props
}: Omit<ComponentProps<'details'>, 'title'> & {
  title: ReactNode;
  variant?: VariantProps<typeof buttonVariants>['variant'];
}) {
  return (
    <details
      data-slot="disclosure"
      className={cn('group/disclosure', className)}
      {...props}
    >
      <summary
        data-slot="disclosure-trigger"
        className={cn(
          buttonVariants({ variant }),
          'flex h-auto min-h-9 w-full cursor-pointer list-none justify-between py-1.5 text-left whitespace-normal [&::-webkit-details-marker]:hidden'
        )}
      >
        {title}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 transition-transform group-open/disclosure:rotate-180"
        />
      </summary>
      <div data-slot="disclosure-content" className="pt-3">
        {children}
      </div>
    </details>
  );
}

export { Disclosure };
