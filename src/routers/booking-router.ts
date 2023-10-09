import { Router } from 'express';
import { bookingId, postBooking, putBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', bookingId).post('/', postBooking).put('/:bookingId', putBooking);
export { bookingRouter };
