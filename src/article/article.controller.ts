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
import { FormDataRequest } from 'nestjs-form-data';
import { EXCEPTION_MSGS } from '../common/consts/index';
import { AtPublic, RtPublic } from '../common/decorators/index';
import { CreateArticleBodyDto, EditArticleBodyDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { ArticleService } from './article.service.js';

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
      throw new NotFoundException(EXCEPTION_MSGS.ARTICLE_NOT_FOUND);
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
  @FormDataRequest()
  async createArticle(@Body() createArticleBodyDto: CreateArticleBodyDto) {
    return await this.articleService.createArticle(createArticleBodyDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.articleService.deleteById(+id);
  }

  @Patch('edit/:id')
  @HttpCode(HttpStatus.OK)
  @FormDataRequest()
  async editById(
    @Param('id') id: string,
    @Body() editArticleBodyDto: EditArticleBodyDto,
  ) {
    return await this.articleService.editById(+id, editArticleBodyDto);
  }
}
