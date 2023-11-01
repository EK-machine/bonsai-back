import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AtPublic, RtPublic } from '../common/decorators/index.js';
import { AtGuard, RtGuard } from '../common/guards/index.js';
import { ArticleService } from './article.service.js';
import { CreateArticleDto } from './dto/CreateArticle.dto.js';

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
}
