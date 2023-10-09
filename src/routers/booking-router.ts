import { Router } from 'express';
import { bookingId, postBooking, putBooking } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingSchema, bookingSchemaParams } from '@/schemas/booking-schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', bookingId)
  .post('/', postBooking)
  .put('/:bookingId', validateBody(bookingSchema), putBooking);
export { bookingRouter };
