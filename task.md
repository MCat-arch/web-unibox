# Task Optimasi Loading Homepage Unibox

Dokumen ini melacak pekerjaan optimasi performa route `/`, khususnya loading video, gambar, ikon, hydration, navigasi, dan cleanup aset.

## Status dan aturan kerja

- [ ] Jangan menghapus perubahan lokal yang sudah ada pada `app/news/news-content.tsx` dan `lib/prisma.ts`.
- [ ] Ukur baseline sebelum mengubah kode.
- [ ] Selesaikan task sesuai urutan prioritas.
- [ ] Setelah setiap perubahan utama, jalankan validasi yang tercantum.
- [ ] Jangan menghapus aset berdasarkan pencarian statis saja jika path dapat berasal dari database/CMS.
- [ ] Target utama: pengguna dapat melihat hero poster dan mulai berinteraksi tanpa menunggu video atau seluruh homepage selesai diunduh.

## Target performa

- [ ] First Contentful Paint homepage terasa cepat pada koneksi Fast 3G dan 4G.
- [ ] Hero poster tampil sebelum video selesai diunduh.
- [ ] Tidak ada video slide nonaktif yang diunduh saat initial load.
- [ ] Tidak ada layout shift ketika gambar hero, kartu, atau logo selesai dimuat.
- [ ] Navigasi antar halaman menggunakan client navigation dan tetap responsif.
- [ ] Initial JavaScript dan hydration homepage tidak memblokir interaksi utama.
- [ ] Ukuran setiap video hero ditargetkan sekitar 2-5 MiB setelah encoding ulang.
- [ ] Poster hero ditargetkan sekitar 100-250 KiB tanpa penurunan kualitas visual yang terlihat.

## P0 - Baseline dan perbaikan hero

### 1. Simpan baseline performa

- [x] Jalankan `npm run build` dan catat hasil route `/` serta warning yang muncul.
- [x] Jalankan `npm run lint` dan catat error/warning sebelum perubahan.
- [x] Jalankan production server dengan `npm run start`.
- [ ] Ukur route `/` di Chrome DevTools Lighthouse atau Performance pada desktop dan mobile.
- [ ] Catat FCP, LCP, Speed Index, Total Blocking Time, CLS, dan transfer size.
- [ ] Pada tab Network, catat request awal untuk `laut.mp4`, `C7614.MP4`, poster, font, dan gambar.
- [ ] Simpan screenshot atau catatan baseline agar hasil sesudah optimasi dapat dibandingkan.

### 2. Ubah strategi loading carousel hero

File utama: `components/sections/hero-section.tsx`

- [x] Pastikan hanya slide aktif yang merender elemen `<video>` atau `<Image>` berat.
- [x] Untuk video yang belum aktif, jangan gunakan `autoPlay`.
- [x] Tidak ada video nonaktif yang dirender, sehingga tidak melakukan preload.
- [x] Saat slide menjadi aktif, mulai playback melalui ref atau state yang terkontrol.
- [x] Pertahankan `muted` dan `playsInline` agar autoplay aktif tetap sesuai aturan browser.
- [x] Gunakan poster sebagai fallback visual sebelum video siap.
- [x] Tetapkan preload/priority hanya pada media slide pertama yang terlihat.
- [x] Hapus `priority` dari gambar slide kedua karena gambar tersebut bukan media awal.
- [x] Pastikan tombol indikator tetap dapat mengganti slide tanpa menunggu preload video sebelumnya.
- [x] Pastikan ketika pengguna berpindah slide, video slide lama dijeda dan currentTime tidak menyebabkan kerja media berlebih.
- [x] Tambahkan fallback jika video gagal diputar: poster tetap tampil dan carousel tetap berpindah.
- [ ] Uji carousel pada desktop, mobile, koneksi lambat, dan browser yang memblokir autoplay.

### 3. Optimasi dimensi poster hero

- [x] Buat ulang `public/videos/laut_poster.jpg` dalam rasio landscape 16:9.
- [x] Gunakan dimensi sekitar 1280x720 atau 1366x768.
- [ ] Encode poster sebagai WebP atau AVIF jika kompatibilitas deployment sudah dipastikan.
- [x] Pertahankan JPG sebagai fallback jika diperlukan.
- [x] Uji poster pada viewport mobile dan desktop agar crop tetap berisi objek penting.
- [x] Pastikan nama/path poster di `hero-section.tsx` tetap konsisten setelah proses encoding.

### 4. Encode ulang video hero

