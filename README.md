Sobre o projeto:

É uma API simples para encurtamento de URLs, funciona através da conversão do índice do registro na base de dados para um charset em base 62.

As URLs curtas são geradas de forma sequencial devido ao seu método de criação, indo de 00000000 à ZZZZZZZZ.

O hash foi delimitado a 8 caracteres para manter uma padronização estética na URL, pode ser expandida ou reduzida facilmente caso necessário.
Mantendo a restrição de 8 caracteres, permite um total armazenado de 218.340.105.584.896 URLs diferentes.

Foi estudado a ideia de aplicar um hash SHA-256 porém como o objetivo final é encurtar a URL, não faz sentido devido ao tamanho da hash.
Outra possibilidade testada foi converter a URL inicial para um INT32 e convertido esse valor para base 62, porém o potencial excesso de validações e consultas no banco para garantir a integridade hash se mostrou indeficiente.

Inicialmente desenvolvido em PHP, foi migrado para Node.js para facilitar o processo de deployment. 
Tanto a GUI quanto a API foram publicados na plataforma Render e a database foi publicada na plataforma Clever Cloud.

- API:
https://shortyapi.onrender.com
- GUI:
https://shortyurl.onrender.com

Endpoints da API:
- /add:
  - Método: POST
  - Parametros: { full_url: string }
  - Formato: JSON
  - Retorno: { "url": string }
  - Funcionalidade: recebe a url completa, registra na base de dados e retorna o hash.

- /getAll:
  - Método: GET
  - Retorno: [{ "id": integer, "full_url": string, "short_url": string }]
  - Funcionalidade: retorna um array contendo todas as URLs registradas.
 
- /:url:
  - Método: GET
  - Funcionalidade: recebe o hash valida na base de dados e redireciona para a URL armazenada.
