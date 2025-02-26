import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from "prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy"; // Import JwtStrategy

@Module({
    imports: [
        ConfigModule.forRoot(),  // Ensure ConfigModule is imported
        JwtModule.registerAsync({
            imports: [ConfigModule],  // Import ConfigModule here
            inject: [ConfigService],  // Inject ConfigService
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(process.env.JWT_SECRET),
                signOptions: { expiresIn: '3d' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],  // Add JwtStrategy here
    exports: [AuthService],
})
export class AuthModule {}
