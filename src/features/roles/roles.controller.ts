import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('rest/roles')
export class RolesController {
  constructor(private service: RolesService) {}
}
