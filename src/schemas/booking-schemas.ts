import Joi from 'joi';

export const bookingSchema = Joi.object({
  roomId: Joi.number().integer().required(),
});

export const bookingSchemaParams = Joi.object({
  bookingId: Joi.number().integer().required(),
});
