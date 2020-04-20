# FastFeet - Backend

Projeto de conclusão do Bootcamp da [Rocketseat](https://rocketseat.com.br/). Backend utilizando Node/Express/Postgres/MongoDB/Redis/Nodemailer

Dentro dessa stack cada ferramenta tem sua responsabilidade:

- **Node/Express:** Gerenciamento de requisições HTTP do frontend e mobile;
- **Postgres:** Armazenamento dos dados das entregas, destinatários, entregadores e usuários;
- **MongoDB:** Armazenamento de problemas ocasionados na entrega;
- **Redis:** Armazenamento de solicitações e envio de e-mail;
- **Nodemailer:** Envio de e-mails de confirmação e cancelamento para os entregadores.

## Rodando o Backend

Instale suas dependências:

```
cd bootcamp-fastfeet/backend
yarn
```

A partir daqui você precisará do [Docker](https://www.docker.com/) instalado:

Crie arquivo de variáveis de ambiente utilizando o exemplo **.env.example**

Dentro desse arquivo preencha algumas configurações estáticas:

```

# Auth - Utilizado para criptografia do token da autenticação do usuário
APP_SECRET=

# Database - Credenciais do banco de dados Postgres
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

# Mongo - Acesso MongoDB
MONGO_URL=

# Redis - Acesso Redis
REDIS_HOST=
REDIS_PORT=

# Mail - Credenciais de e-mail
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

# Sentry - DSN do Sentry para monitoramente de erros
SENTRY_DSN=
```

Agora com o Docker vamos criar nosso containers:

- **Docker Compose**

```
docker-compose up
```

Ou

- **Manualmente**

```
docker run --name postgres -e POSTGRES_PASSWORD=minhasenha -e POSTGRES_DB=nomebanco -p 5432:5432 -d postgres:11

docker run --name mongo -p 27017:27017 -d mongo

docker run --name redis -p 6379:6379 -d redis:alpine
```

Com o servidor criado executaremos nossas migrations para o Postgres montar a base de dados:

```
yarn sequelize db:migrate

yarn sequelize db:seed:all
```

Agora você poderá iniciar o servidor de aplicação:

- **Servidor de aplicação**

```
yarn dev
```

Ou

- **Servidor de aplicação em modo de depuração**
```
yarn dev:debug
```

- **Servidor de gerenciamento do envio de e-mails**

```
yarn queue
```

Se tudo ocorreu bem você poderá acessar o servidor em http://localhost:3333

