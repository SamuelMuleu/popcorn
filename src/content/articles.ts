// Artigos editoriais do Popcorn (conteúdo original).
// Formato do corpo: "## " título de seção, "### " subtítulo, "- " lista, "1. " lista numerada,
// **negrito** e [texto](/link). Parágrafos separados por linha em branco.

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: "Guias" | "Listas" | "Explicando";
  author: string;
  publishedAt: string; // AAAA-MM-DD
  updatedAt?: string;
  body: string;
}

const AUTHOR = "Samuel Muleu";

export const ARTICLES: Article[] = [
  {
    slug: "como-escolher-o-que-assistir",
    title: "Como escolher o que assistir: 8 dicas para sair da paralisia do catálogo",
    description:
      "Passa mais tempo rolando o catálogo do que assistindo? Veja um método simples para decidir rápido e acertar mais na escolha de filmes e séries.",
    category: "Guias",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Você abre o streaming com vontade de ver alguma coisa, passa vinte minutos olhando capas, assiste a três trailers e, no fim, desiste ou coloca de novo aquela série que já viu cinco vezes. Isso tem nome: **paralisia de escolha**. Quanto mais opções, mais difícil decidir — e catálogos com milhares de títulos são o cenário perfeito para isso.

A boa notícia é que dá para resolver com alguns hábitos simples. Nenhum deles exige assinar mais serviços.

## 1. Decida o "clima" antes do título

Antes de abrir qualquer aplicativo, responda a uma pergunta: **o que eu quero sentir agora?** Rir sem pensar muito, levar um susto, me emocionar, ficar tenso, aprender algo? Essa resposta já elimina a maior parte do catálogo.

Uma comédia leve e um drama de três horas não competem entre si numa terça-feira à noite. Escolher o clima primeiro transforma uma decisão entre mil opções em uma decisão entre vinte.

## 2. Defina quanto tempo você tem

Parece óbvio, mas pouca gente faz. Se você tem uma hora e meia, um filme de 2h40 vai virar "termino amanhã" — e amanhã quase nunca chega. Nas páginas de cada filme aqui no Popcorn a duração aparece logo na ficha técnica; para séries, vale olhar a duração média dos episódios.

- Até 40 minutos: episódio de série, documentário curto ou sitcom.
- Até 1h45: a maioria das comédias, terrores e animações.
- Mais de 2 horas: épicos, dramas e grandes produções — guarde para o fim de semana.

## 3. Tenha uma lista pronta (e use de verdade)

A melhor hora para escolher um filme **não** é quando você quer assistir a um filme. É quando alguém te indica, quando você lê uma crítica ou vê um trailer que chamou atenção. Nesse momento, salve o título nos favoritos.

Quando bater a vontade de assistir, você não começa do zero: abre a lista, aplica o filtro de clima e tempo, e escolhe entre cinco opções que **você mesmo** já aprovou.

## 4. Use os gêneros como atalho, não como prisão

Navegar por gênero ajuda a encontrar coisas parecidas com o que você já gosta. Na nossa página de [gêneros](/generos) cada categoria tem uma explicação do que esperar e uma seleção dos títulos mais populares.

Mas não fique preso: de vez em quando, escolha de propósito um gênero que você costuma evitar. Muita gente que "não gosta de documentário" ou "não vê animação" descobre favoritos assim.

## 5. Não confie só na nota

Notas ajudam, mas são uma média — e médias escondem muita coisa. Um filme com nota 7 pode ser amado por metade do público e odiado pela outra metade. Leia a sinopse, veja quem dirige e quem atua, e confira quantas pessoas votaram. Explicamos isso em detalhes no artigo [como interpretar notas de filmes](/artigos/como-interpretar-notas-de-filmes).

## 6. Assista ao trailer — mas só um

O trailer serve para confirmar o tom do filme, não para conhecer a história. Assista a um, no máximo. Trailers recentes costumam revelar reviravoltas importantes; se a sinopse e o primeiro trailer já te convenceram, pare por aí.

## 7. Dê uma regra de saída para séries

Começar uma série é um compromisso. Uma regra útil: **dê três episódios**. Se até o terceiro você não está curioso para saber o que acontece, pode abandonar sem culpa. Muitas séries têm um piloto fraco, mas poucas melhoram depois de três episódios sem graça.

## 8. Alterne entre o novo e o "conforto"

Rever um filme favorito não é desperdício: é descanso. O problema é quando só isso acontece. Uma boa proporção é intercalar: um título novo, um conhecido. Assim você continua descobrindo coisas sem transformar cada sessão em uma aposta.

## Resumindo

Escolha o clima, defina o tempo, consulte sua lista e confie em poucos critérios. Com esse roteiro, a decisão que levava meia hora cai para dois minutos — e sobra mais tempo para o que importa, que é assistir.
`,
  },
  {
    slug: "filmes-brasileiros-essenciais",
    title: "12 filmes brasileiros essenciais para conhecer o cinema nacional",
    description:
      "Do Cinema Novo ao Oscar de Ainda Estou Aqui: uma seleção de filmes brasileiros que ajudam a entender a história e a força do nosso cinema.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
O cinema brasileiro tem uma trajetória cheia de altos e baixos: períodos de enorme criatividade, fases de quase paralisação por falta de financiamento e, nas últimas décadas, um reconhecimento internacional cada vez maior. Esta lista não é um ranking — é um ponto de partida, em ordem cronológica, para quem quer conhecer o que o país produziu de mais marcante.

## 1. [O Pagador de Promessas](/details/movie/59990) (1962)

Dirigido por Anselmo Duarte e baseado na peça de Dias Gomes, conta a história de Zé do Burro, um homem simples que promete carregar uma cruz até uma igreja de Salvador e esbarra na intolerância do padre. É até hoje o único filme brasileiro a vencer a **Palma de Ouro** em Cannes.

## 2. [Deus e o Diabo na Terra do Sol](/details/movie/67612) (1964)

O filme mais conhecido de Glauber Rocha e símbolo do **Cinema Novo**, movimento que propunha "uma câmera na mão e uma ideia na cabeça". Misturando beatos, cangaceiros e o sertão nordestino, é uma obra de linguagem ousada que influenciou gerações de cineastas.

## 3. [Macunaíma](/details/movie/68173) (1969)

Joaquim Pedro de Andrade adaptou o livro de Mário de Andrade com humor anárquico e crítica social. Grande Otelo e Paulo José se revezam no papel do "herói sem nenhum caráter". Uma boa porta de entrada para entender o modernismo brasileiro no cinema.

## 4. [Dona Flor e Seus Dois Maridos](/details/movie/42234) (1976)

Baseado em Jorge Amado e dirigido por Bruno Barreto, com Sônia Braga no papel principal. Foi um dos maiores sucessos de público da história do cinema nacional e mostra que filme brasileiro também sabia lotar salas.

## 5. [Pixote, a Lei do Mais Fraco](/details/movie/42148) (1980)

Hector Babenco retrata a vida de crianças em situação de rua e em reformatórios com crueza documental, usando muitos atores não profissionais. É um filme duro, ainda atual, e uma das obras brasileiras mais respeitadas no exterior.

## 6. [Central do Brasil](/details/movie/666) (1998)

Walter Salles acompanha Dora, uma escritora de cartas na estação Central do Brasil, e o menino Josué numa viagem pelo sertão. Venceu o **Urso de Ouro** em Berlim e rendeu a Fernanda Montenegro uma indicação ao Oscar de melhor atriz. Marco da chamada "retomada" do cinema nacional.

## 7. [O Auto da Compadecida](/details/movie/40096) (2000)

A adaptação de Guel Arraes para a peça de Ariano Suassuna transformou João Grilo (Matheus Nachtergaele) e Chicó (Selton Mello) em personagens queridos por todo o país. Nasceu como minissérie de TV e foi remontado para o cinema. Humor nordestino, crítica social e frases que viraram bordão.

## 8. [Cidade de Deus](/details/movie/598) (2002)

Fernando Meirelles e Kátia Lund adaptaram o livro de Paulo Lins sobre o crescimento do tráfico em um conjunto habitacional do Rio de Janeiro. Montagem acelerada, elenco formado em boa parte por jovens das comunidades e quatro indicações ao Oscar, incluindo direção e roteiro adaptado.

## 9. [Tropa de Elite](/details/movie/7347) (2007)

José Padilha dirige Wagner Moura como o capitão Nascimento, do BOPE. O filme virou fenômeno antes mesmo da estreia — cópias piratas circularam amplamente — e venceu o **Urso de Ouro** em Berlim. Até hoje provoca debates sobre violência policial e segurança pública.

## 10. [Que Horas Ela Volta?](/details/movie/310569) (2015)

Anna Muylaert dirige Regina Casé como Val, empregada doméstica que mora na casa dos patrões em São Paulo. A chegada da filha dela expõe as regras invisíveis de classe dentro da casa. Um filme acessível, engraçado e incômodo na medida certa.

## 11. [Bacurau](/details/movie/446159) (2019)

Kleber Mendonça Filho e Juliano Dornelles misturam faroeste, ficção científica e crítica política numa pequena cidade do sertão que, de repente, desaparece dos mapas. Ganhou o **Prêmio do Júri** em Cannes e virou cult imediato.

## 12. [Ainda Estou Aqui](/details/movie/1000837) (2024)

Walter Salles adapta o livro de Marcelo Rubens Paiva sobre a mãe, Eunice Paiva, que precisou reconstruir a vida depois que o marido, o ex-deputado Rubens Paiva, foi levado pela ditadura militar. Fernanda Torres venceu o Globo de Ouro de melhor atriz em drama, e o filme conquistou o **Oscar de melhor filme internacional** — o primeiro do Brasil na categoria.

## Por onde começar?

Se você nunca viu cinema brasileiro além das comédias da TV, comece por **O Auto da Compadecida** ou **Que Horas Ela Volta?**, que são acessíveis e divertidos. Para entender a história, siga a ordem da lista. E se quiser saber em qual streaming cada um está disponível agora, clique no título: a página de cada filme mostra onde assistir no Brasil.
`,
  },
  {
    slug: "classificacao-indicativa-no-brasil",
    title: "Classificação indicativa no Brasil: o que significa cada faixa etária",
    description:
      "Entenda as faixas L, 10, 12, 14, 16 e 18, quem define a classificação dos filmes e séries no Brasil e como usar essa informação na hora de escolher o que ver.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Aquele quadradinho colorido com um número que aparece antes de filmes, séries e programas de TV tem nome: **classificação indicativa**. Ele existe para ajudar famílias a decidir o que é adequado para cada idade. Mas muita gente não sabe exatamente o que cada faixa significa nem quem decide isso.

## Quem define a classificação

No Brasil, a política de classificação indicativa é coordenada pelo **Ministério da Justiça e Segurança Pública**. As obras são analisadas com base em critérios públicos, descritos no Guia Prático de Classificação Indicativa.

Em muitos casos, especialmente em plataformas de streaming, a própria empresa faz a **autoclassificação** seguindo esses critérios, e o Ministério acompanha e pode revisar o resultado.

## As faixas e suas cores

- **L — Livre** (verde): adequado para todos os públicos.
- **10 anos** (azul): pode ter conteúdo leve, como violência fantasiosa ou linguagem um pouco mais forte.
- **12 anos** (amarelo): temas e cenas que exigem mais maturidade, como violência moderada ou insinuações sexuais.
- **14 anos** (laranja): conteúdo mais intenso, como violência com mais impacto, uso de drogas mencionado ou mostrado com contexto, e linguagem pesada.
- **16 anos** (vermelho): violência acentuada, cenas de sexo sem detalhamento explícito e uso de drogas mais evidente.
- **18 anos** (preto): conteúdo extremo, como violência muito intensa, sexo explícito ou apologia a práticas graves.

## O que é analisado

A classificação considera três grandes eixos de conteúdo:

1. **Violência** — desde agressões leves até cenas de tortura ou morte com muitos detalhes.
2. **Sexo e nudez** — de nudez não erótica até cenas de sexo explícito.
3. **Drogas** — menções, consumo, tráfico e incentivo ao uso, inclusive de substâncias lícitas como álcool e tabaco.

Além da faixa etária, muitas obras exibem **descritores de conteúdo**, como "Violência", "Linguagem imprópria" ou "Drogas lícitas". Eles explicam o motivo da classificação e ajudam a decidir com mais precisão.

## "Indicativa" quer dizer o quê?

A palavra é importante: a classificação **indica**, não proíbe dentro de casa. Ela é uma orientação para pais e responsáveis, que conhecem a maturidade dos próprios filhos. Um filme 12 anos pode ser tranquilo para uma criança de 11 que já está acostumada ao tema — ou pesado para um adolescente de 13 que é mais sensível.

Em cinemas, eventos e na programação da TV aberta, porém, a classificação tem efeitos práticos, como horários de exibição e regras de entrada. Na dúvida, consulte as orientações do local.

## Como usar essa informação

- **Leia os descritores**, não só o número. "14 — Violência" e "14 — Sexo" são situações bem diferentes para muitas famílias.
- **Confira cada temporada** em séries. A classificação pode mudar de uma temporada para outra.
- **Assista ao trailer junto** quando estiver em dúvida. Em dois minutos dá para sentir o tom.
- **Converse depois**. Para adolescentes, falar sobre o que viram costuma ser mais eficaz do que proibir.

Aqui no Popcorn, quando o TMDB tem a classificação brasileira cadastrada, ela aparece na ficha técnica de cada filme e série.
`,
  },
  {
    slug: "legendado-ou-dublado",
    title: "Legendado ou dublado? Prós e contras de cada formato",
    description:
      "A eterna discussão: assistir com legenda ou dublagem? Veja o que cada formato oferece e em que situações um funciona melhor do que o outro.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Poucos assuntos dividem tanto quem gosta de filmes e séries quanto a escolha entre **legendado** e **dublado**. Tem gente que não abre mão da voz original dos atores, e tem gente que acha impossível acompanhar a imagem lendo texto. A verdade é que os dois formatos têm vantagens reais — e o melhor depende do filme, do momento e de quem está assistindo.

## A favor do legendado

### A atuação completa

A voz é parte importante da atuação. Entonação, sotaque, ritmo e até a respiração do ator foram pensados junto com a expressão do rosto. Na versão original você recebe esse trabalho inteiro.

### Fidelidade ao texto

Legendas são traduções, então também adaptam — mas costumam ficar mais próximas do texto original do que a dublagem, que precisa casar as falas com o movimento da boca dos atores.

### Aprender outro idioma

Assistir com áudio original ajuda a treinar o ouvido. Muita gente aprendeu inglês, espanhol ou até coreano assim. Uma técnica útil é ativar a legenda **no mesmo idioma do áudio** quando você já tem algum domínio da língua.

## A favor do dublado

### Atenção total na imagem

Em filmes de ação, animações cheias de detalhes ou cenas com muito texto na tela, ler legendas significa perder parte do que acontece. Com dublagem, seus olhos ficam livres.

### Acessibilidade

Crianças que ainda não leem com fluência, pessoas com baixa visão, dislexia ou que simplesmente se cansam ao ler por muito tempo aproveitam muito mais a versão dublada.

### Uma escola de excelência

O Brasil tem uma das dublagens mais respeitadas do mundo. Vozes de personagens clássicos marcaram gerações, e alguns trabalhos de dublagem são tão queridos quanto o original. Em comédias e animações, a adaptação de piadas para referências brasileiras pode até deixar o humor mais próximo do público.

### Assistir fazendo outra coisa

Se a série é companhia enquanto você cozinha ou arruma a casa, a versão dublada é praticamente obrigatória.

## E quando a escolha muda tudo?

- **Comédias baseadas em trocadilhos**: o original preserva a piada; a dublagem pode trocá-la por outra, às vezes melhor, às vezes pior.
- **Musicais**: muitas vezes as músicas permanecem no idioma original, com legenda, mesmo na versão dublada.
- **Filmes com vários idiomas**: em obras em que personagens falam línguas diferentes, a dublagem pode apagar essa diferença, que às vezes é importante para a história.
- **Animações infantis**: dublado, quase sempre. As vozes brasileiras costumam ser escolhidas com muito cuidado.

## Nossa sugestão

Não existe formato certo. Experimente um meio-termo: veja dublado o que você assiste em família ou para relaxar, e legendado o que você escolheu justamente pela atuação. E se for rever um filme que ama, troque o formato — é quase como ver uma obra nova.
`,
  },
  {
    slug: "como-acompanhar-series",
    title: "Como organizar suas séries e nunca mais esquecer em que episódio parou",
    description:
      "Dicas práticas para acompanhar várias séries ao mesmo tempo, evitar spoilers e manter um histórico do que você já assistiu.",
    category: "Guias",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Você começou uma série em março, parou na metade da segunda temporada, voltou em julho e não lembrava se já tinha visto o episódio 6. Enquanto isso, iniciou outras três. Se isso soa familiar, você não está sozinho: com tantos lançamentos, acompanhar séries virou quase uma tarefa de organização.

Aqui vão algumas práticas que funcionam.

## Limite as séries em andamento

A dica mais eficaz é também a mais difícil: **não acompanhe mais de duas ou três séries ao mesmo tempo**. Uma longa, com episódios de uma hora, e uma curta para os dias corridos é uma combinação que funciona bem.

Quando uma terminar, aí sim comece a próxima da sua lista.

## Marque os episódios assistidos

A memória falha, especialmente com séries de episódios parecidos entre si. No Popcorn, ao entrar na página de uma série e fazer login, você pode marcar cada episódio como assistido — ou a temporada inteira de uma vez. Na próxima visita, fica claro onde você parou.

## Tenha três listas separadas

1. **Assistindo agora** — as séries em andamento.
2. **Quero ver** — tudo que alguém indicou ou que chamou sua atenção.
3. **Concluídas** — o histórico, útil para lembrar e para indicar a amigos.

Os favoritos do Popcorn funcionam como sua lista "quero ver", e o histórico de assistidos registra o que você já concluiu.

## Respeite o ritmo da série

Nem toda série foi feita para maratona. Dramas densos e séries de mistério costumam render mais quando você assiste um ou dois episódios por dia, porque dá tempo de pensar sobre o que aconteceu. Comédias e realities, por outro lado, são ótimos para sessões longas.

## Use o "resumo anterior" a seu favor

Se você ficou muito tempo longe de uma série, não precisa recomeçar. Antes de voltar:

- Leia a sinopse dos dois últimos episódios que você assistiu.
- Assista ao recap ("anteriormente em...") do episódio seguinte.
- Se ainda estiver perdido, reveja apenas o último episódio.

## Como evitar spoilers

- **Silencie palavras-chave** nas redes sociais com o nome da série e dos personagens principais.
- **Cuidado com sinopses** de temporadas futuras e com listas de elenco, que às vezes revelam quem sobrevive.
- **Não pesquise o nome de personagens** no buscador; as sugestões automáticas costumam entregar o final.
- **Avise os amigos** até onde você assistiu. Parece bobo, mas evita muita conversa estragada.

## Sabendo quando parar

Também faz parte da organização aceitar abandonar uma série. Se você está assistindo por obrigação, sem curiosidade pelo próximo episódio, libere esse espaço para algo que te empolgue. Sua lista "quero ver" com certeza tem opções melhores.
`,
  },
  {
    slug: "classicos-do-cinema",
    title: "12 clássicos do cinema que valem a pena ver pelo menos uma vez",
    description:
      "De Chaplin a Miyazaki: uma seleção de filmes clássicos que influenciaram o cinema e continuam envolventes para quem assiste hoje.",
    category: "Listas",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
"Clássico" assusta muita gente: parece sinônimo de filme lento, em preto e branco, para ver por obrigação. Mas os filmes desta lista ficaram famosos justamente porque continuam funcionando — são divertidos, tensos ou emocionantes mesmo décadas depois. Selecionamos obras de diferentes épocas, países e gêneros, em ordem cronológica.

## 1. [Tempos Modernos](/details/movie/3082) (1936)

Charlie Chaplin coloca seu Vagabundo numa linha de montagem industrial e cria algumas das cenas mais famosas da história do cinema. Quase sem diálogos, é engraçado para qualquer idade — e a crítica ao trabalho mecanizado continua atual.

## 2. [Cidadão Kane](/details/movie/15) (1941)

Estreia de Orson Welles na direção, aos 25 anos, também como protagonista. A investigação sobre a última palavra de um magnata, "Rosebud", é contada com flashbacks e enquadramentos que mudaram a forma de filmar.

## 3. [Casablanca](/details/movie/289) (1942)

Humphrey Bogart e Ingrid Bergman em um romance durante a Segunda Guerra, num bar em Marrocos cheio de refugiados e espiões. Venceu o Oscar de melhor filme e tem algumas das falas mais citadas do cinema.

## 4. [Cantando na Chuva](/details/movie/872) (1952)

Musical de Gene Kelly e Stanley Donen sobre a transição do cinema mudo para o falado. Divertido, colorido e com a cena de dança na chuva que todo mundo já viu, mesmo sem saber de onde era.

## 5. [Os Sete Samurais](/details/movie/346) (1954)

Akira Kurosawa conta a história de camponeses que contratam samurais para proteger a vila de bandidos. São mais de três horas, mas o ritmo surpreende. A estrutura de "reunir uma equipe" influenciou incontáveis filmes, inclusive o faroeste Sete Homens e um Destino.

## 6. [Um Corpo que Cai](/details/movie/426) (1958)

O suspense de Alfred Hitchcock com James Stewart e Kim Novak foi pouco valorizado no lançamento e, décadas depois, chegou ao topo de votações internacionais de críticos como um dos maiores filmes já feitos. Obsessão, identidade e uma vertigem que virou técnica de câmera.

## 7. [2001: Uma Odisseia no Espaço](/details/movie/62) (1968)

Stanley Kubrick fez uma ficção científica que vai da pré-história ao espaço profundo, com pouquíssimo diálogo e efeitos que impressionam até hoje. HAL 9000, o computador da nave, é um dos personagens mais marcantes do gênero.

## 8. [O Poderoso Chefão](/details/movie/238) (1972)

Francis Ford Coppola adapta o livro de Mario Puzo sobre a família Corleone, com Marlon Brando e Al Pacino. Venceu o Oscar de melhor filme e é referência obrigatória para qualquer história sobre poder e família.

## 9. [Taxi Driver](/details/movie/103) (1976)

Martin Scorsese e Robert De Niro retratam a solidão e a paranoia de um taxista em Nova York. Venceu a Palma de Ouro em Cannes e é um retrato perturbador de uma cidade e de uma época.

## 10. [De Volta para o Futuro](/details/movie/105) (1985)

Robert Zemeckis criou a aventura perfeita: viagem no tempo, humor, romance e um roteiro em que cada detalhe do começo volta no final. Michael J. Fox e Christopher Lloyd formam uma das duplas mais queridas do cinema.

## 11. [Pulp Fiction: Tempo de Violência](/details/movie/680) (1994)

Quentin Tarantino embaralha a ordem de histórias entrelaçadas de gângsteres em Los Angeles. Venceu a Palma de Ouro e o Oscar de roteiro original, e seus diálogos influenciaram uma geração inteira de cineastas.

## 12. [A Viagem de Chihiro](/details/movie/129) (2001)

A obra-prima de Hayao Miyazaki e do Studio Ghibli acompanha uma menina presa em um mundo de espíritos. Venceu o Oscar de melhor animação e é a prova de que animação não é "coisa de criança" — ou melhor, de que é coisa de criança e de adulto ao mesmo tempo.

## Dica para assistir clássicos

Dê ao filme os primeiros vinte minutos de atenção total, sem celular. O ritmo de filmes antigos é diferente, e o cérebro precisa de um tempo para se ajustar. Depois disso, a maioria desses títulos prende tanto quanto qualquer lançamento.
`,
  },
  {
    slug: "como-interpretar-notas-de-filmes",
    title: "Como interpretar notas de filmes: média do público, crítica e número de votos",
    description:
      "Nota 7 é bom? Por que o mesmo filme tem notas tão diferentes em cada site? Entenda como funcionam as avaliações e como usá-las a seu favor.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Antes de dar play, quase todo mundo olha a nota. O problema é que "nota" pode significar coisas muito diferentes dependendo de onde ela vem. Entender essas diferenças ajuda a escolher melhor — e a não descartar um filme ótimo por causa de um número.

## Nota do público x nota da crítica

Existem dois grandes tipos de avaliação:

- **Notas do público**: qualquer usuário cadastrado pode votar. É o caso do TMDB, de onde vêm as notas exibidas aqui no Popcorn, e do IMDb. O resultado é uma média de 0 a 10 (ou 1 a 10).
- **Notas da crítica**: reúnem avaliações de críticos profissionais. O Metacritic calcula uma média ponderada de 0 a 100. Já o Rotten Tomatoes mostra a **porcentagem de críticas positivas** — o que é diferente de uma média.

Essa última diferença confunde muita gente. Um filme com 95% no Rotten Tomatoes não recebeu "nota 9,5": significa que 95% dos críticos gostaram, mesmo que muitos tenham achado apenas "bom".

## O número de votos importa

Uma média calculada com 30 votos é muito menos confiável do que uma calculada com 30 mil. Filmes recém-lançados ou muito nichados costumam ter notas instáveis, que sobem ou descem bastante nas primeiras semanas.

Regra prática: **desconfie de notas muito altas com poucos votos**. Elas normalmente refletem fãs dedicados que votaram primeiro.

## Quem vota influencia a nota

Cada plataforma tem um público com gostos próprios. Alguns padrões comuns:

- **Gêneros de nicho** (terror, anime, documentários) recebem votos principalmente de fãs do gênero, o que tende a puxar a média para cima.
- **Comédias e romances** costumam ter notas mais baixas do que dramas, mesmo quando agradam bastante.
- **Filmes polêmicos** podem sofrer ondas de votos negativos ou positivos que não têm relação com a qualidade.
- **Filmes antigos** muitas vezes têm notas altas porque só quem já gosta de clássicos se dá ao trabalho de assistir e votar.

## Então, como usar as notas?

1. **Use a nota como filtro, não como veredito.** Abaixo de 5 com muitos votos é um sinal de alerta; entre 6 e 8, a decisão deve ser sua.
2. **Compare com filmes que você conhece.** Se você amou um filme com nota 6,8, isso diz mais sobre seu gosto do que qualquer média.
3. **Leia a sinopse e veja o elenco.** Um diretor ou ator de quem você gosta é um ótimo indicador.
4. **Leia comentários, não só números.** Um comentário que explica o que funcionou ou não vale mais do que a média. Aqui no Popcorn você pode deixar o seu em cada filme, série e episódio.

## E aquela sensação de "todo mundo amou e eu não"?

É normal. Gosto é pessoal, e uma nota alta só diz que **a maioria** gostou. Isso vale para o contrário também: alguns dos filmes mais queridos de muita gente têm notas medianas. Use os números para descobrir, não para decidir por você.
`,
  },
  {
    slug: "terror-suspense-e-thriller",
    title: "Terror, suspense e thriller: qual é a diferença entre esses gêneros?",
    description:
      "Os três gêneros mexem com o medo e a tensão, mas de formas diferentes. Entenda o que caracteriza cada um e descubra qual combina mais com você.",
    category: "Explicando",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Em catálogos de streaming, "terror", "suspense" e "thriller" aparecem misturados, e muita gente usa as palavras como sinônimos. Mas existem diferenças importantes — e conhecê-las ajuda a evitar a frustração de esperar sustos e receber um drama tenso, ou o contrário.

## Terror: o medo como objetivo

No **terror**, o objetivo principal é assustar. A ameaça costuma ser algo fora do comum: fantasmas, demônios, monstros, maldições, assassinos quase sobrenaturais. A pergunta do espectador é: **"o que é isso e como escapar?"**.

Subgêneros comuns:

- **Sobrenatural**: casas assombradas, possessões, espíritos.
- **Slasher**: um assassino perseguindo um grupo de pessoas.
- **Psicológico**: o medo vem da mente do personagem e da dúvida sobre o que é real.
- **Folk horror**: rituais, comunidades isoladas e tradições antigas.
- **Body horror**: transformações e deformações do corpo.

## Suspense: a angústia da espera

O **suspense** é mais uma técnica do que um gênero: é a tensão criada quando o espectador sabe (ou desconfia) que algo vai acontecer, mas não sabe quando. Alfred Hitchcock explicava isso com a imagem de uma bomba embaixo da mesa: se o público sabe que ela está lá, uma conversa banal vira um momento angustiante.

Por isso, o suspense aparece em vários gêneros — inclusive no terror e no drama. Quando um filme é classificado como "suspense", geralmente quer dizer que a tensão é o elemento central, mesmo sem nada sobrenatural.

## Thriller: perigo realista e ritmo acelerado

O **thriller** é o primo mais agitado do suspense. A ameaça é plausível — um sequestro, uma conspiração, um assassino em série, uma perseguição — e o ritmo é rápido, com reviravoltas. A pergunta principal é: **"o protagonista vai conseguir?"**.

Alguns tipos de thriller:

- **Policial**: investigações, detetives, assassinos.
- **Psicológico**: manipulação, mentiras e personagens instáveis.
- **Político ou de espionagem**: conspirações e jogos de poder.
- **Tecnológico**: hackers, vigilância e inteligência artificial.

## Resumindo a diferença

- **Terror** quer que você sinta medo; a ameaça costuma ser extraordinária.
- **Suspense** quer que você fique tenso esperando algo acontecer.
- **Thriller** quer que você fique na ponta da cadeira acompanhando uma ameaça realista.

## Qual combina com você?

Se você não gosta de sustos nem de cenas gráficas, comece pelos **thrillers psicológicos e policiais**: a tensão está lá, mas o medo é diferente. Se você gosta da adrenalina do susto, explore os subgêneros de **terror** — o psicológico é ótimo para iniciantes, e o slasher, para quem já está acostumado.

Você pode explorar os títulos mais populares de cada categoria nas páginas de [terror](/generos/filmes/terror) e [suspense](/generos/filmes/suspense).
`,
  },
  {
    slug: "onde-assistir-filmes-e-series",
    title: "Como descobrir em qual streaming um filme ou série está disponível",
    description:
      "Catálogos mudam o tempo todo e variam de país para país. Veja como descobrir onde assistir a um título no Brasil e entender as diferenças entre assinatura, aluguel e compra.",
    category: "Guias",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    body: `
Você ouviu falar de um filme, ficou com vontade de ver e... não faz ideia de onde ele está. Com vários serviços de streaming disputando catálogos, essa é uma das dúvidas mais comuns. Aqui explicamos por que é tão confuso e como resolver rápido.

## Por que os catálogos mudam tanto

Os serviços de streaming não são donos da maior parte do que exibem. Eles **licenciam** filmes e séries por um período e para países específicos. Quando o contrato vence, o título sai do catálogo — e pode reaparecer em outro serviço meses depois.

Por isso:

- Um filme pode estar disponível nos Estados Unidos e não no Brasil.
- O mesmo título pode estar em dois serviços ao mesmo tempo.
- Aquela série que você estava assistindo pode sumir no meio da temporada.

Produções originais de cada plataforma costumam ser a exceção: tendem a permanecer no serviço que as produziu.

## Assinatura, aluguel e compra

Na página de cada filme e série do Popcorn mostramos onde o título está disponível **no Brasil**. É bom entender as categorias:

- **Streaming por assinatura**: incluído no valor mensal do serviço. Se você já assina, é só dar play.
- **Aluguel**: você paga uma vez e tem um prazo para assistir, normalmente algumas horas depois de começar.
- **Compra digital**: o título fica na sua biblioteca da loja enquanto o serviço e a licença existirem.
- **Gratuito com anúncios**: alguns serviços oferecem títulos sem assinatura, com intervalos comerciais.

## Dicas para não pagar à toa

1. **Confira antes de assinar.** Se você quer assinar um serviço por causa de um título específico, verifique se ele está disponível no Brasil naquele momento.
2. **Faça rodízio de assinaturas.** Em vez de manter vários serviços ao mesmo tempo, assine um por vez, assista ao que quer e troque.
3. **Compare aluguel e assinatura.** Para um único filme, alugar pode sair mais barato do que um mês de assinatura.
4. **Veja os títulos que estão saindo.** Muitos serviços indicam o que deixa o catálogo em breve; priorize esses na sua lista.

## Evite sites piratas

Sites que prometem "todos os filmes de graça" costumam vir acompanhados de propaganda enganosa, rastreadores e até programas maliciosos — além de não remunerarem quem fez a obra. O Popcorn não hospeda nem indica links para assistir de forma ilegal; mostramos apenas serviços oficiais.

## De onde vêm essas informações

Os dados de "onde assistir" exibidos no Popcorn são fornecidos pelo TMDB em parceria com o **JustWatch** e são atualizados periodicamente. Como os catálogos mudam rápido, confirme a disponibilidade no aplicativo do serviço antes de assinar.
`,
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const readingMinutes = (body: string) => Math.max(2, Math.round(body.split(/\s+/).length / 200));
