"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  Link as LinkIcon,
  Wand2,
  FileCode2,
  Sparkles,
} from "lucide-react";
import { adminUploadImage } from "@/lib/adminApi";
import { showAlert } from "@/lib/alerts";
import { processImageBeforeUpload } from "@/lib/imageProcessor";

interface ImageDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  token: string | null;
  label?: string;
  disableRemoveBg?: boolean;
  defaultRemoveBg?: boolean;
  maxDimension?: number;
}

export function ImageDropzone({
  value,
  onChange,
  token,
  label = "Project Image",
  disableRemoveBg = false,
  defaultRemoveBg = false,
  maxDimension = 2400,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [showManualLink, setShowManualLink] = useState(false);

  // Smart image processing options
  const [autoRemoveBg, setAutoRemoveBg] = useState(!disableRemoveBg && defaultRemoveBg);
  const [autoConvertToSvg, setAutoConvertToSvg] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (rawFile: File) => {
    if (!rawFile.type.startsWith("image/") && !rawFile.name.endsWith(".svg")) {
      showAlert.error(
        "File Tidak Valid",
        "Harap pilih file gambar (JPG, PNG, WebP, SVG, GIF)."
      );
      return;
    }

    if (rawFile.size > 25 * 1024 * 1024) {
      showAlert.error("Ukuran Terlalu Besar", "Ukuran gambar maksimal adalah 25 MB.");
      return;
    }

    if (!token) {
      showAlert.error("Error", "Sesi login tidak valid. Harap login kembali.");
      return;
    }

    setUploading(true);
    setProcessingStatus("Mengompres & memproses gambar...");

    try {
      const shouldRemoveBg = disableRemoveBg ? false : autoRemoveBg;
      const { file: processedFile, info } = await processImageBeforeUpload(
        rawFile,
        {
          removeBg: shouldRemoveBg,
          convertToSvg: autoConvertToSvg,
          maxSize: maxDimension || (disableRemoveBg ? 2400 : 1200),
          quality: disableRemoveBg ? 0.95 : 0.88,
        }
      );

      setProcessingStatus(`Mengunggah (${info})...`);
      const uploadedUrl = await adminUploadImage(token, processedFile);
      onChange(uploadedUrl);
      showAlert.toast(`Berhasil diunggah! ${info}`, "success");
    } catch (err: any) {
      showAlert.error(
        "Gagal Upload",
        err.message || "Terjadi kesalahan saat memproses/mengunggah gambar."
      );
    } finally {
      setUploading(false);
      setProcessingStatus(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="font-semibold text-xs text-foreground flex items-center gap-1.5">
          <ImageIcon className="size-3.5 text-muted-foreground" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setShowManualLink(!showManualLink)}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
          >
            <LinkIcon className="size-3" />
            <span>{showManualLink ? "Tutup Link" : "Input Link Manual"}</span>
          </button>
        </div>
      </div>

      {/* Smart Optimization Bar */}
      {!disableRemoveBg ? (
        <div className="flex items-center flex-wrap gap-2 py-1 px-2.5 rounded-xl bg-secondary/50 border border-border/60 text-[11px]">
          <span className="text-muted-foreground font-medium flex items-center gap-1">
            <Sparkles className="size-3 text-amber-500" />
            <span>Otomatisasi Upload:</span>
          </span>

          {/* Toggle 1: Auto Remove White Background */}
          <label
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md cursor-pointer transition-all select-none ${
              autoRemoveBg
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "bg-background border border-border text-muted-foreground hover:text-foreground"
            }`}
            title="Menghapus background putih pada logo agar menjadi transparan tanpa kotak putih"
          >
            <input
              type="checkbox"
              checked={autoRemoveBg}
              onChange={(e) => setAutoRemoveBg(e.target.checked)}
              className="sr-only"
            />
            <Wand2 className="size-3" />
            <span>Hapus Background Putih</span>
          </label>

          {/* Toggle 2: Convert to SVG format */}
          <label
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md cursor-pointer transition-all select-none ${
              autoConvertToSvg
                ? "bg-emerald-600 text-white font-semibold shadow-2xs"
                : "bg-background border border-border text-muted-foreground hover:text-foreground"
            }`}
            title="Mengemas gambar menjadi format .SVG"
          >
            <input
              type="checkbox"
              checked={autoConvertToSvg}
              onChange={(e) => setAutoConvertToSvg(e.target.checked)}
              className="sr-only"
            />
            <FileCode2 className="size-3" />
            <span>Jadikan Format .SVG</span>
          </label>

          <span className="text-[10px] text-muted-foreground ml-auto hidden sm:inline">
            ⚡ Auto-Kompresi WebP
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-600 dark:text-emerald-400">
          <span className="font-medium flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            <span>Format Dokumen Asli Terjaga: Resolusi tinggi & background asli dipertahankan</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Max 2400px</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.svg"
        onChange={onFileChange}
        className="hidden"
      />

      {/* Preview or Drop Area */}
      {value ? (
        <div className="relative rounded-2xl border border-border bg-card p-3 flex items-center gap-3.5 group">
          <div className="size-16 rounded-xl border border-border overflow-hidden shrink-0 relative flex items-center justify-center bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] dark:bg-[linear-gradient(45deg,#222_25%,transparent_25%),linear-gradient(-45deg,#222_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#222_75%),linear-gradient(-45deg,transparent_75%,#222_75%)] bg-[size:10px_10px]">
            <img
              src={value}
              alt="Preview"
              className="max-w-full max-h-full object-contain p-1"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-500 font-medium text-[11px]">
              <CheckCircle2 className="size-3 shrink-0" />
              <span>Gambar Aktif Terpasang</span>
            </div>
            <p
              className="text-[11px] font-mono text-muted-foreground truncate"
              title={value}
            >
              {value}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-semibold text-foreground hover:underline cursor-pointer flex items-center gap-1"
              >
                {uploading ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <UploadCloud className="size-3" />
                )}
                <span>Ganti Gambar</span>
              </button>
              <span className="text-muted-foreground text-[10px]">•</span>
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-[11px] font-medium text-rose-500 hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <X className="size-3" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border bg-muted/20 hover:bg-muted/40 hover:border-muted-foreground/40"
          } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="size-11 rounded-2xl bg-secondary flex items-center justify-center text-foreground shadow-xs">
            {uploading ? (
              <Loader2 className="size-5 animate-spin text-primary" />
            ) : (
              <UploadCloud className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">
              {uploading
                ? processingStatus || "Sedang Memproses Gambar..."
                : "Drag & Drop gambar ke sini, atau klik untuk memilih file"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Format: SVG, PNG, JPG, WebP • Otomatis dikompres & transparan
            </p>
          </div>
        </div>
      )}

      {/* Optional fallback input for manual URL */}
      {showManualLink && (
        <div className="pt-1.5 animate-in fade-in slide-in-from-top-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/portfolio/image-01.webp atau https://..."
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      )}
    </div>
  );
}

export default ImageDropzone;
