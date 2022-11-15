import { AxiosInstance } from './networking';

// export const baseUrlNovel = 'https://novelnextapi.vercel.app/';

export const baseUrlNovel = 'https://www.novelfav.com/';

export function getNovelUpdate(params: any) {
  return AxiosInstance.get(baseUrlNovel + `api/update?page=${params?.page}`, {});
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
  return AxiosInstance.get(baseUrlNovel + `api/novel?id=${id}`, {});
}
export function getChapterDetails(novelid:any,chapterid:any) {
  return AxiosInstance.get(baseUrlNovel + `chapter?novelid=${novelid}&chapterid=${chapterid}`, {});
}