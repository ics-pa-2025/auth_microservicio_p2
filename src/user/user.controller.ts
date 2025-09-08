import {Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {RequirePermissions} from 'src/decorators/permissions.decorator';
import {AssignRolesDto} from "./dto/assign-roles.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get(':id/roles')
    @RequirePermissions('users:read')
    getUserWithRoles(@Param('id') id: string) {
        return this.userService.getUserWithRoles(id);
    }

    @Post(':id/roles')
    @RequirePermissions('users:update')
    assignRoles(
        @Param('id') id: string,
        @Body(ValidationPipe) assignRolesDto: AssignRolesDto
    ) {
        return this.userService.assignRoles(id, assignRolesDto.roleIds);
    }

    @Delete(':id/roles')
    @RequirePermissions('users:update')
    removeRoles(
        @Param('id') id: string,
        @Body(ValidationPipe) assignRolesDto: AssignRolesDto
    ) {
        return this.userService.removeRoles(id, assignRolesDto.roleIds);
    }

    @Put(':id/roles')
    @RequirePermissions('users:update')
    setRoles(
        @Param('id') id: string,
        @Body(ValidationPipe) assignRolesDto: AssignRolesDto
    ) {
        return this.userService.setRoles(id, assignRolesDto.roleIds);
    }
}
