import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  // Ambil semua data absensi
  findAll() {
    return this.prisma.attendance.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Ambil absensi hari ini
  async findDaily() {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return this.prisma.attendance.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  // Ambil absensi minggu ini
  async findWeekly() {
    const now = new Date();
    const first = now.getDate() - now.getDay(); // hari Minggu
    const startOfWeek = new Date(now.setDate(first));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return this.prisma.attendance.findMany({
      where: {
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });
  }

  // Ambil absensi bulan ini
  async findMonthly() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return this.prisma.attendance.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
  }

  // Ambil detail absensi tertentu
  findOne(id: string) {
    return this.prisma.attendance.findUnique({
      where: { id: String(id) },
    });
  }
}
