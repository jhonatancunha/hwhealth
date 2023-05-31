import psutil
from psutil._common import bytes2human
import json 

def secs2hours(secs):
    mm, ss = divmod(secs, 60)
    hh, mm = divmod(mm, 60)
    return "%d:%02d:%02d" % (hh, mm, ss)

# CPU
cpu_count = psutil.cpu_count()
cpu_percentage = psutil.cpu_percent(interval=4, percpu=True)

cpu = {
    "cpu_count": cpu_count,
    "cpu_percentage": cpu_percentage
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
    "bytes_sent": psutil_network.bytes_sent,
    "bytes_received": psutil_network.bytes_recv,
    "packets_sent": psutil_network.packets_sent,
    "packets_received": psutil_network.packets_recv,
    "error_in": psutil_network.errin,
    "error_out": psutil_network.errout,
    "drop_in": psutil_network.dropin,
    "drop_out": psutil_network.dropout

}

# Sensors
psutil_sensors = psutil.sensors_temperatures()


# Fans
psutil_fans = psutil.sensors_fans()

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

body = json.dumps({
    'cpu': cpu,
    'memory_ram': memory_ram,
    'swap_memory': swap_memory,
    'disk': disk,
    'network': network,
    'battery': battery
}, indent=4)

print(body)