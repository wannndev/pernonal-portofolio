"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  X,
  FileCheck,
} from "lucide-react";

interface CertificateFullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  issuer?: string;
  orientation: "landscape" | "portrait" | "square";
  zoomLevel: number;
  rotation: number;
  onZoomIn: (e: React.MouseEvent) => void;
  onZoomOut: (e: React.MouseEvent) => void;
  onResetZoom: (e: React.MouseEvent) => void;
  onRotate: (e: React.MouseEvent) => void;
}

export function CertificateFullViewModal({
  isOpen,
  onClose,
  image,
  title,
  issuer,
  orientation,
  zoomLevel,
  rotation,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRotate,
}: CertificateFullViewModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex flex-col bg-zinc-950/95 backdrop-blur-2xl animate-in fade-in duration-200"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
      onClick={onClose}
    >
      {/* Top Navbar Modal */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-zinc-900/90 backdrop-blur-md z-30 shrink-0 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
            <FileCheck className="size-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {title}
            </h3>
            <p className="text-[11px] text-zinc-400 truncate">
              {issuer ? `${issuer} • ` : ""}
              {orientation === "portrait"
                ? "Dokumen Potrait"
                : "Dokumen Landscape"}
            </p>
          </div>
        </div>

        {/* Interactive Control Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.75}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 cursor-pointer"
            title="Perkecil (-)"
          >
            <ZoomOut className="size-4" />
          </button>

          <button
            type="button"
            onClick={onResetZoom}
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
            title="Reset Ukuran (0)"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          <button
            type="button"
            onClick={onZoomIn}
            disabled={zoomLevel >= 3}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 cursor-pointer"
            title="Perbesar (+)"
          >
            <ZoomIn className="size-4" />
          </button>

          <button
            type="button"
            onClick={onRotate}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Putar 90 Derajat (Rotate)"
          >
            <RotateCw className="size-4" />
          </button>

          <a
            href={image}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden sm:inline-flex"
            title="Buka Gambar Asli di Tab Baru"
          >
            <ExternalLink className="size-4" />
          </a>

          <div className="h-5 w-px bg-white/20 mx-1" />

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            title="Tutup (ESC)"
          >
            <X className="size-4" />
            <span className="hidden sm:inline">Tutup</span>
          </button>
        </div>
      </div>

      {/* Viewport Image Area */}
      <div
        className="flex-1 w-full overflow-auto flex items-center justify-center p-4 sm:p-8 select-none"
        onClick={onClose}
      >
        <div
          className="transition-transform duration-200 flex items-center justify-center max-w-full max-h-full"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-2xl p-2 sm:p-3.5 border border-zinc-200/50 inline-block">
            <img
              src={image}
              alt={title}
              className="max-h-[76vh] max-w-[88vw] w-auto h-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom Hint Footer */}
      <div className="py-2.5 px-4 text-center bg-zinc-950/90 border-t border-white/10 text-zinc-400 text-xs shrink-0 flex items-center justify-center gap-3">
        <span>
          💡 Tekan <strong>ESC</strong> untuk menutup
        </span>
        <span>•</span>
        <span>
          Gunakan tombol zoom (+ / -) untuk membaca detail tulisan & nomor
          registrasi
        </span>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
