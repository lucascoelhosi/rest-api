# rest-api

API Rest desenvolvida para aplicar conceitos de desenvolvimento de API com Node JS, juntamente com conhecimentos adquiridos sobre desenvolvimento Back End para bancos de dados relacionais.

## BACKEND


##### Instalando as dependências

Para instalar as dependências do projeto, pode estar executando

```sh
yarn install
```

##### Rodando as migrations do banco de dados

Para gerar a base de dados com as migrações da aplicação, basta rodar o comando abaixo

```sh
yarn sequelize db:migrate
```

Lembrando que neste projeto é usado o Sqlite3 como base de dados de teste. Caso queira usar um outro de sua preferência, basta alterar nas configurações de conexão com bancos de dados. Mais especificamente em 

```sh
src => config => database.js
```

seguindo as regras de configuração da documentação oficial do [Sequelize] (https://sequelize.org/master/)

##### Rodando a aplicação local (dev)

```sh
yarn dev
```

###### [http://localhost:3333](http://localhost:3333)
