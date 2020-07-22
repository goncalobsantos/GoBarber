<img alt="< GSantosDev />" src="./banner-gs.png" />

<h3 align="center">
  Backend da aplicação GoBarber (Bootcamp GoStack 2020)
</h3>

<blockquote align="center">“Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu: (...) Tempo para plantar e tempo para arrancar o que se plantou”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/goncalobsantos/GoBarber?color=%2304D361">

  <a href="https://github.com/goncalobsantos">
    <img alt="Made by Gonçalo Santos" src="https://img.shields.io/badge/made%20by-Gonçalo%20Santos-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/goncalobsantos/GoBarber/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/goncalobsantos/GoBarber?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-zap-um-toque-especial">Um toque especial</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o projeto

O GoBarber é uma aplicação na qual utilizadores podem se inscrever passando a ser, quer consumidores do serviço, quer prestadores do mesmo. O serviço em causa trata-se de serviço de barbearia.

Os utilizadores são capazes de ver os prestadores de serviço existentes da aplicação e podem marcar uma sessão com o prestador escolhido. Os prestadores tem o seu horário definido entre as 8h e as 17h e cada marcação tem a duração de uma hora.

A aplicação web, é responsável pela agenda do prestador, pelo que quando autenticado na aplicação ele pode ver as sessões futuras que tem agendadas.

A aplicação mobile, é responsável por realizar o agendamento de uma sessão com determinado prestador, sendo que será sempre apenas possível marcar uma sessão dentro da disponibilidade do prestador do serviço

Em ambas as aplicações, web e mobile, é possível o utilizador alterar os seus dados.

A aplicação foi construída usando Node, React e React Native. A aplicação foi escrita em TypeScript e usando padrões como o SOLID e o TDD, com o intuito de padronizar e tipar o código, quer para facilitar a comunicação entre possíveis membros extra de equipa, quer a comunicação entre as diferentes camadas da aplicação. Em todas estas aplicações realizou-se uma bateria de testes para garantir a robustez da aplicação

### Rotas da aplicação

Em baixo segue as rotas disponíveis da aplicação e um resumo do seu objetivo

- **`GET /appointments/me`**: Uma rota autenticada que receberá o token JWT no header `authorization` que devolverá a lista dos agendamentos marcados para o utilizador que enviou a requisição, referentes à data enviada nos `query params`, que são `year`, `month` e `day`

- **`POST /appointments`**: Uma rota autenticada que receberá o token JWT no header `authorization`, que deve receber, no `body` da requisição os parâmetro `provider_id` o **uuid** referente ao prestador de serviço, que queremos realizar o agendamento e `date` a data para a qual queremos que o agendamento seja realizado a qual é enviada com o formato **YYYY-MM-DD HH:mm**. Em caso de sucesso a rota devolve o agendamento criado

- **`POST /users`**: Rota usada para registo de utilizadores a qual recebe no seu `body` os campos `name` a string referente ao nome que o utilizador providenciou, `email` um email válido o qual será usado pela aplicação e `password` a string referente à password que o utilizador providenciou a qual é enviada e armazenada na base de dados em hash usando o bcrypt. Em caso de sucesso, a rota devolve o novo utilizador criado, omitindo a password através de serialização da classe.

- **`PATCH /users/avatar`**: Uma rota autenticada que receberá o token JWT no header `authorization`, que receberá um ficheiro de imagem como `Multipart Form Data`, o qual será processado utilizando o pacote multer e irá armazenar a imagem e também atribuir o avatar ao utilizador o qual passará a estar disponível na aplicação. Em caso de sucesso, a rota devolve o utilizador desta vez com o campo `avatar_url` preenchido com o caminho referente à imagem enviada, agora armazenada.

- **`POST /sessions`**: Rota para criar sessão na aplicação e armazenar a cookie, com o JWT criado e assinado, referente àquele utilizador, para que então possa entrar em rotas autenticadas, as quais necessitam da presença deste token. A rota recebe no `body` os parâmetros `email`, um email válido e existente na aplicação e `password`, a password que está associada a este email, também, no envio, digerida e comparada com a digestão armazenada na base de dados usando o pacote bcrypt. Em caso de sucesso, é criada uma sessão na aplicação criando e devolvendo um JWT e o objeto do utilizador autenticado, devidamente, serializado. O token gerado tem a validade de um dia.

- **`GET /profile`**: Uma rota autenticada que receberá o token JWT no header `authorization` que devolverá os dados referentes ao utilizador que enviou a requisição.

- **`PUT /profile`**: Uma rota autenticada que receberá o token JWT no header `authorization`, receberá, como dados obrigatórios, os campos `email`, que deve ser o email do utilizador autenticado e `name`, o qual pode ser diferente, sendo que efetuará a mudança ao utilizador que enviou a requisição. É possível também mudar a password, passando a receber o campo `old_password`, referente à antiga password do utilizador e tornando mais um campo obrigatório `password` referente à nova password do utilizador, a qual tem uma confirmação e validação no frontend.

- **`GET /providers`**: Uma rota autenticada que receberá o token JWT no header `authorization` que devolverá todos os prestadores de serviço existentes na aplicação exceptuando o utilizador que enviou a aplicação, sendo que um utilizador não pode fazer um agendamento consigo próprio.

- **`GET /providers/:id/month-availability`**: Uma rota autenticada que receberá o token JWT no header `authorization` que recebe nos `route params` o id válido de um prestador de serviço e nos seus `query params` recebe `month` e `year` o ano e o mês do qual queremos ver a disponibilidade. Em caso de sucesso, a rota devolve um array com todos os dias do referido mês e a disponibilide desse mês:

