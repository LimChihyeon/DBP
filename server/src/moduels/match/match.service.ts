import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/Matchs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class matchService {
  constructor(
    @InjectRepository(Match)
    private matchRepo: Repository<Match>,
  ) {}

  async findOne(id: number) {
    const match = await this.matchRepo.findOne({ where: { id: id } });
    return match;
  }
}
