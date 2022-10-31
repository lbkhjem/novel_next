import { AxiosInstance } from './networking';

export const baseUrlNovel = 'http://18.142.48.180:8001/';

export function getNovelUpdate(params: any) {
  return AxiosInstance.get(baseUrlNovel + `update?page=${params?.page}`, {});
}
export function getNovelHotest(params: any) {
  return AxiosInstance.get(baseUrlNovel + `hotnovel?page=${params?.page}`, {});
}
export function getNovelCompleted(params: any) {
  return AxiosInstance.get(baseUrlNovel + `completed?page=${params?.page}`, {});
}
export function getNovelHot(params: any) {
  return AxiosInstance.get(baseUrlNovel + 'hotnovel', {});
}
export function getNovelDetails(id:any) {
  return AxiosInstance.get(baseUrlNovel + `novel?id=${id}`, {});
}
export function getChapterDetails(novelid:any,chapterid:any) {
  return AxiosInstance.get(baseUrlNovel + `chapter?novelid=${novelid}&chapterid=${chapterid}`, {});
}