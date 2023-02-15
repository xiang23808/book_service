import { PartialType } from '@nestjs/swagger';
import { CreateHelpDto } from './create-help.dto';

export class UpdateHelpDto extends PartialType(CreateHelpDto) {}
