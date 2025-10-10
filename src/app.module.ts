import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/database.config';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RbacSeeder } from './seeder/rbac.seeder';
import { corsConfig } from './config/cors.config';
import * as cors from 'cors';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        AuthModule,
        UserModule,
        RoleModule,
        PermissionModule,
    ],
    controllers: [AppController],
    providers: [AppService, RbacSeeder],
})
export class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) {} // inyectamos ConfigService

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(cors(corsConfig(this.configService))) // <-- pasamos la instancia
            .forRoutes('*');
    }
}
