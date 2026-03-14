"use client";

import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";

export default function ChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleOpen = useCallback(() => setIsOpen(true), []);

  // Determine current page context for starter chips
  const currentPage = pathname || "/";

  return (
    <>
      <ChatButton onClick={handleOpen} isOpen={isOpen} />
      {isOpen && (
        <ChatPanel
          onClose={() => setIsOpen(false)}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
