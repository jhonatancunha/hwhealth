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
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

```json
// Insira a api do OneSignal
ONESIGN_APPID=
// Insira a URL do servidor backend
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
