# FastFeet - Backend

Projeto de conclusão do Bootcamp da Rocketseat. Backend utilizando Node/Express/Postgres/MongoDB/Redis/Nodemailer

Dentro dessa stack cada ferramenta tem sua responsabildiade:

- **Node/Express:** Gerenciamento de requisições HTTP do frontend e mobile;
- **Postgres:** Armazenamento dos dados das entregas, destinatários, entregadores e usuários;
- **MongoDB:** Armazenamento de problemas ocasionados na entrega;
- **Redis:** Armazenamento de solicitações e envio de e-mail;
- **Nodemailer:** Envio de e-mails de confirmação e cancelamento para os entregadores;

## Rodando o Backend

Instale suas dependências:

```
cd bootcamp-fastfeet/backend
yarn
```

A partir daqui você precisará do [Docker](https://www.docker.com/) instalado:

Crie arquivo de variáveis de ambiente utilizando o exemplo **./.env.example**

Dentro desse arquivo preencha algumas configurações estáticas:

```

# Auth - Utilizado para criptografia do token da autenticação do usuário
APP_SECRET=95a20ec124be28749016ebc1e46382e8

# Database - Credenciais do banco de dados Postgres
DB_HOST=localhost
DB_USER=postgres
DB_PASS=123@abc
DB_NAME=fastfeed

# Mongo - Acesso MongoDB
MONGO_URL=mongodb://localhost:27017/fastfeet

# Redis - Acesso Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail - Credenciais de e-mail
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=
MAIL_PASS=

# Sentry - DSN do Sentry para monitoramente de erros
SENTRY_DSN=https://52fe838caf2f4736ba1dd0eb043b734b@sentry.io/1806049
```

Agora com o Docker vamos subir nossos containers:

```
docker-compose up -d
```

Com o servidor criado executaremos nossas migrations para o Postgres montar a base de dados:

```
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

Agora você poderá iniciar o servidor de aplicação e o servidor de envio de e-mails:

```
#Servidor de aplicação
yarn dev

Ou

#Servidor de aplicação em modo depuração
yarn dev:debug

#Servidor gerenciamento de envio de e-mails
yarn queue
```

Se tudo ocorreu bem você poderá acessar o servidor em http://localhost:3333

