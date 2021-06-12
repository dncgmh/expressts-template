import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumberString, IsString, Length, Matches, validate } from 'class-validator';
import dotenv from 'dotenv';
import fs from 'fs';
import { logger } from '../helper/logger';

class ConfigDto {
  @IsEnum(['production', 'development', 'staging'])
  NODE_ENV: string;
  @IsNumberString()
  PORT: number;
  @IsString()
  @Length(1)
  ACCESS_TOKEN_SECRET: string;
  @IsNumberString()
  ACCESS_TOKEN_LIFE: number;
  @Matches(/^mongodb:\/\/.+/)
  DB_URI: string;
}

export type ConfigType = keyof ConfigDto;

class Config {
  private readonly envConfig: { [key: string]: string };
  state: Record<any, any>;
  constructor(filePath: string) {
    this.state = {};
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    validate(plainToClass(ConfigDto, this.envConfig)).then((errs) =>
      errs.length
        ? logger.error(
            'Config error %o',
            errs.map((err) => err.constraints)
          )
        : logger.info('Config ok')
    );
  }
  getEnv(key: ConfigType): string {
    return this.envConfig[key];
  }
}

export const configService = new Config(`.env.${process.env.NODE_ENV}`);
