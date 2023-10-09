import { prisma } from '@/config';

export async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    select: { id: true, Room: true },
  });
}

export async function getBookingId(bookingId: number) {
  return await prisma.booking.findFirst({
    where: { id: bookingId },
    select: { id: true, Room: true },
  });
}

export async function getBookingByRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: { roomId },
  });
}

export async function getRoom(roomId: number) {
  return await prisma.room.findFirst({
    where: { id: roomId },
  });
}

export async function postBooking(userId: number, roomId: number) {
  const result = await prisma.booking.create({
    data: { userId, roomId },
  });
  return { bookingId: result.id };
}

export async function putBooking(userId: number, roomId: number) {
  const result = await prisma.booking.update({
    where: { userId },
    data: { roomId },
  });
  return { bookingId: result.id };
}
