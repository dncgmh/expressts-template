import { IsNumber, Min, Max, IsOptional, IsString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
/**
 *
 *
 * @class BaseQueries
 * @description Base queries Dto for find
 */
export class BaseQueries {
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;
  @IsString()
  @IsOptional()
  select?: string;
  @IsString()
  @IsOptional()
  sort?: string;
}

export class BaseId {
  @IsMongoId()
  id: string;
}
