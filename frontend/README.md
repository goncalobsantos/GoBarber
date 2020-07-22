<img alt="< GSantosDev />" src="./public/banner-gs.png" />

<h3 align="center">
  Frontend da aplicação GoBarber (Bootcamp GoStack 2020)
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

- **`/`**: Rota inicial da aplicação que caso não exista nenhum token válido que esteja armazenado a páginda de sign in é renderizada, caso haja um token válido armazenado o utilizador é redirecionado para a rota /dashboard

- **`/signup`**: Rota que renderiza a página de sign up que é responsável por receber os dados necessário para um registo de um utilizador na aplicação e também validar os dados recebidos através do yup

- **`/forgot-password`**: Rota que renderiza uma página onde o utilizador coloca o email para o qual a aplicação deve enviar uma mensagem para recuperação do email

- **`/reset-password`**: Uma rota apenas possível ser renderizada através do link recebido no email, a qual também é verificada através do token que está associado ao reset de password. Vai receber os campos de password necessários à chamada da api e verificar os dados passados

- **`/dashboard`**: Rota privada, apenas acessível com autenticação do utilizador na qual são renderizados os agendamentos do prestador autenticado e onde ele pode percorrer os vários dias de um mês e verificar as suas marcações para os períodos da manhã e tarde

- **`/profile`**: Rota que renderiza o perfil do utilizador autenticado, o formulário já tem o nome e email pré preenchidos e também faz a verificação dos campos utilizando o yup

### Pacotes utilizados

- **`Rotas`**: [react-router-dom](https://github.com/ReactTraining/react-router)
- **`Chamadas à API`**: [axios](https://github.com/axios/axios)
- **`Selector de datas para agendamentos`**: [react-day-picker](https://react-day-picker.js.org/)
- **`Gestão de formulários`**: [unform](https://github.com/Rocketseat/unform)
- **`Icones`**: [react-icons](https://github.com/react-icons/react-icons)
- **`Estilização`**: [styled-components](https://styled-components.com/)
- **`Estilização de cores`**: [polished](https://github.com/styled-components/polished)
- **`Animações`**: [react-spring](https://styled-components.com/)
- **`Validação de dados`**: [yup](https://github.com/jquense/yup)
- **`Manipulação de datas`**: [date-fns](https://date-fns.org/)

### Específicação dos testes

Os testes foram realizados para as três partes do projeto: components, hooks e pages. Onde para cada caso realizou-se testes verificando se a renderização do layout era feita corretamente, bem como o disparo de eventos proporcionava resultados corretos. Foram utilizados mocks para que não se dependesse da api ou fontes externas para o correto funcionamento dos testes:

- **`Componente de Input`**: Foram realizados testes para os seguintes cenários: A renderização com sucesso do componente; O highlight correto do componente no focus e no blur; A estilização correta do componente quando tem o texto preenchido

- **`Hook de autenticação`**: Foram realizados testes para os seguintes cenários: Funçao de login é feita com sucesso; No startup do hook informação armazenada é restaurada corretamente; A função de logout é feita corretamente; A função de atualização do utilizador é feita corretamente

- **`Página de Sign In`**: Foram realizados testes para os seguintes cenários: Deve ser possível fazer o sign in; Não deve ser possível fazer sign in com credenciais inválidas; Deve mostrar erros caso haja alguma falha.

## :sparkles: :zap: Um toque especial

Ao longo de todo o bootcampo, algumas decisões podem ter sido diferentes das propostas, quer por opinião pessoal, quer por acrescento à aplicação, quer por realidades e/ou cultura diferentes.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💙 by Gonçalo Santos :wave: [Mais projetos!](https://github.com/goncalobsantos)
