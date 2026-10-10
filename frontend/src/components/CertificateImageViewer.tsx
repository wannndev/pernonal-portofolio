"use client";

import React, { useState, useEffect } from "react";
import { Maximize2, FileCheck } from "lucide-react";
import { CertificateFullViewModal } from "./certificate/CertificateFullViewModal";

interface CertificateImageViewerProps {
  image: string;
  title: string;
  issuer?: string;
  category?: string;
}

export function CertificateImageViewer({
  image,
  title,
  issuer,
}: CertificateImageViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | "square">("landscape");

  useEffect(() => {
    setMounted(true);
  }, []);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth > naturalHeight * 1.15) {
      setOrientation("landscape");
    } else if (naturalHeight > naturalWidth * 1.15) {
      setOrientation("portrait");
    } else {
      setOrientation("square");
    }
  };

  const handleOpenFullView = () => {
    setZoomLevel(1);
    setRotation(0);
    setIsFullViewOpen(true);
  };

  const handleCloseFullView = () => {
    setIsFullViewOpen(false);
    setZoomLevel(1);
    setRotation(0);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(3, Math.round((prev + 0.25) * 100) / 100));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(0.75, Math.round((prev - 0.25) * 100) / 100));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setRotation(0);
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="w-full space-y-3">
      {/* Container Banner Utama */}
      <div className="group relative w-full rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-card via-background to-secondary/20 shadow-md">
        {/* Top Control Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          {/* Orientation & Format Badge */}
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 dark:bg-zinc-900/85 backdrop-blur-md border border-border/80 shadow-xs text-[11px] font-semibold text-foreground">
            <FileCheck className="size-3.5 text-primary" />
            <span className="capitalize">{orientation} Document</span>
          </div>

          {/* Full View Button */}
          <button
            type="button"
            onClick={handleOpenFullView}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold shadow-md hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Klik untuk melihat sertifikat ukuran penuh (Full View)"
          >
            <Maximize2 className="size-3.5" />
            <span>Full View</span>
          </button>
        </div>

        {/* Certificate Display Canvas */}
        <div
          onClick={handleOpenFullView}
          className="relative w-full flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-zoom-in min-h-[360px] sm:min-h-[460px] max-h-[640px] bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-size-[16px_16px]"
        >
          <div className="bg-white rounded-xl shadow-lg p-1.5 sm:p-2.5 border border-border/60 inline-block max-w-full">
            <img
              src={image}
              alt={title}
              onLoad={onImageLoad}
              className={`max-h-[560px] w-auto max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01] ${
                orientation === "portrait" ? "max-h-[560px]" : "w-full sm:w-auto max-h-[500px]"
              }`}
            />
          </div>

          {/* Bottom Hover Pill overlay */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background/90 dark:bg-zinc-900/90 backdrop-blur-md border border-border text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md flex items-center gap-1.5">
            <Maximize2 className="size-3.5 text-primary" />
            <span>Klik gambar untuk Full View & Zoom</span>
          </div>
        </div>
      </div>

      {/* Render Modal via Portal */}
      {mounted && (
        <CertificateFullViewModal
          isOpen={isFullViewOpen}
          onClose={handleCloseFullView}
          image={image}
          title={title}
          issuer={issuer}
          orientation={orientation}
          zoomLevel={zoomLevel}
          rotation={rotation}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onRotate={handleRotate}
        />
      )}
    </div>
  );
}

export default CertificateImageViewer;
