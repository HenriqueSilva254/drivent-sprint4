import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { changeBooking, findBooking, makeBooking } from '@/services/booking-service';

export async function bookingId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const result = await findBooking(userId);
  res.send(result).status(httpStatus.OK);
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  console.log(userId);
  const result = await makeBooking(userId, roomId);
  res.send(result).status(httpStatus.OK);
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  console.log(userId);
  const result = await changeBooking(userId, parseInt(roomId), parseInt(bookingId));
  res.send(result).status(httpStatus.OK);
}
