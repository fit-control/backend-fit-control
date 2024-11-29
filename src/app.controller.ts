import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Sistem-fit-control')
  getHello(): object {
    return this.appService.getHello();
  }
}
