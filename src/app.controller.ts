import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Rate limiting is applied to this route.
  @SkipThrottle({ default: false })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // This route will skip rate limiting.
  @Get("users")
  getUsers() {
    return "USERS";
  }

  // Override default configuration for Rate limiting and duration.
  @SkipThrottle({ default: false })
  @Throttle({default: { limit: 1, ttl: 50000 }})
  @Get("users/posts")
  getUserPosts() {
    return "USERS POSTS"
  }

}
