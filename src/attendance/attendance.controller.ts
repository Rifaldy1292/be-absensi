import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Ambil semua data absensi (optional)
  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  // Ambil absensi hari ini
  @Get('daily')
  findDaily() {
    return this.attendanceService.findDaily();
  }

  // Ambil absensi minggu ini
  @Get('weekly')
  findWeekly() {
    return this.attendanceService.findWeekly();
  }

  // Ambil absensi bulan ini
  @Get('monthly')
  findMonthly() {
    return this.attendanceService.findMonthly();
  }

  // Ambil detail absensi by ID (optional)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }
}
