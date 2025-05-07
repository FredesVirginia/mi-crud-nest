import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile-dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository : Repository<User> ,
    @InjectRepository(Profile) private profileRepository : Repository<Profile>
){}

    async createUser(user : CreateUserDto){

        const userFound = await this.userRepository.findOne({
            where : { username : user.username}
        })

        if(userFound){
            return new HttpException("Usuario existente " , HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

   async getUser( id : number){
       const userFound = await  this.userRepository.findOne({
            where : {
                id
            }
        })

        if(!userFound){
            return new HttpException("No encontro usuario" , HttpStatus.NOT_FOUND)
        }

        return userFound
    }

   async deleteUser( id: number){
        this.userRepository.delete({id : id})
        const userFound = await this.userRepository.findOne({
            where : {id}
        });

        if(!userFound){
          return new HttpException("Usuario no encontrado" , HttpStatus.NOT_FOUND)
        }

        return this.userRepository.delete({id})
    }

    updateUser(id : number , user : UpdateUserDto){
       return this.userRepository.update({id} , user)
    }

    getUsers(){
      return  this.userRepository.find()
    }

    async createProfile( id : number , profile : CreateProfileDto){
      const useFound=  await this.userRepository.findOne({
            where : {id}
        })

    if(!useFound){
        return new HttpException("Usuario no encontrado" , HttpStatus.NOT_FOUND)
    }
    const newProfile = this.profileRepository.create(profile)
    const saveProfile=  await this.profileRepository.save(newProfile)

    useFound.profile = saveProfile;
    return this.userRepository.save(useFound)
    }
}
