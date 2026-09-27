export type ContentType = "event" | "blog";

export interface ActivityItem {
  slug: string;
  type: ContentType;
  featured?: boolean;
  showOnLanding?: boolean;
  category: { id: string; en: string };
  title: { id: string; en: string };
  date: { id: string; en: string };
  time?: { id: string; en: string };
  location?: { id: string; en: string };
  status?: { id: string; en: string };
  author: {
    name: string;
    role: { id: string; en: string };
  };
  image: string;
  summary: { id: string; en: string };
  content: {
    introduction: { id: string; en: string };
    sections: {
      heading: { id: string; en: string };
      body: { id: string; en: string };
    }[];
    quote?: {
      text: { id: string; en: string };
      author: string;
    };
  };
}

export interface UpcomingEventItem {
  id: string;
  slug?: string;
  image: string;
  day: string;
  monthYear: string;
  title: { id: string; en: string };
  location: { id: string; en: string };
  time?: { id: string; en: string };
  description: { id: string; en: string };
  tag: { id: string; en: string };
  status: { id: string; en: string };
}

export interface PastEventItem {
  id: string;
  slug: string;
  title: { id: string; en: string };
  date: { id: string; en: string };
  location: { id: string; en: string };
  summary: { id: string; en: string };
  image: string;
  tag: { id: string; en: string };
  outcome: { id: string; en: string };
  participantsCount: { id: string; en: string };
}

