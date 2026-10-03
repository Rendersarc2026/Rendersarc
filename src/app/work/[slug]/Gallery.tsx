'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Row of shots under the case study hero — landscape, or narrower phone screens
 * for an app project; a filled tile opens it full size.
 */
export function Gallery({
  title,
  slots,
  phone = false,
}: {
  title: string;
  slots: (string | undefined)[];
  phone?: boolean;
}) {
  const tile = phone ? 'aspect-[9/19.5] rounded-xl' : 'aspect-[16/10]';
  const images = slots.filter((src): src is string => Boolean(src));
  const [open, setOpen] = useState<number | null>(null);

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length));

  return (
    <>
      <div className={`mt-4 grid gap-4 ${phone ? 'grid-cols-5 gap-2 md:gap-4' : 'grid-cols-3'}`}>
        {slots.map((src, i) =>
          src ? (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(images.indexOf(src))}
              aria-label={`View ${title} detail ${i + 1}`}
              className={`group relative ${tile} overflow-hidden bg-neutral-800 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
            >
              <Image
                src={src}
                alt={`${title} — detail ${i + 1}`}
                fill
                sizes={phone ? '(min-width: 1024px) 10vw, 20vw' : '(min-width: 1024px) 16vw, 33vw'}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          ) : (
            <div key={i} className={`${tile} bg-neutral-800`} />
          ),
        )}
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <Dialog.Content
            aria-describedby={undefined}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1);
              if (e.key === 'ArrowLeft') step(-1);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            <Dialog.Title className="sr-only">
              {title} — detail {(open ?? 0) + 1} of {images.length}
            </Dialog.Title>
            {open !== null && (
              <div
                className={`relative ${phone ? 'h-full max-h-[85svh] aspect-[9/19.5]' : 'w-full max-w-6xl aspect-[16/10]'}`}
              >
                <Image
                  src={images[open]}
                  alt={`${title} — detail ${open + 1}`}
                  fill
                  sizes={phone ? '(min-width: 768px) 420px, 100vw' : '(min-width: 1200px) 1152px, 100vw'}
                  className="object-contain"
                />
              </div>
            )}

            <Dialog.Close
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </Dialog.Close>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => step(1)}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight size={22} />
                </button>
                <p className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/60">
                  {open !== null && open + 1} / {images.length}
                </p>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