```json
{
  "day": 1,
  "available": true
}
```

A disponibiliade de um mês ficaria `false` se todos os horários desse dia estiverem preenchidos

- **`GET /providers/:id/day-availability`**: Uma rota autenticada que receberá o token JWT no header `authorization` que recebe nos `route params` o id válido de um prestador de serviço e nos seus `query params` recebe `day`, `month` e `year` o ano, o mês e o dia do qual queremos ver a disponibilidade. Em caso de sucesso, a rota devolve um array com todos os horários possíveis desse dia e a sua disponibilidade:

```json
{
  "hour": 8,
  "available": true
}
```

A disponibiliade de um dia ficaria `false` caso já existisse uma marcação para essa hora, ou à hora em que estaríamos a fazer uma marcação, ser uma hora antiga.

### Pacotes utilizados

- **`Injeção de dependências`**: [tsyringe](https://github.com/microsoft/tsyringe)
- **`Gerador de uuid`**: [uuidv4](https://github.com/thenativeweb/uuidv4)
- **`Tokens`**: [JSON Web Token](https://jwt.io/introduction/)
- **`Manipulação de datas`**: [date-fns](https://date-fns.org/)
- **`Hash`**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **`Validação de dados nas requisições`**: [celebrate](https://github.com/arb/celebrate)
- **`Serialização de classes`**: [class-transformer](https://github.com/typestack/class-transformer)
- **`Gestão de upload de ficheiros`**: [multer](https://github.com/expressjs/multer)
- **`Envio de emails (Amazon SES [prod] e Ethereal [dev])`**: [nodemailer](https://github.com/nodemailer/nodemailer), [aws-sdk](https://github.com/aws/aws-sdk-js) e [ethereal](https://github.com/nodemailer/ethereal-www)
- **`Template de email`**: [handlebars](https://github.com/handlebars-lang/handlebars.js)
- **`Base de dados relacional`**: [PostgreSQL](https://www.postgresql.org/)
- **`Base de dados não-relacional para gestão de notificações`**: [MongoDB](https://www.mongodb.com/)
- **`Cache`**: [redis](https://redis.io/)
- **`Segurança nas requisições`**: [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)

### Específicação dos testes

Os testes foram realizados utilizando implementações falsas, quer de repositórios, quer de providers, dada a natureza dos testes, sendo estes testes unitários. Nesta especificação apenas está descrito um breve resumo do conteúdo das várias baterias de testes. As quais foram criadas tendo em conta os serviços existentes da aplicação:

- **`Authenticate User`**: Foram realizados testes para os seguintes cenários: Autenticação com sucesso; Autenticação falha com email incorreto; Autenticação falha com password incorreta.

- **`Create User`**: Foram realizados testes para os seguintes cenários: Criação de usuário com sucesso; Autenticação falha com email já existente;

- **`Reset Password`**: Foram realizados testes para os seguintes cenários: Redefinição da password com sucesso; Redefinição da password falha com token inválido; Redefinição da password falha para usuário inexistente; Redefinição da password falha por passar o tempo limite do token.

- **`Send forgot password email`**: Foram realizados testes para os seguintes cenários: Envio do email com sucesso; Envio do email falha com email de um utilizador que não o próprio ou inexistente; Envio do email gera um token para uso da mudança de password.

- **`Show profile`**: Foram realizados testes para os seguintes cenários: O perfil do utilizador é mostrado com sucesso; O perfil do utilizador não é mostrado para utilizador não existente;

- **`Update profile`**: Foram realizados testes para os seguintes cenários: Atualização de perfil realizada com sucesso; Atualização de perfil falha com id inexistente; Atualização de perfil falha por alteração para email já em uso; Atualização de perfil e password realizada com sucesso; Atualização de perfil e password falha por falta da password antiga; Atualização de perfil e password falha com password antiga errada.

- **`Update user avatar`**: Foram realizados testes para os seguintes cenários: Atualização do avatar feita com sucesso; Atualização do avatar falha com id inexistente; Atualização do avatar feita com sucesso e substitui avatar antigo.

- **`Create appointment`**: Foram realizados testes para os seguintes cenários: Criação de agendamento feita com sucesso; Criação de agendamento na mesma data deve falhar; Criação de agendamento na mesma data deve passa se o prestador for diferente; Criação de agendamento em data passada deve falhar; Criação de agendamento em que o prestador é o utilizador deve falhar; Criação de agendamento antes das 8h deve falhar; Criação de agendamento antes das 17h deve falhar.

- **`List provider appointments`**: Foram realizados testes para os seguintes cenários: A listagem de agendamentos de um prestador é recebida com sucesso.

- **`List provider month availability`**: Foram realizados testes para os seguintes cenários: A listagem da disponibilidade mensal de um prestador é recebida com sucesso.

- **`List provider day availability`**: Foram realizados testes para os seguintes cenários: A listagem da disponibilidade diária de um prestador é recebida com sucesso.

- **`List providers`**: Foram realizados testes para os seguintes cenários: A listagem de todos os prestadores é feita com sucesso, sem trazer o id do utilizador autenticado

## :sparkles: :zap: Um toque especial

Ao longo de todo o bootcampo, algumas decisões podem ter sido diferentes das propostas, quer por opinião pessoal, quer por acrescento à aplicação, quer por realidades e/ou cultura diferentes.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💙 by Gonçalo Santos :wave: [Mais projetos!](https://github.com/goncalobsantos)
