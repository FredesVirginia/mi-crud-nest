
import { UsersService } from '../users/users.service';
import { Controller, Post , Body , Get , Param , Delete, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile-dto';

@Controller('users')
export class UsersController {

    //INTACACION DEL SERVICIO, ASI SE LLAMA AL SERVIICIO DE USERS
    constructor(private usersService : UsersService){} 
    

    @Get(':id')
    getUser(@Param('id') id : number){
        return this.usersService.getUser(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id : number){
        return this.usersService.deleteUser(id)
    }
    //MOSTRAR TODOS LOS USER
    @Get()
    getUsers(): Promise <User[]>{
        return this.usersService.getUsers()
    }
    
    @Post()
    createUser(@Body() newUser : CreateUserDto){
       return this.usersService.createUser(newUser)
    }

    @Patch(':id')
    updateUser( @Param ('id') id:number , @Body() user : UpdateUserDto){
        return this.usersService.updateUser(id , user)
    }

    @Post(':id/profile')
        createProfile(
            @Param('id') id :number,
            @Body() profile : CreateProfileDto
        ){
            return this.usersService.createProfile(id , profile)
        }

}
