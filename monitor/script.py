"""
Algoritmo de monitoramento HWHealth.

Este script captura dados da máquina do usuário e os envia para o servidor HWHealth para monitoramento e análise. 
O script coleta várias métricas, como temperatura da CPU, uso da CPU, uso de memória RAM, uso de memória swap, uso de disco, 
informações de rede, informações da bateria e outros dados relevantes da máquina.

O script usa a biblioteca psutil para acessar informações do sistema operacional e os dados são enviados para o servidor 
HWHealth por meio de requisições HTTP. O usuário deve fornecer seu e-mail e senha como argumentos de linha de comando para 
autenticação no servidor.

O algoritmo funciona em um loop agendado, onde os dados são coletados e enviados para o servidor em intervalos regulares. 
O intervalo padrão é de 60 segundos, mas pode ser ajustado por meio dos argumentos de linha de comando. 
Os dados são enviados usando o método POST para a rota '/machine' no servidor HWHealth.

Exemplo de uso:
python monitor.py -e seu_email@example.com -p sua_senha

Argumentos:
  -e, --email    E-mail do usuário para autenticação no servidor HWHealth.
  -p, --password Senha do usuário para autenticação no servidor HWHealth.
"""

import psutil
from psutil._common import bytes2human
import numpy as np
import getpass
import uuid
import platform
import sched
import time
import logging
import requests
import argparse

