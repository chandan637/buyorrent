import { IsString, IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  public title: string;

  @IsNumber()
  public sqArea: Number;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsArray()
  public images: Array<any>;

  @IsNumber()
  public price: number;

  @IsString()
  public priceCycle: string;

  @IsString()
  public contactNo: string;

  @IsBoolean()
  public isBuyable: boolean;

  @IsBoolean()
  public isRentable: boolean;

  @IsOptional()
  @IsNumber()
  public soldOn: number;

  @IsOptional()
  @IsString()
  public purchasedBy: string;

  @IsOptional()
  @IsString()
  public createdBy: string;

  @IsOptional()
  @IsNumber()
  public createdAt: number;

  @IsOptional()
  @IsString()
  public city: string;

  @IsOptional()
  @IsString()
  public address: string;
}
