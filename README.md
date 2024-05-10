## Passo a passo para deploy e utilização:

#### Pre requisitos:

- Docker instalado na maquina
- Portas livres no sistema operacional: 8000, 8001, 8002, 8003, 8004, 27017
- Node JS v18.14.0 (Necessário para a seunda e terceira etapa, caso não queira instalar o Node JS em sua máquina, pode popular o banco de dados manualmente, os dados estão /src/models/seed/data.json.)

#### Primeira etapa:

Acesse a pasta /rede-distribuida via terminal e inicie os container Docker com o comando abaixo

```
docker-compose up -d
```

#### Segunda etapa:

Instale as dependencias da aplicação com o comando:

```
npm install
```

#### Terceira etapa:

Acesse a pasta /rede-distribuida/src/models/seed via terminal e popule o banco de dados com o comando abaixo:

```
node index.js
```

#### Quarta etapa:

Após realizar as 3 etapas anteriores já será possível buscar os dados nos servidores, para isso realize uma requisição GET para o seguinte endpoint:

```
http://localhost:PORTA_SERVIDOR_DESEJADO/find?id=ID_DADO_DESEJADO
```

Substitua PORTA_SERVIDOR_DESEJADO pela porta de algum dos servidores (8000, 8001, 8002, 8003, 8004) e ID_DADO_DESEJADO por algum ID da planilha localizada em /rede-distribuida/src/models/seed/data.json.

Exemplo de requisição:

```
http://localhost:8003/find?id=14588464
```
