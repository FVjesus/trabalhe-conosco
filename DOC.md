# Este arquivo contem as instruções para execução do projeto

## 🛠️ Ferramentas e Tecnologias Utilizadas

- TypeScript
- NodeJS
- Postgresql
- Docker
- Docker Compose
- Jest
- Swagger
- Express

## 📒 Observações sobre o desenvolvimento

### Organização do projeto

Para organizar o projeto foi seguido alguns conceitos de arquitetura em camadas, separando o projeto em 3 camadas principais: controller, service e repository.

### Teste

Para algumas funcionalidades foram desenvolvidos testes de unidade, porém não foram tratados todos os cenários nos teste. Para melhorar o projeto podem ser incluídos novos e mais completos cenários de testes.

Nesse projeto o arquivo .env foi enviado ao github com senhas e chaves de autenticação para facilitar a analise do case. Em projetos reais esses dados não são enviados ao GitHub.

## 🚀 Como executar o projeto

Primeiro execute o container docker utilizando o seguinte comando
```docker-compose up -d```. Caso não tenha o docker instalado em seu sistema siga este [passo a passo](https://docs.docker.com/get-docker/)

Após executar o container será necessário configurar a base de dados com o schema necessário, execute este comando ```npm run db:migrate``` ele fará com que o prisma execute as migrations necessárias para a configuração do banco de dados.

Caso queira povoar o banco com alguns dados utilize o comando ```npm run db:seed``` ele irá adicionar alguns produtores em sua base de dados.

Execute o comando ```npm run dev``` para executar o ambiente local de desenvolvimento, o usuário admin será criado automáticamente no banco de dados.

Execute ```npm test``` para executar os testes unitários implementados no sistema

### Documentação API

Após executar o sistema a documentação para a api estará disponível em http://localhost:3000/api-docs