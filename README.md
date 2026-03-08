Inicializando o projeto:

Clonar projeto, verificar se seus dados do SQL batem com o padrão do .env e rodar npm install

Depois disso:
npm run dev -> Inicia em modo desenvolvimento
npm run migrate -> Cria o banco e as tabelas

Estrutura do código: 

jitterbit/
├── src/
│   ├── config/
│   │   ├── database.js         # Conexão com o MySQL
│   │   ├── migration.sql       # Criação das tabelas
│   │   ├── runMigration.js     # Script para rodar a migration
│   ├── controllers/
│   │   ├── authController.js   # Lógica de autenticação
│   │   └── orderController.js  # Lógica dos pedidos
│   ├── middlewares/
│   │   ├── auth.js             # Validação JWT
│   │   └── errorHandler.js     # Tratamento de erros
│   ├── repositories/
│   │   └── orderRepository.js  # Queries SQL
│   ├── routes/
│   │   ├── authRoutes.js       # Rotas de autenticação
│   │   ├── orderRoutes.js      # Rotas de pedidos
│   │   └── index.js            # Agrupa todas as rotas
│   ├── services/
│   │   └── orderService.js     # Regras de negócio
│   └── utils/
│       └── mapper.js           # Mapeamento dos dados
├── .env
├── .gitignore
├── package.json
├── server.js
├── jitterbit.postman_collection.json -> Postman
├── jitterbit.postman_environment.json -> Variaveis Postman
└── README.md

Utilizando o Postman:
Importar a coleção que está postada junto ao código
Abra o Postman
Clique em Import no canto superior esquerdo
Importe os dois arquivos:
- jitterbit.postman_collection.json
- jitterbit.postman_environment.json
No canto superior direito, selecione o environment Jitterbit Local, abra ele e adicione o base_url (Ex: http://localhost:3000)
