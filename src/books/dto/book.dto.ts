import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  writerName: string;

  @IsString()
  bookName: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  bookImage?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateBookDto extends CreateBookDto {}
