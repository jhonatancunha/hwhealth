# Algoritmo de Monitoramento HWHealth

Este é um programa em Python desenvolvido para capturar dados de um computador e enviá-los para um servidor. O programa utiliza a biblioteca `psutil` para obter informações sobre o hardware do computador, como temperatura da CPU, uso de CPU, memória RAM, etc.

## Objetivo

O objetivo deste código é realizar o monitoramento do hardware de uma máquina e enviar os dados coletados para um servidor. O código utiliza a biblioteca psutil para obter informações sobre o sistema operacional, sensores de temperatura, ventiladores, CPU, memória RAM, memória SWAP, partições de disco, rede e bateria (se disponível). 

Após coletar os dados, o código faz uma requisição HTTP para enviar as informações para um servidor especificado pela variável `base_url`. Antes de enviar os dados, é necessário autenticar o usuário utilizando um email e senha. As credenciais de autenticação são passadas como argumentos de linha de comando ao executar o código.

O código utiliza um agendador (scheduler) para executar a função `send_info()` repetidamente em intervalos regulares de tempo. O intervalo de tempo é definido pelos valores das variáveis `seconds` e `minutes`. A função `send_info()` coleta os dados da máquina e os envia para o servidor.

Em resumo, o código realiza o monitoramento do hardware de uma máquina, coleta os dados e os envia para um servidor em intervalos regulares de tempo.

## Como Rodar

1. Certifique-se de ter o Python instalado em seu sistema.
2. Clone o repositório ou faça o download dos arquivos do código-fonte.
3. Abra um terminal ou prompt de comando e navegue até o diretório onde os arquivos do código estão localizados.
4. Instale as dependências necessárias executando o seguinte comando:

```bash
pip install -r requirements.txt
```
5. Execute o programa com o seguinte comando:

```bash
python script.py --email <seu_email> --password <sua_senha>
```

Substitua `seu_email` e `sua_senha` pelo seu e-mail e senha válidos para autenticação no servidor.

## Tecnologias

O código utiliza as seguintes tecnologias e bibliotecas:

- Python: Linguagem de programação utilizada para desenvolver o algoritmo.
- psutil: Biblioteca Python para obtenção de informações do sistema, como uso de CPU, memória, etc.
- json: Biblioteca Python para trabalhar com dados JSON.
- numpy: Biblioteca Python para realizar cálculos numéricos.
- getpass: Biblioteca Python para obter informações do usuário, como nome de usuário.
- uuid: Biblioteca Python para geração de identificadores únicos.
- platform: Biblioteca Python para obter informações sobre o sistema operacional.
- sched: Biblioteca Python para agendamento de tarefas.
- time: Biblioteca Python para trabalhar com tempo.
- threading: Biblioteca Python para suporte a threads.
- logging: Biblioteca Python para registro de logs.
- requests: Biblioteca Python para fazer requisições HTTP.
- argparse: Biblioteca Python para análise de argumentos da linha de comando.

