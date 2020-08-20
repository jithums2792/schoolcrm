import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/services/exam.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-createsubjectiveexam',
  templateUrl: './createsubjectiveexam.component.html',
  styleUrls: ['./createsubjectiveexam.component.css']
})
export class CreatesubjectiveexamComponent implements OnInit {
  public examForm = new FormGroup({
    name: new FormControl('', Validators.required),
    class: new FormControl('null', Validators.required),
    section: new FormControl('null', Validators.required),
    subject: new FormControl('null', Validators.required),
    startdate: new FormControl('', Validators.required),
    enddate: new FormControl('', Validators.required),
    totalmarks: new FormControl(0, Validators.required),
    questionlist: new FormControl([], Validators.required),
    teacher: new FormControl(),
    active: new FormControl(true),  
  })
  public questionList = []
  public classList = []
  public sectionList = []
  public subjectList = []
  public queEditFlag = true
  public saveFlag = true
  public teacher
  public examid
  public question = {
    que: '',
    mark: 0,
    image: null
  }


  constructor(private teacherservice: FacultyService,
              private examservice: ExamService,
              private router: Router,
              private toastservice: ToastrService) {
                try {
                  if(router.getCurrentNavigation().extras.state.data !== undefined) {
                    this.saveFlag = false
                    this.examid = router.getCurrentNavigation().extras.state.data._id
                    this.examForm.patchValue(router.getCurrentNavigation().extras.state.data)
                    this.questionList = this.examForm.value.questionlist
                  }  
                } catch (error) {
                  console.log('mm')
                }
               }

  ngOnInit() {
    this.getstaff()
  }

  getstaff() {
    this.teacherservice.getFacultyinfoByid(localStorage.getItem('teacher')).subscribe(async data => {
      if (data.status === 'success') {
        this.subjectList = data.data.assignedSubject
        this.classList = data.data.assignedClass
        this.teacher = data.data.firstname+' '+data.data.lastname
      }
    })
  }

  async sectionControl() {
    this.sectionList = []
    if (this.examForm.value.class === 'null') {
      this.toastservice.warning('Class must be a valid class')
    } else {
      const temp = this.classList.find(item => item.room === this.examForm.value.class)
      this.sectionList = temp.section
    }
  }

  async add() {
    this.questionList.push(this.question)
    this.question = {
      que: '',
      mark: 0,
      image: null
    }
  }

  async edit(item) {
    this.question = this.questionList[item]
    this.queEditFlag = false
  }

  async delete(index) {
    this.questionList.splice(index, 1)
  }

  async new() {
    this.queEditFlag = true
    this.question = {
      que: '',
      mark: 0,
      image: null
    }
  }

  async upload(events) {
    const reader = new FileReader()
    reader.onload = () => this.question.image = reader.result
    reader.readAsDataURL(events.target.files[0])
  }

  async save() {
    this.examForm.patchValue({teacher: this.teacher, questionlist: this.questionList})
    if (this.examForm.valid) {
      this.examservice.addSubExam(this.examForm.value).subscribe(data => {
        if (data.status === 'success') {
          this.toastservice.success('Subjective exam paper created')
          this.examForm.reset({
            name: new FormControl('', Validators.required),
            class: new FormControl('null', Validators.required),
            section: new FormControl('null', Validators.required),
            subject: new FormControl('null', Validators.required),
            startdate: new FormControl('', Validators.required),
            enddate: new FormControl('', Validators.required),
            totalmarks: new FormControl(0, Validators.required),
            questionlist: new FormControl([], Validators.required),
            teacher: new FormControl(),
            active: new FormControl(true),  
          })
          this.router.navigate(['/teacher/home/exams'])
        } else {
          this.toastservice.error(data.data.message)
        }
      })
    } else {
      this.toastservice.warning('some fields are missing')
    }
  }

  async update() {
    this.examForm.patchValue({teacher: this.teacher, questionlist: this.questionList})
    if (this.examForm.valid) {
      this.examservice.updateSubExam(this.examid,this.examForm.value).subscribe(data => {
        if (data.status === 'success') {
          this.saveFlag = true
          this.toastservice.success('Subjective exam paper updated')
          this.examForm.reset({
            name: new FormControl('', Validators.required),
            class: new FormControl('null', Validators.required),
            section: new FormControl('null', Validators.required),
            subject: new FormControl('null', Validators.required),
            startdate: new FormControl('', Validators.required),
            enddate: new FormControl('', Validators.required),
            totalmarks: new FormControl(0, Validators.required),
            questionlist: new FormControl([], Validators.required),
            teacher: new FormControl(),
            active: new FormControl(true)  
          })
          this.router.navigate(['/teacher/home/exams'])
        } else {
          this.toastservice.error(data.data.message)
        }
      })
    } else {
      this.toastservice.warning('some fields are missing')
    }
  }

  async cancel() {
    this.saveFlag = true
    this.examForm.reset({
      name: new FormControl('', Validators.required),
      class: new FormControl('null', Validators.required),
      section: new FormControl('null', Validators.required),
      subject: new FormControl('null', Validators.required),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
      totalmarks: new FormControl(0, Validators.required),
      questionlist: new FormControl([], Validators.required),
      teacher: new FormControl(),
      active: new FormControl(false),  
    })
    this.router.navigate(['/teacher/home/exams'])
  }

}