export const activitiesData: ActivityItem[] = [
  // ==========================================
  // EVENT: TOP FEATURED (LATEST / UPCOMING)
  // ==========================================
  {
    slug: "demo-coolbox-flywheel-pelabuhan-brondong",
    type: "event",
    featured: true,
    category: { id: "Event · Demo Lapangan", en: "Event · Field Demo" },
    title: {
      id: "Demo Pemasangan Modular Cool Box 100L & Flywheel di Pelabuhan Brondong",
      en: "100L Cool Box & Flywheel Mounting Demonstration at Brondong Port",
    },
    date: { id: "15 April 2026", en: "April 15, 2026" },
    time: { id: "08:30 - 13:00 WIB", en: "08:30 - 13:00 WIB" },
    location: {
      id: "Dermaga TPI Brondong, Lamongan, Jawa Timur",
      en: "Brondong Pier Fish Auction Hub, Lamongan, East Java",
    },
    status: { id: "Kegiatan Mendatang", en: "Upcoming Event" },
    author: {
      name: "Tim Operasional Lapangan Unibox",
      role: { id: "Divisi Kemitraan Pelabuhan", en: "Port Partnership Division" },
    },
    image: "/images/unibox-port-cold-storage.jpg",
    summary: {
      id: "Demonstrasi terbuka perakitan unit Unibox di atas kapal nelayan 5 GT, pengujian kompresor suhu -10°C, serta temu wicara operasional bersama komunitas nelayan lokal.",
      en: "Open field demonstration of Unibox mounting on 5 GT boats, -10°C compressor live testing, and operational discussion with the local fishing community.",
    },
    content: {
      introduction: {
        id: "Kegiatan demonstrasi lapangan ini diselenggarakan sebagai sarana sosialisasi dan uji coba langsung teknologi pendingin perikanan berbasis konversi putaran flywheel mesin kapal.",
        en: "This on-site demonstration event is held to showcase and live-test fishing cooling technology powered by boat engine flywheel kinetic conversion.",
      },
      sections: [
        {
          heading: {
            id: "Rangkaian Informasi & Demonstrasi Langsung",
            en: "Schedule & Live Demonstration Highlights",
          },
          body: {
            id: "Tim teknis Unibox akan mendemonstrasikan pemasangan braket universal pada mesin diesel satu silinder, menghubungkan sistem kelistrikan DC, dan menyalakan cool box 100 Liter hingga mencapai suhu beku stabil tanpa membebani aki kapal.",
            en: "Unibox engineers will demonstrate bracket mounting on single-cylinder marine diesels, wiring the DC power management unit, and powering the 100L cool box to steady sub-zero temperatures without draining auxiliary batteries.",
          },
        },
        {
          heading: {
            id: "Sesi Diskusi & Konsultasi Teknis Nelayan",
            en: "Technical Q&A & Community Discussion",
          },
          body: {
            id: "Seluruh nelayan, montir lokal, dan pengurus koperasi perikanan dipersilakan hadir secara langsung di dermaga untuk melihat fisik produk, berdiskusi mengenai efisiensi solar, serta mempelajari perawatan harian unit.",
            en: "All local fishers, mechanics, and cooperative staff are invited to attend directly at the pier to inspect product hardware, discuss fuel savings, and learn daily maintenance practices.",
          },
        },
        {
          heading: {
            id: "Akses Kegiatan Tanpa Biaya",
            en: "Open Public Information",
          },
          body: {
            id: "Kegiatan ini bersifat terbuka untuk umum dan tidak dipungut biaya pendaftaran. Para pengunjung dapat langsung datang ke area pendaratan ikan dermaga Brondong pada waktu yang telah dijadwalkan.",
            en: "This event is open to the public with no registration fee. Visitors are welcome to visit the Brondong pier fish landing facility during the scheduled hours.",
          },
        },
      ],
      quote: {
        text: {
          id: "Melalui demo langsung di dermaga, nelayan dapat membuktikan sendiri bagaimana mesin perahu mampu menghasilkan suhu dingin tanpa genset tambahan.",
          en: "Through live dockside demonstrations, fishers can witness firsthand how boat engines generate reliable refrigeration without auxiliary generators.",
        },
        author: "Koordinator Lapangan Unibox Jawa Timur",
      },
    },
  },
  {
    slug: "workshop-konservasi-termal-radar-sonar",
    type: "event",
    featured: false,
    category: { id: "Event · Workshop Nelayan", en: "Event · Fisher Workshop" },
    title: {
      id: "Workshop Konservasi Termal & Pengoperasian Sonar Radar Ikan",
      en: "Thermal Conservation & Fish Finding Sonar Radar Workshop",
    },
    date: { id: "28 April 2026", en: "April 28, 2026" },
    time: { id: "09:00 - 15:00 WIB", en: "09:00 - 15:00 WIB" },
    location: {
      id: "Balai Pertemuan Nelayan, Tanjung Priok, Jakarta Utara",
      en: "Fishers Community Hall, Tanjung Priok, North Jakarta",
    },
    status: { id: "Kegiatan Mendatang", en: "Upcoming Event" },
    author: {
      name: "Divisi Edukasi Maritim",
      role: { id: "Pelatihan & Litbang", en: "Training & R&D" },
    },
    image: "/images/unibox-fishermen.jpg",
    summary: {
      id: "Pelatihan pembacaan layar LCD digital, perawatan bodi stainless steel, dan teknik pemetaan gerombolan ikan dengan sensor sonar ultrasonik 100 meter.",
      en: "Hands-on training on digital LCD reading, stainless steel body sanitation, and fish school tracking using 100m ultrasonic sensors.",
    },
    content: {
      introduction: {
        id: "Workshop ini membagikan pengetahuan praktis bagi para nakhoda dan awak kapal dalam memaksimalkan sensor ultrasonik serta sistem refrigerasi terpadu.",
        en: "This workshop shares practical operational skills for skippers and crew members to maximize ultrasonic detection and integrated refrigeration.",
      },
      sections: [
        {
          heading: {
            id: "Materi Pengoperasian Sensor Sonar 100m",
            en: "100m Sonar Sensor Operation Curriculum",
          },
          body: {
            id: "Peserta akan mempraktikkan cara membaca indikator sonar ultrasonik di malam dan siang hari, sehingga perahu dapat langsung menuju koordinat tangkapan tanpa menghabiskan solar sia-sia.",
            en: "Attendees will practice interpreting ultrasonic pulse displays in varied conditions, allowing boats to navigate directly toward schools without wasteful fuel burning.",
          },
        },
        {
          heading: {
            id: "Standardisasi Kebersihan Bodi Stainless Steel",
            en: "Stainless Steel Sanitization Standards",
          },
          body: {
            id: "Pemberian materi penanganan higienis bodi stainless steel 100L untuk memastikan ikan terhindar dari kontaminasi bakteri selama perjalanan melaut.",
            en: "Instruction on hygienic handling of the 100L stainless steel interior ensuring catches remain bacteria-free throughout ocean voyages.",
          },
        },
      ],
      quote: {
        text: {
          id: "Pengetahuan navigasi presisi dan rantai dingin adalah kunci utama nelayan tradisional bersaing di pasar modern.",
          en: "Precision navigation and cold-chain mastery are the keys for artisanal fishers to thrive in modern markets.",
        },
        author: "Instruktur Instrumentasi Kelautan Unibox",
      },
    },
  },
  {
    slug: "pameran-inovasi-kemaritiman-surabaya",
    type: "event",
    featured: false,
    category: { id: "Event · Pameran Inovasi", en: "Event · Innovation Expo" },
    title: {
      id: "Pameran Inovasi Kemaritiman & Elektrifikasi Kapal Nelayan",
      en: "Maritime Innovation & Boat Electrification Technology Expo",
    },
    date: { id: "10 Mei 2026", en: "May 10, 2026" },
    time: { id: "10:00 - 17:00 WIB", en: "10:00 - 17:00 WIB" },
    location: {
      id: "Grand City Convex, Surabaya, Jawa Timur",
      en: "Grand City Convex, Surabaya, East Java",
    },
    status: { id: "Kegiatan Mendatang", en: "Upcoming Event" },
    author: {
      name: "Tim Riset & Humas Unibox",
      role: { id: "Divisi Komunikasi Publik", en: "Public Communications" },
    },
    image: "/images/unibox-harbor-aerial.jpg",
    summary: {
      id: "Pameran teknologi perkapalan rakyat terintegrasi Unibox All-in-One dan forum dialog kemitraan bersama dinas perikanan serta koperasi nelayan se-Jawa Timur.",
      en: "Showcasing Unibox All-in-One integrated small-boat tech and a partnership forum with fisheries agencies and cooperatives across East Java.",
    },
    content: {
      introduction: {
        id: "Unibox menghadirkan instalasi peraga lengkap unit pendingin, flywheel generator, modul sonar, dan sistem penerangan LED pada pameran teknologi maritim terkemuka.",
        en: "Unibox presents a complete display including the cooler, flywheel generator, sonar module, and LED deck lighting at the premier regional maritime expo.",
      },
      sections: [
        {
          heading: {
            id: "Stan Pameran Interaktif & Simulasi Mesin",
            en: "Interactive Booth & Engine Simulation",
          },
          body: {
            id: "Pengunjung dapat menyaksikan simulasi kerja putaran mesin yang menggerakkan kompresor R32 secara langsung serta mengamati pembacaan suhu digital secara real-time.",
            en: "Visitors can inspect the live engine simulation driving the R32 compressor and observe real-time digital temperature displays.",
          },
        },
      ],
      quote: {
        text: {
          id: "Forum ini menghubungkan riset teknologi aplikatif dengan kebutuhan nyata sektor perikanan nasional.",
          en: "This forum bridges applied engineering research with the real-world needs of the national fisheries sector.",
        },
        author: "Manajemen Kemitraan Unibox",
      },
    },
  },

  // ==========================================
  // PAST EVENTS (TELAH TERLAKSANA)
  // ==========================================
  {
    slug: "uji-pelayaran-muncar-banyuwangi",
    type: "event",
    featured: false,
    category: { id: "Event · Uji Coba Lapangan", en: "Event · Field Trial" },
    title: {
      id: "Uji Pelayaran 48 Jam & Kestabilan Suhu Dingin di Pelabuhan Muncar",
      en: "48-Hour Sea Voyage Trial & Cold Stability at Muncar Port",
    },
    date: { id: "18 Februari 2026", en: "February 18, 2026" },
    location: {
      id: "Pelabuhan Muncar, Banyuwangi, Jawa Timur",
      en: "Muncar Fishing Port, Banyuwangi, East Java",
    },
    status: { id: "Telah Terlaksana", en: "Completed Event" },
    author: {
      name: "Tim Pengujian Lapangan",
      role: { id: "Divisi Konservasi Termal", en: "Thermal Conservation Division" },
    },
    image: "/images/unibox-port-cold-storage.jpg",
    summary: {
      id: "Uji pelayaran nyata bersama kapal motor 5 GT berhasil membuktikan stabilitas pendinginan -10°C selama 48 jam pelayaran penuh tanpa membeli es batu balok.",
      en: "A real sea trial with 5 GT motorboats successfully verified -10°C refrigeration stability across a 48-hour continuous voyage without ice blocks.",
    },
    content: {
      introduction: {
        id: "Pengujian pelayaran 48 jam dilakukan di perairan Selat Bali dengan basis pangkalan di Pelabuhan Perikanan Muncar Banyuwangi.",
        en: "The 48-hour sea trial was conducted across Bali Strait waters based out of the Muncar Fishing Port in Banyuwangi.",
      },
      sections: [
        {
          heading: {
            id: "Hasil Pengukuran Suhu & Kualitas Ikan",
            en: "Temperature Measurement & Catch Quality Results",
          },
          body: {
            id: "Data logger digital mencatat suhu internal bodi stainless steel tetap terjaga stabil pada rentang -8°C hingga -10°C, menghasilkan ikan dengan kualitas mutu Grade-A.",
            en: "Digital data loggers verified internal temperatures stayed firmly between -8°C and -10°C, yielding export-standard Grade-A fish quality.",
          },
        },
      ],
      quote: {
        text: {
          id: "Ikan tangkapan kami tetap beku segar sampai tiba di pelelangan dermaga Muncar.",
          en: "Our catch remained fresh and chilled until arriving at the Muncar auction pier.",
        },
        author: "Pak Solihin · Nelayan Uji Coba Muncar",
      },
    },
  },
  {
    slug: "sosialisasi-braket-pasuruan",
    type: "event",
    featured: false,
    category: { id: "Event · Workshop Teknis", en: "Event · Technical Workshop" },
    title: {
      id: "Sosialisasi & Pemasangan Braket Universal Flywheel di Pelabuhan Pasuruan",
      en: "Universal Flywheel Bracket Mounting Workshop at Pasuruan Port",
    },
    date: { id: "20 Januari 2026", en: "January 20, 2026" },
    location: {
      id: "Pendaratan Ikan Pasuruan, Jawa Timur",
      en: "Pasuruan Fish Landing Hub, East Java",
    },
    status: { id: "Telah Terlaksana", en: "Completed Event" },
    author: {
      name: "Tim Mekanik Unibox",
      role: { id: "Divisi Manufaktur & Modul", en: "Manufacturing & Modular Division" },
    },
    image: "/images/unibox-harbor-aerial.jpg",
    summary: {
      id: "Pemasangan langsung braket modular flywheel pada mesin Dongfeng dan Yanmar milik nelayan setempat dengan durasi perakitan kurang dari 45 menit per kapal.",
      en: "Direct modular flywheel bracket installation on local Dongfeng and Yanmar diesel engines, completed in under 45 minutes per vessel.",
    },
    content: {
      introduction: {
        id: "Workshop teknis ini diselenggarakan di balai pendaratan ikan Pasuruan untuk membuktikan kepraktisan pemasangan modul generator flywheel.",
        en: "This technical workshop was organized at the Pasuruan fish landing center to demonstrate practical flywheel module installation.",
      },
      sections: [
        {
          heading: {
            id: "Kesesuaian Universal Mesin Rakyat",
            en: "Universal Small-Boat Engine Compatibility",
          },
          body: {
            id: "Instalasi berhasil dilakukan pada 6 unit kapal motor dengan konfigurasi mesin yang berbeda-beda tanpa pengelasan bodi kapal.",
            en: "Mounting succeeded on 6 motorized boats with varied engine layouts without requiring boat hull welding.",
          },
        },
      ],
      quote: {
        text: {
          id: "Braketnya sangat presisi dan montir bengkel kapal kami bisa memasangnya secara mandiri.",
          en: "The brackets are precisely engineered and our dockyard mechanics can install them independently.",
        },
        author: "H. Ridwan · Pengurus Kelompok Usaha Bersama Pasuruan",
      },
    },
  },
  {
    slug: "uji-ketahanan-salinitas-pantura",
    type: "event",
    featured: false,
    category: { id: "Event · Riset Material", en: "Event · Materials Research" },
    title: {
      id: "Pengujian Ketahanan Bodi Stainless Steel Terhadap Salinitas Ekstrem Pantura",
      en: "Stainless Steel Body Durability Testing in High North Coast Salinity",
    },
    date: { id: "12 Desember 2025", en: "December 12, 2025" },
    location: {
      id: "Dermaga Nelayan Tuban, Jawa Timur",
      en: "Tuban Fishing Pier, East Java",
    },
    status: { id: "Telah Terlaksana", en: "Completed Event" },
    author: {
      name: "Laboratorium Korosi Kelautan",
      role: { id: "Divisi Pengujian Kualitas", en: "Quality Testing Division" },
    },
    image: "/images/unibox-fishermen.jpg",
    summary: {
      id: "Pengujian paparan air laut dan udara pantai selama 30 hari membuktikan keandalan lapisan baja anti-karat food-grade bebas degradasi permukaan.",
      en: "A 30-day continuous saltwater exposure test proved food-grade stainless steel reliability with zero surface corrosion or degradation.",
    },
    content: {
      introduction: {
        id: "Uji korosi maritim dilakukan di pesisir utara Tuban untuk menguji ketahanan bodi cool box Unibox terhadap percikan garam dan paparan terik tropis.",
        en: "Maritime corrosion testing was conducted on the Tuban coast to evaluate Unibox cool box resistance to saltwater spray and intense tropical sun.",
      },
      sections: [
        {
          heading: {
            id: "Integritas Material Food-Grade",
            en: "Food-Grade Material Integrity",
          },
          body: {
            id: "Pemeriksaan mikroskopik menunjukkan tidak ada tanda korosi celah atau pitting pada engsel maupun dinding dalam wadah 100 Liter.",
            en: "Microscopic analysis showed no signs of crevice or pitting corrosion on hinges or inner walls of the 100L chamber.",
          },
        },
      ],
      quote: {
        text: {
          id: "Material stainless steel ini sangat aman untuk penyimpanan bahan pangan laut bersertifikasi ekspor.",
          en: "This stainless steel material is completely safe for export-grade seafood cold storage.",
        },
        author: "Dr. Ir. Hendra · Peneliti Metalurgi Kemaritiman",
      },
    },
  },

  // ==========================================
  // BLOG: ARTICLES IN OCEAN BLUE SECTION
  // ==========================================
  {
    slug: "uji-coba-pendingin-r32-perahu-nelayan",
    type: "blog",
    featured: false,
    category: { id: "Blog · Teknologi & Riset", en: "Blog · Tech & Research" },
    title: {
      id: "Uji Coba Pendingin R32 & Kestabilan Suhu Ikan di Perahu Nelayan",
      en: "R32 Refrigeration Field Trial & Fish Temperature Stability Aboard Boats",
    },
    date: { id: "25 Maret 2026", en: "March 25, 2026" },
    author: {
      name: "Tim Riset & Rekayasa Unibox",
      role: { id: "Divisi Konservasi Termal", en: "Thermal Conservation Division" },
    },
    image: "/images/unibox-product-detail.jpg",
    summary: {
      id: "Pengujian operasional pelayaran 48 jam membuktikan kestabilan suhu kompresi R32 pada rentang 0°C hingga -10°C, menjaga kualitas ikan tetap segar tanpa es batu balok.",
      en: "A 48-hour operational voyage trial verified R32 compression temperature stability between 0°C and -10°C, preserving fish freshness without block ice.",
    },
    content: {
      introduction: {
        id: "Selama puluhan tahun, nelayan tradisional Indonesia sangat bergantung pada es batu balok yang cepat mencair di laut tropis. Keterbatasan ini seringkali memaksa nelayan pulang lebih awal atau membuang sebagian hasil tangkapan yang mengalami pembusukan sebelum sempat bersandar di Tempat Pelelangan Ikan (TPI).",
        en: "For decades, Indonesian traditional fishers have heavily relied on block ice that melts quickly in tropical sea temperatures. This limitation often forces them to return early or discard spoiled catches before reaching fish auction facilities.",
      },
      sections: [
        {
          heading: {
            id: "Metode Konservasi Termal Ramah Lingkungan",
            en: "Eco-Friendly Thermal Conservation Method",
          },
          body: {
            id: "Dalam uji coba lapangan terbaru bersama kelompok nelayan pesisir, sistem Unibox dipasang langsung di atas perahu motor 5 GT. Menggunakan kompresor DC hemat daya berbasis refrigeran R32 dengan Global Warming Potential (GWP) rendah, sistem mampu menurunkan suhu kotak pendingin hingga -10°C dalam waktu singkat setelah mesin perahu dinyalakan.",
            en: "In recent coastal field tests with artisanal fishing groups, the Unibox system was installed on a 5 GT motorboat. Utilizing an energy-efficient DC compressor powered by low-GWP R32 refrigerant, the system brought cooler box temperatures down to -10°C shortly after the engine started.",
          },
        },
        {
          heading: {
            id: "Kemandirian Listrik Tanpa Aki Tambahan",
            en: "Electrical Autonomy Without Extra Batteries",
          },
          body: {
            id: "Sistem pendingin ini memperoleh pasokan daya langsung dari putaran flywheel mesin perahu yang dikonversi menjadi energi listrik DC stabil. Dengan adanya cadangan baterai terintegrasi, suhu dingin di dalam bodi stainless steel 100 Liter tetap terjaga stabil bahkan saat mesin perahu dimatikan untuk berlabuh.",
            en: "The refrigeration system draws power directly from boat engine flywheel rotation, converted into stable DC electricity. With an integrated battery reserve, internal cold temperatures inside the 100L stainless steel body remain stable even when the engine is stopped at anchor.",
          },
        },
        {
          heading: {
            id: "Hasil Analisis Kualitas Mutu Ikan",
            en: "Fish Quality Assessment Results",
          },
          body: {
            id: "Hasil pengukuran organoleptik dan uji kesegaran ikan setelah 48 jam pelayaran menunjukkan tekstur daging ikan tetap padat, mata jernih, dan insang berwarna merah segar berstandar Grade-A. Nelayan mitra mencatat peningkatan nilai jual rata-rata sebesar 20-25% di dermaga pelelangan.",
            en: "Organoleptic tests and freshness assessments after a 48-hour voyage confirmed firm fish flesh texture, clear eyes, and bright red gills meeting Grade-A export standards. Partner fishers recorded an average 20-25% higher sale price at the auction dock.",
          },
        },
      ],
      quote: {
        text: {
          id: "Dengan Unibox, kami tidak perlu lagi membeli es balok sebelum melaut. Ikan tetap beku segar sampai kami tiba di pelelangan, dan harga jualnya jauh lebih tinggi.",
          en: "With Unibox, we no longer need to buy ice blocks before sailing. The fish stays fresh and firm until auction, commanding significantly higher prices.",
        },
        author: "Capt. Sukirman · Ketua Koperasi Nelayan Mitra",
      },
    },
  },
  {
    slug: "sosialisasi-elektrifikasi-flywheel-pelabuhan",
    type: "blog",
    featured: false,
    category: { id: "Blog · Kemitraan Pesisir", en: "Blog · Coastal Partnership" },
    title: {
      id: "Sosialisasi Elektrifikasi Flywheel dan Cool Box 100L di Pelabuhan",
      en: "Flywheel Electrification & 100L Cool Box Workshop at Harbor",
    },
    date: { id: "18 Februari 2026", en: "February 18, 2026" },
    author: {
      name: "Tim Lapangan Unibox",
      role: { id: "Pemberdayaan Nelayan", en: "Fisher Empowerment" },
    },
    image: "/images/unibox-harbor-aerial.jpg",
    summary: {
      id: "Tim teknis Unibox mendemonstrasikan perakitan modul flywheel generator dan dudukan bodi stainless steel 100L di hadapan puluhan pemilik armada perahu.",
      en: "Unibox technical engineers demonstrated flywheel generator installation and 100L stainless cool box mounting for dozens of boat owners.",
    },
    content: {
      introduction: {
        id: "Kegiatan sosialisasi teknis ini diadakan di pusat pelabuhan perikanan guna memperkenalkan kemudahan perakitan modul konversi energi mesin perahu.",
        en: "This technical workshop was held at the coastal fishing port to introduce the easy installation of boat engine energy conversion modules.",
      },
      sections: [
        {
          heading: {
            id: "Kesesuaian dengan Berbagai Tipe Mesin Diesel",
            en: "Compatibility with Diverse Diesel Engines",
          },
          body: {
            id: "Demonstrasi menunjukkan modul generator flywheel Unibox dapat dipasangkan secara universal pada mesin diesel satu silinder tipe populer (seperti Dongfeng, Yanmar, dan Kubota) tanpa mengubah konstruksi perahu.",
            en: "The demonstration showed that the Unibox flywheel generator module mounts universally onto popular single-cylinder diesel engines (such as Dongfeng, Yanmar, and Kubota) without structural boat modifications.",
          },
        },
        {
          heading: {
            id: "Efisiensi Biaya Operasional Nelayan",
            en: "Operating Cost Savings for Fishers",
          },
          body: {
            id: "Dengan menghilangkan kebutuhan pengecasan aki dan pembelian es harian, biaya operasional per pelayaran dapat ditekan hingga ratusan ribu rupiah per trip.",
            en: "By removing the need for daily ice block purchases and auxiliary battery charging rentals, per-trip operational expenditures were reduced substantially.",
          },
        },
      ],
      quote: {
        text: {
          id: "Pemasangannya ringkas di dek perahu dan perawatannya sangat mudah dipahami oleh montir lokal kami.",
          en: "The installation on deck is compact, and maintenance is easily understood by our local mechanics.",
        },
        author: "Bambang Wijaya · Pengelola Fasilitas Pendaratan Ikan",
      },
    },
  },
  {
    slug: "penerapan-radar-sonar-efisiensi-solar",
    type: "blog",
    featured: false,
    category: { id: "Blog · Navigasi & Lingkungan", en: "Blog · Navigation & Eco" },
    title: {
      id: "Penerapan Radar Sonar 100m untuk Efisiensi Solar Armada Nelayan",
      en: "Deploying 100m Ultrasonic Sonar to Slash Fuel Consumption",
    },
    date: { id: "28 Januari 2026", en: "January 28, 2026" },
    author: {
      name: "Tim Instrumentasi Kelautan",
      role: { id: "Sensor & IoT Maritim", en: "Marine IoT & Sensors" },
    },
    image: "/images/unibox-fishermen.jpg",
    summary: {
      id: "Penggunaan sensor sonar ultrasonik radius 100 meter berhasil memangkas waktu jelajah perahu hingga 35%, menghemat bahan bakar solar secara signifikan.",
      en: "Employing a 100-meter ultrasonic sonar sensor reduced boat cruising search time by 35%, cutting diesel fuel consumption substantially.",
    },
    content: {
      introduction: {
        id: "Salah satu beban biaya terbesar nelayan tradisional adalah konsumsi BBM solar saat mencari gerombolan ikan di lautan terbuka secara acak.",
        en: "One of the heaviest operating burdens for artisanal fishers is diesel fuel consumption when randomly searching for fish schools in open seas.",
      },
      sections: [
        {
          heading: {
            id: "Pemindaian Akurat Tanpa Polusi Suara Berlebih",
            en: "Accurate Scanning Without Marine Noise Pollution",
          },
          body: {
            id: "Transduser ultrasonik Unibox menggunakan gelombang pulsa frekuensi terarah yang aman bagi ekosistem laut namun sangat presisi mendeteksi kumpulan ikan hingga radius 100 meter.",
            en: "The Unibox ultrasonic transducer employs directional high-frequency pulses that are safe for marine life while precisely detecting fish clusters within a 100-meter radius.",
          },
        },
        {
          heading: {
            id: "Dampak Pengurangan Emisi Karbon Pesisir",
            en: "Coastal Carbon Emission Reduction Impact",
          },
          body: {
            id: "Efisiensi solar perahu nelayan tidak hanya meningkatkan margin keuntungan keluarga nelayan, namun juga turut menekan emisi karbon maritim nasional.",
            en: "Fuel efficiency not only raises net profits for coastal fisher households, but also cuts marine carbon emissions in line with national sustainability goals.",
          },
        },
      ],
      quote: {
        text: {
          id: "Kami tidak perlu lagi berputar-putar di tengah laut menebak lokasi ikan. Sonar langsung menunjukkan posisi gerombolan secara akurat.",
          en: "We no longer circle aimlessly guessing fish locations. The sonar pinpoints schools with high accuracy.",
        },
        author: "Pak Rudi · Nelayan Tangkap Pesisir",
      },
    },
  },
  {
    slug: "uji-ketahanan-bodi-stainless-steel-korosi-laut",
    type: "blog",
    featured: false,
    category: { id: "Blog · Material & Rekayasa", en: "Blog · Materials & Eng." },
    title: {
      id: "Uji Ketahanan Bodi Stainless Steel Terhadap Korosi Air Laut",
      en: "Marine Stainless Steel Body Saltwater Corrosion Resistance Testing",
    },
    date: { id: "12 Januari 2026", en: "January 12, 2026" },
    author: {
      name: "Tim Rekayasa Material Unibox",
      role: { id: "Divisi Manufaktur", en: "Manufacturing Division" },
    },
    image: "/images/unibox-port-cold-storage.jpg",
    summary: {
      id: "Pengujian ketahanan material stainless steel food-grade pada paparan salinitas tinggi membuktikan masa pakai unit yang tahan bertahun-tahun di lingkungan maritim.",
      en: "High-salinity testing of food-grade marine stainless steel confirmed multi-year durability in harsh maritime environments.",
    },
    content: {
      introduction: {
        id: "Udara pesisir dan percikan air laut memiliki tingkat keasaman dan salinitas tinggi yang dengan cepat merusak peralatan logam biasa.",
        en: "Coastal air and ocean spray carry high salinity and corrosion risks that quickly deteriorate ordinary metals on fishing decks.",
      },
      sections: [
        {
          heading: {
            id: "Ketahanan Terhadap Benturan Ombak & Gasket Ganda",
            en: "Wave Impact Resistance & Dual Seal Gaskets",
          },
          body: {
            id: "Bodi cool box Unibox dibuat dari pelat stainless steel pilihan dengan insulasi busa poliuretan rapat dan gasket karet ganda yang mencegah kebocoran suhu.",
            en: "The Unibox cool box body is forged from marine-grade stainless steel with high-density polyurethane insulation and dual rubber gaskets preventing temperature loss.",
          },
        },
      ],
      quote: {
        text: {
          id: "Wadahnya sangat kokoh, bersih, dan tidak meninggalkan bau amis yang sulit dihilangkan seperti wadah plastik biasa.",
          en: "The container is extremely sturdy, clean, and leaves no lingering fish odor unlike ordinary plastic containers.",
        },
        author: "Dewi Lestari · Direktur Pengolahan Hasil Laut Ekspor",
      },
    },
  },
  {
    slug: "integrasi-penerangan-led-keamanan-malam",
    type: "blog",
    featured: false,
    category: { id: "Blog · Keselamatan Pelayaran", en: "Blog · Sea Safety" },
    title: {
      id: "Integrasi Penerangan LED Anti-Air untuk Keselamatan Nelayan Malam Hari",
      en: "Waterproof LED Deck Lighting Integration for Night Sailing Safety",
    },
    date: { id: "5 Januari 2026", en: "January 5, 2026" },
    author: {
      name: "Tim Desain & Keselamatan",
      role: { id: "Divisi Rekayasa Dek", en: "Deck Engineering Division" },
    },
    image: "/images/unibox-harbor-aerial.jpg",
    summary: {
      id: "Sistem penerangan LED terintegrasi dari tenaga flywheel memberikan visibilitas dek yang aman di tengah gelombang malam hari tanpa boros daya.",
      en: "Integrated waterproof LED lighting powered by flywheel conversion delivers safe deck illumination during nighttime voyages without heavy energy draw.",
    },
    content: {
      introduction: {
        id: "Aktivitas menarik jaring dan penanganan ikan seringkali dilakukan pada dini hari dalam kondisi gelap gulita dan ombak tinggi.",
        en: "Net hauling and seafood handling frequently occur in predawn hours with zero ambient light and turbulent swells.",
      },
      sections: [
        {
          heading: {
            id: "Pencahayaan Terarah Hemat Energi",
            en: "Directional Energy-Efficient Illumination",
          },
          body: {
            id: "Modul LED anti-air Unibox memiliki sudut pancar lebar yang menerangi seluruh area kerja geladak perahu tanpa menyilaukan mata juru mudi.",
            en: "The Unibox waterproof LED module features a wide beam angle lighting the entire boat deck workspace without blinding the skipper.",
          },
        },
      ],
      quote: {
        text: {
          id: "Dek menjadi terang benderang sehingga kerja menarik jaring jauh lebih aman dan cepat.",
          en: "The deck is brightly illuminated, making net hauling much safer and faster.",
        },
        author: "Capt. Mansyur · Nakhoda Perahu 7 GT",
      },
    },
  },
  {
    slug: "standar-kesegaran-ikan-rantai-dingin-ekspor",
    type: "blog",
    featured: false,
    category: { id: "Blog · Mutu & Standar", en: "Blog · Quality & Standards" },
    title: {
      id: "Standardisasi Mutu Rantai Dingin untuk Ikan Tangkap Berorientasi Ekspor",
      en: "Cold-Chain Quality Standardization for Export-Oriented Catches",
    },
    date: { id: "20 Desember 2025", en: "December 20, 2025" },
    author: {
      name: "Tim Konservasi Hasil Laut",
      role: { id: "Divisi Standardisasi Mutu", en: "Quality Assurance Division" },
    },
    image: "/images/unibox-product-detail.jpg",
    summary: {
      id: "Analisis komparatif kesegaran ikan antara kotak pendingin kompresor konstan dengan sistem es balok tradisional terhadap nilai tukar nelayan.",
      en: "A comparative freshness analysis between constant compressor cold boxes and traditional block ice systems regarding fisher terms of trade.",
    },
    content: {
      introduction: {
        id: "Mempertahankan rantai dingin sejak detik pertama ikan diangkat dari laut adalah kunci memperoleh harga terbaik di pasar internasional.",
        en: "Maintaining the cold chain from the very moment fish is caught is the cornerstone of commanding premium prices in international markets.",
      },
      sections: [
        {
          heading: {
            id: "Pencegahan Pembusukan Enzimatik",
            en: "Preventing Enzymatic Spoilage",
          },
          body: {
            id: "Penurunan suhu cepat hingga -10°C membekukan aktivitas bakteri pembusuk dan menjaga kesegaran asam amino alami daging ikan.",
            en: "Rapid cooling down to -10°C halts spoilage bacterial activity and preserves the natural amino acid freshness of fish flesh.",
          },
        },
      ],
      quote: {
        text: {
          id: "Standar suhu konstan memungkinkan komoditas ikan lokal menembus standar karantina ekspor dengan mudah.",
          en: "Constant temperature standards allow local fish commodities to clear export quarantine requirements seamlessly.",
        },
        author: "Drs. Suryanto · Konsultan Mutu Perikanan Tangkap",
      },
    },
  },
];

