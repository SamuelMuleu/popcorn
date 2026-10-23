// Gêneros com texto próprio de apresentação (conteúdo original para cada página de gênero).
// IDs são os do TMDB.
import type { MediaType } from "./tmdb";

export interface GenreInfo {
  id: number;
  slug: string;
  name: string;
  intro: string;
  tip: string;
}

export const MOVIE_GENRES: GenreInfo[] = [
  {
    id: 28, slug: "acao", name: "Ação",
    intro: "Filmes de ação apostam no movimento: perseguições, lutas coreografadas, explosões e heróis que resolvem problemas com o corpo antes da palavra. O gênero vai do policial urbano ao espetáculo de super-heróis e costuma ser o motor das grandes bilheterias.",
    tip: "Se você gosta de ação mas cansou de efeitos digitais, procure filmes com dublês e lutas filmadas em planos longos — a sensação de perigo real muda tudo.",
  },
  {
    id: 12, slug: "aventura", name: "Aventura",
    intro: "A aventura é sobre jornada: personagens que saem do lugar conhecido em busca de um tesouro, de uma pessoa ou de si mesmos. Mapas, terras distantes e desafios em sequência são marcas registradas do gênero, que costuma agradar a família inteira.",
    tip: "Aventuras funcionam muito bem em tela grande e com som alto. Guarde as melhores para uma sessão sem pressa.",
  },
  {
    id: 16, slug: "animacao", name: "Animação",
    intro: "Animação é técnica, não gênero de público: existem desenhos para crianças, mas também dramas adultos, ficção científica e documentários animados. Do traço feito à mão ao 3D e ao stop-motion, a animação permite contar histórias que seriam impossíveis com câmera e atores.",
    tip: "Experimente animações japonesas e europeias além dos grandes estúdios americanos — o estilo visual e o ritmo costumam ser bem diferentes.",
  },
  {
    id: 35, slug: "comedia", name: "Comédia",
    intro: "A comédia trabalha com o inesperado, o exagero e a identificação. Há a comédia romântica, a pastelão, a de humor ácido, a de costumes e a que mistura riso com drama. Bons filmes do gênero envelhecem bem porque falam de situações que todo mundo reconhece.",
    tip: "Comédia depende muito da tradução das piadas. Se o humor é baseado em jogos de palavras, a versão legendada costuma preservar mais o texto original.",
  },
  {
    id: 80, slug: "crime", name: "Crime",
    intro: "Histórias de crime acompanham quem comete, quem investiga ou quem é vítima de um delito. O gênero inclui filmes de máfia, assaltos planejados, investigações policiais e retratos da violência urbana — muitas vezes com dilemas morais no centro.",
    tip: "Filmes de crime baseados em casos reais rendem ótimas conversas depois da sessão: vale pesquisar o que aconteceu de verdade e o que foi dramatizado.",
  },
  {
    id: 99, slug: "documentario", name: "Documentário",
    intro: "Documentários registram e interpretam a realidade: biografias, investigações jornalísticas, natureza, esporte, música e história. Um bom documentário tem ponto de vista e estrutura narrativa, não é apenas uma coleção de fatos.",
    tip: "Assista com espírito crítico: todo documentário escolhe o que mostrar. Comparar duas obras sobre o mesmo tema ajuda a enxergar os diferentes ângulos.",
  },
  {
    id: 18, slug: "drama", name: "Drama",
    intro: "O drama é o gênero mais amplo do cinema: conflitos humanos, relações familiares, perdas, escolhas difíceis. É onde estão muitos dos filmes premiados, porque exige atuações fortes e roteiros que sustentam a atenção sem depender de ação.",
    tip: "Dramas pedem atenção. Evite assistir com o celular na mão — os detalhes de olhar e silêncio fazem parte da história.",
  },
  {
    id: 10751, slug: "familia", name: "Família",
    intro: "Filmes para a família são feitos para agradar várias idades ao mesmo tempo: humor para as crianças, camadas de leitura para os adultos e mensagens sobre amizade, coragem e convivência.",
    tip: "Confira a classificação indicativa antes de escolher. Mesmo filmes \"de família\" podem ter cenas que assustam os menores.",
  },
  {
    id: 14, slug: "fantasia", name: "Fantasia",
    intro: "A fantasia cria mundos com regras próprias: magia, criaturas míticas, reinos inventados e profecias. O gênero vai dos contos de fadas às grandes sagas épicas e costuma ter universos ricos o bastante para render várias continuações.",
    tip: "Sagas de fantasia normalmente precisam ser vistas na ordem. Antes de começar, confira quantos filmes ou temporadas a história tem.",
  },
  {
    id: 36, slug: "historia", name: "História",
    intro: "Filmes históricos reconstituem épocas e acontecimentos reais — guerras, revoluções, vidas de personagens marcantes. Figurino, cenário e linguagem ajudam a transportar o espectador, mas é comum que o roteiro tome liberdades para caber em duas horas.",
    tip: "Depois de um filme histórico, uma leitura rápida sobre o período ajuda a separar fatos de licenças poéticas.",
  },
  {
    id: 27, slug: "terror", name: "Terror",
    intro: "O terror explora o medo: do sobrenatural, do desconhecido, do monstro ou do próprio ser humano. Há o terror de sustos, o psicológico, o de possessão, o slasher e o folk horror. Muitos filmes do gênero usam o medo para falar de temas sociais.",
    tip: "Se você é novo no gênero, comece pelo terror psicológico, que assusta pela tensão e não por cenas explícitas.",
  },
  {
    id: 10402, slug: "musica", name: "Música",
    intro: "Aqui entram musicais, cinebiografias de artistas e filmes em que a música move a história. Números cantados, shows recriados e trilhas marcantes são o centro da experiência.",
    tip: "Cinebiografias musicais rendem ainda mais quando você ouve a discografia do artista antes ou depois do filme.",
  },
  {
    id: 9648, slug: "misterio", name: "Mistério",
    intro: "Mistério é o gênero do enigma: um crime sem solução, um desaparecimento, uma pergunta que só será respondida no final. O prazer está em montar o quebra-cabeça junto com o protagonista e tentar chegar à resposta antes dele.",
    tip: "Evite ler sinopses longas e comentários antes de assistir — em filmes de mistério, um detalhe revelado estraga a experiência.",
  },
  {
    id: 10749, slug: "romance", name: "Romance",
    intro: "O romance acompanha a formação, a crise ou o fim de um relacionamento. Pode ser leve como uma comédia romântica ou intenso como um drama de época. O que importa é a química entre os personagens e se o espectador torce por eles.",
    tip: "Romances de época e adaptações literárias costumam ter versões em filme e em série — compare as duas se gostar da história.",
  },
  {
    id: 878, slug: "ficcao-cientifica", name: "Ficção científica",
    intro: "A ficção científica imagina o impacto da ciência e da tecnologia: viagens espaciais, inteligência artificial, futuros distópicos, contato com outras formas de vida. Os melhores títulos usam o futuro para discutir questões do presente.",
    tip: "Ficções científicas mais conceituais costumam crescer numa segunda sessão, quando você já conhece as regras daquele mundo.",
  },
  {
    id: 53, slug: "suspense", name: "Suspense",
    intro: "O suspense (thriller) mantém o espectador em tensão constante: perseguições, conspirações, reféns, reviravoltas. Diferente do terror, o perigo costuma ser humano e plausível, e a pergunta principal é \"o que vai acontecer?\".",
    tip: "Para uma maratona de suspense, alterne títulos longos e curtos — a tensão contínua cansa mais do que parece.",
  },
  {
    id: 10752, slug: "guerra", name: "Guerra",
    intro: "Filmes de guerra retratam conflitos armados pelo olhar de soldados, civis ou líderes. Alguns celebram o heroísmo, outros denunciam o horror e o custo humano. É um gênero com cenas fortes, mas importante para entender a história do século XX em diante.",
    tip: "Confira a classificação indicativa: filmes de guerra recentes costumam mostrar violência de forma bem realista.",
  },
  {
    id: 37, slug: "faroeste", name: "Faroeste",
    intro: "O faroeste (western) nasceu nas histórias da expansão para o oeste dos Estados Unidos: pistoleiros, xerifes, duelos e paisagens desérticas. O gênero se reinventou várias vezes, do western clássico ao spaghetti western italiano e às releituras modernas.",
    tip: "O Brasil também tem seu \"faroeste\": filmes de cangaço e do sertão dialogam com o gênero de um jeito muito próprio.",
  },
];

