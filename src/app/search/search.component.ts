

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

  makeSearch(catalog_nbr:string, subject:string, SSR:string){
   var result = []
   var div = document.getElementById("resultList")
   while(div.firstChild){div.removeChild(div.firstChild);}
    console.log(catalog_nbr,subject,SSR)

    this.taskService.makeSearch(catalog_nbr,subject,SSR).subscribe((finalList: any)=>{//from lab3API

      for(var i=0; i<finalList.length; i++){

        result[i]={
            catalog_nbr: finalList[i].catalog_nbr,
            subject: finalList[i].subject,
            ssr_component: finalList[i].ssr_component
        }
        document.getElementById("resultList").appendChild(this.getList(finalList[i].catalog_nbr,finalList[i].subject,finalList[i].ssr_component))
    }
    })
    console.log(result)
  }

}
