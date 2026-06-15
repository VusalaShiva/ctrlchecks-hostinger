import { cn } from '@/lib/utils';

type GoogleLogoSize = 'sm' | 'md' | 'lg';

interface GoogleLogoProps {
  size?: GoogleLogoSize;
  className?: string;
}

const sizeClassMap: Record<GoogleLogoSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export function GoogleLogo({ size = 'md', className }: GoogleLogoProps) {
  return (
    <img
      src="/integrations-logos/Google.svg"
      alt="Google"
      className={cn('object-contain', sizeClassMap[size], className)}
    />
  );
}
