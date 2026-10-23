# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Público brasileiro, em português, com dois trabalhos de peso igual:

- **Decidir o que ver agora e onde.** Pessoa (muitas vezes no celular, no sofá) que quer escolher um filme ou série e
  saber em qual serviço ele está disponível no Brasil. Costuma chegar pelo Google, buscando o título ou "onde assistir".
- **Acompanhar o que assiste.** Quem maratona várias séries e filmes e quer salvar favoritos, marcar o que já viu e
  controlar episódios por temporada. Volta ao site com login.

Público secundário: leitores que chegam pelo Google em guias e listas e continuam explorando títulos e gêneros.

## Product Purpose

Popcorn é um guia de filmes e séries em português do Brasil: sinopse, elenco, trailer, nota, classificação indicativa
e onde assistir no Brasil, com guias e listas editoriais e ferramentas pessoais (favoritos, assistidos, episódios,
comentários).

Sucesso hoje significa **crescer o tráfego orgânico pelo Google e ser aprovado e monetizado no Google AdSense**, sem
perder a utilidade para quem usa o site para decidir e acompanhar o que assiste.

## Positioning

Um projeto pessoal, assinado por Samuel Muleu, com a voz e a opinião de quem gosta de cinema. Une, num só lugar e em
português, a disponibilidade de streaming no Brasil, textos editoriais com opinião própria e o acompanhamento pessoal
de filmes e episódios.

## Operating Context

- Entrada principal: busca no Google (páginas de título, gênero e artigos). Uso frequente no celular.
- Dados de títulos vêm da API do TMDB; dados de onde assistir, do JustWatch (via TMDB).
- Login com conta Google (Firebase Auth); favoritos, assistidos, episódios e comentários ficam no Firestore.
- Hospedagem na Netlify; o formulário de contato usa Netlify Forms.
- A revisão do AdSense e o rastreador do Google leem o HTML entregue pelo servidor.

## Capabilities and Constraints

- Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Firebase; gerenciador **npm** (projeto já usa package-lock).
- Páginas públicas (home, /movies, detalhes, gêneros, artigos, institucionais) precisam ser renderizadas no servidor;
  login, favoritos e busca ficam fora do índice (`noindex`) e sem anúncios.
- Crédito obrigatório ao TMDB ("Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB") e
  ao JustWatch nos dados de onde assistir.
- Nunca hospedar, indicar ou linkar pirataria; só serviços oficiais.
- Anúncios sempre identificados como "Publicidade", longe de botões, e só em páginas com conteúdo.
- Rede corporativa com Fortinet: localhost roda com `npm run dev:corp`.
- **Em aberto:** domínio próprio (o AdSense não aceita `*.netlify.app`); conferir se os termos da API do TMDB permitem
  uso com anúncios; ativar a detecção de formulários na Netlify.

## Brand Commitments

- Nome **Popcorn**, com o emoji 🍿 e o logo `public/assets/popcorn.svg`.
- Projeto pessoal **assinado por Samuel Muleu**: textos com opinião e voz própria, em português do Brasil.
- Assinatura aplicada em 2026-10-23: Sobre e Contato em primeira pessoa, artigos com autor "Samuel Muleu"
  (schema Person). O texto interno dos artigos ainda usa "nós" em alguns trechos.

## Evidence on Hand

- 9 artigos editoriais em `src/content/articles.ts` (rascunhos ainda **pendentes de revisão do Samuel**) e textos de
  apresentação de 29 gêneros em `src/lib/genres.ts`. Os filmes citados foram conferidos na API do TMDB.
- Não existem depoimentos, números de usuários, menções na imprensa nem parcerias. Não inventar nenhum deles.

## Product Principles

1. **Útil antes de monetizar.** Anúncio nunca atrapalha decidir o que ver nem descobrir onde assistir.
2. **Legível pelo Google.** Todo conteúdo público chega pronto no HTML do servidor; nada essencial depende de login
   ou de JavaScript.
3. **Voz pessoal e honesta.** Opinião assinada, fatos conferidos, nenhuma informação inventada.
4. **Brasil primeiro.** Título em português, disponibilidade no Brasil, classificação indicativa brasileira.
5. **Transparente e legal.** Fontes creditadas, só serviços oficiais, anúncios identificados.

## Accessibility & Inclusion

- Padrão obrigatório: **WCAG 2.2 nível AA** (contraste, navegação por teclado, foco visível, leitores de tela,
  textos alternativos em pôsteres e fotos, rótulos em ícones e formulários).
- **Celular em primeiro lugar:** alvos de toque com pelo menos 24×24 px (ideal 44×44 px), uso confortável com uma mão,
  e páginas leves para conexões lentas e planos de dados limitados.
