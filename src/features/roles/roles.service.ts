import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from 'src/core/entities/roles/roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RolesEntity) repository) {}
}
