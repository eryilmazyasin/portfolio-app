import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yasin Eryılmaz | Portfolio",
    short_name: "YE Portfolio",
    description:
      "Yasin Eryılmaz — Frontend and Full-Stack Developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0f172a",
    // Manifest aynı dinamik PNG rotalarını kullanır; tarayıcı ve ana ekran ikonları tek marka kaynağından üretilir.
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
