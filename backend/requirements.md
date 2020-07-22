# Levantamento de requisitos

## Atualização do perfil

**RF**

- O usuário deve poder atualizar o seu nome, email e senha e avatar

**RN**

- O usuário não pode alterar o seu email para um email já em uso
- Para atualizar a senha o usuário deve informar a senha antiga
- Para atualizar a senha o usuário precisa confirmar a nova senha

## Recuperação de senha

**RF**

- O usuário deve poder recuperar a senha informando o seu email
- O usuário deve receber um email com instruções de recuperação da senha
- O usuário deve poder resetar a sua senha

**RNF**

- Utilizar mailtrap para testes de email em desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de emails deve acontecer em segundo plano (Background job)

**RN**

- O link enviado por email para resetar a senha, deve expirar em 2h
- O usuário precisa confirmar a senha para dar o reset

## Painel do prestador

**RF**

- O usuário deve poder listar os seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve um status de lida ou não lida para que o prestador possa controlar

## Agendamento de serviço

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador específico
- O usuário deve poder listar horários disponíveis de um dia específico de um prestador
- O usuário deve poder agendar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores devem ser armazenadas em cache

**RN**

- Cada agendamento deve durar uma hora
- Os agendamentos devem estar disponíveis entre 8h até às 18h (primeiro ás 8h, último às 17h)
- O usuário não pode agendar num horário já ocupado
- O usuário não pode agendar num horário que já passou
- O usuário não pode agendar serviços com ele próprio

# Notas

- Funcionalidade macro (grandes blocos)
- Funcionalidades micro (funcionalidades dentro das macro):
  - RF - Requisitos funcionais
    - Que funcionalidades há dentro da macro?
  - RNF - Requisitos não funcionais
    - O que não está ligado diretamente com a regra de negócio
  - RN - Regras de negócio
    - Sempre associada ao RF + Se não conseguir associar algo está mal
