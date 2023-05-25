# Sistema de monitoramento de computadores

![Arquitetura](arq.png)

## Aplicativo (React Native)

- O usuário poderá criar sua conta ou realizar login
- Autenticação via HTTP
- Tela para configurar limiar de cada máquina
- Sistema de push notificacation para alerta de métricas acima do limiar

## Servidor (NestJS)


- Sistema de cache das estatísticas de cada computador utilizando REDIS
- Usar MongoDB para armazenar os dados
- Envia notificação ao aplicativo do usuário caso alguma métrica for acima do limiar estabelecido. O envio será efetuado via o serviço Onesignal.
- Implementar sistema de replicação no sistema de notificação push.
- Micro-serviço de notificação caso algum parâmetro passe do limiar estabelecido pelo usuário.

## Algoritmo de monitoramento (Python)

- Envia as estatísticas periodicamente para o servidor armazenar
- Quando o usuário rodar o script de monitoramento na máquina alvo
- Pede usuário e senha da conta do sistema
- Realiza autenticação com o servidor utilizando HTTP’s (criptografando dados)
- Envia solicitação de cadastro da máquina no sistema usando HTTP
- Inicia o monitoramento e envia esporadicamente os dados via HTTP’s (criptografando os dados)
- Caso cliente ocorra falha no envio dos dados, os mesmos serão armazenados e enviados posteriormente.


## :mortar_board: Autores

<center>
<table><tr>

<td align="center"><a href="https://github.com/JessePires">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/20424496?s=460&u=87f2870ff153ab88402d6246cb3347a46ae33fe9&v=4" width="100px;" alt=""/>
<br />
 <b>Jessé Pires</b>
 </a> <a href="https://github.com/JessePires" title="Repositorio Jessé"></a>

[![Gmail Badge](https://img.shields.io/badge/-jesserocha@alunos.utfpr.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jesserocha@alunos.utfpr.edu.br)](mailto:jesserocha@alunos.utfpr.edu.br)</td>

<td align="center"><a href="https://github.com/jhonatancunha">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/52831621?s=460&u=2b0cfdafeb7756176ded82c41738e773e92762b8&v=4" width="100px;" alt=""/>
<br />
 <b>Jhonatan Cunha</b></a>
 <a href="https://github.com/jhonatancunha" title="Repositorio Jhonatan"></a>

[![Gmail Badge](https://img.shields.io/badge/-jhonatancunha@alunos.utfpr.edu.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jhonatancunha@alunos.utfpr.edu.br)](mailto:jhonatancunha@alunos.utfpr.edu.br)</td>



</tr></table>
</center>