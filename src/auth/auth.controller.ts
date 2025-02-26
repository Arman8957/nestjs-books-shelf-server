// import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { SignupDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) {}

//     @Post('signup')
//     @HttpCode(HttpStatus.CREATED) // Set proper HTTP response code
//     @UsePipes(new ValidationPipe({ whitelist: true })) // Enable class-validator
//     async signup(@Body() signupDto: SignupDto) {
//         console.log("received signup request", signupDto)
//         const response = this.authService.signup(signupDto);
//         return response;
//     }

//     @Post('login')
//     @HttpCode(HttpStatus.OK) // Explicit HTTP 200 for login
//     @UsePipes(new ValidationPipe({ whitelist: true }))
//     async login(@Body() loginDto: LoginDto) {
//         return this.authService.login(loginDto);
//     }
// }

import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    const response = await this.authService.signup(signupDto);
    console.log(response);
    return response;
    
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
