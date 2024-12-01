import { Controller, Get, Req } from '@nestjs/common';
import { matchService } from './match.service';
import { Request } from 'express';

@Controller('match')
export class matchController {
  constructor(private readonly matchService: matchService) {}

  @Get('/:id')
  async getMatch(@Req() req: Request) {
    const match = await this.matchService.findOne(parseInt(req.params.id));
    return match;
  }
}
