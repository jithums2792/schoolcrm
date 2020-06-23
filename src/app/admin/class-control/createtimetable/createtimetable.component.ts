import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { TimetableService } from 'src/app/services/timetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtimetable',
  templateUrl: './createtimetable.component.html',
  styleUrls: ['./createtimetable.component.css']
})
export class CreatetimetableComponent implements OnInit {
  public saveFlag = true
 public classList = []
 public sectionList = []
 public subjectList = []
 public timetableId
 public timetable = {
   room: "null",
   section: 'null',
   timetable: []
 }
 public timetableList = []
 public days = ['Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']
 public dayList = []

  constructor(private classservice: ClassesService,
              private subjectservice: DepartmentsService,
              private timetableservice: TimetableService,
              private router: Router,
              private toastservice: ToastrService) { 
                try {
                  this.timetable.room = router.getCurrentNavigation().extras.state.data.name
                  this.timetable.section = router.getCurrentNavigation().extras.state.data.section
                  this.timetable.timetable = router.getCurrentNavigation().extras.state.data.timetable
                  this,this.dayList = this.timetable.timetable
                  this.timetableId = router.getCurrentNavigation().extras.state.data._id
                  this.saveFlag = false
                } catch (error) {
                  
                }
              }

  ngOnInit() {
    this.getAllclass()
    this.getAllsubjects()
  }
  
  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => this.classList = data.data)
  }

  async getAllsubjects() {
    this.subjectservice.getDepartmentList().subscribe(data => this.subjectList = data.data)
  }

  async sectionSelection() {
    if (this.timetable.room !== 'null') {
        const room = this.classList.find(element => element.name === this.timetable.room)
        this.sectionList = room.section
    } else {
      this.toastservice.warning('Select a valid class', 'Warning')
    }
    
  }

  async daySelection(day) {
    if (this.timetable.section !== 'null' && day.value !== 'null') {
      if (day.value !== 'null') {
        const check = this.dayList.some(element => element.day === day.value)
        if (check !== true) {
          const tempday = Object({day: day.value,subjects: []})
          this.dayList.push(tempday)
        } else {
          this.toastservice.warning('Already in List', 'Warning')
        }
        
      } else {
        this.toastservice.warning('Select a valid day', 'Warning')
      }
      
    } else {
      this.toastservice.warning('Select a valid section', 'Warning')
    }
    
  }

  async addPeriod(index){
    const period = Object(
      {name: 'period ' + (this.dayList[index].subjects.length + 1),
      subname: 'test', 
      startduration: null,
      endduration: null}
      )
    this.dayList[index].subjects.push(period)
    this.timetable.timetable = this.dayList
  }


  async delete(index) {
    this.dayList.splice(index, 1)
  }

  async save() {
    console.log(this.timetable)
    this.timetableservice.addtimetable(this.timetable).subscribe(data => {
      if(data.status === 'success') {
        this.toastservice.success('Successfully added', 'Success')
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }

  async update() {
    this.timetableservice.updatetimetable(this.timetableId,this.timetable).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success('Updated successfully', 'Success')
        this.router.navigate(['/sadmin/classtimetable'])
      } else {
        this.toastservice.error('Something wrong', 'Error')
      }
    })
  }

 



}
