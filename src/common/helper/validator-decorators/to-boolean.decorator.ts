import { Transform } from 'class-transformer';

export function ToBoolean() {
  return Transform(({ value: v }) => ['1', 1, 'true', true].includes(v));
}
