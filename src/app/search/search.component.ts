import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { searchResult } from '../searchResult'
import{ ResultList } from '../searchList';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  list
  
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
  }
//to inplement the search result in to the html
  getList(catalog_nbr, subject, ssr_component){
    let list = document.createElement("div");
    let info =  document.createElement("p"); 
    let course_info = document.createTextNode(subject+" " +catalog_nbr +" "+  ssr_component);
    info.appendChild(course_info);
    list.appendChild(info);
    return list; 
  }



}
