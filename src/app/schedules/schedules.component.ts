import { Component, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import{ SCHEDULES } from '../schedule_list';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  schedules = SCHEDULES;
  selectedSchedule: Schedule;
  txtName;
  constructor(private taskService: TaskService) { }

  ngOnInit(){
  }

  onSelect(schedule: Schedule): void{
    this.selectedSchedule = schedule;
  }
  
  deleteSchedule(name){
    for(var i = 0; i<SCHEDULES.length; i++){
      if(SCHEDULES[i].name == name){SCHEDULES.splice(i,1);}
    }
  }

  addSchedule(){
    let name = this.txtName
    for (var i=0; i<SCHEDULES.length;i++){
        if(SCHEDULES[i].name.toString().toLowerCase()===name.toString().toLowerCase()){
            var sch = SCHEDULES[i]
        }
    }
    if(!sch){//only when this schedule already exists, sch has a value
    SCHEDULES.push({//create new schedule by push in
        name : name,
        courses: [{catalog_nbr:"",subject:""}]
    })
    }
    else{alert("Schedule exist")}//when sch has data, means schedule exist
  }

  addCourse(catalog_nbr:string, subject:string){
    console.log(this.selectedSchedule, catalog_nbr, subject)
    this.taskService.checkCourse(catalog_nbr,subject).subscribe((finalResult: any)=>{
      console.log(finalResult);
      if(finalResult[0].catalog_nbr){
        this.selectedSchedule.courses.push(finalResult[0]);
      }
      else{alert("input not valid, please provide full course code and subject shortcut")}
    })
    
  }


}
