
import { UsersService } from '../users/users.service';
import { Controller, Post , Body , Get , Param , Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

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

}
