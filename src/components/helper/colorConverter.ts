// 1. CONVERT: HEX -> HSL
export function hexToHsl(hex: string) {
  // Hapus tanda # jika ada
  hex = hex.replace(/^#/, '')

  // Ubah ke nilai R, G, B
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // abu-abu
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Kembalikan objek HSL (H: 0-360, S: 0-100, L: 0-100)
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

// 2. CONVERT: HSL -> HEX
function hslToHex(h: number, s: number, l: number) {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Ubah ke format 8-bit channel (0-255) dan konversi ke Hex string
  const toHex = (x: number) => {
    const hex = Math.round((x + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// 3. UTAMA: Proses Modifikasi Warna
export function hexModification(
  warnaHex: string,
  opsiModifikasi: { h?: number; s?: number; l?: number },
) {
  // A. Ubah HEX awal ke HSL
  const hsl = hexToHsl(warnaHex)

  // B. Sesuaikan nilai H, S, atau L jika ada di opsiModifikasi
  if (opsiModifikasi.h !== undefined) hsl.h = Math.max(0, Math.min(360, opsiModifikasi.h))
  if (opsiModifikasi.s !== undefined) hsl.s = Math.max(0, Math.min(100, opsiModifikasi.s))
  if (opsiModifikasi.l !== undefined) hsl.l = Math.max(0, Math.min(100, opsiModifikasi.l))

  // C. Kembalikan hasilnya ke format HEX
  return hslToHex(hsl.h, hsl.s, hsl.l)
}