- [x] Simpan salinan sumber video di luar `public/` sebelum encoding ulang.
- [x] Encode `public/videos/laut.mp4` dengan H.264, 720p, CRF sekitar 27-30, dan fast-start metadata.
- [x] Encode `public/videos/C7614.MP4` dengan H.264, 720p, CRF sekitar 27-30, dan fast-start metadata.
- [x] Pertahankan audio hanya jika memang digunakan; hero saat ini muted sehingga audio dapat dihilangkan untuk mengurangi ukuran.
- [x] Bandingkan kualitas visual pada frame terang, frame gelap, gerakan cepat, dan detail kapal.
- [x] Targetkan ukuran masing-masing video sekitar 2-5 MiB.
- [ ] Pertimbangkan versi WebM sebagai source tambahan hanya jika hasil pengujian menunjukkan penghematan signifikan.
- [x] Pastikan server/CDN mengirim `Content-Type` dan byte range yang benar untuk video.
- [x] Catat ukuran sebelum dan sesudah encoding di task ini atau commit description.

## P1 - Kurangi kerja initial render

### 5. Audit Client Component homepage

- [x] Tinjau semua section yang diimpor oleh `app/page.tsx`.
- [x] Identifikasi section yang memakai `"use client"` karena context bahasa atau state interaktif.
- [ ] Pindahkan section statis menjadi Server Component jika tidak membutuhkan state, effect, event handler, atau context.
- [ ] Pisahkan bagian interaktif dari bagian statis, bukan menjadikan seluruh section client-side.
- [x] Pertahankan client-side hanya untuk carousel hero, language switcher, accordion, dan kontrol yang benar-benar interaktif.
- [x] Pastikan perubahan tidak menghilangkan perilaku pergantian bahasa.
- [ ] Hindari menambah `useMemo` atau `useCallback` tanpa bukti kebutuhan dari profiling.
- [ ] Bandingkan total JavaScript dan waktu hydration sebelum/sesudah perubahan.

### 5b. Public server layout dan cold-start navigation

- [x] Pindahkan route publik ke route group `app/(public)` tanpa mengubah URL publik.
- [x] Jadikan `app/(public)/layout.tsx` sebagai Server Component.
- [x] Pisahkan root layout dari layout publik/admin sehingga `ConditionalLayout` client tidak lagi berada di root.
- [x] Pecah navbar menjadi server shell, scroll-state client, logo theme client, navigation client, language switcher client, dan mobile menu client.
- [x] Seed bahasa awal dari cookie `unibox_lang` pada Server Component.
- [x] Simpan perubahan bahasa ke `localStorage` dan cookie agar request berikutnya memiliki bahasa awal yang konsisten.
- [x] Tambahkan `prefetch={false}` pada link internal homepage dan navbar.
- [x] Verifikasi initial load menghasilkan 0 request RSC prefetch.
- [x] Verifikasi klik ke `/product` menghasilkan tepat 1 request RSC.
- [x] Tambahkan `sizes="40px"` pada logo navbar.
- [x] Hapus preload logo yang tidak dipakai dengan menghilangkan `priority` dari logo kecil.
- [ ] Evaluasi ulang apakah dynamic rendering akibat `cookies()` dapat diganti dengan Cache Components/PPR agar static caching route publik tetap tersedia.

### 6. Lazy-load komponen interaktif di bawah fold

- [ ] Evaluasi dynamic import untuk section yang jauh dari viewport awal.
- [ ] Gunakan fallback dengan tinggi/layout yang stabil agar tidak menambah CLS.
- [ ] Jangan lazy-load hero, navbar, atau konten yang terlihat pada first viewport.
- [ ] Pastikan konten tetap dapat diakses jika JavaScript belum selesai atau gagal.
- [ ] Uji scroll cepat dari hero ke setiap section setelah lazy-load diterapkan.

### 7. Kurangi render ulang global

File terkait: `context/language-context.tsx`, `hooks/use-mobil.tsx`

- [x] Perbaiki pembacaan bahasa tersimpan agar tidak memicu `setState` sinkron di dalam effect setelah hydration jika pola arsitektur memungkinkan.
- [x] Pastikan akses `localStorage` tetap hanya berjalan di browser.
- [x] Perbaiki `useIsMobile` agar tidak melakukan update state sinkron yang tidak diperlukan saat mount.
- [x] Pertahankan listener perubahan ukuran dan cleanup listener.
- [ ] Validasi bahwa navbar dan layout tidak mengalami flicker saat mount.
- [x] Jalankan lint ulang untuk memastikan error `react-hooks/set-state-in-effect` berkurang.

### 8. Optimasi query landing page

File utama: `lib/activities-fetcher.ts`

- [x] Ganti query landing dari `include: { sections: ... }` menjadi `select` field minimal yang dipakai preview.
- [x] Pastikan query hanya mengambil maksimal dua aktivitas.
- [x] Gabungkan pemilihan aktivitas landing menjadi satu query berprioritas `showOnLanding`.
- [x] Pertahankan fallback `activitiesData` jika database gagal atau kosong.
- [x] Pastikan `revalidate = 60` pada `app/page.tsx` tetap bekerja.
- [ ] Uji build ketika `DATABASE_URL` tersedia dan ketika database tidak tersedia.
- [ ] Jangan mengubah query halaman detail/news tanpa kebutuhan yang terukur.

