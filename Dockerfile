# [ÖĞRENME NOTU]: 1. Katman (Base) - Node.js'in en hafif (alpine) versiyonunu temel alıyoruz.
FROM node:20-alpine AS base

# [ÖĞRENME NOTU]: 2. Katman (Dependencies) - Sadece paketleri kurduğumuz katman. 
# Bu sayede kod değişse bile, paketler değişmediği sürece Docker bu adımı cache'den hızlıca çeker.
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# [ÖĞRENME NOTU]: 3. Katman (Builder) - Kaynak kodları kopyalayıp projeyi derlediğimiz (build) yer.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# [ÖĞRENME NOTU]: 4. Katman (Runner) - Production imajı. Güvenlik için 'root' yerine kısıtlı 'nextjs' kullanıcısını oluşturuyoruz.
# Tüm gereksiz dosyaları atıp sadece çalışan (standalone) kodu alıyoruz.
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]