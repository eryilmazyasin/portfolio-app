import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Vercel üzerinde değilken (yani Docker veya local prod build'de) standalone çıktısı üret
  output: process.env.VERCEL ? undefined : "standalone",
};

export default withNextIntl(nextConfig);
