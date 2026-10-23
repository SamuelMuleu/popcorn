# Popcorn — notas de sessão

## 2026-10-23 (parte 2) — preparação para aprovação no AdSense

### Problemas que impediam a aprovação
- **O Google via só "Carregando..."**: o `AuthProvider` escondia a página inteira até o Firebase responder, e no
  servidor ele nunca responde. Confirmado no site publicado (/about entregava só "Carregando..."). Corrigido:
  conteúdo sempre renderiza; quem depende do login usa `loading`/`user` do `useAuth()`.
- **Vídeo de fundo de 78 MB** (4K/60fps, com áudio) baixado em toda página. Agora `background-720.mp4` (356 KB)
  só em telas ≥1024px, e `background-poster.jpg` (55 KB) no resto. Os originais continuam em `public/assets`.
- **Contato falso**: o formulário simulava o envio e o e-mail `contato@popcorn.com` não existe. Agora envia de
  verdade pelo Netlify Forms (`public/__forms.html` + `src/components/ContactForm.tsx`).
- **Pouco conteúdo próprio**: as páginas eram só dados do TMDB.

### O que foi feito
- Páginas renderizadas no servidor (`src/lib/tmdb.ts`, só no servidor, cache de 1h/1 dia):
  - `/` virou página de conteúdo (apresentação, em alta, em cartaz, populares, gêneros, artigos).
  - `/movies` com introdução e mais fileiras; os carrosséis interativos recebem dados do servidor.
  - `/details/[type]/[id]`: título/descrição por página, Open Graph, schema.org (Movie/TVSeries + Breadcrumb),
    ficha técnica, elenco, recomendações (links internos), onde assistir separado em assinatura/aluguel/compra,
    crédito ao JustWatch, 404 de verdade. Parte interativa em `src/components/DetailClient.tsx`.
- **Conteúdo original**: 9 artigos em `src/content/articles.ts` (guias, listas, explicações) e textos próprios
  para 29 gêneros em `src/lib/genres.ts`. Páginas `/artigos`, `/artigos/[slug]`, `/generos`, `/generos/[tipo]/[slug]`.
  Os 24 filmes citados nos artigos foram conferidos na API (título, título original e ano).
- Navegação: `Header` com links em texto (desktop e celular); `BottomNav` agora só no celular; `Footer` voltou
  ao layout (estava removido localmente) com links institucionais e créditos TMDB/JustWatch.
- SEO: `metadata` em todas as páginas, canonical por página, `sitemap.ts` dinâmico (~365 URLs), `robots.ts`,
  `not-found.tsx`, schema WebSite com busca. `public/robots.txt` e `public/sitemap.xml` removidos (conflitavam).
- `noindex` em `/signin`, `/register`, `/authstate`, `/favorites` e `/search` (aceita `?q=`).
- Sobre: quem mantém, política editorial, fontes dos dados e como o site se sustenta. Privacidade: dados do
  formulário e Netlify. Datas de "última atualização" fixas.
- Anúncios: blocos em home, /movies, detalhes, artigos (no meio do texto) e gêneros. `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT`
  serve para todos se não houver bloco específico.
- Trailer: saiu de dentro de "onde assistir" (sumia quando não havia streaming no Brasil); usa youtube-nocookie.
- `npm run dev:corp`: sobe o localhost confiando nos certificados do Windows (rede com Fortinet).

### Pendências do Samuel antes de pedir revisão
1. **Revisar os 9 artigos** em `src/content/articles.ts`: a página Sobre diz que os textos são escritos e
   revisados pela equipe. Ajustar o tom, acrescentar opinião própria. Conteúdo com voz pessoal ajuda na aprovação.
2. Na Netlify: definir `NEXT_PUBLIC_SITE_URL` (domínio próprio), e opcionalmente `NEXT_PUBLIC_SITE_OWNER` e
   `NEXT_PUBLIC_CONTACT_EMAIL`.
3. Na Netlify: **Forms > Enable form detection**, depois redeploy, e configurar notificação por e-mail.
4. Google Search Console: verificar o domínio e enviar `/sitemap.xml`. Esperar algumas páginas indexadas
   (uma a quatro semanas) **antes** de pedir revisão no AdSense.
