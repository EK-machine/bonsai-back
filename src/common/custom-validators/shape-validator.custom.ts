import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { POT_SHAPES } from '../../common/consts/index';

@ValidatorConstraint({ name: 'ShapeValidation' })
export class ShapeValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (value) {
      return POT_SHAPES.includes(value);
    }
    return false;
  }
}
