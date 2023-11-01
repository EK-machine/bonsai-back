import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../typeorm/entities/article.entity.js';
import { ARTICLE_NOT_FOUND } from './consts/article.constants.js';
import { CreateArticleDto } from './dto/CreateArticle.dto.js';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticleById(id: number): Promise<Article> {
    try {
      return await this.articleRepository.findOneOrFail({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(ARTICLE_NOT_FOUND);
    }
  }

  async createArticle(articleDetails: CreateArticleDto) {
    const newArticle = await this.articleRepository.create({
      ...articleDetails,
    });
    return this.articleRepository.save(newArticle);
  }
}
