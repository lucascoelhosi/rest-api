# API REST COM NODE JS E SEQUELIZE

### 📜 Sobre

API Rest desenvolvida para aplicar conceitos de desenvolvimento de API com Node JS, juntamente com conhecimentos adquiridos sobre desenvolvimento Back-End para bancos de dados relacionais.

### 🔽 Requisitos
1. Ter o **NodeJs** e o **Yarn** instalados

### :rocket: Começando

```sh
git clone https://github.com/lucascoelhosi/rest-api.git
cd rest-api
```

#### Instalando as dependências

Para instalar as dependências do projeto, pode estar executando

```sh
yarn install
```

#### Arquivo de configuração .env

```sh
Criar o arquivo .env com base no .env.example
```

#### Rodando as migrations do banco de dados

Para gerar a base de dados com as migrações da aplicação, basta rodar o comando abaixo

```sh
yarn sequelize db:migrate
```

Lembrando que neste projeto é usado o Sqlite3 como base de dados de teste. Caso queira usar um outro de sua preferência, basta alterar nas configurações de conexão com bancos de dados. Mais especificamente em 

```sh
src => config => database.js
```

seguindo as regras de configuração da documentação oficial do [Sequelize](https://sequelize.org/master/)

### Rodando a aplicação local (dev)

```sh
yarn dev
```

###### [http://localhost:3333](http://localhost:3333)

### 🧰  Ferramentas utilizadas
- **NodeJs** - O Node.js® é um Runtime JavaScript criado no mecanismo JavaScript V8 do Chrome 
- **Express** - Framework web rápido, flexível e minimalista para trabalhar com Rotas no Node.js
- **Sequelize** - Sequelize é um ORM Node.js baseado em Promisses para Postgres, MySQL, MariaDB, SQLite e Microsoft SQL Server.
- **JWT** - Biblioteca de Autenticação
- **NodeMailer** - Nodemailer é um módulo para aplicativos de e-mail com Node.js
- **Nodemon** - O Nodemon é um utilitário que monitora qualquer alteração na sua fonte e reinicia automaticamente o servidor. Bem útil para usar no ambiente de desenvolvimento.

<hr>
<p align="center"> com :heart: Lucas Coelho </p>