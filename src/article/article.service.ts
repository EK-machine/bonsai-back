import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/common.consts.js';
import { Article } from '../typeorm/entities/article.entity.js';
import { CreateArticleDto, EditArticleDto } from './dto/index.js';

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
      throw new NotFoundException(EXCEPTION_MSGS.ARTICLE_NOT_FOUND);
    }
  }

  async createArticle(articleDetails: CreateArticleDto) {
    const newArticle = await this.articleRepository.create({
      ...articleDetails,
    });
    return this.articleRepository.save(newArticle);
  }

  async deleteById(id: number) {
    const articleToDel = await this.getArticleById(id);
    return await this.articleRepository.remove(articleToDel);
  }

  async editById(id: number, editBody: EditArticleDto) {
    let articleToEdit = await this.getArticleById(id);
    articleToEdit = { ...articleToEdit, ...editBody };
    return this.articleRepository.save(articleToEdit);
  }
}