// 2 Upcoming Events (Yang tampil di bawah event utama dalam bentuk kartu memanjang)
export const upcomingEventsData: UpcomingEventItem[] = [
  {
    id: "event-2",
    slug: "workshop-konservasi-termal-radar-sonar",
    image: "/images/unibox-fishermen.jpg",
    day: "28",
    monthYear: "Apr 2026",
    tag: { id: "Workshop Nelayan", en: "Fisher Workshop" },
    title: {
      id: "Workshop Konservasi Termal & Pengoperasian Sonar Radar Ikan",
      en: "Thermal Conservation & Fish Finding Sonar Radar Workshop",
    },
    location: {
      id: "Balai Pertemuan Nelayan, Tanjung Priok, Jakarta Utara",
      en: "Fishers Community Hall, Tanjung Priok, North Jakarta",
    },
    time: { id: "09:00 - 15:00 WIB", en: "09:00 - 15:00 WIB" },
    description: {
      id: "Informasi edukasi navigasi & rantai dingin: pelatihan membaca layar LCD indikator digital, sanitasi bodi stainless steel, dan pemetaan gerombolan ikan radius 100 meter.",
      en: "Educational guidance on navigation & cold-chain: reading digital LCD displays, sanitizing the stainless steel body, and 100-meter sonar fish tracking.",
    },
    status: { id: "Informasi Terbuka", en: "Open Information" },
  },
  {
    id: "event-3",
    slug: "pameran-inovasi-kemaritiman-surabaya",
    image: "/images/unibox-harbor-aerial.jpg",
    day: "10",
    monthYear: "Mei 2026",
    tag: { id: "Pameran Inovasi", en: "Innovation Expo" },
    title: {
      id: "Pameran Inovasi Kemaritiman & Elektrifikasi Kapal Nelayan",
      en: "Maritime Innovation & Boat Electrification Technology Expo",
    },
    location: {
      id: "Grand City Convex, Surabaya, Jawa Timur",
      en: "Grand City Convex, Surabaya, East Java",
    },
    time: { id: "10:00 - 17:00 WIB", en: "10:00 - 17:00 WIB" },
    description: {
      id: "Pameran teknologi maritim terpadu: stan peraga Unibox All-in-One dan temu wicara terbuka perkembangan teknologi pendingin perikanan nasional.",
      en: "Integrated maritime tech exhibition: Unibox All-in-One interactive booth and public discussion on modern national fisheries cooling.",
    },
    status: { id: "Informasi Terbuka", en: "Open Information" },
  },
];

