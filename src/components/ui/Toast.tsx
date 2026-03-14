"use client";

import React, { useRef } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { Toast as ToastType } from "@/hooks/useToast";

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const ICON_COLORS = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: (id: string) => void }) {
  const Icon = ICONS[toast.type];
  const touchStartX = useRef(0);

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${COLORS[toast.type]} ${
        toast.dismissing ? "animate-toast-out" : "animate-toast-in"
      }`}
      style={{ minWidth: 280, maxWidth: 400 }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (diff > 60) onRemove(toast.id);
      }}
    >
      <Icon size={18} className={ICON_COLORS[toast.type]} />
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}
