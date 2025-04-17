# Projeto Frontend Alunos 👨‍🎓👩‍🎓
A aplicação frontend contida neste repositório disponibiliza recursos de:
- Listar alunos
- Salvar um aluno
De uma forma interativa utilizando os benefícios do React e o Material UI

## Stack utilizada 💻:
- Javascript
- HTML
- CSS
- [React](https://react.dev/learn) e em conjunto com a biblioteca [Material UI](https://mui.com/material-ui/) para componentes e ícones

## Preview telas:
### Exibição dos cadastros do alunos:
![image](https://github.com/user-attachments/assets/bf675d43-43c1-43f8-aaaf-524eff3e4336)

> [!NOTE]
> É exibido um botão no canto inferior direito, ao clicar será exibido o formulário abaixo.  
> Acima da tabela que mostra os dados é possível ver 2 botões, um para **EDITAR** e outro **EXCLUIR** o registro (imagens exemplo de clique nessas 2 ações)
> Também possui acima da tabela um campo para digitar um nome para pesquisar e filtrar

### Formulário de cadastro:
![image](https://github.com/user-attachments/assets/876ae6ed-5fb7-4a53-a49f-26900a7a7af2)
### Para cadastrar um aluno é necessário informar:
- Nome
- Telefone
- E-mail
- Endereço

### Após salvar será exibido uma janela de sucesso ao salvar corretamente as informações:
![image](https://github.com/user-attachments/assets/ae69ec6d-7970-41fd-b70e-57d0474ec925)

### Editando e excluindo registros:
> [!WARNING]
> Para conseguir habilitar os botões e realizar as ações é necessário selecionar um item na tabela. Exemplo na imagem abaixo:
![image](https://github.com/user-attachments/assets/1bfa47f6-3980-4a1e-a128-a6f1879dc715)

### Ao clicar no botão de editar será exibido uma janela igual a de adicionar para editar as informações do aluno
- Campos já viram preenchidos
![image](https://github.com/user-attachments/assets/5b54dc2d-d428-4474-9e4c-c2d38a23fba7)

### Após Salvar irá exibir a mensagem de sucesso:
![image](https://github.com/user-attachments/assets/1225ac20-602a-4f5b-925d-3e0a08091886)

### Após clicar no botão de excluir será perguntado se deseja excluir o aluno:
![image](https://github.com/user-attachments/assets/ce06c779-cc28-451f-8734-23d449124e5a)

## Requerimentos para rodar:
- node
- npm

## Como instalar:
- Clonar este repositório em algum diretório de sua preferência: `git clone https://github.com/gustavoc0imbra/frontalunos.git`

## Como rodar:
- No diretório onde foi baixado a aplicação rodar o comando: `npm start`

> [!NOTE]
> A aplicação vai estar disponibilizada no endereço `http://localhost:3000/`  
> Se estiver rodando a aplicação com o comando `npm start` qualquer alteração no código irá refletir na tela e sua funcionalidade

## API que esta aplicação consome:
O repositório do projeto que disponibiliza os endpoints de acesso para esta aplicação é: [API Alunos](https://github.com/gustavoc0imbra/apialunos)
