import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ScanLogsModule } from './scan-logs/scan-logs.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [PrismaModule, EmployeesModule, AttendanceModule, ScanLogsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
