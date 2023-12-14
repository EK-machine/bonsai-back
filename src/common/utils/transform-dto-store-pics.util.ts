import * as fs from 'fs';
import { FileSystemStoredFile } from 'nestjs-form-data';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PICS_FIELDS, PICS_STORE_PATH } from '../consts/index';
import {
  CreateArticleBodyDto,
  CreateBonsaBodyDto,
  CreateInstrumentBodyDto,
  EditArticleBodyDto,
  EditBonsaiBodyDto,
  EditInstrumentBodyDto,
} from '../dtos/index';

export const transformDtoAndStorePics = <T>(
  dto:
    | CreateArticleBodyDto
    | EditArticleBodyDto
    | CreateBonsaBodyDto
    | EditBonsaiBodyDto
    | CreateInstrumentBodyDto
    | EditInstrumentBodyDto,
  storageDirPath: string,
): T => {
  const pics = Object.entries(dto)
    .filter((el) => {
      return PICS_FIELDS.some((e) => e === el[0]);
    })
    .map((pic) => {
      const operatePart = pic[1] as FileSystemStoredFile;
      const newName = `${operatePart.originalName.split('.')[0]}-${uuidv4()}.${
        operatePart.originalName.split('.')[1]
      }`;
      const newPath = `${PICS_STORE_PATH}${newName}`;
      return { ...operatePart, newName, [pic[0]]: newPath };
    });
  for (const pic of pics) {
    fs.mkdirSync(storageDirPath, { recursive: true });
    fs.renameSync(pic.path, path.resolve(storageDirPath, pic.newName));
  }

  const dtoToReturn = Object.fromEntries(
    Object.entries(dto).map((el) => {
      const imgPath: string = pics
        .map((obj) => {
          if (obj.hasOwnProperty(el[0])) {
            return obj[el[0]];
          }
        })
        .filter((el) => !!el)[0];

      if (imgPath) {
        return [el[0], imgPath];
      }
      return [el[0], el[1]];
    }),
  );

  return dtoToReturn as T;
};
