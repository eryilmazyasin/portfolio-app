// src/app/test/page.tsx
import { getGithubProfile } from "@/services/github";

// [ÖĞRENME NOTU]: Next.js'in bu sayfayı build anında statik olarak üretmesini engelliyoruz.
// Sadece istek geldiğinde (runtime) çalışacak, böylece build sırasında Redis'e bağlanmaya çalışmayacak.
export const dynamic = "force-dynamic";

export default async function TestPage() {
  const profile = await getGithubProfile();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">GitHub & Redis Test Sayfası</h1>

      <div className="bg-slate-900 text-green-400 p-6 rounded-lg shadow-xl overflow-auto">
        <h2 className="text-lg font-semibold text-white mb-4">
          Gelen Profil Verisi: {profile.login}
        </h2>

        <pre className="text-sm">{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}
