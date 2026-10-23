// Segunda leva de artigos (outubro de 2026). Mesmo formato de articles.ts.
import type { Article } from "./articles";

const AUTHOR = "Samuel Muleu";

export const MORE_ARTICLES: Article[] = [
  {
    slug: "ordem-para-assistir-filmes-marvel",
    title: "Em que ordem assistir aos filmes da Marvel: guia completo do MCU",
    description:
      "Ordem de lançamento, ordem cronológica e uma versão resumida para quem tem pouco tempo: o caminho mais fácil para entrar (ou voltar) no Universo Cinematográfico da Marvel.",
    category: "Guias",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
O Universo Cinematográfico da Marvel (o MCU) começou em 2008 e hoje tem mais de trinta filmes, além de séries. Para quem está chegando agora, ou quer rever tudo antes do próximo lançamento, a primeira dúvida é sempre a mesma: **por onde começar?**

Existem duas formas principais de maratonar: pela **ordem de lançamento** e pela **ordem cronológica** da história. Eu recomendo a primeira, e explico o motivo no fim do texto.

## Ordem de lançamento (a que eu recomendo)

Os filmes foram feitos para serem vistos nessa ordem: as cenas pós-créditos, as surpresas e as revelações pressupõem que você viu os anteriores. O MCU é dividido em "fases", e cada fase termina com um grande encontro de heróis.

### Fase 1: a formação dos Vingadores

1. [Homem de Ferro](/details/movie/1726) (2008)
2. [O Incrível Hulk](/details/movie/1724) (2008)
3. [Homem de Ferro 2](/details/movie/10138) (2010)
4. [Thor](/details/movie/10195) (2011)
5. [Capitão América: O Primeiro Vingador](/details/movie/1771) (2011)
6. [Os Vingadores](/details/movie/24428) (2012)

### Fase 2: as consequências

1. [Homem de Ferro 3](/details/movie/68721) (2013)
2. [Thor: O Mundo Sombrio](/details/movie/76338) (2013)
3. [Capitão América 2: O Soldado Invernal](/details/movie/100402) (2014)
4. [Guardiões da Galáxia](/details/movie/118340) (2014)
5. [Vingadores: Era de Ultron](/details/movie/99861) (2015)
6. [Homem-Formiga](/details/movie/102899) (2015)

### Fase 3: a Saga do Infinito chega ao fim

1. [Capitão América: Guerra Civil](/details/movie/271110) (2016)
2. [Doutor Estranho](/details/movie/284052) (2016)
3. [Guardiões da Galáxia Vol. 2](/details/movie/283995) (2017)
4. [Homem-Aranha: De Volta ao Lar](/details/movie/315635) (2017)
5. [Thor: Ragnarok](/details/movie/284053) (2017)
6. [Pantera Negra](/details/movie/284054) (2018)
7. [Vingadores: Guerra Infinita](/details/movie/299536) (2018)
8. [Homem-Formiga e a Vespa](/details/movie/363088) (2018)
9. [Capitã Marvel](/details/movie/299537) (2019)
10. [Vingadores: Ultimato](/details/movie/299534) (2019)
11. [Homem-Aranha: Longe de Casa](/details/movie/429617) (2019)

### Fase 4 em diante: o Multiverso

Depois de Ultimato, o MCU abriu várias frentes ao mesmo tempo, com filmes e séries no Disney+. Os filmes principais, em ordem:

1. [Viúva Negra](/details/movie/497698) (2021)
2. [Shang-Chi e a Lenda dos Dez Anéis](/details/movie/566525) (2021)
3. [Eternos](/details/movie/524434) (2021)
4. [Homem-Aranha: Sem Volta para Casa](/details/movie/634649) (2021)
5. [Doutor Estranho no Multiverso da Loucura](/details/movie/453395) (2022)
6. [Thor: Amor e Trovão](/details/movie/616037) (2022)
7. [Pantera Negra: Wakanda para Sempre](/details/movie/505642) (2022)
8. [Homem-Formiga e a Vespa: Quantumania](/details/movie/640146) (2023)
9. [Guardiões da Galáxia Vol. 3](/details/movie/447365) (2023)
10. [As Marvels](/details/movie/609681) (2023)
11. [Deadpool & Wolverine](/details/movie/533535) (2024)
12. [Capitão América: Admirável Mundo Novo](/details/movie/822119) (2025)
13. [Thunderbolts*](/details/movie/986056) (2025)
14. [Quarteto Fantástico: Primeiros Passos](/details/movie/617126) (2025)

Novos filmes continuam saindo. Para ver o que está em cartaz agora, confira a página de [filmes e séries populares](/movies).

## Ordem cronológica

Se você já viu tudo e quer uma experiência diferente, dá para assistir na ordem em que os eventos acontecem dentro da história. As principais mudanças em relação à ordem de lançamento:

- **Capitão América: O Primeiro Vingador** vem primeiro, porque se passa durante a Segunda Guerra Mundial.
- **Capitã Marvel** vem logo depois, já que a história acontece nos anos 1990.
- **Viúva Negra** se passa entre Guerra Civil e Guerra Infinita, mesmo tendo sido lançado depois de Ultimato.

O problema é que, nessa ordem, algumas revelações perdem o impacto. Por isso eu só indico a cronológica para uma segunda maratona.

## A versão resumida: 10 filmes para entender o essencial

Não tem tempo para mais de trinta filmes? Esta seleção cobre o arco principal até Ultimato sem deixar buracos importantes:

1. Homem de Ferro
2. Os Vingadores
3. Capitão América 2: O Soldado Invernal
4. Guardiões da Galáxia
5. Capitão América: Guerra Civil
6. Thor: Ragnarok
7. Pantera Negra
8. Vingadores: Guerra Infinita
9. Capitã Marvel
10. Vingadores: Ultimato

## Preciso ver as séries?

Para entender os filmes principais até Ultimato, não. Depois da Fase 4, algumas séries do Disney+ passaram a ter ligação direta com os filmes, mas sempre dá para acompanhar a história principal pelo cinema e ler um resumo do que ficou de fora.

## Minha dica final

Não maratone tudo de uma vez. Uma fase por mês é um ritmo bom: dá tempo de curtir cada filme sem a sensação de estar cumprindo tabela. E fique na sala até o fim dos créditos — as cenas extras fazem parte da experiência.
`,
  },
  {
    slug: "homem-aranha-no-cinema-todas-as-versoes",
    title: "Homem-Aranha no cinema: todas as versões e por onde começar",
    description:
      "Tobey Maguire, Andrew Garfield, Tom Holland e o Aranhaverso: conheça cada fase do herói no cinema e descubra qual combina mais com você.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Poucos heróis tiveram tantas versões no cinema em tão pouco tempo quanto o Homem-Aranha. Em pouco mais de vinte anos, três atores diferentes vestiram o uniforme em live-action, e o personagem ganhou ainda uma das animações mais elogiadas do século. Se você ficou perdido com tantos recomeços, este guia organiza tudo.

## A trilogia de Sam Raimi (Tobey Maguire)

Foi aqui que o Homem-Aranha virou fenômeno de cinema. Sam Raimi dirigiu três filmes com Tobey Maguire como Peter Parker, focando no peso da responsabilidade e na vida apertada de um jovem que tenta equilibrar tudo.

- [Homem-Aranha](/details/movie/557) (2002)
- [Homem-Aranha 2](/details/movie/558) (2004)
- [Homem-Aranha 3](/details/movie/559) (2007)

O segundo filme é frequentemente lembrado como um dos melhores filmes de super-herói já feitos, com o Doutor Octopus de Alfred Molina como vilão.

## O Espetacular Homem-Aranha (Andrew Garfield)

Poucos anos depois, a Sony recomeçou a história com Andrew Garfield. Os dois filmes apostaram mais no romance entre Peter e Gwen Stacy, vivida por Emma Stone, e em um herói mais falante e irônico.

- [O Espetacular Homem-Aranha](/details/movie/1930) (2012)
- [O Espetacular Homem-Aranha 2: A Ameaça de Electro](/details/movie/102382) (2014)

A série foi interrompida depois do segundo filme, mas a versão de Garfield ganhou uma redenção carinhosa anos depois.

## O Homem-Aranha do MCU (Tom Holland)

Em 2016, o herói finalmente entrou no Universo Cinematográfico da Marvel, aparecendo pela primeira vez em Capitão América: Guerra Civil. Tom Holland interpreta um Peter Parker adolescente, mentoreado por Tony Stark. Os filmes solo:

- [Homem-Aranha: De Volta ao Lar](/details/movie/315635) (2017)
- [Homem-Aranha: Longe de Casa](/details/movie/429617) (2019)
- [Homem-Aranha: Sem Volta para Casa](/details/movie/634649) (2021)

**Sem Volta para Casa** é especial para quem acompanhou todas as fases: o multiverso reúne personagens das versões anteriores. Se você viu as outras trilogias, a experiência fica muito mais emocionante. Para encaixar esses filmes no resto da Marvel, veja o guia de [ordem do MCU](/artigos/ordem-para-assistir-filmes-marvel).

## O Aranhaverso (animação)

Para muita gente, a melhor versão do personagem no cinema não é em live-action. A animação acompanha Miles Morales, um adolescente do Brooklyn que vira o Homem-Aranha e descobre que existem vários outros "aranhas" em universos paralelos.

- [Homem-Aranha no Aranhaverso](/details/movie/324857) (2018)
- [Homem-Aranha: Através do Aranhaverso](/details/movie/569094) (2023)

O primeiro venceu o Oscar de melhor animação, e o visual — que mistura estilos de quadrinhos, animação tradicional e computação gráfica — influenciou várias produções que vieram depois.

## Por onde começar?

- **Nunca viu nenhum?** Comece pelo **Aranhaverso**. É autocontido, emocionante e não exige conhecer nada antes.
- **Quer o clássico?** A trilogia de Raimi, principalmente os dois primeiros.
- **Acompanha a Marvel?** Vá de Tom Holland, mas veja antes as outras versões se quiser aproveitar ao máximo Sem Volta para Casa.

Minha ordem favorita para uma maratona completa é a de lançamento: Raimi, Garfield, Holland e, para fechar com chave de ouro, o Aranhaverso.
`,
  },
  {
    slug: "filmes-para-ver-em-familia",
    title: "12 filmes para ver em família (que os adultos também vão gostar)",
    description:
      "Animações e aventuras que funcionam para todas as idades: uma seleção para a sessão de domingo sem ninguém olhando o celular.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Escolher um filme para a família inteira é um desafio: precisa ser leve para as crianças, mas não pode entediar os adultos. Os filmes desta lista passam nesse teste. Todos funcionam em mais de uma camada — as crianças se divertem com a aventura e os adultos pegam as piadas e as emoções que ficam nas entrelinhas.

Antes de dar play, confira a classificação indicativa de cada um. Explico como ela funciona no artigo sobre [classificação indicativa no Brasil](/artigos/classificacao-indicativa-no-brasil).

## Para os pequenos (e para quem foi criança)

### [Toy Story](/details/movie/862) (1995)

O primeiro longa-metragem totalmente feito em computação gráfica continua encantador. A rivalidade entre Woody e Buzz vira amizade numa história sobre ciúme, mudança e crescer.

### [Meu Amigo Totoro](/details/movie/8392) (1988)

Do Studio Ghibli, acompanha duas irmãs que se mudam para o interior e conhecem criaturas da floresta. É calmo, sem vilão, e perfeito para os menores.

### [Procurando Nemo](/details/movie/12) (2003)

Um pai superprotetor atravessa o oceano para encontrar o filho. A Dory rouba a cena, e o filme fala com delicadeza sobre deixar os filhos crescerem.

## Para rir junto

### [Shrek](/details/movie/808) (2001)

Uma paródia dos contos de fadas que as crianças entendem como aventura e os adultos entendem como sátira. As referências a outros filmes rendem uma segunda sessão divertida.

### [As Aventuras de Paddington 2](/details/movie/346648) (2017)

O urso mais educado do cinema vai parar na prisão por um crime que não cometeu. É gentil, engraçado e muito bem filmado — um dos filmes infantis mais bem avaliados de todos os tempos.

### [Como Treinar o Seu Dragão](/details/movie/10191) (2010)

Um garoto viking faz amizade com um dragão que deveria combater. As cenas de voo são emocionantes e a relação entre os dois é o coração do filme.

## Para se emocionar

### [Up: Altas Aventuras](/details/movie/14160) (2009)

Um idoso amarra milhares de balões na casa para realizar o sonho da esposa. Os primeiros minutos fazem muito adulto chorar — esteja avisado.

### [Divertida Mente](/details/movie/150540) (2015)

As emoções de uma menina de 11 anos ganham vida dentro da cabeça dela. É uma ótima porta para conversar com as crianças sobre tristeza e saudade.

### [Viva: A Vida é uma Festa](/details/movie/354912) (2017)

Um menino apaixonado por música vai parar na Terra dos Mortos durante o Dia de los Muertos. Colorido, musical e muito emocionante no final.

### [WALL·E](/details/movie/10681) (2008)

Um robô solitário limpa uma Terra abandonada até conhecer outra robô. A primeira parte quase não tem diálogos e prende até os menores.

## Clássicos que atravessam gerações

### [O Rei Leão](/details/movie/8587) (1994)

A animação original da Disney, com trilha marcante e uma história de perda e responsabilidade inspirada em Hamlet.

### [Encanto](/details/movie/568124) (2021)

Uma família colombiana em que cada pessoa tem um dom mágico — menos a protagonista. Musical cheio de músicas que grudam e uma mensagem bonita sobre pressão familiar.

## Dicas para a sessão em família

- **Deixe as crianças escolherem** entre duas ou três opções pré-selecionadas por você.
- **Prefira dublado** para os menores — e veja os prós e contras no artigo [legendado ou dublado](/artigos/legendado-ou-dublado).
- **Converse depois.** Perguntar "qual parte você mais gostou?" rende conversas melhores do que parece.
`,
  },
  {
    slug: "series-curtas-para-maratonar",
    title: "Séries curtas para maratonar em um fim de semana",
    description:
      "Minisséries completas, com começo, meio e fim, que dá para terminar em dois dias. Sem temporadas intermináveis nem cancelamentos no meio da história.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Nem todo mundo tem disposição para começar uma série de oito temporadas. As minisséries resolvem isso: são histórias completas, contadas em poucos episódios, que dá para terminar em um fim de semana. Selecionei algumas das melhores, de gêneros diferentes.

Os serviços de streaming mudam o catálogo com frequência, então clique no título para ver onde cada uma está disponível no Brasil agora.

## Drama baseado em fatos reais

### [Chernobyl](/details/tv/87108) (2019)

Cinco episódios sobre o acidente nuclear de 1986 na Ucrânia soviética. Tensa do começo ao fim, mostra não só a explosão, mas as mentiras e o custo humano que vieram depois.

### [Olhos que Condenam](/details/tv/81355) (2019)

Quatro episódios sobre os cinco adolescentes acusados injustamente de um crime em Nova York em 1989. Dirigida por Ava DuVernay, é dura e necessária.

### [Inacreditável](/details/tv/91275) (2019)

Duas detetives investigam uma série de ataques enquanto, em paralelo, acompanhamos uma jovem que não teve sua denúncia levada a sério. Baseada em uma reportagem premiada.

## Para quem gosta de investigação

### [Mare of Easttown](/details/tv/115004) (2021)

Kate Winslet vive uma detetive de uma cidadezinha da Pensilvânia investigando um assassinato enquanto lida com os próprios lutos. O sotaque, as relações familiares e o mistério prendem do primeiro ao último episódio.

### [Adolescência](/details/tv/249042) (2025)

Quatro episódios, cada um filmado em um único plano contínuo, sobre um garoto de 13 anos acusado de um crime. A técnica impressiona, mas o que fica é a discussão sobre o que os adolescentes consomem na internet.

## Para quem quer algo diferente

### [O Gambito da Rainha](/details/tv/87739) (2020)

Uma órfã prodígio do xadrez enfrenta o vício e o machismo dos anos 1950 e 1960. Sete episódios que fizeram muita gente comprar um tabuleiro.

### [Fleabag](/details/tv/67070) (2016)

Duas temporadas curtas — doze episódios no total — de uma comédia britânica em que a protagonista conversa diretamente com a câmera. Engraçada, ácida e surpreendentemente comovente.

### [Treta](/details/tv/154385) (2023)

Uma briga de trânsito entre dois desconhecidos vira uma guerra pessoal que sai completamente do controle. Comédia de humor escuro com atuações excelentes.

## Como maratonar sem cansar

- **Comece na sexta à noite** com os dois primeiros episódios. Se gostar, o resto do fim de semana se organiza sozinho.
- **Faça pausas entre episódios pesados**, principalmente nas séries baseadas em fatos reais.
- **Marque o que já viu.** Na página de cada série do Popcorn você pode marcar episódio por episódio — dicas no artigo sobre [como organizar suas séries](/artigos/como-acompanhar-series).
`,
  },
  {
    slug: "animes-para-comecar",
    title: "Animes para começar: 10 indicações para quem nunca assistiu",
    description:
      "Filmes e séries japonesas de animação ideais para iniciantes, do Studio Ghibli aos sucessos recentes, com dicas de por onde entrar no mundo dos animes.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
"Anime" é simplesmente a palavra japonesa para animação, mas virou sinônimo de um estilo com personalidade própria: histórias longas, personagens complexos e gêneros que vão do romance à ficção científica. Se você sempre teve curiosidade e não sabia por onde começar, estas indicações são uma boa porta de entrada.

## Comece pelos filmes

Filmes são a forma mais fácil de experimentar: história completa, sem compromisso com dezenas de episódios.

### [A Viagem de Chihiro](/details/movie/129) (2001)

A obra mais famosa de Hayao Miyazaki e do Studio Ghibli. Uma menina presa em um mundo de espíritos precisa trabalhar numa casa de banhos para salvar os pais. Venceu o Oscar de melhor animação. Falo mais dele na lista de [clássicos do cinema](/artigos/classicos-do-cinema).

### [Meu Amigo Totoro](/details/movie/8392) (1988)

Outro Ghibli, mais calmo e infantil. Ótimo para ver com crianças.

### [Your Name.](/details/movie/372058) (2016)

Makoto Shinkai conta a história de dois adolescentes que, misteriosamente, trocam de corpo durante o sono. Romance, mistério e um visual deslumbrante. Foi um fenômeno de bilheteria no Japão.

### [Princesa Mononoke](/details/movie/128) (1997)

Miyazaki em modo épico: uma guerra entre humanos e os deuses da floresta, sem mocinhos e vilões simples. Para quem quer algo mais intenso.

## Séries para iniciantes

### [Fullmetal Alchemist: Brotherhood](/details/tv/31911) (2009)

Dois irmãos usam a alquimia para tentar recuperar o que perderam. Ação, drama e uma trama fechada, com começo, meio e fim. Aparece em quase toda lista de melhores animes.

### [Death Note](/details/tv/13916) (2006)

Um estudante encontra um caderno que mata qualquer pessoa cujo nome seja escrito nele. Um jogo de gato e rato psicológico entre ele e o detetive que tenta pegá-lo. Excelente para quem gosta de suspense.

### [Cowboy Bebop](/details/tv/30991) (1998)

Caçadores de recompensa no espaço, com trilha sonora de jazz. Episódios quase independentes, ideais para ver aos poucos.

### [Spy x Family](/details/tv/120089) (2022)

Um espião, uma assassina e uma menina telepata formam uma família de mentira — e cada um esconde o segredo dos outros. Leve e engraçado.

### [Frieren e a Jornada para o Além](/details/tv/209867) (2023)

Uma elfa que vive por séculos reflete sobre o tempo e as pessoas depois que sua grande aventura termina. Calmo, melancólico e muito bonito.

### [Demon Slayer: Kimetsu no Yaiba](/details/tv/85937) (2019)

Um garoto vira caçador de demônios para salvar a irmã. Lutas com animação impressionante e uma história fácil de acompanhar.

## Dicas para quem está começando

- **Legendado ou dublado?** As duas opções são boas; muitos animes têm dublagem brasileira de qualidade. Veja os prós e contras em [legendado ou dublado](/artigos/legendado-ou-dublado).
- **Não se assuste com o número de episódios.** Comece pelos títulos curtos ou pelos filmes.
- **Episódios "filler"**, que ficam fora da história principal, são comuns em animes longos e podem ser pulados — guias de episódios ajudam.
- **Explore por gênero.** Existe anime de romance, terror, esporte, culinária, ficção científica. Se um não agradar, tente outro estilo antes de desistir.
`,
  },
  {
    slug: "filmes-de-terror-para-iniciantes",
    title: "Filmes de terror para iniciantes: do susto leve ao medo de verdade",
    description:
      "Uma escada de filmes de terror para quem quer começar no gênero sem traumas: comece pelos mais leves e vá subindo de nível.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Muita gente diz que "não gosta de terror" depois de ter começado pelo filme errado. O gênero é enorme: vai do suspense elegante, quase sem sangue, até filmes que deixam marcas. A ideia desta lista é funcionar como uma escada — comece pelo nível 1 e suba quando se sentir à vontade.

Se ainda tiver dúvida sobre as diferenças entre terror, suspense e thriller, leia antes o artigo [terror, suspense e thriller](/artigos/terror-suspense-e-thriller).

## Nível 1: tensão sem trauma

### [O Sexto Sentido](/details/movie/745) (1999)

Um menino que "vê gente morta" e um psicólogo que tenta ajudá-lo. Mais drama e mistério do que sustos, com um dos finais mais famosos do cinema. Evite spoilers a todo custo.

### [Os Outros](/details/movie/1933) (2001)

Nicole Kidman vive uma mãe que protege os filhos da luz do sol numa mansão isolada. Terror atmosférico, de casa assombrada, sem cenas explícitas.

### [Psicose](/details/movie/539) (1960)

O clássico de Alfred Hitchcock que mudou o gênero. A cena do chuveiro é famosa, mas o filme inteiro é uma aula de suspense.

## Nível 2: alguns sustos de verdade

### [Um Lugar Silencioso](/details/movie/447332) (2018)

Uma família sobrevive em silêncio absoluto porque criaturas caçam pelo som. Curto, criativo e muito tenso — você vai prender a respiração junto com os personagens.

### [Corra!](/details/movie/419430) (2017)

Um jovem negro visita a família da namorada branca e percebe que algo está muito errado. Jordan Peele mistura terror e crítica social e venceu o Oscar de roteiro original.

### [Invocação do Mal](/details/movie/138843) (2013)

Um casal de investigadores paranormais ajuda uma família aterrorizada em uma casa de fazenda. É o terror de sustos clássico, muito bem executado.

## Nível 3: para quem já pegou gosto

### [O Iluminado](/details/movie/694) (1980)

Stanley Kubrick adapta Stephen King: um escritor enlouquece num hotel isolado durante o inverno. Mais perturbador do que assustador, com imagens que ficam na cabeça.

### [Hereditário](/details/movie/493922) (2018)

Uma família desmorona depois da morte da avó. É um dos filmes de terror mais intensos da última década — deixe para quando já estiver confortável com o gênero.

## Dicas para assistir sem sofrer

- **Assista acompanhado** na primeira vez. Comentar o filme alivia a tensão.
- **De dia também vale.** Não existe regra de que terror precisa ser à noite com a luz apagada.
- **Confira a classificação indicativa** e os avisos de conteúdo antes.
- **Pesquise depois, não antes.** Ler sobre o filme antes estraga as surpresas; depois, as análises deixam a experiência mais rica.

Quando quiser explorar mais títulos, a página de [filmes de terror](/generos/filmes/terror) mostra os mais populares do momento.
`,
  },
  {
    slug: "como-funciona-o-oscar",
    title: "Como funciona o Oscar: quem vota, como os filmes são escolhidos e o que o Brasil já conquistou",
    description:
      "Entenda o maior prêmio do cinema: quem são os votantes, como funciona a indicação, a votação de melhor filme e a categoria de filme internacional.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Todo ano, entre o fim de janeiro e o começo de março, o assunto volta: quem vai ganhar o Oscar? Mas pouca gente sabe exatamente como o prêmio funciona. Vou explicar o básico de um jeito simples.

## Quem organiza

O Oscar é entregue pela **Academia de Artes e Ciências Cinematográficas**, dos Estados Unidos. A primeira cerimônia aconteceu em 1929. O nome oficial do prêmio é "Academy Award"; "Oscar" é o apelido da estatueta, que acabou virando o nome mais conhecido.

## Quem vota

Os votantes são os **membros da Academia**: milhares de profissionais do cinema — atores, diretores, roteiristas, montadores, técnicos de som, figurinistas e assim por diante. A entrada é por convite, e nos últimos anos a Academia passou a incluir mais membros de outros países, inclusive do Brasil.

## Como funciona a indicação

A votação acontece em duas etapas:

1. **Indicação:** cada membro vota apenas na categoria da sua área. Atores indicam atores, diretores indicam diretores, e assim por diante. A categoria de melhor filme é a exceção: todos os membros podem indicar.
2. **Votação final:** depois que os indicados são anunciados, todos os membros podem votar em todas as categorias.

Para concorrer, de forma geral, o filme precisa cumprir regras de exibição em cinemas nos Estados Unidos dentro do período de elegibilidade. As regras detalhadas mudam de tempos em tempos e ficam publicadas no site da Academia.

## A votação de melhor filme é diferente

Nas outras categorias, ganha quem tem mais votos. Em **melhor filme**, a Academia usa uma **votação preferencial**: cada membro ordena os indicados do favorito ao menos preferido. Os filmes com menos primeiros lugares vão sendo eliminados e seus votos são redistribuídos, até que um tenha a maioria.

Na prática, isso favorece filmes que agradam a muita gente, e não apenas os que têm fãs apaixonados.

## Melhor filme internacional

Essa categoria funciona de outro jeito: cada país envia **um único filme** como representante. No Brasil, a escolha é feita pela Academia Brasileira de Cinema. Depois, os membros da Academia selecionam uma pré-lista e, em seguida, os cinco indicados.

## O Brasil no Oscar

O cinema brasileiro coleciona indicações históricas, como:

- **[O Pagador de Promessas](/details/movie/59990)**, indicado a melhor filme estrangeiro.
- **[Central do Brasil](/details/movie/666)**, com indicação de Fernanda Montenegro a melhor atriz.
- **[Cidade de Deus](/details/movie/598)**, com quatro indicações, incluindo direção.

A grande conquista veio com **[Ainda Estou Aqui](/details/movie/1000837)**, de Walter Salles, que venceu o Oscar de **melhor filme internacional** — o primeiro do país na categoria. Conto mais sobre esses filmes na lista de [filmes brasileiros essenciais](/artigos/filmes-brasileiros-essenciais).

## Vale a pena acompanhar?

O Oscar não é um selo de qualidade absoluto: muitos filmes que hoje são considerados clássicos nunca ganharam, e alguns vencedores foram esquecidos. Mas a temporada de premiações é uma ótima desculpa para conhecer filmes que talvez você não visse. Minha sugestão: tente assistir aos indicados a melhor filme antes da cerimônia e faça seu próprio ranking.
`,
  },
  {
    slug: "remake-reboot-sequencia-prequela-spin-off",
    title: "Remake, reboot, sequência, prequela e spin-off: qual a diferença?",
    description:
      "O cinema adora revisitar histórias. Entenda de vez cada um desses termos, com exemplos de filmes conhecidos.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Basta um estúdio anunciar um novo filme de uma franquia para a discussão começar: "é um remake ou um reboot?", "é sequência ou prequela?". Os termos parecem parecidos, mas cada um descreve uma coisa diferente. Vamos a eles.

## Sequência

É a **continuação** da história, que acontece depois do filme anterior, com os mesmos personagens ou o mesmo universo.

Exemplo: [O Poderoso Chefão: Parte II](/details/movie/240) continua a saga da família Corleone — e, curiosamente, também volta ao passado para mostrar a juventude de Vito Corleone.

## Prequela

É uma história que se passa **antes** do filme original. Normalmente mostra a origem de um personagem ou de um conflito que já conhecemos.

Exemplo: [Rogue One: Uma História Star Wars](/details/movie/330459) conta como os rebeldes roubaram os planos da Estrela da Morte, terminando exatamente onde começa o primeiro Star Wars.

## Remake

É uma **nova versão da mesma história**, com outro elenco e outra equipe. A trama é basicamente a mesma, com mudanças de época, de estilo ou de tecnologia.

Exemplos:

- [Nasce uma Estrela](/details/movie/332562), com Lady Gaga e Bradley Cooper, é uma nova versão de uma história já filmada várias vezes.
- [O Rei Leão](/details/movie/420818) refaz a animação de 1994 com computação gráfica realista.

## Reboot

O reboot **recomeça uma franquia do zero**, ignorando a continuidade dos filmes anteriores. A diferença para o remake é que o reboot não refaz um filme específico: ele reinicia toda a série com uma nova visão.

Exemplo: [Batman Begins](/details/movie/272) reiniciou o Batman no cinema com uma abordagem mais realista, sem ligação com os filmes dos anos 1990. A versão do Homem-Aranha com Andrew Garfield também foi um reboot — explico no artigo sobre [todas as versões do Homem-Aranha](/artigos/homem-aranha-no-cinema-todas-as-versoes).

## Spin-off

É uma obra derivada que **coloca um personagem secundário no centro** de uma nova história.

Exemplo: [Minions](/details/movie/211672) nasceu dos ajudantes amarelos de Meu Malvado Favorito.

## E a "sequência legado"?

É um termo mais recente para continuações lançadas muitos anos depois, que trazem de volta o elenco original e passam o bastão para uma nova geração.

Exemplo: [Top Gun: Maverick](/details/movie/361743), lançado mais de três décadas depois do primeiro filme, com Tom Cruise de volta ao papel.

## Resumo rápido

- **Sequência:** acontece depois.
- **Prequela:** acontece antes.
- **Remake:** mesma história, nova versão.
- **Reboot:** a franquia recomeça do zero.
- **Spin-off:** um personagem secundário ganha a própria história.

Agora, quando ler que um filme é "um reboot com cara de remake que funciona como sequência", pelo menos você vai saber de que parte da confusão estão falando.
`,
  },
  {
    slug: "series-brasileiras-que-valem-a-pena",
    title: "Séries brasileiras que valem a pena assistir",
    description:
      "Ficção científica, crime, folclore e drama: uma seleção de séries nacionais que mostram como a produção brasileira cresceu na era do streaming.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
A chegada dos serviços de streaming mudou a produção de séries no Brasil. Além das novelas e minisséries da TV aberta, surgiram produções de gêneros que antes eram raros por aqui, como ficção científica, terror e thriller policial. Separei algumas que mostram bem essa variedade.

Clique no título para ver onde cada uma está disponível no Brasil agora.

## Ficção científica e fantasia

### [3%](/details/tv/68467) (2016)

Num futuro dividido, jovens de 20 anos passam por um processo seletivo cruel para ter acesso a uma vida privilegiada. Foi a primeira série original brasileira da Netflix e abriu caminho para muitas outras.

### [Cidade Invisível](/details/tv/110529) (2021)

Um policial ambiental investiga uma morte misteriosa e descobre que criaturas do folclore brasileiro, como o Curupira e a Cuca, vivem escondidas no Rio de Janeiro. Uma ótima forma de redescobrir lendas que conhecemos da infância.

## Crime e periferia

### [Cidade dos Homens](/details/tv/3317) (2002)

Derivada do universo de Cidade de Deus, acompanha a amizade de Acerola e Laranjinha crescendo em um morro do Rio. Leve e dura ao mesmo tempo, retrata o cotidiano com humor e sensibilidade.

### [Sintonia](/details/tv/78074) (2019)

Três amigos de uma comunidade de São Paulo seguem caminhos diferentes: o funk, o tráfico e a igreja. Criada por KondZilla, tem o ritmo e a linguagem da periferia paulista.

### [Irmandade](/details/tv/94696) (2019)

Uma advogada é forçada a se infiltrar na facção criminosa liderada pelo irmão, preso há anos. Thriller tenso, com Seu Jorge e Naruna Costa.

## Suspense e investigação

### [Bom Dia, Verônica](/details/tv/110115) (2020)

Uma escrivã da polícia decide investigar por conta própria casos de violência contra mulheres. Pesada e bem construída, baseada em livro de Raphael Montes e Ilana Casoy.

### [Cangaço Novo](/details/tv/137883) (2023)

Um bancário de São Paulo descobre ser filho de um cangaceiro lendário e volta ao sertão, onde se envolve com assaltos a banco. Uma releitura moderna do cangaço, com cara de faroeste.

## Drama e conflitos sociais

### [Os Outros](/details/tv/196421) (2023)

Uma briga entre vizinhos de condomínio começa pequena e cresce até virar uma tragédia. Retrato incômodo da intolerância e da violência do dia a dia.

### [Senna](/details/tv/211039) (2024)

Minissérie sobre a trajetória de Ayrton Senna, do kart à Fórmula 1. Para quem cresceu nas manhãs de domingo de corrida ou quer conhecer a história de um dos maiores ídolos do esporte nacional.

## Para continuar explorando

Se você gostou dessas séries, vale conhecer também o cinema brasileiro — comece pela lista de [filmes brasileiros essenciais](/artigos/filmes-brasileiros-essenciais).
`,
  },
  {
    slug: "documentarios-brasileiros-essenciais",
    title: "Documentários brasileiros essenciais",
    description:
      "De Eduardo Coutinho a Petra Costa: documentários que ajudam a entender o Brasil e mostram a força do cinema de não ficção feito no país.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
O documentário é uma das áreas mais fortes do cinema brasileiro. Enquanto a ficção passou por altos e baixos, a produção de não ficção se manteve criativa e reconhecida dentro e fora do país. Estes filmes são um bom ponto de partida para conhecê-la.

## Eduardo Coutinho, o mestre da entrevista

Coutinho é considerado um dos maiores documentaristas brasileiros. Seu método era simples e radical: ouvir as pessoas com atenção, sem narração explicando o que devemos pensar.

### [Cabra Marcado para Morrer](/details/movie/86320) (1984)

As filmagens de uma ficção sobre um líder camponês assassinado foram interrompidas pelo golpe de 1964. Quase vinte anos depois, Coutinho reencontra a viúva e os participantes. O resultado é um retrato do país durante a ditadura.

### [Edifício Master](/details/movie/60142) (2002)

Coutinho entrevista moradores de um prédio de quitinetes em Copacabana. Histórias comuns que, contadas com tempo e escuta, ficam fascinantes.

## Violência e cidade

### [Ônibus 174](/details/movie/8439) (2002)

José Padilha reconstrói o sequestro de um ônibus no Rio de Janeiro, transmitido ao vivo pela TV em 2000, e investiga a vida do sequestrador. Um filme sobre como a sociedade produz e trata seus excluídos.

### [Estamira](/details/movie/73915) (2004)

Marcos Prado acompanha Estamira, uma mulher que vive e trabalha em um aterro sanitário e tem uma visão de mundo muito particular. Perturbador e poético.

## Arte e transformação

### [Lixo Extraordinário](/details/movie/46689) (2010)

O artista Vik Muniz trabalha com catadores do Jardim Gramacho, um enorme aterro sanitário em Duque de Caxias (RJ), para criar obras com materiais recicláveis. Foi indicado ao Oscar de melhor documentário.

## Histórias pessoais e políticas

### [Elena](/details/movie/160859) (2013)

Petra Costa investiga a vida e a morte da irmã mais velha, que sonhava ser atriz. Um documentário íntimo, feito como uma carta.

### [Democracia em Vertigem](/details/movie/566221) (2019)

Também de Petra Costa, mistura a história da família da diretora com a crise política brasileira dos anos 2010. Foi indicado ao Oscar de melhor documentário e gerou muito debate.

## Como aproveitar documentários

- **Lembre que todo documentário tem um ponto de vista.** Isso não é defeito, mas é bom ter consciência dele.
- **Pesquise depois de assistir:** muitos desses filmes rendem leituras e debates interessantes.
- **Explore mais títulos** na página de [documentários](/generos/filmes/documentario) do Popcorn.
`,
  },
  {
    slug: "filmes-de-natal",
    title: "Filmes de Natal para ver todo fim de ano",
    description:
      "Comédias, romances, animações e até um filme de ação: os clássicos de Natal que viraram tradição em muitas casas.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Tem filme que a gente vê uma vez e esquece. E tem filme que vira tradição, revisto todo dezembro com a mesma alegria. Esta lista reúne alguns clássicos de Natal que funcionam para vários gostos — da comédia pastelão ao romance, passando pela animação.

## Comédias para a família inteira

### [Esqueceram de Mim](/details/movie/771) (1990)

Um menino de oito anos é esquecido em casa quando a família viaja no Natal e precisa defendê-la de dois ladrões atrapalhados. As armadilhas de Kevin continuam engraçadas décadas depois.

### [O Grinch](/details/movie/8871) (2000)

Jim Carrey vive a criatura verde que odeia o Natal e decide roubá-lo de uma cidade inteira. Exagerado e divertido, com uma mensagem bonita no final.

### [Um Duende em Nova York](/details/movie/10719) (2003)

Will Ferrell é um humano criado por duendes do Polo Norte que vai a Nova York encontrar o pai verdadeiro. Ingenuidade e humor na medida certa.

## Para se emocionar

### [A Felicidade Não se Compra](/details/movie/1585) (1946)

Um homem à beira do desespero, na noite de Natal, ganha a chance de ver como seria o mundo se ele nunca tivesse nascido. Um clássico de Frank Capra que continua tocante.

### [Simplesmente Amor](/details/movie/508) (2003)

Várias histórias de amor se cruzam em Londres nas semanas antes do Natal. Tem gente que ama e gente que critica, mas virou tradição de fim de ano.

## Animações

### [O Estranho Mundo de Jack](/details/movie/9479) (1993)

O rei da Cidade do Halloween descobre o Natal e decide tomar conta da festa. Em stop-motion, produzido por Tim Burton, serve tanto para outubro quanto para dezembro.

### [Klaus](/details/movie/508965) (2019)

Um carteiro mimado é mandado para uma ilha gelada e faz amizade com um fabricante de brinquedos recluso. Uma origem diferente para o Papai Noel, com uma animação belíssima que foi indicada ao Oscar.

## O eterno debate

### [Duro de Matar](/details/movie/562) (1988)

Um policial enfrenta terroristas num arranha-céu durante a festa de Natal da empresa. É ou não é filme de Natal? A discussão é antiga e divertida — e, para muita gente, ver Bruce Willis em dezembro já virou tradição.

## Minha sugestão de maratona

Comece com uma animação para as crianças, siga com uma comédia para a família toda e deixe o clássico emocionante para a noite. E, se quiser variar, inclua um filme de outro país: o espírito de fim de ano é universal.
`,
  },
];