## P1 - Optimasi gambar dan font

### 9. Audit setiap gambar homepage

- [ ] Pastikan setiap `<Image>` memiliki `sizes` yang sesuai dengan ukuran aktual di desktop dan mobile.
- [ ] Pertahankan `priority` hanya pada media LCP yang benar-benar terlihat.
- [ ] Pastikan semua gambar di bawah fold memakai lazy loading default Next Image.
- [ ] Periksa gambar background pada `StatsSection` dan `Footer` karena tetap berukuran full viewport.
- [ ] Kompres gambar besar seperti `unibox-harbor-action.jpg`, `unibox-boat-hero.jpg`, dan `unibox-deck-closeup.jpg` bila kualitas visual tetap memenuhi kebutuhan.
- [ ] Buat varian crop/resolusi untuk avatar, thumbnail berita, dan background agar tidak memakai sumber 1024-1536px untuk area kecil.
- [ ] Pastikan dimensi intrinsik gambar sesuai dengan rasio container agar tidak terjadi layout shift.

### 10. Audit font

File utama: `app/layout.tsx`

- [ ] Ukur dampak empat weight `Hind` terhadap ukuran font payload.
- [ ] Hapus weight yang tidak benar-benar digunakan jika hasil audit mengizinkan.
- [ ] Pastikan subset `latin` sudah cukup untuk seluruh teks aplikasi.
- [ ] Verifikasi font fallback tidak menyebabkan perubahan layout besar saat font selesai dimuat.
- [ ] Pastikan metadata `metadataBase` dikonfigurasi pada deployment agar warning Open Graph hilang.

## P2 - Cleanup aset dan repository

### 11. Verifikasi aset tanpa referensi

Kandidat dari audit statis:

- [ ] `public/images/unibox-logo-transparent.png`
- [ ] `public/images/unibox-logo-hd.jpg`
- [x] `public/next.svg`
- [x] `public/globe.svg`
- [x] `public/file.svg`
- [x] `public/window.svg`
- [x] `public/vercel.svg`

Untuk setiap aset:

- [ ] Cari referensi berdasarkan nama file di seluruh source, metadata, dokumentasi, seed, dan konfigurasi deployment.
- [ ] Cari path aset di database atau script admin, bukan hanya di TypeScript/TSX.
- [ ] Pastikan tidak ada URL eksternal atau konten CMS yang menunjuk aset tersebut.
- [ ] Hapus hanya aset yang sudah dinyatakan aman.
- [x] Jalankan build dan smoke test setelah cleanup.

### 12. Tinjau arsip besar

- [ ] Verifikasi apakah `website-code.rar` diperlukan di repository.
- [ ] Jika tidak diperlukan untuk aplikasi, pindahkan keluar repository atau tambahkan ke ignore policy yang sesuai.
- [ ] Jangan menghapus arsip tanpa memastikan itu bukan backup yang sedang dibutuhkan pengguna.
- [ ] Periksa ukuran repository/deployment setelah arsip ditangani.

## Validasi akhir

- [ ] Jalankan `npm run lint`.
- [ ] Jalankan `npm run build`.
- [ ] Jalankan `npm run start` dalam mode production.
- [ ] Uji route `/`, `/about`, `/product`, `/news`, dan `/contact`.
- [ ] Uji navigasi dari navbar desktop dan mobile.
- [ ] Uji pergantian bahasa Indonesia/Inggris.
- [ ] Uji carousel hero dengan autoplay, indikator, refresh, dan koneksi lambat.
- [ ] Uji browser dengan autoplay video diblokir.
- [ ] Uji viewport mobile dan desktop.
- [ ] Pastikan tidak ada request video nonaktif pada initial load.
- [ ] Pastikan poster hero tampil cepat dan tidak ada layar kosong.
- [ ] Pastikan tidak ada layout shift besar ketika seluruh gambar selesai dimuat.
- [ ] Jalankan Lighthouse ulang dan bandingkan dengan baseline.
- [ ] Catat metrik sesudah optimasi: FCP, LCP, TBT, CLS, total transfer, ukuran video, dan jumlah request awal.
- [ ] Tinjau ulang git diff agar perubahan tetap terbatas pada optimasi yang direncanakan.

## Urutan eksekusi yang disarankan

1. Baseline performa.
2. Perbaikan render/preload hero.
3. Encoding video dan poster.
4. Validasi hero pada koneksi lambat.
5. Audit dan pengurangan Client Component.
6. Perbaikan render ulang context/hook.
7. Optimasi query landing page.
8. Optimasi gambar dan font.
9. Verifikasi lalu hapus aset tidak terpakai.
10. Validasi build, lint, navigasi, dan Lighthouse akhir.
