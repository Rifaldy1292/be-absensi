import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScanLogsService } from './scan-logs.service';
import { CreateScanLogDto } from './dto/create-scan-log.dto';
import { UpdateScanLogDto } from './dto/update-scan-log.dto';

@Controller('scan-logs')
export class ScanLogsController {
  constructor(private readonly scanLogsService: ScanLogsService) {}

  @Post()
  create(@Body() createScanLogDto: CreateScanLogDto) {
    return this.scanLogsService.create(createScanLogDto);
  }

  @Get()
  findAll() {
    return this.scanLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scanLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScanLogDto: UpdateScanLogDto) {
    return this.scanLogsService.update(+id, updateScanLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scanLogsService.remove(+id);
  }
}
