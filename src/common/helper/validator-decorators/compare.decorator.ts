import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function Compare(
  property: string,
  options: { condition: 'eq' | 'neq' | 'lte' | 'gte'; rate?: number },
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'Compare',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = !options.rate
            ? (args.object as any)[relatedPropertyName]
            : (args.object as any)[relatedPropertyName] * options.rate;
          switch (options.condition) {
            case 'eq':
              return value === relatedValue;
            case 'neq':
              return value !== relatedValue;
            case 'lte':
              return value <= relatedValue;
            case 'gte':
              return value >= relatedValue;
            default:
              break;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `$property must be ${options.condition} ${property}`;
        }
      }
    });
  };
}
