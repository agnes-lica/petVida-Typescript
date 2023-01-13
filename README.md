# projetofinal-vidaPet-m4

# Documentação da API

## Tabela de Conteúdos

---

-   [Visão Geral](#1-visão-geral)
-   [Diagrama ER](#2-diagrama-er)
    -   [Início Rápido](#3-inicio-rápido)
    -   [Instalando dependências](#31-instalando-dependências)
        -   [Variáveis de Ambiente](#32-variáveis-de-ambiente)
        -   [Migrations](#33-migrations)
-   [Autenticação](#4-autenticação)
-   [Endpoints](#5-endpoints)

---

## 1. Visão Geral

---

<a href="#">Voltar ao topo</a>

### Visão geral do projeto, um pouco das tecnologias usadas.

-   <a href="https://nodejs.org/en/" target="_blank">NodeJs</a>
-   <a href="https://typeorm.io/" target="_blank">Typeorm</a>
-   <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>
-   <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>

### A URL base da aplicação:

---

## 2. Diagrama ER

---

<a href="#">Voltar ao topo</a>

![Diagrama-PetVida](/PetVida.drawio.png)

---

## 3. Inicio Rápido

---

<a href="#">Voltar ao topo</a>

## 3.1. Instalando Dependências

### Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn
```

## 3.2. Variáveis de Ambiente

### Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example:

```
cp .env.example .env
```

### Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha

## 3.3. Migrations

### Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

---

<a href="#">Voltar ao topo</a>

## Corpo da Requisição:

```
POST /users
{
    "email": "joao@kenzie.com",
    "password": "12345"
}
```

## Exemplo de Response:

`Status: 200 Created`

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTYzNzgwOTcsImV4cCI6MTY1Njk4Mjg5Nywic3ViIjoiMiJ9.hRJcwARLMHWzwDGz5hHCYQyvs8DknHwMqYy3iMgGf6c"
}
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Email ou senha inválidos.</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>Usuário não existe.</td>
    </tr>
</table>

---

## 5. Endpoints

---

## Índice

-   [User](#1-user)
    -   [POST /user](#11-criação-de-usuário)
    -   [PATCH /user/:id](#12-atualização-de-usuário)
    -   [DELETE /user/:id](#13-soft-delete-do-usuário)
    -   [GET /user/profile](#14-acessar-informações-do-usuário)
    -   [GET /user/:userId/pets](#15-acessar-os-pets-do-usuário)
    -   [POST /user/booking/:petId](#16-marcar-uma-consulta-para-o-pet)
-   [Pet](#2-pets)
    -   [POST /pet](#21-criação-de-pet)
    -   [GET /pet/:petId](#21-acessar-as-informacões-de-um-pet-específico)
    -   [PATCH /pet/:petId](#22-atualização-de-pet)
    -   [DELETE /pet/:petId](#23-soft-delete-do-pet)
    -   [GET /pet/:petId/bookings](#24-acessa-todos-os-agendamentos-de-um-pet-específico)
-   [Hotel](#3-hotel)
    -   [PATCH /hotel/:idHotel](#31-atualização-de-um-hotel)
    -   [GET /hotel/:idHotel/pets](#32-acessar-todos-os-pets-hospedados-no-hotel)
-   [Admin](#4-admin)
    -   [POST /admin/hotel](#41-criação-de-hotel)
    -   [DELETE /admin/hotel/:hotelId](#42-soft-delete-hotel)
    -   [GET /hotel/pets](#46-acessar-todos-os-pets)
    -   [GET /admin/users](#45-acessar-todos-os-usuários)
    -   [PATCH /admin/hotel/:hotelId](#43-atualização-do-hotel)
    -   [POST /admin/category](#44-criação-de-categoria)
    -   [GET /admin/hotels](#47-acessar-todos-os-hoteis)
    -   [GET /admin/categories](#48-acessar-todas-as-categorias)
    -   [GET /admin/bookings](#49-acessar-todas-as-reservas)
-   [Booking](#5-booking)
    -   [PATCH /booking/checkin/:idBooking](#51-fazer-checkin)
    -   [PATCH /booking/checkout/:idBooking](#52-fazer-checkout)
    -   [PATCH /booking/confirm/:idBooking](#53-confirmando-agendamento)
    -   [GET /booking/confirm/:idHotel/:idBooking](#54-buscar-agendamento-pelo-id)
    -   [GET /booking/confirm/:idHotel](#55-buscar-todos-os-agendamentos-disponiveis)
    -   [GET /booking/confirm/:idBooking](#56-cancelar-confirmação-de-reserva)
    -   [GET /booking/:idBooking](#56-deletar-reserva)

---

## 1. User

---

## O objeto User é definido como:

​\* [Voltar ao Índice](#5-endpoints)

<table>
    <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>name</td>
        <td>String</td>
        <td>Nome do usuario</td>
    </tr>
    <tr>
        <td>email</td>
        <td>String</td>
        <td>Email do usuario</td>
    </tr>
    <tr>
        <td>bornDate</td>
        <td>String</td>
        <td>Data de nascimento do usuario</td>
    </tr>
    <tr>
        <td>whatsApp</td>
        <td>String</td>
        <td>WhatsApp do usuario</td>
    </tr>
    <tr>
        <td>cpf</td>
        <td>String</td>
        <td>CPF do usuario</td>
    </tr>
    <tr>
        <td>password</td>
        <td>String</td>
        <td>Senha do usuario</td>
    </tr>
    <tr>
        <td>address</td>
        <td>Objeto</td>
        <td>Endereço do usuario</td>
    </tr>
</table>

## Campo address dentro do usuario:

<table>
    <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>street</td>
        <td>String</td>
        <td>Rua do usuario</td>
    </tr>
    <tr>
        <td>number</td>
        <td>String</td>
        <td>Número do usuario</td>
    </tr>
    <tr>
        <td>code</td>
        <td>String</td>
        <td>CEP do usuario</td>
    </tr>
    <tr>
        <td>state</td>
        <td>String</td>
        <td>Estado do usuario</td>
    </tr>  
    <tr>
        <td>country</td>
        <td>String</td>
        <td>País do usuario</td>
    </tr>
    <tr>
        <td>city</td>
        <td>String</td>
        <td>Cidade do usuario</td>
    </tr>
</table>

## Endpoints

<table>
    <tr>
        <th>Método</th>
        <th>Rota</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>POST</td>
        <td>/user</td>
        <td>Cria um usuário.</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/user/booking/:petId</td>
        <td>Faz um agendamento para o pet do usuário.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/user/:userId/pets</td>
        <td>Retorna todos os pets do usuário.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/user/profile/:userId</td>
        <td>Retorna os dados do usuário utilizando o id de parâmetro.</td>
    </tr>  
    <tr>
        <td>DELETE</td>
        <td>/user/:userId</td>
        <td>Faz um soft-delete em um usuário utilizando o id de parâmetro.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/user/:userId</td>
        <td>Atualiza um usuário utilizando o id de parâmetro.</td>
    </tr>
</table>

---

## 1.1. Criação de Usuário

---

​\* [Voltar ao Índice](#5-endpoints)

## Corpo da Requisição:

### /user

```
{
    "name": "João",
    "bornDate": "1990/01/01",
    "whatsApp": "(00)00000-0000",
    "email": "joao@kenzie.com",
    "cpf": "00000000000",
    "password": "123456"
    "address":{
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    }
    "isAdm": true
}
```

## Exemplo de Response:

`Status: 201 Created`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "name": "João",
    "bornDate": "1990/01/01",
    "whatsApp": "(00)00000-0000",
    "email": "joao@kenzie.com",
    "cpf": "00000000000",
    "address":{
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus",
    },
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "isActive": true,
    "isAdm": true,
    "hotelId": null
}
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Todos os campos são obrigatórios</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>Email já registrado</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>Usuário já existe</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>CPF já registrado</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>Whatsapp já registrado</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário deve ser maior de idade</td>
    </tr>
</table>

---

## 1.2. Atualização de usuário

---

​\* [Voltar ao Índice](#5-endpoints)

## Corpo da Requisição:

## PATCH /user/:id

```
{
    "name": "João"
    "whatsApp": "(00)00000-0000"
    "bornDate": "1990/01/01"
    "cpf": "123456778900"
}
```

## Exemplo de Response:

​
`Status Code: 200 Success`
​

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "name": "João",
    "bornDate": "1990/01/01",
    "whatsApp": "(00)00000-0000",
    "email": "joao@kenzie.com",
    "cpf": "00000000000",
    "address":{
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus",
    }
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "isActive": true,
    "isAdm": "true",
    "hotelId": null
}
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não é dono do recurso ou administrador</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Atualização de campos não autorizados</td>
    </tr>
</table>
​

---

## 1.3. Soft-delete do usuário

---

​\* [Voltar ao Índice](#5-endpoints)

## Corpo da Requisição:

## DELETE user/:id

`Status Code: 204 No Content`
​

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não é dono do recurso ou administrador</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Deleção de usuário não autorizada</td>
    </tr>
</table>

---

## 1.4. Acessar informações do usuário

---

​\* [Voltar ao Índice](#5-endpoints)

## Exemplo de Response:

## GET /user/profile

​`Status Code: 200 Success`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "name": "João",
    "bornDate": "1990/01/01",
    "whatsApp": "(00)00000-0000",
    "email": "joao@kenzie.com",
    "cpf": "00000000000",
    "address":{
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus",
    },
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "isActive": true,
    "isAdm": "true",
    "hotelId": null
}
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não é dono do recurso ou administrador</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado</td>
    </tr>
</table>

---

## 1.5. Acessar os pets do usuário

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /user/:userId/pets

## Exemplo de Response:

​`Status Code: 200 Success`
​

```
[
    {
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
        "name": "bomguila",
        "category": {
            "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
            "name": "Cachorro"
        }
        "user": {
            "name": "João",
            "bornDate": "1990/01/01",
            "whatsApp": "(00)00000-0000",
            "email": "joao@kenzie.com",
            "cpf": "00000000000",
            "address":{
                "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
                "street": "Rua 1",
                "number": "00",
                "code": "0000000",
                "state": "AM",
                "country": "Brasil",
                "city": "Manaus",
            }
            "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
            "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
            "isActive": true,
            "isAdm": "true",
            "hotelId": null
        },
        "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040"
        "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040"
        "isActive": true
    }
]
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não é dono do recurso ou administrador</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado</td>
    </tr>
</table>

---

## 1.6. Marcar uma reserva para o pet

---

​\* [Voltar ao Índice](#5-endpoints)

## POST /user/booking/:petId

### Exemplo de Requisição:

```
{
    "bookingDate": "2022/12/12",
    "petId": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "hotelId": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
}
```

### Exemplo de Response:

​`Status Code: 200 Success`
​

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "bookingDate": "2022/12/12",
    "petId": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "hotelId": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "checkin": false,
    "checkout": false,
    "date_checkin": null,
    "date_checkout": null
}
```

## Possíveis Erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não é dono do recurso ou administrador</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Pet não encontrado</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Hotel não encontrado</td>
    </tr>
     <tr>
        <td>401 Unauthorized </td>
        <td>PET não pertence ao usuario logado</td>
    </tr>
</table>

---

## 2. Pets

---

​\* [Voltar ao Índice](#5-endpoints)

## O objeto Pet é definido como:

​

<table>
    <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>name</td>
        <td>String</td>
        <td>Nome do pet</td>
    </tr>
    <tr>
        <td>category</td>
        <td>String</td>
        <td>ID da categoria do pet</td>
    </tr>
    <tr>
        <td>user</td>
        <td>String</td>
        <td>ID do usuario dono do pet</td>
    </tr>
</table>

## Endpoints

<table>
    <tr>
        <th>Método</th>
        <th>Rota</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>POST</td>
        <td>/pet</td>
        <td>Cria um pet.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/pet/:petId</td>
        <td>Retorna as informações do pet utilizando o id de parâmetro.</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/pet/:petId</td>
        <td>Atualiza um pet utilizando o id de parâmetro.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/pet/:petId</td>
        <td>Faz um soft-delete em um pet utilizando o id de parâmetro.</td>
    </tr>
</table>

---

## 2.1. Criação de Pet

---

​\* [Voltar ao Índice](#5-endpoints)

## POST /pet

### Exemplo de Requisição:

​`Status Code: 201 Created`

```
{
    "name": "Santiagoo"
    "category": "gato"
    "user": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
}
```

### Exemplo de Response:

```
{
    "id": "a15d3725-cad8-4f17-b5dc-d3550af6ea95"
    "name": "Santiago"
    "category": "gato"
    "user": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-0400"
    "updateAt": "Sat Oct 01 2022 00:00:00 GMT-0400"
    "isActive": true
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Todos os campos são obrigatórios.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>O Pet ja existe.</td>
    </tr>
</table>
​

---

## 2.1. Acessar as informacões de um pet específico

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /pet/:petId

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "id": "a15d3725-cad8-4f17-b5dc-d3550af6ea95"
    "name": "Santiago"
    "category": "gato"
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Você não é tutor do pet.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Pet não encontrado.</td>
    </tr>
</table>

---

## 2.2. Atualização de pet

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /pet/:id

### Exemplo de Requisição:

​`Status Code: 200 Success`
​

```
{
    "name": "Santigo"
}
```

### Exemplo de Response:

```
{
    "id": "a15d3725-cad8-4f17-b5dc-d3550af6ea95"
    "name": "Santigo"
    "category": "gato"
    "updatedAt": "Sat Oct 01 2022 16:39:00 GMT-0400",
    "createdAt": "Sat Oct 01 2022 16:39:00 GMT-0400",
    "isActive": true
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Você não é tutor do pet.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Pet não encontrado.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 2.3. Soft-Delete do pet

---

​\* [Voltar ao Índice](#5-endpoints)

## DELETE /pet/:id

### Exemplo de Response:

```
{
    "id": "a15d3725-cad8-4f17-b5dc-d3550af6ea95"
    "name": "Santigo"
    "category": "gato"
    "updatedAt": "Sat Oct 01 2022 16:39:00 GMT-0400",
    "createdAt": "Sat Oct 01 2022 16:39:00 GMT-0400",
    "isActive": false
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Você não é tutor do pet.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Pet não encontrado.</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>O Pet já não está mais ativo.</td>
    </tr>
</table>

---

## 2.4. Acessa todos os agendamentos de um pet específico

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /pet/:petId/bookings

### Exemplo de Response:

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Você não é tutor do pet.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Pet não encontrado.</td>
    </tr>
</table>

---

## 3. Hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## O objeto hotel é definido como:

<table>
    <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>corporateName</td>
        <td>String</td>
        <td>Nome da empresa</td>
    </tr>
    <tr>
        <td>whatsapp</td>
        <td>String</td>
        <td>Número da empresa.</td>
    </tr>
    <tr>
        <td>email</td>
        <td>String</td>
        <td>Email da empresa.</td>
    </tr>
    <tr>
        <td>CNPJ</td>
        <td>String</td>
        <td>CNPJ da empresa.</td>
    </tr>
    <tr>
        <td>fancyName</td>
        <td>String</td>
        <td>Nome pelo qual é chamada a empresa.</td>
    </tr>
    <tr>
        <td>capacity</td>
        <td>String</td>
        <td>Capacidade total de funcionários da empresa.</td>
    </tr>
    <tr>
        <td>manager</td>
        <td>String</td>
        <td>ID do gerente da empresa.</td>
    </tr>
    <tr>
        <td>address</td>
        <td>Objeto</td>
        <td>Objeto contendo o endereço da empresa.</td>
    </tr>
</table>

## Endpoints

<table>
    <tr>
        <th>Método</th>
        <th>Rota</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>PATCH</td>
        <td>/hotel/:idHotel</td>
        <td>Atualiza um hotel utilizando o id de parâmetro.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/hotel/pets</td>
        <td>Retorna todos os pets.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/hotel/:idHotel</td>
        <td>Faz um soft-delete em um pet utilizando o id de parâmetro.</td>
    </tr>
</table>

---

## 3.1. Atualização de um hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /hotel/:idHotel

### Exemplo de Requisição:

```
  {
    "corporateName": "Kenzie",
    "whatsApp": "(00)00000-0000",
    "email": "kenzie@kenzie.com",
    "cnpj": "111.222.333/0000-10",
    "adress": {
            "street": "Rua 1",
            "number": "00",
            "code": "0000000",
            "state": "AM",
            "country": "Brasil",
            "city": "Manaus"
    },
    "fancyName": "Kenzie-Academy",
    "isActive" "true",
    "capacity": "12",
    "manager": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
  }
```

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "corporateName": "Kenzie",
    "adress": {
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    },
    "cnpj": "34117622000116",
    "fancyName": "Kenzie-Academy",
    "whatsApp": "(00)00000-0000",
    "email": "kenzie@kenzie.com",
    "capacity": "12",
    "isActive" true,
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "manager": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>ID invalido.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é gerente da empresa.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é funcionário da empresa.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é administrador.</td>
    </tr>
</table>

---

## 3.2. Acessar todos os pets hospedados no hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /hotel/:idHotel/pets

### Exemplo de Response:

​`Status Code: 200 Success`

```
[
  {
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "name: "Dogau",
    "category: {
      "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
      "name": "Dogs"
    },
    "user": "Jose",
  },
    {
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "name: "Dogau2",
    "category: {
      "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
      "name": "Dogs"
    },
    "user": "Jose1",
  }
]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>ID invalido.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é gerente da empresa.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é funcionário da empresa.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Usuário não é administrador.</td>
    </tr>
</table>

---

## 4. Admin

---

---

## 4.1. Criação de Hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## POST /admin/hotel

### Exemplo de Requisição:

```
{
    "corporateName": "Joao Pet acomodações LTDA.",
    "cnpj": "111.222.333/0000-10",
    "fancyName":"Hotel Pet",
    "capacity":"10"
    "address":{
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    }
    "manager": "fee1aef8-5c9c-460a-bf27-e2bd47c32ffb ",
    "whatsapp": "(00)00000-0000",
    "email":"hotelPet@kenzie.com";
}
```

### Exemplo de Response:

​`Status Code: 201 Created`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "corporateName": "Joao Pet acomodações LTDA.",
    "cnpj": "111.222.333/0000-10",
    "fancyName":"Hotel Pet",
    "capacity":"10",
    "address":{
        "id": "1baf0738-e79b-4e20-8e71-2928a2c0766a"
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    }
    "manager": "fee1aef8-5c9c-460a-bf27-e2bd47c32ffb"
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "isActive": true,
    "whatsapp": "(00)00000-0000",
    "email":"hotelPet@kenzie.com";
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Todos os campos são obrigatórios.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuário administrador pode criar uma empresa.</td>
    </tr>
    <tr>
        <td>409 Conflict</td>
        <td>A Razão social informada já existe no banco de dados.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Cnpj informado é invalido.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Campo email já consta no banco de dados.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Campo whatsapp já consta no banco de dados.</td>
    </tr>
</table>

---

## 4.2. Soft-Delete hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## DELETE /admin/hotel/:hotelId

### Exemplo de Response:

​`Status Code: 204 No Content`

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>O usuário precisa ser gerente do hotel ou administrador.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>ID informado não consta no banco de dados.</td>
    </tr>
</table>

---

## 4.3. Atualização do hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /admin/hotel/:hotelId

### Exemplo de Requisição:

```
{
    "corporateName": "Joao  acomodações LTDA.",
    "cnpj": "111.222.333/0000-10",
    "fancyName":"Hotel Pet",
    "capacity":"10"
    "address":{
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    }
    "manager": "fee1aef8-5c9c-460a-bf27-e2bd47c32ffb "
    "whatsapp": "(00)00000-0000",
    "email":"hotelPet@kenzie.com";
}
```

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
    "corporateName": "Joao acomodações LTDA.",
    "cnpj": "111.222.333/0000-10",
    "fancyName":"Hotel Pet",
    "capacity":"10",
    "address":{
        "id": "1baf0738-e79b-4e20-8e71-2928a2c0766a"
        "street": "Rua 1",
        "number": "00",
        "code": "0000000",
        "state": "AM",
        "country": "Brasil",
        "city": "Manaus"
    },
    "manager": "fee1aef8-5c9c-460a-bf27-e2bd47c32ffb"
    "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
    "isActive": true,
    "whatsapp": "(00)00000-0000",
    "email":"hotelPet@kenzie.com";
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>O usuário precisa ser gerente ou administrador.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>ID informado não consta no banco de dados.</td>
    </tr>
</table>

---

## 4.4. Criação de categoria

---

​\* [Voltar ao Índice](#5-endpoints)

## POST /admin/category

### Exemplo de Requisição:

```
    {
        name:"Gato"
    }
```

### Exemplo de Response:

​`Status Code: 201 Created`

```
    {
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
        "name: "Gato"
    }
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Campo name obrigatório.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Campo name já consta no banco de dados.</td>
    </tr>
</table>

---

## 4.5. Acessar todos os usuários

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /admin/users

### Exemplo de Response:

​`Status Code: 200 Success`

```
[
    {
        "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
        "name": "João",
        "bornDate": "1990/01/01",
        "whatsApp": "(00)00000-0000",
        "email": "joao@kenzie.com",
        "cpf": "00000000000",
        "address":{
            "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
            "street": "Rua 1",
            "number": "00",
            "code": "0000000",
            "state": "AM",
            "city": "Manaus",
        },
        "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
        "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
        "isActive": true,
        "isAdm": "true",
        "hotelId": null
    }
]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuario administrador pode listar todos os usuários.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 4.6. Acessar todos os pets

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /admin/pets

### Exemplo de Response:

​`Status Code: 200 Success`

```
[
    {
        pet,
        pet
    }
]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuario administrador pode listar todos os pets.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 4.7. Acessar todos os hoteis

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /admin/hotels

### Exemplo de Response:

​`Status Code: 200 Success`

```
    [
        {
            "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c"
            "corporateName": "Joao Pet acomodações LTDA.",
            "cnpj": "111.222.333/0000-10",
            "fancyName":"Hotel Pet",
            "capacity":"10",
            "address":{
                "id": "1baf0738-e79b-4e20-8e71-2928a2c0766a"
                "street": "Rua 1",
                "number": "00",
                "code": "0000000",
                "state": "AM",
                "country": "Brasil",
                "city": "Manaus"
            }
            "manager": "fee1aef8-5c9c-460a-bf27-e2bd47c32ffb"
            "createdAt": "Sat Oct 01 2022 00:00:00 GMT-040",
            "updatedAt": "Sat Oct 01 2022 00:00:00 GMT-040",
            "isActive": true,
            "whatsapp": "(00)00000-0000",
            "email":"hotelPet@kenzie.com";
        }
    ]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuario administrador pode listar todos os hoteis.</td>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 4.8. Acessar todas as categorias

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /admin/categories

### Exemplo de Response:

​`Status Code: 200 Success`

```
    [
        {
            "id": "996c1653-7af3-4290-8463-65376de0dfff"
            "name": "teste",
        },
        {
            "id": "996c1653-7af3-4290-8463-65376de0dfff"
            "name": "teste2",
        },
    ]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuario administrador pode listar todos as categorias.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 4.9. Acessar todas as reservas

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /admin/bookings

### Exemplo de Response:

​`Status Code: 200 Success`

```
[
	{
		"id": "8342fded-3f89-40e8-842e-e2d94cec7405",
		"bookingDate": "2022-03-03",
		"isConfirmed": true,
		"checkin": true,
		"checkout": false,
		"dateCheckin": "2022-11-08",
		"dateCheckout": null,
		"pets": {
			"id": "fcac4400-143c-401c-99e4-a8c90b42dfcc",
			"name": "Venom",
			"createdAt": "2022-11-08",
			"updatedAt": "2022-11-08",
			"isActive": true
		},
		"hotel": {
			"id": "183101c7-a3b1-4068-8853-a2d8c042c285",
			"corporateName": "Pets Hotel SA",
			"cnpj": "61.552.402/0001-93",
			"fantasyName": "PetsHotel",
			"capacity": 30,
			"isActive": true,
			"createdAt": "2022-11-08T14:25:52.576Z",
			"updatedAt": "2022-11-08T14:25:52.576Z",
			"whatsapp": "999999999",
			"email": "petshotel@gmail.com"
		}
	},
	{
		"id": "170288ba-8b9d-418e-a0d8-b8f310506256",
		"bookingDate": "2022-03-03",
		"isConfirmed": false,
		"checkin": true,
		"checkout": true,
		"dateCheckin": "2022-11-08",
		"dateCheckout": "2022-11-08",
		"pets": {
			"id": "fcac4400-143c-401c-99e4-a8c90b42dfcc",
			"name": "Venom",
			"createdAt": "2022-11-08",
			"updatedAt": "2022-11-08",
			"isActive": true
		},
		"hotel": {
			"id": "183101c7-a3b1-4068-8853-a2d8c042c285",
			"corporateName": "Pets Hotel SA",
			"cnpj": "61.552.402/0001-93",
			"fantasyName": "PetsHotel",
			"capacity": 30,
			"isActive": true,
			"createdAt": "2022-11-08T14:25:52.576Z",
			"updatedAt": "2022-11-08T14:25:52.576Z",
			"whatsapp": "999999999",
			"email": "petshotel@gmail.com"
		}
	},
]
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>401 Unauthorized</td>
        <td>Somente um usuario administrador pode listar todos as reservas.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5. Booking

---

---

## 5.1. Fazer checkin

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /booking/checkin/:idBooking

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "message": "Checkin realizado com sucesso"
}
```

### Resultado esperado:

```
{
    checkout: true
    date_checkin: new Date()
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.2. Fazer checkout

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /booking/checkout/:idBooking

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "message": "Checkout realizado com sucesso"
}
```

### Resultado esperado:

```
{
    checkout: true
    date_checkin: new Date()
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.3. Confirmando agendamento

---

​\* [Voltar ao Índice](#5-endpoints)

## PATCH /booking/confirm/:idBooking

### Exemplo de Requisição:

```
{
    "isConfirmed": true
}
```

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "message": "Agendamento Confirmado"
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.4. Buscar agendamento pelo id

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /booking/confirm/:idHotel/:idBooking

### Exemplo de Response:

​`Status Code: 200 Success`

```
{
    "id": "c54cbea2-d49e-4dba-8e84-7d4afb8fc02c",
    "isConfirmed": true
}
```

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.5. Buscar todos os agendamentos do hotel

---

​\* [Voltar ao Índice](#5-endpoints)

## GET /booking/confirm/:idHotel

### Exemplo de Response:

​`Status Code: 200 Success`

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.6. Cancelar confirmação de reserva

---

​\* [Voltar ao Índice](#5-endpoints)

## DELETE /booking/confirm/:idBooking

### Exemplo de Response:

​`Status Code: 204 No Content`

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---

## 5.6. Deletar reserva

---

​\* [Voltar ao Índice](#5-endpoints)

## DELETE /booking/:idBooking

### Exemplo de Response:

​`Status Code: 204 No Content`

## Possíveis erros:

<table>
    <tr>
        <th>Código do Erro</th>
        <th>Descrição</th>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>O usuário não tem permissão.</td>
    </tr>
    <tr>
        <td>400 Bad Request</td>
        <td>Agendamento não encontrado.</td>
    </tr>
    <tr>
        <td>403 Forbidden</td>
        <td>Token não encontrado.</td>
    </tr>
</table>

---
