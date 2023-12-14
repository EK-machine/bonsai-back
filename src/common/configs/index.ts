import { FileSystemStoredFile } from 'nestjs-form-data';
import { FormDataInterceptorConfig } from 'nestjs-form-data/dist/interfaces/FormDataInterceptorConfig.js';
import { NestjsFormDataConfigFactory } from 'nestjs-form-data/dist/interfaces/NestjsFormDataConfigFactory.js';
import { MAX_FILE_SIZE } from '../consts/index';

export class MyNestJsFormDataConfigService
  implements NestjsFormDataConfigFactory
{
  configAsync():
    | Promise<FormDataInterceptorConfig>
    | FormDataInterceptorConfig {
    return {
      storage: FileSystemStoredFile,
      fileSystemStoragePath: '../bonsai-pics',
      autoDeleteFile: false,
      limits: { fileSize: MAX_FILE_SIZE },
    };
  }
}
