import { Injectable } from '@angular/core';
import{ WebRequestService } from './web-request.service'


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

checkCourse(catalog_nbr: string, subject: string){
  return this.webReqService.post('course_check', { catalog_nbr, subject});
}

makeSearch(catalog_nbr:string, subject:string, SSR:string){
  return this.webReqService.post('course_search', {catalog_nbr, subject, SSR });
}

}
