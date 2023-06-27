import { ApiProperty } from '@nestjs/swagger';
import FansDto from './fans.dto';
import CpuDto from './cpu.dto';
import MemoryRamDto from './memory_ram.dto';
import SwapMemoryDto from './swap_memory.dto';
import DiskDto from './disk.dto';
import NetworkDto from './network.dto';
import BatteryDto from './battery.dto';

export default class CreateMachineDto {
  @ApiProperty({ type: String })
    user_info: {
    username: string;
    uuid: string;
    os_name: string;
    os_release: string;
    os_architecture: string;
    os_version: string;
  };

  @ApiProperty({ type: FansDto })
    fans: FansDto;

  @ApiProperty({ type: CpuDto })
    cpu: CpuDto;

  @ApiProperty({ type: MemoryRamDto })
    memory_ram: MemoryRamDto;

  @ApiProperty({ type: SwapMemoryDto })
    swap_memory: SwapMemoryDto;

  @ApiProperty({ type: DiskDto })
    disk: DiskDto;

  @ApiProperty({ type: NetworkDto })
    network: NetworkDto;

  @ApiProperty({ type: BatteryDto })
    battery: BatteryDto;
}
