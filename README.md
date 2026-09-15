# 🟩 Termo

Jogo de adivinhar a palavra de 5 letras em 6 tentativas, em português, feito em HTML, CSS e JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/termo/

## Rodar local

```bash
npx serve -l 5190 .
```

## Como jogar

- Digite uma palavra de 5 letras e pressione Enter
- 🟩 letra certa no lugar certo · 🟨 letra certa no lugar errado · ⬛ letra fora da palavra
- Acentos e cedilha são ignorados: `avião` vale como `aviao`

## Modos

| Modo           | Descrição                                                                 |
|----------------|---------------------------------------------------------------------------|
| Palavra do dia | Uma palavra por dia, igual para todo mundo. O progresso fica salvo.       |
| Aleatória      | Quantas partidas quiser                                                   |

## Funcionalidades

- Avaliação correta de letras repetidas
- Cursor livre: clique numa casa ou use ← → para corrigir uma letra específica
- Teclado na tela colorido conforme o que já se sabe de cada letra
- Animações de virada, tremor e comemoração
- Estatísticas: jogos, vitórias, sequência atual e melhor, distribuição de tentativas
- Compartilhar resultado em emojis (Web Share ou área de transferência)
- Mais de 450 palavras comuns como respostas; qualquer palavra de 5 letras é aceita como tentativa

## Estrutura

```
js/config.js    # constantes e layout do teclado
js/words.js     # lista de palavras, palavra do dia e aleatória
js/logic.js     # avaliação da tentativa, normalização, texto de compartilhamento
js/storage.js   # estatísticas e progresso do dia
js/render.js    # grade, teclado, modais
js/input.js     # teclado físico e na tela
js/game.js      # regras e estado
```

## Licença

MIT
