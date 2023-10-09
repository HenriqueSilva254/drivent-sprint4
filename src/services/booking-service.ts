import { ForbiddenError, conflictError, notFoundError } from '@/errors';
import {
  enrollmentRepository,
  getBooking,
  getBookingByRoomId,
  getBookingId,
  getRoom,
  postBooking,
  putBooking,
  ticketsRepository,
} from '@/repositories';

export async function findBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const result = await getBooking(userId);
  if (!result) throw notFoundError();

  return {
    id: result.id,
    Room: { ...result.Room },
  };
}

export async function makeBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const checkTickety = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!checkTickety) throw notFoundError();
  if (checkTickety.TicketType.isRemote === true) throw ForbiddenError('ticket is remote');
  if (checkTickety.TicketType.includesHotel === false) throw ForbiddenError('hotel no include');
  if (checkTickety.status !== 'PAID') throw ForbiddenError('need paid ticket');

  const checkConflit = await getBooking(userId);
  if (checkConflit) throw conflictError('booking already exists');

  const checkRoom = await getRoom(roomId);
  if (!checkRoom) throw notFoundError();

  const checkCapacity = await getBookingByRoomId(roomId);
  console.log(checkCapacity.length);
  console.log(checkRoom.capacity);
  if (checkCapacity.length >= checkRoom.capacity)
    throw ForbiddenError('the capacity limit for this room has been reached');

  return await postBooking(userId, roomId);
}

export async function changeBooking(userId: number, roomId: number, bookingId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const checkBooking = await getBookingId(bookingId);
  if (!checkBooking) throw conflictError('booking does note exists');
  if (checkBooking.Room.id === roomId) throw conflictError('room has already been reserved by the user');

  const checkRoom = await getRoom(roomId);
  if (!checkRoom) throw notFoundError();

  const checkCapacity = await getBookingByRoomId(roomId);
  if (checkRoom.capacity <= checkCapacity.length)
    throw ForbiddenError('the capacity limit for this room has been reached');

  return await putBooking(userId, roomId);
}
