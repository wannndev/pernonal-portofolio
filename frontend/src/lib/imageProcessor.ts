// Client-side image processor: Resize, Compress, Remove White Background, Convert to SVG
export interface ImageProcessOptions {
  removeBg: boolean;
  convertToSvg: boolean;
  maxSize: number;
  quality: number;
}

export async function processImageBeforeUpload(
  file: File,
  options: ImageProcessOptions
): Promise<{ file: File; info: string }> {
  // If it's already an SVG file, keep native vector data
  if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
    return {
      file,
      info: `SVG Vektor Asli (~${Math.max(1, Math.round(file.size / 1024))} KB)`,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const max = options.maxSize || 700;

        // Downscale oversized images
        if (width > max || height > max) {
          if (width > height) {
            height = Math.round((height * max) / width);
            width = max;
          } else {
            width = Math.round((width * max) / height);
            height = max;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve({ file, info: "Original" });

        ctx.drawImage(img, 0, 0, width, height);

        // Remove solid/white background (flood-fill from outer edges)
        if (options.removeBg) {
          try {
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;
            const visited = new Uint8Array(width * height);
            const queue: number[] = [];

            // Advanced Background & Fake Checkerboard Detector:
            const isBackgroundPixel = (idx: number) => {
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const a = data[idx + 3];
              if (a < 20) return true; // Already transparent

              const maxDiff = Math.max(
                Math.abs(r - g),
                Math.abs(r - b),
                Math.abs(g - b)
              );

              // Low color saturation
              if (maxDiff <= 20) {
                if (r > 165) return true;
              }

              // Bright off-white background
              if (r > 215 && g > 215 && b > 215 && maxDiff <= 32) {
                return true;
              }

              return false;
            };

            // Seed queue with border coordinates
            for (let x = 0; x < width; x++) {
              queue.push(x);
              queue.push((height - 1) * width + x);
            }
            for (let y = 0; y < height; y++) {
              queue.push(y * width);
              queue.push(y * width + (width - 1));
            }

            let head = 0;
            while (head < queue.length) {
              const p = queue[head++];
              if (visited[p]) continue;
              visited[p] = 1;

              const idx = p * 4;
              if (isBackgroundPixel(idx)) {
                data[idx + 3] = 0; // Make 100% transparent

                const px = p % width;
                const py = Math.floor(p / width);

                if (px > 0 && !visited[p - 1]) queue.push(p - 1);
                if (px < width - 1 && !visited[p + 1]) queue.push(p + 1);
                if (py > 0 && !visited[p - width]) queue.push(p - width);
                if (py < height - 1 && !visited[p + width]) queue.push(p + width);
              }
            }

            ctx.putImageData(imgData, 0, 0);
          } catch (err) {
            console.warn("Background removal skipped due to canvas error", err);
          }
        }

        // Convert to SVG format
        if (options.convertToSvg) {
          const dataUrl = canvas.toDataURL("image/png");
          const svgContent = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n  <image href="${dataUrl}" width="${width}" height="${height}" />\n</svg>`;
          const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
          const newName =
            file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_") + ".svg";
          const newFile = new File([svgBlob], newName, { type: "image/svg+xml" });
          return resolve({
            file: newFile,
            info: `Format SVG Transparan (~${Math.max(1, Math.round(newFile.size / 1024))} KB)`,
          });
        }

        // Compress to transparent PNG or WebP
        const mime = options.removeBg ? "image/png" : "image/webp";
        const ext = options.removeBg ? ".png" : ".webp";

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve({ file, info: "Original" });
            const newName =
              file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_") + ext;
            const newFile = new File([blob], newName, { type: mime });
            const savedPct = Math.round(
              (1 - newFile.size / Math.max(1, file.size)) * 100
            );
            return resolve({
              file: newFile,
              info: `Terkonversi ${ext.toUpperCase()} (~${Math.max(1, Math.round(newFile.size / 1024))} KB${savedPct > 0 ? `, hemat ${savedPct}%` : ""})`,
            });
          },
          mime,
          options.quality || 0.85
        );
      };
      img.onerror = () => resolve({ file, info: "Original" });
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve({ file, info: "Original" });
    reader.readAsDataURL(file);
  });
}