export const TV_GENRES: GenreInfo[] = [
  {
    id: 10759, slug: "acao-e-aventura", name: "Ação e Aventura",
    intro: "Séries de ação e aventura têm a vantagem do tempo: em vez de duas horas, a jornada se estende por temporadas inteiras, com personagens que mudam a cada missão.",
    tip: "Séries do gênero costumam ter episódios com missões fechadas e um arco maior. Assistir em ordem evita perder viradas importantes.",
  },
  {
    id: 16, slug: "animacao", name: "Animação",
    intro: "Séries animadas vão de desenhos infantis a sátiras adultas e animes com dezenas de temporadas. Formato curto e liberdade visual fazem delas ótimas companheiras para o dia a dia.",
    tip: "Animes longos costumam ter episódios \"filler\" (fora da história principal). Guias de episódios ajudam a decidir o que pular.",
  },
  {
    id: 35, slug: "comedia", name: "Comédia",
    intro: "Sitcoms e comédias seriadas vivem da convivência entre personagens. Episódios curtos, piadas recorrentes e situações do cotidiano fazem do gênero o mais \"maratonável\" da TV.",
    tip: "Comédias costumam engrenar a partir da segunda temporada, quando o elenco já encontrou o tom. Dê uma chance antes de desistir.",
  },
  {
    id: 80, slug: "crime", name: "Crime",
    intro: "Séries de crime acompanham investigações, organizações criminosas e julgamentos com mais profundidade do que um filme permite: cada temporada pode ser um caso completo.",
    tip: "Séries antológicas de crime contam uma história nova por temporada — dá para começar por qualquer uma.",
  },
  {
    id: 99, slug: "documentario", name: "Documentário",
    intro: "Séries documentais aprofundam temas que não caberiam em um filme: crimes reais, bastidores do esporte, natureza e história contados em capítulos.",
    tip: "Docuséries de true crime envolvem pessoas reais. Vale procurar o que aconteceu depois da gravação.",
  },
  {
    id: 18, slug: "drama", name: "Drama",
    intro: "Dramas seriados são onde a TV mais se aproxima do romance literário: personagens complexos, tramas que se desenvolvem por anos e temas pesados tratados com calma.",
    tip: "Dramas longos rendem mais com ritmo: dois ou três episódios por vez ajudam a absorver a história sem cansar.",
  },
  {
    id: 10751, slug: "familia", name: "Família",
    intro: "Séries para assistir em família combinam humor, aventura e valores, com episódios que podem ser vistos por pais e filhos juntos.",
    tip: "Confira a classificação indicativa de cada temporada — ela pode mudar ao longo da série.",
  },
  {
    id: 9648, slug: "misterio", name: "Mistério",
    intro: "Séries de mistério distribuem pistas ao longo dos episódios e terminam cada um com uma pergunta. É o gênero dos ganchos que fazem você apertar \"próximo episódio\".",
    tip: "Anote teorias enquanto assiste. Rever as pistas no final é metade da diversão.",
  },
  {
    id: 10765, slug: "ficcao-cientifica-e-fantasia", name: "Ficção científica e Fantasia",
    intro: "Mundos inventados precisam de espaço para respirar, e as séries oferecem isso: reinos, naves, futuros possíveis e realidades paralelas construídos episódio a episódio.",
    tip: "Universos grandes costumam ter derivados. Confira a ordem recomendada antes de começar.",
  },
  {
    id: 10764, slug: "reality", name: "Reality",
    intro: "Reality shows acompanham pessoas reais em competições, convivência ou transformações. Culinária, namoro, sobrevivência e talentos estão entre os formatos mais populares.",
    tip: "Realities de competição são ótimos para assistir em grupo e apostar em quem vence.",
  },
  {
    id: 10768, slug: "guerra-e-politica", name: "Guerra e Política",
    intro: "Bastidores do poder, eleições, conflitos armados e espionagem: séries do gênero mostram como decisões tomadas em gabinetes afetam milhões de pessoas.",
    tip: "Séries políticas de ficção ficam mais interessantes quando comparadas com o sistema político do seu próprio país.",
  },
];

export const genresFor = (type: MediaType) => (type === "movie" ? MOVIE_GENRES : TV_GENRES);

export const findGenre = (type: MediaType, slug: string) => genresFor(type).find((g) => g.slug === slug);

export const genreHref = (type: MediaType, slug: string) =>
  `/generos/${type === "movie" ? "filmes" : "series"}/${slug}`;

/** Converte um id de gênero do TMDB em link interno (se tivermos página para ele). */
export const genreLinkById = (type: MediaType, id: number) => {
  const g = genresFor(type).find((x) => x.id === id);
  return g ? genreHref(type, g.slug) : null;
};
