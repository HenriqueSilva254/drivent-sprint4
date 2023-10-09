import { ApplicationError } from '@/protocols';

export function ForbiddenError(): ApplicationError {
  return {
    name: 'ForbiddenError',
    message: `the capacity limit for this room has been reached`,
  };
}
