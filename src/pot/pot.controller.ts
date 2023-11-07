import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { POT_NOT_FOUND } from './consts/pot.constants.js';
import { CreatePotDto, EditPotDto } from './dto/index.js';
import { PotService } from './pot.service.js';

@Controller('related/pot')
@UseGuards(RtGuard, AtGuard)
export class PotController {
  constructor(private readonly potService: PotService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPots() {
    const allPots = await this.potService.getAllPots();
    if (!allPots) {
      throw new NotFoundException(POT_NOT_FOUND);
    }
    return allPots;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPotById(@Param('id') id: string) {
    return this.potService.getPotById(+id);
  }

  @Post('create')
  @AtPublic() // to del
  @RtPublic() // to del
  @HttpCode(HttpStatus.CREATED)
  async createPot(@Body() createPotDto: CreatePotDto) {
    return await this.potService.createPot(createPotDto);
  }

  @Delete('delete/:id')
  @AtPublic() // to del
  @RtPublic() // to del
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.potService.deleteById(+id);
  }

  @Patch('edit/:id')
  @AtPublic() // to del
  @RtPublic() // to del
  @HttpCode(HttpStatus.OK)
  async editById(@Param('id') id: string, @Body() editPotDto: EditPotDto) {
    return await this.potService.editById(+id, editPotDto);
  }
}
