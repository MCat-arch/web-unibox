// Helper otomatisasi terjemahan Bahasa Indonesia (ID) ke Bahasa Inggris (EN)
// Menggunakan engine Google Translate endpoint resmi (client=gtx) tanpa dependensi berbayar

export async function translateIdToEn(text: string): Promise<string> {
  if (!text || text.trim() === "") return text;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(1500),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return text;
    }

    const data = await response.json();

    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translatedParts = data[0]
        .filter((part: unknown[]) => Array.isArray(part) && typeof part[0] === "string")
        .map((part: unknown[]) => part[0] as string);

      const combined = translatedParts.join("");
      return combined.trim() !== "" ? combined : text;
    }

    return text;
  } catch {
    return text;
  }
}

// Fungsi batch untuk menerjemahkan banyak teks sekaligus secara paralel
export async function batchTranslateIdToEn(
  texts: (string | null | undefined)[]
): Promise<(string | null | undefined)[]> {
  return Promise.all(
    texts.map(async (item) => {
      if (!item || item.trim() === "") return item;
      return translateIdToEn(item);
    })
  );
}
