# ORM - Object Relational Mapping

- Mapeamos registos da BD com objetos no JS
- Criamos models no projeto e esses models quando criados instâncias deles, ou alterados isso se reflete na BD
- repository.save()

# Docker

- Criação de ambientes isolados (container e subsistema, não interfere com o nosso servidor, com o sistema)
- Containers expõe portas para comunicação

## Principais conceitos do docker

- Imagem é um serviço disponível do docker
- Container é uma instância de uma imagem
- Docker registry (Docker hub) onde estão as imagens
- Dockerfile é a receita para montar a nossa imagem
- Dockerfile define como a imagem da nossa aplicação funciona

# Migrations

- typeorm using ormconfig
- use command ts-node-dev typeorm to run migrations and all that
- migrations can only be changed if they are local and not pushed to DB
- otherwise you should drop the migration and change (migration:revert)
- if it has been pushed you should create a new one

# Arquitetura e testes

## DDD (Domain driven design)

- Domínio é qual a área de conhecimento de determinado arquivo/módulo
- Separar os arquivos por tipo de arquivo nem sempre dá certo (aplicações grande fica muito grande)
- Apenas ao backend

### Dominio

- Camada que quem não tem conhecimento de programação deve conseguir ler
- Apenas tem responsabilidade sobre as regras de negócio
- Como a aplicação deve funcionar
- Sabe que o usuário deve receber um email depois do registo, mas não sabe como

### Infra

- Ferramentas que escolhemos para relacionar com a camada de domínio
- BD, Express, Mailer, ...
- Decisões técnicas da nossa aplicação

## TDD (Test driven development)

- Criamos os nossos testes antes de criar as funcionalidades
- Testes automáticos
- A aplicação continua funcionand independentemente do número de novas funcionalidades e do nr de devs

### Tipos de testes

1. Testes unitários (TDD)
   - Testam funcionalidades específicas (funções puras)
   - Função pura não faz chamada a API, não tem efeito colateral
2. Testes de integração (Prova que a aplicação funciona como um todo)
   - Testam uma funcionalidade completa, passando por várias camadas da aplicação
3. Testes E2E
   - Testes que simulam a ação do usuário dentro da nossa aplicação (mais para interfaces)

# Variáveis ambiente

- Ambientes de desenvolvimento, produção, staging, etc
- .env
- dotenv

# Cache

- Redis (sem tabelas)
- Tabela grande com chave e valor, género de objetos
