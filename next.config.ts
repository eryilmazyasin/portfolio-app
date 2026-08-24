import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: "standalone",
} satisfies NextConfig;

export default withNextIntl(nextConfig);