5. Publicar novos artigos com frequência (um ou dois por semana) — sites com conteúdo atualizado são aprovados com
   mais facilidade.

## 2026-10-23 (parte 1)

### Corrigido
- **Busca por título em português** (`src/app/search/page.tsx`): a busca não mandava `language=pt-BR`, então o TMDB
  devolvia títulos em inglês e ranqueava mal (ex.: "De Volta para o Futuro" nem aparecia no top 3; "Divertida Mente"
  vinha como "Brain Divided"). Agora usa `language=pt-BR`, `region=BR`, `include_adult=false`.
  Também: espera 400 ms após a digitação, cancela a busca anterior (antes era 1 requisição por letra e respostas
  antigas podiam sobrescrever a certa), mínimo de 2 letras, título abaixo do pôster e mensagem "Nenhum resultado".
- **Erro "Erro ao carregar series" em /movies** (`src/components/MovieCard.tsx`): `page=1` ia na URL e nos params
  ao mesmo tempo → TMDB respondia 400. Agora `page` só nos params. Erro de uma seção não esconde mais a outra.
- Favoritos/assistidos buscam detalhes em pt-BR.
- `<html lang="pt-BR">` (era `en`).
- Detalhes: tipagem em `toggleAllEpisodesInSeason` (quebrava `tsc`/build) e `setDoc(..., {merge:true})` no lugar de
  `updateDoc` (falhava quando o usuário ainda não tinha documento de episódios).

### AdSense — estrutura pronta, desligada
- `src/lib/adsense.ts` — lê `NEXT_PUBLIC_ADSENSE_CLIENT` e os IDs de bloco. Sem ID válido, nada carrega.
- `src/components/AdSlot.tsx` — bloco responsivo com rótulo "Publicidade"; re-carrega ao trocar de rota.
- `src/app/layout.tsx` — meta `google-adsense-account` + script `adsbygoogle.js` (só com ID definido).
- `src/app/ads.txt/route.ts` — gera `/ads.txt` a partir do ID (404 enquanto vazio).
- Blocos em: `/movies` (após os carrosséis), detalhes (antes dos comentários), busca (só quando há resultados).
- Política de privacidade com o texto exigido pelo Google sobre cookies de terceiros + links de opt-out.
- `.env.example` com as variáveis; `.gitignore` liberando o `.env.example`.

### Para ativar o AdSense (passos do Samuel)
1. **Domínio próprio** (ex.: popcornview.com.br). O AdSense pede o domínio raiz; `*.netlify.app` não é aceito
   porque não dá para comprovar propriedade. Apontar o domínio na Netlify (Domain management).
2. Criar conta em adsense.google.com, adicionar o site → pegar o ID `ca-pub-...`.
3. Na Netlify: Site configuration > Environment variables → `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...` → redeploy.
   Isso já publica a meta tag de verificação e o `/ads.txt`.
4. Pedir revisão no AdSense (leva de dias a semanas).
5. Após aprovado: criar 3 blocos "Anúncio de display" (Popcorn-Filmes, Popcorn-Detalhes, Popcorn-Busca) e colocar os
   IDs em `NEXT_PUBLIC_ADSENSE_SLOT_MOVIES/DETAILS/SEARCH` → redeploy.
6. Em AdSense > Privacidade e mensagens: ativar a mensagem de consentimento (GDPR/LGPD) — é o CMP do próprio Google.

### Riscos / pendências
- **Termos do TMDB**: a API é gratuita para uso não comercial; site com anúncios pode ser considerado uso comercial.
  Verificar os termos atuais em themoviedb.org/api-terms-of-use antes de ativar.
- **Conteúdo "raso" para o revisor do AdSense**: as páginas são todas client-side (`"use client"`), então o Google
  vê HTML quase vazio. Para aumentar a chance de aprovação: renderizar detalhes no servidor com `generateMetadata`
  (título/sinopse/pôster no HTML), sitemap dinâmico com filmes populares, e algum texto próprio (listas, resenhas).
- `src/netlify.toml` está dentro de `src/` — a Netlify só lê na raiz, então ele não tem efeito (e o `next export`
  nele nem existe mais no Next 15). Avaliar remover.
- Alterações **não commitadas e não publicadas**. O site no ar ainda está na versão antiga (en-US + bug do page=1).
