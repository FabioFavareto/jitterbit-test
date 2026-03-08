Inicializando o projeto:

Clonar projeto, verificar se seus dados do SQL batem com o padrão do .env e rodar npm install

Depois disso:
npm run dev -> Inicia em modo desenvolvimento
npm run migrate -> Cria o banco e as tabelas

Utilizando o Postman:
Importar a coleção que está postada junto ao código
Abra o Postman
Clique em Import no canto superior esquerdo
Importe os dois arquivos:
- jitterbit.postman_collection.json
- jitterbit.postman_environment.json
  
No canto superior direito, selecione o environment Jitterbit Local, abra ele e adicione o base_url (Ex: http://localhost:3000)
