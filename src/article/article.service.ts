import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { EXCEPTION_MSGS } from '../common/consts/index';
import {
  CreateArticleBodyDto,
  CreateArticleDto,
  EditArticleBodyDto,
  EditArticleDto,
} from '../common/dtos/index';
import { Article } from '../common/typeorm-entities/index';
import { deletePics, transformDtoAndStorePics } from '../common/utils/index';

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

  async createArticle(createArticleBodyDto: CreateArticleBodyDto) {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const createArticleDto = transformDtoAndStorePics<CreateArticleDto>(
      createArticleBodyDto,
      storageDirPath,
    );

    const newArticle = await this.articleRepository.create({
      ...createArticleDto,
    });
    return this.articleRepository.save(newArticle);
  }

  async deleteById(id: number) {
    const articleToDel = await this.getArticleById(id);
    if (articleToDel.img_path_1) {
      await deletePics(articleToDel);
    }
    return await this.articleRepository.remove(articleToDel);
  }

  async editById(id: number, editArticleBodyDto: EditArticleBodyDto) {
    const storageDirPath = path.resolve(__dirname, '../../../bonsai-pics');
    const editArticleDto = transformDtoAndStorePics<EditArticleDto>(
      editArticleBodyDto,
      storageDirPath,
    );

    let articleToEdit = await this.getArticleById(id);
    if (articleToEdit.img_path_1) {
      await deletePics(articleToEdit);
    }
    articleToEdit = { ...articleToEdit, ...editArticleDto };
    return this.articleRepository.save(articleToEdit);
  }
}
