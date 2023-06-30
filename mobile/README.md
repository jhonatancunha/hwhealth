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
cd hwhealth/mobile
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

```bash
# Insira o ID da api do OneSignal: https://documentation.onesignal.com/docs/keys-and-ids
ONESIGN_APPID=
# Insira a URL do servidor backend
API_URL=
```


4. Instale as dependências do projeto usando o yarn:

```bash
yarn
```

5. Após a conclusão da instalação das dependências, você pode executar o aplicativo no ambiente de desenvolvimento usando o seguinte comando:

```bash
yarn start
```

Certifique-se de ter um emulador Android/iOS configurado ou um dispositivo físico conectado para executar o aplicativo.


## Estrutura de Diretório

```
├── android
├── app.json
├── babel.config.js
├── Gemfile
├── index.js
├── ios
├── metro.config.js
├── package.json
├── react-native.config.js
├── src
│   ├── App.tsx
│   ├── assets
│   ├── components
│   ├── context
│   ├── helper
│   ├── hooks
│   ├── routes
│   ├── screens
│   │   ├── Login
│   │   ├── MachineConfiguration
│   │   ├── MachineInfo
│   │   ├── Machines
│   │   ├── Notifications
│   │   └── Register
│   ├── services
│   │   └── axios.ts
│   └── theme
│       └── colors.ts
└── tsconfig.json
```

### Explicação de cada diretório


- **android**: Esta pasta contém os arquivos relacionados à construção do aplicativo para a plataforma Android.
- **app.json**: É um arquivo de configuração usado pelo React Native para armazenar informações sobre o aplicativo.

- **babel.config.js**: Este arquivo é usado para configurar o Babel, que é uma ferramenta de compilação usada para converter o código JavaScript moderno.

- **Gemfile**: O Gemfile é usado no desenvolvimento Ruby e Ruby on Rails.

- **index.js**: Este é o ponto de entrada principal do aplicativo React Native.

- **ios**: Esta pasta contém os arquivos relacionados à construção do aplicativo para a plataforma iOS.

- **metro.config.js**: É um arquivo de configuração usado pelo Metro Bundler, que é uma ferramenta usada pelo React Native.

- **package.json**: É o arquivo de manifesto do projeto, onde estão listadas as dependências do projeto e outras informações relevantes.

- **react-native.config.js**: Este arquivo é usado para configurar certos aspectos do React Native CLI.

- **src**: Esta pasta contém o código-fonte do aplicativo React Native.
  - **App.tsx**: O componente raiz do aplicativo.
  - **assets**: Esta pasta contém recursos estáticos, como imagens e fontes.
  - **components**: Esta pasta contém componentes reutilizáveis.
  - **context**: Esta pasta contém arquivos relacionados ao uso do Context API.
  - **helper**: Esta pasta contém funções auxiliares ou utilitárias.
  - **hooks**: Esta pasta contém hooks personalizados.
  - **routes**: Esta pasta contém arquivos relacionados à configuração e gerenciamento de rotas.
  - **screens**: Esta pasta contém os componentes de tela do aplicativo.
  - **services**: Esta pasta contém arquivos relacionados a serviços externos.
  - **theme**: Esta pasta contém arquivos relacionados à definição de temas.

- **tsconfig.json**: Este é o arquivo de configuração do TypeScript.


## Principais Tecnologias

As principais tecnologias presentes são:

Dependencies (dependências):
- **@miblanchard/react-native-slider**: versão 2.3.1
- **@react-native-masked-view/masked-view**: versão 0.2.9
- **@react-navigation/bottom-tabs**: versão 6.5.7
- **@react-navigation/drawer**: versão 6.6.3
- **@react-navigation/native**: versão 6.1.6
- **@react-navigation/stack**: versão 6.3.16
- **axios**: versão 1.4.0
- **lodash**: versão 4.17.21
- **moment**: versão 2.29.4
- **react**: versão 18.2.0
- **react-hook-form**: versão 7.45.0
- **react-native**: versão 0.71.8
- **react-native-chart-kit**: versão 6.12.0
- **react-native-dotenv**: versão 3.4.9
- **react-native-onesignal**: versão 4.5.1
- **react-native-safe-area-context**: versão 4.5.3
- **react-native-screens**: versão 3.20.0
- **react-native-svg**: versão 13.9.0
- **react-native-vector-icons**: versão 9.2.0
- **zod**: versão 3.21.4

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
