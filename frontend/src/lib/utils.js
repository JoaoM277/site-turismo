import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper padrão dos componentes shadcn/ui: combina classNames condicionais
// (clsx) e resolve conflitos entre classes Tailwind (tailwind-merge), ex:
// cn('px-2', condicao && 'px-4') -> 'px-4' (a última prevalece, sem duplicar).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
