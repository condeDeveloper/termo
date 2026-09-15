// Palavras de 5 letras (sem acentos). São as respostas possíveis.
const WORDS = `
abade abrir aceso acima acaso achar adiar adubo aereo afiar agora agudo ainda ajuda amigo andar anexo anual apoio aroma
arroz artes assar astro atlas atual aviao azedo bacia baixo balde banco banho barco barro beijo beira bicho bloco bolsa
bomba bonde borda botao braco brasa bravo breve brisa bruto bucha burro cabra cacau cacho caixa calma calor campo canal
canto capaz cargo carne carro carta casal casca causa cedro cerca cesta chave cheio chefe chuva cinco cinza circo claro
clima cobra coisa colar comum conta copia corda corpo corte costa couro credo crime cruel culpa curso curto custo dados
danca dedos deixa dente deusa dever dieta digno disco dobro dogma dores dorso drama droga dueto duplo duque elite enfim
entao envio epoca erros ervas esses etapa exame exato falar falha falso fardo farol fatia feira feliz ferro festa fibra
ficar filho filme final firme fisco fitas fluxo focar fogao folha fonte forca forma forno forte fosso fraco frase freio
frete frota fruta fugir fumar fundo furia gaita galho ganho garfo garra gasto gelar gemas genro gente gesso gesto girar
globo golpe gordo gosto graca grama grato grave greve grito grupo guiar haver hotel humor ideia idoso igual ilhas impar
inato indio irmao jarra jeito jogar jovem judeu juizo julho junho junto justo lacos lados lagoa lapis largo lavar legal
leite lenda lenha lento leque letra levar libra lider ligar limao limpo linda linha lista livre livro lobos local longe
longo lotar louco lugar lutar macio magia magro maior malha manga manha manto marca massa medir meias menor mente mesmo
metal metro mexer minha misto moeda moita molde molho monte morar morno morro morte mosca motor mudar muito mundo museu
nariz natal navio negar negro nervo neves ninho nobre noite noiva norte notar nuvem obter oeste olhar ondas opcao ordem
orgao ouros ouvir pacto padre pagar palco palma papel parar parte passo pasta patio pauta pedra peixe pelos perda perto
pesar peste piano pilha pinta pista placa plano pobre poder poema poeta polvo ponte ponto porco porta porto posse posto
pouco praca praia prata prato prazo preco preso preto prima prova pular pulso punho puxar quase queda quilo radio raiva
ramos rapaz rasgo razao reais regra reino remar renda resto reter ricos rimas risco ritmo rocha roubo roupa rumor sabor
sagaz saida salto salvo samba santo sapos saude secar seita selar selva senha senso serra servo sinal sobre socio solto
sonho sopro sorte suave subir sujar sumir super surdo susto tabua talho tampa tanto tarde taxas tecla tempo tenda tenis
tenro terra texto tigre tinta tirar tocar todos tomar tonel torre torto total touro trapo trato trave treze trigo tripa
troca trono tropa trupe tubos tumor turma turno uivar unido uniao usina vagao valer valor vapor varal vazio veias velho
vento verao verbo verde vidro vigor vinho viola virar visao visto viver vivos vodca volta votar vozes zebra zelar zonas
`.trim().split(/\s+/);

// Palavra do dia: índice determinístico a partir da data
function dailyWord(date = new Date()) {
  const days = Math.floor((date - EPOCH) / 86400000);
  return WORDS[((days % WORDS.length) + WORDS.length) % WORDS.length];
}

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
