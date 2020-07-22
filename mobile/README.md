<img alt="< GSantosDev />" src="./banner-gs.png" />

<h3 align="center">
  Mobile da aplicação GoBarber (Bootcamp GoStack 2020)
</h3>

<blockquote align="center">“Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu: (...) Tempo para plantar e tempo para arrancar o que se plantou”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/goncalobsantos/GoBarber?color=%23FF914D">

  <a href="https://github.com/goncalobsantos">
    <img alt="Made by Gonçalo Santos" src="https://img.shields.io/badge/made%20by-Gonçalo%20Santos-%23FF914D">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%23FF914D">

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

- **`SignIn`**: Rota inicial para autenticação do usuário que caso já tenha um token válido armazenado é redirecionado para a página Dashboard

- **`SignUp`**: Rota para registo de um novo usuário recebendo os dados necessários à requisiçãoe validando os mesmos com o yup

- **`Dashboard`**: Página inicial onde o utilizador pode ver os prestadores de serviço existentes e selecionar para iniciar a criação de um agendamento

- **`CreateAppointment`**: Página que renderiza inicialmente a disponibilidade do prestador anteriormente selecionado da página Dashboard, mas que mantém na mesma uma lista de todos os prestadores existentes na aplicação sendo possível sempre ver a sua disponibilidade, mensal e diário

- **`AppointmentCreated`**: Após selecção do dia e hora na página CreateAppointment o utilizador é redirecionado para esta página que mostra o sucesso da sua marcação dando informação da data e hora e o prestador para o qual marcou

- **`Profile`**: Rota do perfil do utilizador autenticado, sendo possível realizar a atualização do perfil e com as validações devidamente necessárias para o correto funcionamento da aplicação.

### Pacotes utilizados

- **`Armazenamento local`**: [@react-native-community/async-storage](https://github.com/react-native-community/async-storage)
- **`Chamadas à API`**: [axios](https://github.com/axios/axios)
- **`Selector de datas para agendamentos`**: [@react-native-community/datetimepicker](https://github.com/react-native-community/datetimepicker)
- **`Gestão de formulários`**: [unform](https://github.com/Rocketseat/unform)
- **`Estilização`**: [styled-components](https://styled-components.com/)
- **`Estilização de cores`**: [polished](https://github.com/styled-components/polished)
- **`Botões e ações clicáveis`**: [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- **`Validação de dados`**: [yup](https://github.com/jquense/yup)
- **`Manipulação de datas`**: [date-fns](https://date-fns.org/)
- **`Alteração de imagens`**: [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)

### Específicação dos testes

Apenas se realizou um teste à página de sign in, pois os testes realizados relativos aos hooks e componentes foram feitos no frontend. A aplicação mobile partilha dos mesmos hooks e componentes, a repetição dos testes não faria sentido

- **`Página de Sign In`**: Foram realizados testes para os seguintes cenários: Verificação da existência dos inputs de email e password

## :sparkles: :zap: Um toque especial

Ao longo de todo o bootcampo, algumas decisões podem ter sido diferentes das propostas, quer por opinião pessoal, quer por acrescento à aplicação, quer por realidades e/ou cultura diferentes.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💙 by Gonçalo Santos :wave: [Mais projetos!](https://github.com/goncalobsantos)
