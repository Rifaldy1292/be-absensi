// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Buat User Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Utama',
      email: 'admin@example.com',
      password: 'hashed-password', // Ganti nanti pake hash beneran
      role: 'admin',
    },
  });

  // 2. Buat beberapa Employee
  const employees = await prisma.employee.createMany({
    data: [
      {
        id: 'emp-1',
        rfid_code: 'RFID001',
        nik: 'NIK001',
        name: 'Rifky Developer',
        position: 'Software Engineer',
        department: 'IT',
      },
      {
        id: 'emp-2',
        rfid_code: 'RFID002',
        nik: 'NIK002',
        name: 'Budi Santoso',
        position: 'Technician',
        department: 'Maintenance',
      },
    ],
  });

  // 3. Buat Attendance untuk Rifky
  const attendance = await prisma.attendance.create({
    data: {
      employee_id: 'emp-1',
      date: new Date('2025-07-17'),
      time_in: new Date('2025-07-17T07:30:00'),
      time_out: new Date('2025-07-17T16:00:00'),
      total_hours: '8.5',
    },
  });

  // 4. Buat ScanLog untuk Rifky
  await prisma.scanLog.createMany({
    data: [
      {
        employee_id: 'emp-1',
        attendance_id: attendance.id,
        timestamp: new Date('2025-07-17T07:30:00'),
        scan_type: 'in',
        source: 'Gate A',
      },
      {
        employee_id: 'emp-1',
        attendance_id: attendance.id,
        timestamp: new Date('2025-07-17T16:00:00'),
        scan_type: 'out',
        source: 'Gate A',
      },
    ],
  });

  console.log('✅ Dummy data berhasil dimasukkan!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
