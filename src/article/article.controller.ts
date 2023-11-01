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
import { ArticleService } from './article.service.js';
import { CreateArticleDto, EditArticleDto } from './dto/index.js';

@Controller('article')
@UseGuards(RtGuard, AtGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @AtPublic()
  @RtPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllArticles() {
    const allArticles = await this.articleService.getAllArticles();
    if (!allArticles) {
      throw new NotFoundException();
    }
    return allArticles;
  }

  @AtPublic()
  @RtPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(+id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.articleService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  async editById(
    @Param('id') id: string,
    @Body() editArticleDto: EditArticleDto,
  ) {
    return await this.articleService.editById(+id, editArticleDto);
  }
}
