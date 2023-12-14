import * as fs from 'fs';
import * as path from 'path';
import { PICS_DEL_PATH, PICS_FIELDS } from '../consts/index';
import { Article } from '../typeorm-entities/index';

export const deletePics = async (entity: Article) => {
  const pics = Object.entries(entity)
    .filter((el) => {
      return PICS_FIELDS.some((e) => e === el[0]);
    })
    .map((pic: [string, string]) => pic[1])
    .map((picRoute) => {
      const picRouteArr = picRoute.split('/');
      return picRouteArr[picRouteArr.length - 1];
    });
  for (const pic of pics) {
    const pathToPic = path.resolve(__dirname, PICS_DEL_PATH, pic);
    await fs.unlink(pathToPic, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }
}; // дописать логику по удалению уже загруженных картинок
