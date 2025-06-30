# Projeto GT - Backend API

API backend construída com Node.js, Express e MySQL, usando Sequelize como ORM.  
Inclui autenticação JWT, rotas para usuários, categorias, produtos, etc.

---

## Sumário
- [Desenvolvedores](#desenvolvedores)
- [Tecnologias usadas](#tecnologias-usadas)
- [Requisitos](#requisitos)
- [Instalação](#instalacao)
- [Endpoint para autenticação](#endpoint-para-autenticacao)
- [Endpoint para users](#endpoints-para-users)
- [Endpoint para category](#endpoints-para-category)
- [Endpoint para products](#endpoint-para-products)


---
## Desenvolvedores
Nome: Felepe Santos Paiva <br>
Email: felipe.geo.uece@gmail.com

Nome: Victor Matheus Bezerra de Sena <br>
Email: 

## Tecnologias usadas

- Node.js (ES Modules)
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (autenticação)

---

## Requisitos

- Node.js v18 ou superior
- MySQL (local ou remoto)
- npm ou yarn

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-gt-backend.git
   cd projeto-gt-backend

2. Instale as dependências
   ```bash
   npm install
3. Crie um arquivo .env na raiz do projeto com as variavéis necessárias
   ```bash
    PORT=3001
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=nome_do_banco
    JWT_SECRET=sua_chave_secreta_jwt
4. Execute as migrations para criar as tabelas no banco de dados
```bash
    npx sequelize-cli db:migrate
```
5. Como rodar
```bash
npm run dev
```
## Endpoint para autenticação

### POST /v1/user/token

```bash
curl -X POST http://localhost:3001/v1/user/token \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@mail.com",
    "password": "123@123"
  }'
```
Resposta de sucesso (200 OK)
```json
{
  "token": "<JWT>"
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "E-mail ou senha inválidos."
}
```
## Endpoint para Users
GET<br>
curl -X GET http://localhost:3001/v1/user/1
Resposta de sucesso (200 OK)
```json
{
  "id": 1,
  "firstname": "user firstname",
  "surname": "user surname",
  "email": "user@mail.com"
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Usuário não encontrado."
}
```
-----
POST<br>
```bash
curl -X POST http://localhost:3001/v1/user
-H "Content-Type: application/json" \
-d '
```
```json
{
"firstname": "user firstname",
"surname": "user surname",
"email": "user@mail.com",
"password": "123@123",
"confirmPassword": "123@123"
}
```
Resposta de sucesso (201 Created)
```json
{
  "id": 1,
  "firstname": "user firstname",
  "surname": "user surname",
  "email": "user@mail.com"
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
----
PUT<br>
curl -X PUT http://localhost:3001/v1/user/1 
```bash
  -H "Content-Type: application/json" 
  -H "Authorization: Bearer <seu_token>" 
  -d 
    "firstname": "user firstname",
    "surname": "user surname",
    "email": "user@mail.com"
}
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```
{
  "msg": "Usuário não encontrado."
}
```
----
DELETE<br>
curl -X DELETE http://localhost:3001/v1/user/1
```bash
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>"
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Usuário não encontrado."
}
```
-------
## Endpoint para category
GET<br>
```bash
curl -X GET "http://localhost:3001/v1/category/search?limit=-1&fields=name,slug&use_in_menu=true"
```
Resposta de sucesso (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "name": "Shoes",
      "slug": "shoes",
      "use_in_menu": true
    },
    {
      "id": 2,
      "name": "Offers",
      "slug": "offers",
      "use_in_menu": true
    },
    {
      "id": 3,
      "name": "Black Friday",
      "slug": "black-friday",
      "use_in_menu": false
    }
  ],
  "total": 10,
  "limit": -1,
  "page": 1
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "Parâmetros da requisição inválidos."
}
```
----
GET
```bash
curl -X GET http://localhost:3001/v1/category/1
```
Resposta de sucesso (200 OK)
```json
{
  "id": 1,
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Categoria não encontrada."
}
```
----
POST
```bash
curl -X POST http://localhost:3001/v1/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{
    "name": "Shoes",
    "slug": "shoes",
    "use_in_menu": true
  }
```
Resposta de sucesso (201 Created)
```json
{
  "id": 1,
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
----
PUT
```bash
curl -X PUT http://localhost:3001/v1/category/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{
    "name": "Shoes",
    "slug": "shoes",
    "use_in_menu": true
  }
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Categoria não encontrada."
}
```
----
DELETE
```bash
curl -X DELETE http://localhost:3001/v1/category/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>"
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Categoria não encontrada."
}
```
----
## Endpoint para products
GET
```bash
curl -X GET "http://localhost:3001/v1/product/search?limit=30&page=2&fields=name,images,price&match=Tênis&category_ids=15,24&price-range=100-200&option[45]=GG,PP"
```
Resposta de sucesso (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "enabled": true,
      "name": "Produto 01",
      "slug": "produto-01",
      "stock": 10,
      "description": "Descrição do produto 01",
      "price": 119.90,
      "price_with_discount": 99.90,
      "category_ids": [1, 15, 24, 68],
      "images": [
        {
          "id": 1,
          "content": "https://store.com/media/product-01/image-01.png"
        },
        {
          "id": 2,
          "content": "https://store.com/media/product-01/image-02.png"
        },
        {
          "id": 3,
          "content": "https://store.com/media/product-01/image-02.jpg"
        }
      ],
      "options": [
        {
          "id": 1
          // ...
        },
        {
          "id": 2
          // ...
        }
      ]
    }
  ],
  "total": 120,
  "limit": 12,
  "page": 1
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "Parâmetros da requisição inválidos."
}
```
----
GET
```bash
curl -X GET http://localhost:3001/v1/product/1
```
Resposta de sucesso (200 OK)
```json
{
  "id": 1,
  "enabled": true,
  "name": "Produto 01",
  "slug": "product-01",
  "stock": 10,
  "description": "Descrição do produto 01",
  "price": 119.90,
  "price_with_discount": 99.90,
  "category_ids": [1, 15, 24, 68],
  "images": [
    {
      "id": 1,
      "content": "https://store.com/media/product-01/image-01.png"
    },
    {
      "id": 2,
      "content": "https://store.com/media/product-01/image-02.png"
    },
    {
      "id": 3,
      "content": "https://store.com/media/product-01/image-02.jpg"
    }
  ],
  "options": [
    {
      "id": 1
      // ...
    },
    {
      "id": 2
      // ...
    }
  ]
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Produto não encontrado."
}
```
----
POST
```bash
curl -X POST http://localhost:3001/v1/product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{
    "enabled": true,
    "name": "Produto 01",
    "slug": "produto-01",
    "stock": 10,
    "description": "Descrição do produto 01",
    "price": 119.90,
    "price_with_discount": 99.90,
    "category_ids": [1, 15, 24, 68],
    "images": [ 
      {
        "type": "image/png",
        "content": "base64 da imagem 1" 
      },
      {
        "type": "image/png",
        "content": "base64 da imagem 2" 
      },
      {
        "type": "image/jpg",
        "content": "base64 da imagem 3" 
      }
    ],
    "options": [
      {
        "title": "Cor",
        "shape": "square",
        "radius": "4px",
        "type": "text",
        "value": ["PP", "GG", "M"]
      },
      {
        "title": "Tamanho",
        "shape": "circle",
        "type": "color",
        "values": ["#000", "#333"]
      }
    ]
  }'
```
Resposta de sucesso (201 Created)
```json
{
  "id": 1,
  "name": "Produto 01",
  "slug": "produto-01",
  "price": 119.9,
  "category_ids": [1, 15, 24, 68],
  "images": [...],
  "options": [...]
}
```
Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
PUT
```bash
curl -X PUT http://localhost:3001/v1/product/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{
    "enabled": true,
    "name": "Produto 01 atualizado",
    "slug": "produto-01-atualizado",
    "stock": 20,
    "description": "Descrição do produto 01 atualizado",
    "price": 49.9,
    "price_with_discount": 0,
    "category_ids": [1, 15, 24, 68],
    "images": [ 
      {
        "type": "image/png",
        "content": "base64 da imagem 1" 
      },
      {
        "id": 2,
        "deleted": true
      },
      {
        "id": 3,
        "content": "base64 da imagem 3" 
      },
      {
        "id": 1,
        "content": "https://store.com/media/product-01/image-01.jpg"
      }
    ],
    "options": [
      {
        "id": 1,
        "deleted": true
      },
      {
        "id": 2,
        "radius": "10px",
        "value": ["42/43", "44/45"]
      },
      {
        "title": "Tipo",
        "shape": "square",
        "type": "text",
        "values": ["100% algodão", "65% algodão"]
      }
    ]
  }'
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (400 Bad Request)
```json
{
  "msg": "Campos obrigatórios ausentes ou inválidos."
}
```
Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Produto não encontrado."
}
```
DELETE
```bash
curl -X DELETE http://localhost:3001/v1/product/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>"
```
Resposta de sucesso (204 No Content)
(Sem corpo de resposta)

Resposta de erro (401 Unauthorized)
```json
{
  "msg": "Token de autenticação inválido ou ausente."
}
```
Resposta de erro (404 Not Found)
```json
{
  "msg": "Produto não encontrado."
}
```







