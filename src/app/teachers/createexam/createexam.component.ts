import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/services/exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createexam',
  templateUrl: './createexam.component.html',
  styleUrls: ['./createexam.component.css']
})
export class CreateexamComponent implements OnInit {
  public mainSaveFlag = true
  public addFlag = true
  public updateFlag = false
  public selectedClass = 'null'
  public selectedSection = 'null'
  public selectedSubject = 'null'
  public sheduledDate
  public endTime
  public question
  public optionList = []
  public totalmark
  public questionMark
  public examName
  public numberofOptions
  public assignedSubject = []
  public questionList = []
  public questionIndex
  
  public staffinfo
  public classList
  public sectionList
  public editExam

  constructor(private staffservice: FacultyService,
              private router: Router,
              private toastservice: ToastrService,
              private examservice: ExamService) { 
                try {
                  this.editExam = router.getCurrentNavigation().extras.state.data
                  if(this.editExam !== undefined){
                    console.log(this.editExam)
                    this.mainSaveFlag = false
                    this.selectedClass = this.editExam.class
                    this.selectedSection = this.editExam.section
                    this.selectedSubject = this.editExam.subject
                    this.examName = this.editExam.name
                    this.totalmark = this.editExam.totalmarks
                    this.sheduledDate = this.editExam.startdate
                    this.endTime = this.editExam.enddate
                    this.questionList = this.editExam.questionlist
                  }
                } catch (error) {
                  console.log(this.editExam)
                }
               }

  ngOnInit() {
    this.getStaffinfo()
  }

  async getStaffinfo(){
    this.staffservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(data => {
      this.staffinfo = data.data
      this.assignedSubject = this.staffinfo.assignedSubject
      this.classList = this.staffinfo.assignedClass
    })
  }

  async classSelection() {
   if (this.selectedClass !== undefined && this.selectedClass !== 'null') {
      console.log(this.selectedClass)
      this.sectionList = [];
      const temp = this.staffinfo.assignedClass.find(element => element.room === this.selectedClass)
      console.log(temp)
      this.sectionList = temp.section
   } else {
     this.toastservice.warning('please select a class', 'Warning')
   }
  }

  async cancel() {
    this.addFlag = true
    this.updateFlag = false
    this.optionList = []
    this.numberofOptions = null
    this.questionMark = null
    this.question = null
  }
  

  

  async save() {
   if (this.selectedClass !== undefined && this.selectedClass !== 'null' &&
       this.selectedSection !== undefined && this.selectedSection !== 'null' 
       ) {
        const exam = Object ({
          name: this.examName,
          room: this.selectedClass,
          section: this.selectedSection,
          subject: this.selectedSubject,
          teacher: this.staffinfo.firstname,
          totalmark: this.totalmark,
          starttime: this.sheduledDate,
          endtime: this.endTime,
          questionlist: this.questionList
        })
        this.examservice.addExam(exam).subscribe(data => (data.status === 'success')? this.toastservice.success('saved', 'success'): this.toastservice.error('something wrong', 'Error'))
       } else {
         this.toastservice.warning('some fields are missing', 'Warning')
       }
  }

  async mainUpdate() {
    if (this.selectedClass !== undefined && this.selectedClass !== 'null' &&
        this.selectedSection !== undefined && this.selectedSection !== 'null' 
        ) {
         const exam = Object ({
           name: this.examName,
           room: this.selectedClass,
           section: this.selectedSection,
           subject: this.selectedSubject,
           teacher: this.staffinfo.firstname,
           totalmark: this.totalmark,
           starttime: this.sheduledDate,
           endtime: this.endTime,
           questionlist: this.questionList
         })
         this.examservice.updateExam(this.editExam._id,exam).subscribe(data => (data.status === 'success')? this.toastservice.success('updated', 'success'): this.toastservice.error('something wrong', 'Error'))
        } else {
          this.toastservice.warning('some fields are missing', 'Warning')
        }
   }

  async optionCreater() {
    if(this.numberofOptions > 0) {
      let alpha = 97
      for(let i = 0; i<this.numberofOptions; i++){
        this.optionList.push(new Object({key: String.fromCharCode(alpha), value: ''}))
        alpha ++
      }
      this.addFlag = false
      console.log(this.optionList)
    } else {
      this.toastservice.warning('Please enter value greater than 0', 'Warning')
      this.numberofOptions = null
    }
  }

  async insert() {
    if (this.question !== null) {
      if (this.questionMark > this.totalmark) {
        this.toastservice.warning('Are you sure, mark is grater than total Mark?', 'Warning')
      } else {
        const question = Object({
          que: this.question,
          mark: this.questionMark,
          options: this.optionList
        })
        this.questionList.push(question)
        this.addFlag = true
        console.log(this.questionList)
        this.cancel()
      }
    } else {
      this.toastservice.warning('Question cant be empty', 'Warning')
    }
  }

  async edit(question, index) {
    this.questionIndex = index
    this.addFlag = false
    this.updateFlag = true
    this.question = question.que
    this.questionMark = question.mark
    this.optionList = question.options
  }

  async update() {
    const updatedquestion = Object({
      que: this.question,
      mark: this.questionMark,
      options: this.optionList
    })
    console.log(updatedquestion)
    this.questionList[this.questionIndex] = updatedquestion
    this.cancel()
  }

  async delete(index) {
    this.questionList.splice(index, 1)
    this.toastservice.success('Deleted', 'Success')
  }

  
}
