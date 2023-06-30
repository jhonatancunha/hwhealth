# HWHealth

HWHealth é um aplicativo desenvolvido em React Native que permite aos usuários visualizarem os dados capturados de suas máquinas de forma simples e intuitiva. Com o HWHealth, os usuários podem monitorar várias métricas importantes, como temperatura da CPU, uso da CPU, uso de memória RAM, uso de memória swap, uso de disco e muito mais.

O objetivo principal do HWHealth é fornecer aos usuários uma maneira conveniente de acompanhar o desempenho de suas máquinas em tempo real e receber notificações personalizadas quando alguma métrica ultrapassar um limite configurado.

## Recursos Principais

- **Monitoramento de Métricas**: Os usuários podem visualizar informações detalhadas sobre o desempenho de suas máquinas, incluindo temperatura da CPU, uso da CPU, uso de memória RAM, uso de memória swap, uso de disco e outras métricas relevantes.

- **Notificações Personalizadas**: O HWHealth permite que os usuários definam limites para cada métrica monitorada. Quando uma métrica ultrapassa o limite configurado, o aplicativo envia notificações push para alertar o usuário sobre a situação atual.

- **Interface Intuitiva**: A interface do usuário do HWHealth é projetada para ser amigável e fácil de usar. Os usuários podem navegar pelas diferentes métricas e visualizar gráficos e estatísticas para entender o desempenho de suas máquinas de forma clara e concisa.


## Configuração do Desenvolvimento

Caso deseje configurar o ambiente de desenvolvimento localmente, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar o `Node.js v18.16.0` em https://nodejs.org.
2. Clone o repositório do HWHealth do GitHub:

```bash
git clone https://github.com/jhonatancunha/hwhealth.git
cd hwhealth
cd backend
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

```bash
# Insira a porta em que o servidor irá executar
SERVER_PORT=3000
# Insira o ID da api do OneSignal: https://documentation.onesignal.com/docs/keys-and-ids
APP_ID=''
# Insira a chave da api do OneSignal: https://documentation.onesignal.com/docs/keys-and-ids
REST_API_KEY=''
```

4. Instale as dependências do projeto usando o yarn:

Certifique-se de estar usando o node na versão 18.16.0

```bash
yarn
```

5. Após a conclusão da instalação das dependências, você pode executar o aplicativo no ambiente de desenvolvimento usando o seguinte comando:

```bash
yarn start:dev
```

## Estrutura de Diretório

```.
├── docker-compose.yml
├── index.js
├── nest-cli.json
├── package.json
├── README.md
├── src
│   ├── components
│   │   ├── app
│   │   ├── auth
│   │   ├── limiar
│   │   ├── machine-info
│   │   ├── notification
│   │   └── users
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### Explicação de cada diretório

- **docker-compose.yml**: Arquivo que especifica os serviços que serão executados em um container docker (mongodb e redis).
- **index.js**: "ponto de entrada" da aplicação.
- **nest-cli.json**: arquivo de configura do NestJS.
- **package.json**: arquivo que especifica os scripts que podem ser executados, bem como as dependências do projeto.
- **src**: diretório em que a implementação das funcionalidades do proejto fica armazenada.
   - **componentes**: os componentes (funcionalidades) que a aplicação possui.
      - **app**: componente central da aplicação.
      - **auth**: componente que implementa os métodos de autenticação.
      - **limiar**: componente que implementa os métodos de manipulação do limiar.
      - **machine-info**: componente que implementa os métodos de manipulação dos dados das máquinas.
      - **notification**: componente que implementa os métodos de manipulação das notificações que são enviadas quando a máquina excede os limiares definidos pelo usuário.
      - **users**: componente que implementa os métodos de manipulação dos dados de usuário.
- **tsconfig.build.json**: É um arquivo de configuração do TypeScript usado durante o processo de compilação para a geração de artefatos de produção.
- **tsconfig.json**: É o arquivo de configuração principal do TypeScript na aplicação NEST.
- **yarn.lock**: É um arquivo gerado automaticamente pelo gerenciador de pacotes Yarn. Ele garante a reprodutibilidade das dependências do projeto, registrando as versões exatas dos pacotes instalados.

## Principais tecnologias utilizadas

- NEST
- TypeScript
- Redis
- MongoDB
- Passport
- Swagger
  
## Contribuição

Contribuições para o HWHealth são bem-vindas! Se você deseja contribuir para o projeto, siga as etapas abaixo:

1. Faça um fork do repositório do HWHealth.
2. Clone o seu fork para o seu ambiente de desenvolvimento local.
3. Crie uma branch para as suas alterações:

```bash
git checkout -b minha-branch
```
4. Faça as alterações desejadas e commit-as:
   
```bash
git commit -m "Minhas alterações"
```

5. Faça o push das alterações para o seu fork:

```bash
git push origin minha-branch
```

6. Abra um pull request no repositório do HWHealth original.

Agradecemos antecipadamente suas contribuições!
