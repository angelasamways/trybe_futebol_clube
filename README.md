### README

Este projeto foi desenvolvido durante o período de Curso da Trybe 🚀

O TFC (Trybe Futebol Clube) é um site informativo sobre partidas e classificações de futebol! ⚽️ Possui uma tabela detalhada que pode ser alterada fazendo requisições ao backend e também lida com jogos ao vivo.

O objetivo é construir um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento deve respeitar regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ Banco de dados:

	•	Container docker MySQL já configurado no docker-compose através de um serviço definido como db.
	•	Tem o papel de fornecer dados para o serviço de backend.
	•	Durante a execução dos testes sempre vai ser acessado pelo sequelize e via porta 3002 do localhost.
	•	Também é possível conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço db.

2️⃣ Back-end:

	•	É o ambiente aonde tem a maior parte das implementações exigidas.
	•	Rodar na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão.
	•	É inicializada a partir do arquivo app/backend/src/server.ts.
	•	O express é executado e a aplicação ouve a porta que vem das variáveis de ambiente.

3️⃣ Front-end:

	•	O front foi provido pela própria Trybe, não foi necessário realizar modificações no mesmo. A única exceção foi seu Dockerfile que precisou ser configurado.
	•	Todos os testes a partir do requisito de login usam o puppeteer para simular uma pessoa acessando o site http://localhost:3000/.
	•	O front se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints que foram construídos nos requisitos.

4️⃣ Docker:

	•	O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up.
	•	Foram configuradas as Dockerfiles corretamente nas raízes do front-end e back-end, para conseguir inicializar a aplicação.
