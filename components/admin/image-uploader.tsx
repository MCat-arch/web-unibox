"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, CheckCircle, RefreshCw, X, Sparkles } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressStats, setCompressStats] = useState<{
    originalSize: string;
    compressedSize: string;
    ratio: string;
  } | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const compressImage = (file: File) => {
    setIsCompressing(true);
    const originalSizeBytes = file.size;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        // Tentukan batas dimensi maksimum (1280px untuk web modern yang tajam)
        const maxDimension = 1280;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setIsCompressing(false);
          return;
        }

        // Gambar dengan smoothing berkualitas tinggi
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Ekspor ke WebP (Kualitas 0.82 memberikan visual tajam dengan ukuran file sangat kecil)
        let compressedDataUrl = canvas.toDataURL("image/webp", 0.82);

        // Fallback jika browser tidak menghasilkan WebP
        if (!compressedDataUrl.startsWith("data:image/webp")) {
          compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
        }

        // Hitung estimasi ukuran file hasil kompresi (base64 length * 0.75)
        const compressedSizeBytes = Math.round(
          (compressedDataUrl.length - "data:image/webp;base64,".length) * 0.75
        );
        const ratioPercent = Math.max(
          1,
          Math.round((1 - compressedSizeBytes / originalSizeBytes) * 100)
        );

        setCompressStats({
          originalSize: formatFileSize(originalSizeBytes),
          compressedSize: formatFileSize(compressedSizeBytes),
          ratio: `${ratioPercent}%`,
        });

        onChange(compressedDataUrl);
        setIsCompressing(false);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      compressImage(file);
    }
  };

  const defaultPresets = [
    { label: "Pelabuhan & Cold Storage", path: "/images/unibox-port-cold-storage.jpg" },
    { label: "Nelayan & Hasil Tangkap", path: "/images/unibox-nelayan-brondong.jpg" },
    { label: "Inspeksi Teknisi Kapal", path: "/images/unibox-hero-2.png" },
  ];

  return (
    <div className="space-y-3">
      {/* Upload Zone & Preview */}
      {value ? (
        <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 group">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={value}
              alt="Pratinjau Foto"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Overlay info & Actions */}
          <div className="p-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                Foto Siap Ditampilkan
              </span>
              {compressStats && (
                <span className="text-[11px] text-slate-500 font-medium">
                  {compressStats.originalSize} &rarr; <strong>{compressStats.compressedSize}</strong> (Hemat {compressStats.ratio})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Ganti Foto
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setCompressStats(null);
                }}
                className="p-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                title="Hapus Foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#0070ba] rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-sky-50/30 transition-all cursor-pointer group"
        >
          {isCompressing ? (
            <div className="flex flex-col items-center justify-center py-4">
              <RefreshCw className="w-8 h-8 text-[#0070ba] animate-spin mb-2" />
              <p className="text-sm font-bold text-slate-700">Sedang mengompres foto secara otomatis...</p>
              <p className="text-xs text-slate-400 mt-1">Mengoptimalkan dimensi & ukuran file tanpa merusak kualitas</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0070ba] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Pilih Foto dari Galeri / Kamera Langsung
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Tarik & letakkan foto di sini, atau klik untuk memilih file (PNG, JPG, WebP).
              </p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                Otomatis dikompres &lt; 150 KB untuk loading super cepat
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preset or Manual URL Option */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-slate-500 hover:text-[#0070ba] font-medium transition-colors"
        >
          {showUrlInput ? "Sembunyikan opsi URL / Preset" : "Atau pilih preset / gunakan URL eksternal"}
        </button>
      </div>

      {showUrlInput && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Gunakan Gambar Preset Galeri:
            </label>
            <div className="flex flex-wrap gap-2">
              {defaultPresets.map((preset) => (
                <button
                  key={preset.path}
                  type="button"
                  onClick={() => {
                    onChange(preset.path);
                    setCompressStats(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    value === preset.path
                      ? "bg-[#0070ba] text-white border-[#0070ba]"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Atau Input URL Gambar Langsung:
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://example.com/foto-kegiatan.jpg"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#0070ba]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
