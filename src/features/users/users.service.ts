import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/core/entities/users/users.dto';
import { UsersEntity } from 'src/core/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      console.log(createUserDto);
      const result = await this.userRepository.save(createUserDto);
      return result;
    } catch (error) {
      console.log(error);
      return {
        error,
      };
    }
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<any[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewUser(id: number): Promise<UsersEntity> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
    try {
      const user: UsersEntity = new UsersEntity();
      user.name = updateUserDto.name;
      user.age = updateUserDto.age;
      user.email = updateUserDto.email;
      user.username = updateUserDto.username;
      user.password = updateUserDto.password;
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
