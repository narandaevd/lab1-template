import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonRequest {
  @IsDefined()
  @IsString()
  declare name: string;

  @IsNumber()
  @IsOptional()
  declare age?: number;

  @IsString()
  @IsOptional()
  declare address?: string;

  @IsString()
  @IsOptional()
  declare work?: string;
}