logging.basicConfig(filename='scheduler.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


parser = argparse.ArgumentParser(
                    prog='Algoritmo de monitoramento HWHealth',
                    description='Captura dados da máquina e envia para o servidor')

parser.add_argument('-e', '--email')
parser.add_argument('-p', '--password')

args = parser.parse_args()

email = args.email
password = args.password
token = None
refresh_token = None
base_url = 'http://192.168.1.15:3000'

def secs2hours(secs):
    """
    Converte o número de segundos em uma string formatada no formato HH:MM:SS.

    Args:
        secs (int): O número de segundos a serem convertidos.

    Returns:
        str: Uma string formatada no formato HH:MM:SS.

    Exemplo:
        >>> secs2hours(3661)
        '1:01:01'
        >>> secs2hours(7200)
        '2:00:00'
    """
    mm, ss = divmod(secs, 60)
    hh, mm = divmod(mm, 60)
    return "%d:%02d:%02d" % (hh, mm, ss)

def get_machine_info():
    """
    Captura as informações da máquina do usuário.

    Esta função coleta várias informações sobre a máquina do usuário, incluindo informações do usuário, sensores, CPU, memória RAM, memória swap, partições de disco, rede e bateria. As informações são obtidas usando a biblioteca psutil para acessar dados do sistema operacional.

    Returns:
        dict: Um dicionário contendo as informações capturadas da máquina. As chaves do dicionário são as seguintes:

            - 'uuid': UUID da máquina.
            - 'name': Nome do usuário do sistema operacional.
            - 'user_info': Um dicionário com informações adicionais do usuário, incluindo o nome do sistema operacional, versão, arquitetura e lançamento.
            - 'fans': Um dicionário contendo informações sobre os ventiladores da máquina, incluindo o tamanho e uma lista de ventiladores com seus valores atuais e rótulos.
            - 'cpu': Um dicionário com informações sobre a CPU, incluindo a contagem de núcleos, o uso médio da CPU, o uso da CPU por núcleo, a unidade de temperatura, a temperatura média da CPU e a lista de temperaturas da CPU.
            - 'memory_ram': Um dicionário com informações sobre a memória RAM, incluindo a capacidade total, a capacidade disponível, a porcentagem de uso, o espaço usado e o espaço livre.
            - 'swap_memory': Um dicionário com informações sobre a memória swap, incluindo a capacidade total, o espaço usado, o espaço livre e a porcentagem de uso.
            - 'disk': Um dicionário com informações sobre as partições de disco, incluindo o espaço livre, a porcentagem de uso, a capacidade total e o espaço usado.
            - 'network': Um dicionário com informações sobre a rede, incluindo os bytes enviados e recebidos, os pacotes enviados e recebidos, erros de entrada e saída, e descartes de pacotes de entrada e saída.
            - 'battery': Um dicionário com informações sobre a bateria (se disponível), incluindo a carga da bateria, o tempo restante de carga (formatado em HH:MM:SS) e o status de alimentação (conectado ou desconectado).

    Exemplo:
        >>> get_machine_info()
        {
            'uuid': '1234567890',
            'name': 'username',
            'user_info': {
                'name': 'username',
                'uuid': '1234567890',
                'os_name': 'Windows',
                'os_release': '10',
                'os_architecture': 'AMD64',
                'os_version': '10.0.19041'
            },
            'fans': {
                'size_fans': 2,
                'array_fans': [
                    {'value': 1200, 'label': 'Fan 1'},
                    {'value': 1500, 'label': 'Fan 2'}
                ]
            },
            'cpu': {
                'cpu_count': 4,
                'cpu_mean_percentage': 50.0,
                'cpu_percentage': [40.0, 60.0, 50.0, 45.0],
                'temperature_unit': 'celsius',
                'cpu_mean_temperature': 60.0,
                'cpu_temperature': [65.0, 70.0, 55.0, 58.0]
            },
            'memory_ram': {
                'total': '16.0 GB',
                'available': '8.0 GB',
                'percent': 50,
                'used': '8.0 GB',
                'free': '8.0 GB'
            },
            'swap_memory': {
                'total': '4.0 GB',
                'used': '1.0 GB',
                'free': '3.0 GB',
                'percent': 25
            },
            'disk': {
                'free': '500.0 GB',
                'percent': 75,
                'total': '2.0 TB',
                'used': '1.5 TB'
            },
            'network': {
                'bytes_sent': '1.5 MB',
                'bytes_received': '500.0 KB',
                'packets_sent': 100,
                'packets_received': 50,
                'error_in': 0,
                'error_out': 1,
                'drop_in': 0,
                'drop_out': 2
            },
            'battery': {
                'charge': 80.0,
                'time_left': '2:30:00',
                'power_plugged': True
            }
        }
    """

    # User Info
    name = getpass.getuser()
    uuid_machine = uuid.getnode()
    os_name = platform.system()
    os_release = platform.release()
    os_version = platform.version()
    os_architecture = platform.machine()

    user_info = {
        "name": name,
        "uuid":  uuid_machine,
        "os_name": os_name,
        "os_release": os_release,
        "os_architecture": os_architecture,
        "os_version": os_version,
    }   

    # Sensors
    psutil_sensors = psutil.sensors_temperatures()

    core_temp = [{"temp":item.current, "label": item.label} for item in psutil_sensors['coretemp']]
    array_temp = [item["temp"] for item in core_temp]
    mean_temp = np.mean(array_temp)

    # Fans
    psutil_fans = psutil.sensors_fans()
    array_fans = [{"value": item.current, "label": key} for key, item in psutil_fans.items()]
    size_fans = len(array_fans)

    fans = {
        "size_fans": size_fans,
        "array_fans": array_fans,
    }   

    # CPU
    cpu_count = psutil.cpu_count()
    cpu_percentage = psutil.cpu_percent(interval=4, percpu=True)
    cpu_mean_percentage = np.mean(cpu_percentage)

    cpu = {
        "cpu_count": cpu_count,
        "cpu_mean_percentage": cpu_mean_percentage,
        "cpu_percentage": cpu_percentage,
        "temperature_unit": "celsius",
        "cpu_mean_temperature": mean_temp,
        "cpu_temperature": array_temp,
    }

    # Memoria RAM
    psutil_ram_memory = psutil.virtual_memory()
    memory_ram = {
        "total": bytes2human(psutil_ram_memory.total),
        "available": bytes2human(psutil_ram_memory.available),
        "percent": int(psutil_ram_memory.percent),
        "used": bytes2human(psutil_ram_memory.used),
        "free": bytes2human(psutil_ram_memory.free),
    }


    # Memoria SWAP
    psutil_swap_memory = psutil.swap_memory()
    swap_memory = {
        "total": bytes2human(psutil_swap_memory.total),
        "used": bytes2human(psutil_swap_memory.used),
        "free": bytes2human(psutil_swap_memory.free),
        "percent": int(psutil_swap_memory.percent),
    }

    # Partições
    psutil_disk = psutil.disk_usage('/')
    disk = {
        "free": bytes2human(psutil_disk.free),
        "percent": int(psutil_disk.percent),
        "total": bytes2human(psutil_disk.total),
        "used": bytes2human(psutil_disk.used),
    }

    # Network
    psutil_network = psutil.net_io_counters(pernic=False, nowrap=True)
    network = {
        "bytes_sent": bytes2human(psutil_network.bytes_sent),
        "bytes_received": bytes2human(psutil_network.bytes_recv),
        "packets_sent": psutil_network.packets_sent,
        "packets_received": psutil_network.packets_recv,
        "error_in": psutil_network.errin,
        "error_out": psutil_network.errout,
        "drop_in": psutil_network.dropin,
        "drop_out": psutil_network.dropout

    }


    # Battery
    psutil_battery = psutil.sensors_battery()

    if psutil_battery is None:
        battery = {}
    else:
        battery = {
            "charge": psutil_battery.percent,
            "time_left": secs2hours(psutil_battery.secsleft),
            "power_plugged": psutil_battery.power_plugged,
        }

    body = {
        'uuid': user_info['uuid'],
        'name': user_info['name'],
        'user_info': user_info,
        'fans': fans,
        'cpu': cpu,
        'memory_ram': memory_ram,
        'swap_memory': swap_memory,
        'disk': disk,
        'network': network,
        'battery': battery
    }

    return body


def send_to_server(data):
    """
    Envia os dados da máquina para o servidor.

    Esta função envia os dados fornecidos para o servidor usando uma requisição POST. Os dados são enviados em formato JSON no corpo da requisição e a autenticação é realizada usando um token de autorização.

    Args:
        data (dict): Um dicionário contendo os dados da máquina a serem enviados.

    Raises:
        ConnectionError: Se ocorrer um erro de conexão ao tentar enviar os dados para o servidor.

    Returns:
        None
    """
    global token, refresh_token

    headers = {
        'Authorization': f'Bearer {token}'
    }


    response = requests.post(f"{base_url}/machine", json=data, headers=headers)

    if (response.status_code != 201 and response.status_code != 200):
        logging.error("Não foi possível enviar dados ao servidor")
    else:
        logging.info("Dados enviados com sucesso")

def send_info():
    """
    Obtém as informações da máquina usando a função 'get_machine_info' e envia para o servidor usando a função 'send_to_server'.
    """
    data = get_machine_info()
    send_to_server(data)

def login(email, password):
    """
    Realiza o login do usuário no servidor.

    Esta função realiza o login do usuário no servidor usando as credenciais fornecidas. As credenciais são enviadas em formato JSON no corpo de uma requisição POST para o endpoint '/auth/sign-in'. Se o login for bem-sucedido, o token de acesso e o token de atualização são armazenados nas variáveis globais 'token' e 'refresh_token', respectivamente.

    Args:
        email (str): O e-mail do usuário.
        password (str): A senha do usuário.

    Returns:
        bool: Retorna True se o login for bem-sucedido, caso contrário, retorna False.

    Example:
        >>> email = 'user@example.com'
        >>> password = 'password123'
        >>> login(email, password)
        True
    """
    global token, refresh_token

    data = {
        "email": email,
        "password": password 
    }

    response = requests.post(f"{base_url}/auth/sign-in", json=data)

    if (response.status_code != 200):
        message = "Credenciais inválidas. Por favor, informe outro e-mail e senha"
        print(message)
        logging.error(message)
        return False
    else:
        logging.info("Usuário autenticado com sucesso")
        data = response.json()
        token = data["accessToken"]
        refresh_token = data["refreshToken"]
        return True

def main():
    """
    Função principal que realiza o processo de autenticação, agendamento e envio de informações.
    Após o login bem-sucedido, configura um agendador para chamar a função 'send_info' em intervalos regulares.
    """
    success = login(email, password)
    if success == True:
        scheduler = sched.scheduler(time.time, time.sleep)

        seconds = 60
        minutes = 0


        if seconds == 0:
            interval = minutes * 60
        elif minutes == 0:
            interval = seconds
        else:
            interval = minutes * seconds

        def schedule_function():
            send_info()
            scheduler.enter(interval, 1, schedule_function)

        # Executa o schedule a primeira vez
        scheduler.enter(0, 1, schedule_function)
        scheduler.run()


if __name__ == '__main__':
    main()
