# 📦 Filtro e Páginação

![](https://i.imgur.com/T5T6StI.png)

Desenvolvimento de uma tabela para listagem de tarefas. No back-end foi utilizado **Prisma ORM**, para lidar com a interação com o banco de dados. Para a criação do layout foram utilizados os componentes do **Shadcn/UI**. Também foi criado uma rota de API para buscar as tarefas dinamicamente de acordo com os filtros informados nos 
parâmetros da URL.

A tabela possui as seguintes funcionalidades:
- Filtro pelo `title` da tarefa
- FIltrar tarefas pelo `status`
- Ordernar por `asc` e `desc`
- Páginação
- Definir quantas tarefas exibir por página

## 📦 Instalação
Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório**
    ```bash
    git clone https://github.com/luiz2k/filter-and-pagination.git
    ```

2. **Acesse o diretório do projeto e instale as dependências**
    ```bash
    cd filter-and-pagination

    npm install
    ```

3. **Configure as variáveis de ambiente**

    Copie o arquivo `.example.env` para `.env` e edite com os valores adequados:
    ```bash
    cp .env.example .env
    ```

4. **Gere o client do Prisma**
    ```bash
    npx prisma generate
    ```

5. **Execute as migrations do banco de dados**
    ```bash
    npx prisma migrate deploy
    ```

6. **Popule o banco de dados com as seeds**
    ```bash
    npx prisma db seed
    ```

7. **Compile o projeto**
    ```bash
    npm run build
    ```

8. **Inicie o servidor**
    ```bash
    npm start
    ```

---
