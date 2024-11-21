
### Comandos do prisma 
````

npm run prisma:local:push

npm run prisma:local:pull

npm run prisma:local:generate

npm run prisma:local:migrate


````

### exemplo de env:
`````

DATABASE_URL="mysql://root:aluno@localhost:3306/jooby_db"
PORT=5000
ENVIRONMENT=local
HOST=http://localhost
NODE_ENV=development
SECRET_KEY=myChavesecreta12345!@#
CLIENT_ORIGIN_URL="*"
TMDB_API_KEY=528e5a120a135df10c177389a8481736




### Para puxar os códigos da branch master para a sua branch atual, siga os seguintes passos:
``````

git checkout sua-branch

git pull origin master

git checkout sua-branch

git merge master

