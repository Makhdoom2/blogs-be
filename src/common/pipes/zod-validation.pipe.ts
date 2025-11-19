import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any) {
    // console.log('ZodValidationPipe received value:', value); // log raw input

    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    return result.data;
  }
}
