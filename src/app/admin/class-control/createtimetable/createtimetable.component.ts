import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createtimetable',
  templateUrl: './createtimetable.component.html',
  styleUrls: ['./createtimetable.component.css']
})
export class CreatetimetableComponent implements OnInit {
 public classList = []
 public sectionList = []
 public subjectList = []
 public room
 public roomId
 public timetable = {
   room: "null",
   section: 'null',
   tablecontent: []
 }
 public days = ['Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']
 public dayList = []

  constructor(private classservice: ClassesService,
              private subjectservice: DepartmentsService,
              private toastservice: ToastrService) { }

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
        this.roomId = room._id
        this.room = room
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
    const period = Object({name: 'period ' + (this.dayList[index].subjects.length + 1),subname: 'test'})
    this.dayList[index].subjects.push(period)
    this.timetable.tablecontent = this.dayList
  }

  async periodSubject(subject,index,subindex) {
    if (subject.value !== 'null') {
      this.timetable.tablecontent[index].subjects[subindex].subname = subject.value
    } else {
      this.toastservice.warning('Select a valid subject', 'Warning')
    }
    
  }

  async delete(index) {
    this.dayList.splice(index, 1)
  }

  async update() {
    let patch = []
    const updatedRoom = {
      name: this.timetable.room,
      section: this.timetable.section,
      timetable: this.timetable
    }
    this.classservice.updateClass(this.roomId, updatedRoom).subscribe(data => {
      if(data.status === 'success') {
        this.toastservice.success('Successfully added', 'Success')
      } else {
        this.toastservice.error('something wrong', 'Error')
      }
    })
  }



}
