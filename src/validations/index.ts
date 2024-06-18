import { registerDecorator, ValidationOptions, isEmail, isString, ValidatorConstraintInterface } from 'class-validator';
import { Transform } from 'class-transformer';
import parsePhoneNumber from 'libphonenumber-js';

export function IsEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value) && !value.includes('+');
        },
        defaultMessage() {
          return 'Please enter a valid email address';
        },
      },
    });
  };
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          this.defaultMessage = () => 'Please enter a valid phone number';
          if (!isString(value)) {
            this.defaultMessage = () => 'Phone number is required';
            return false;
          }

          const parsedPhoneNumber = parsePhoneNumber(value);
          if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
            return false;
          }

          if (!parsedPhoneNumber.country) {
            this.defaultMessage = () => 'Phone number should be in international format';
            return false;
          }

          return true;
        },
      } as ValidatorConstraintInterface,
    });
  };
}

export const TransformToLowerCase = (): PropertyDecorator => {
  return Transform(({ value }) => (value ? (value as string).toLowerCase() : undefined));
};

export const TransformToUpperCase = (): PropertyDecorator => {
  return Transform(({ value }) => (value ? (value as string).toUpperCase() : undefined));
};

export const TrimSpaces = (): PropertyDecorator => {
  return Transform(({ value }) => (value ? (value as string).trim() : undefined));
};
