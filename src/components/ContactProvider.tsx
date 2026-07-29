"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ContactModal } from "./ContactModal";

const ContactContext = createContext<(() => void) | null>(null);

/**
 * Opens the contact dialog from anywhere.
 *
 * The modal used to be owned by <CTA>, which meant the header's "Get in touch"
 * could only be an `#contact` anchor — and from a case study that scrolled the
 * reader a few thousand pixels to the bottom of the page instead of asking for
 * their message. One instance mounted at the root fixes that everywhere, and
 * incidentally stops every page that renders a CTA from carrying its own copy
 * of the dialog.
 */
export function useContact() {
  const open = useContext(ContactContext);
  if (!open) {
    throw new Error("useContact must be used inside <ContactProvider>");
  }
  return open;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ContactContext.Provider value={openContact}>
      {children}
      <ContactModal open={open} onClose={close} />
    </ContactContext.Provider>
  );
}
