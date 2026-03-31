# To-Do List - Projeto e Arquitetura de Sistemas

Este repositório contém o código-fonte do trabalho da disciplina de Projeto e Arquitetura de Sistemas. O projeto consiste em um sistema de gerenciamento de tarefas (To-Do List) desenvolvido com uma arquitetura dividida entre um backend em Java e um frontend em React.

O sistema aplica os padrões de projeto estruturais e arquiteturais **GoF** (Strategy, Observer) e **GRASP** (Controller, Information Expert) para garantir um código limpo, testável e de fácil manutenção.

## 🛠️ Tecnologias Utilizadas

**Backend:**
* Java 21
* Spring Boot 3
* Spring Data JPA
* H2 Database (Banco de dados em memória)
* Springdoc OpenAPI (Swagger para documentação)

**Frontend:**
* React
* Vite
* TypeScript
* Tailwind CSS
* Lucide React (Ícones)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:
* <a href="https://adoptium.net/">Java Development Kit (JDK)</a> - Versão 17 ou 21
* <a href="https://nodejs.org/">Node.js</a> - Versão 18 ou superior
* Um terminal (Bash/Zsh)

## 🚀 Como Executar a Aplicação

A aplicação está dividida em duas pastas principais. Você precisará rodar o backend e o frontend simultaneamente em abas diferentes do seu terminal.

### 1. Rodando o Backend (Spring Boot)

Abra o seu terminal, navegue até a pasta raiz do projeto e execute os seguintes comandos:

```bash
# Entre na pasta do projeto Spring Boot
cd av1-backend/av1

# Baixe as dependências e compile o projeto usando o Maven Wrapper
./mvnw clean install

# Inicie a aplicação
./mvnw spring-boot:run
```

O backend estará rodando e escutando requisições na porta 8080.

* **API URL:** http://localhost:8080
* **Documentação Swagger:** http://localhost:8080/swagger-ui.html

> **Nota:** Como estamos utilizando o banco de dados H2, os dados são armazenados em memória e serão resetados sempre que o backend ou o frontend(Ainda não possui persistência de dados) forem reiniciados.

### 2. Rodando o Frontend (React + Vite)

Em uma nova aba do terminal, navegue novamente a partir da pasta raiz do projeto e execute:

```bash
# Entre na pasta do frontend
cd av1-frontend

# Instale todas as dependências do Node
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando e acessível no seu navegador, geralmente na porta 5173.

* **Aplicação Web:** http://localhost:5173

## 🏗️ Padrões de Projeto Aplicados

Conforme os requisitos da disciplina, os seguintes padrões foram implementados no cadastro de Tarefas:

* **Strategy (GoF):** Utilizado para isolar as regras de validação da criação e atualização de tarefas (`TitleValidationStrategy` e `DescriptionValidationStrategy`), permitindo que novas regras sejam adicionadas sem alterar a classe de serviço principal.

* **Observer (GoF):** Implementado para desacoplar a lógica de persistência de dados das ações secundárias do sistema. A classe `TaskService` atua como o sujeito observado que, após salvar uma nova tarefa com sucesso, notifica automaticamente uma lista de observadores (como o `LogTaskObserver`). Isso permite adicionar novas reações ao evento de criação (como envio de e-mails ou notificações) futuramente, sem modificar o código do serviço principal.

* **Controller (GRASP):** Implementado através do `TaskController`, que atua como o ponto de entrada principal para as requisições HTTP da interface, delegando o processamento lógico para a camada de serviço.

* **Information Expert / Indirection (GRASP):** Aplicado na classe `TaskService`, que atua como intermediária e detentora das informações lógicas para coordenar as validações e a persistência dos dados no repositório.
