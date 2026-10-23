// Serve /ads.txt a partir da variável de ambiente, sem precisar editar arquivo
// estático quando o ID de editor for criado. O Google exige esse arquivo na raiz do domínio.
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/adsense";

export const dynamic = "force-static";

export function GET() {
  if (!ADSENSE_ENABLED) {
    return new Response("", { status: 404 });
  }
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, ""); // ca-pub-123 -> pub-123
  return new Response(
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