// Past Events (Kegiatan yang sudah terlaksana di seksi bawah)
export const pastEventsData: PastEventItem[] = [
  {
    id: "past-1",
    slug: "uji-pelayaran-muncar-banyuwangi",
    title: {
      id: "Uji Pelayaran 48 Jam & Kestabilan Suhu Dingin di Pelabuhan Muncar",
      en: "48-Hour Sea Voyage Trial & Cold Stability at Muncar Port",
    },
    date: { id: "18 Februari 2026", en: "February 18, 2026" },
    location: {
      id: "Pelabuhan Muncar, Banyuwangi, Jawa Timur",
      en: "Muncar Fishing Port, Banyuwangi, East Java",
    },
    summary: {
      id: "Pengujian pelayaran nyata di laut terbuka membuktikan suhu konstan -10°C tetap stabil sepanjang perjalanan pelayaran 2 hari tanpa ketergantungan es balok.",
      en: "Live open sea trial proved continuous -10°C temperature stability across a 2-day voyage without dependency on melting block ice.",
    },
    image: "/images/unibox-port-cold-storage.jpg",
    tag: { id: "Uji Pelayaran", en: "Sea Trial" },
    outcome: {
      id: "Kualitas kesegaran ikan Grade-A dan peningkatan nilai jual 25% di pelelangan.",
      en: "Grade-A fish freshness and a 25% price increase at the auction dock.",
    },
    participantsCount: { id: "25+ Nelayan & Teknisi", en: "25+ Fishers & Techs" },
  },
  {
    id: "past-2",
    slug: "sosialisasi-braket-pasuruan",
    title: {
      id: "Sosialisasi & Pemasangan Braket Universal Flywheel di Pelabuhan Pasuruan",
      en: "Universal Flywheel Bracket Mounting Workshop at Pasuruan Port",
    },
    date: { id: "20 Januari 2026", en: "January 20, 2026" },
    location: {
      id: "Pendaratan Ikan Pasuruan, Jawa Timur",
      en: "Pasuruan Fish Landing Hub, East Java",
    },
    summary: {
      id: "Demonstrasi pemasangan modul generator flywheel pada 6 perahu nelayan tipe Dongfeng & Yanmar dengan durasi perakitan cepat di bawah 45 menit.",
      en: "Flywheel generator module installation demonstrated on 6 Dongfeng & Yanmar boats, completed in under 45 minutes each.",
    },
    image: "/images/unibox-harbor-aerial.jpg",
    tag: { id: "Workshop Teknis", en: "Technical Workshop" },
    outcome: {
      id: "100% kompatibel tanpa perlu memodifikasi struktur rangka kayu kapal.",
      en: "100% compatible without modifying boat wooden frame structure.",
    },
    participantsCount: { id: "40+ Nelayan & Montir", en: "40+ Fishers & Mechanics" },
  },
  {
    id: "past-3",
    slug: "uji-ketahanan-salinitas-pantura",
    title: {
      id: "Pengujian Ketahanan Bodi Stainless Steel Terhadap Salinitas Ekstrem Pantura",
      en: "Stainless Steel Body Durability Testing in High North Coast Salinity",
    },
    date: { id: "12 Desember 2025", en: "December 12, 2025" },
    location: {
      id: "Dermaga Nelayan Tuban, Jawa Timur",
      en: "Tuban Fishing Pier, East Java",
    },
    summary: {
      id: "Pengujian paparan air laut dan udara garam selama 30 hari membuktikan keandalan pelat stainless steel food-grade tanpa korosi maupun bau sisa.",
      en: "A 30-day exposure test confirmed food-grade stainless steel reliability with zero rust, pitting, or lingering fish odor.",
    },
    image: "/images/unibox-fishermen.jpg",
    tag: { id: "Riset Material", en: "Material Research" },
    outcome: {
      id: "Nol korosi celah dan lolos uji higienitas penyimpanan makanan laut.",
      en: "Zero crevice corrosion and cleared seafood hygiene storage benchmarks.",
    },
    participantsCount: { id: "Tim Litbang & Koperasi", en: "R&D Team & Cooperative" },
  },
];
