'use client';

import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import styles from './AdultExplanationToggle.module.scss';

interface Props {
  storageKey: string;                 // `${progressKey}-adult-open-${currentCard.id}`
  children: ReactNode;
  openLabel?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  autoScroll?: boolean;
  className?: string;
}

export function AdultExplanationToggle({
  storageKey,
  children,
  openLabel = 'Пояснение для взрослых',
  closeLabel = 'Скрыть пояснение для взрослых',
  defaultOpen = false,
  autoScroll = true,
  className,
}: Props) {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return defaultOpen;
    return localStorage.getItem(storageKey) === '1' || defaultOpen;
  });

  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, open ? '1' : '0');
    }
  }, [open, storageKey]);

  useEffect(() => {
    if (open && autoScroll) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [open, autoScroll]);

  return (
    <div className={className}>
      <div className={styles.controls}>
        <button
          className={styles.toggle}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {open ? closeLabel : openLabel}
        </button>
      </div>

      {open && (
        <div id={panelId} ref={panelRef}>
          {children}
        </div>
      )}
    </div>
  );
} 