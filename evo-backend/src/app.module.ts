import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from './db/entities/user.entity';
import { Organization } from './db/entities/organization.entity';
import { TaskModule } from './tasks/tasks.module';
import { OrganizationsModule } from './organizations/organizations.module';
// import { OrganizationsModule } from './organizations/organizations.module';
// import { TaskModule } from './task/task.module';
import { ProjectsModule } from './projects/projects.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DB'),
        entities: [User, Organization],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([User, Organization]),
    UsersModule,
    OrganizationsModule,
    TaskModule,
    ProjectsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  // providers: [AppService, JwtService, RolesGuard],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
