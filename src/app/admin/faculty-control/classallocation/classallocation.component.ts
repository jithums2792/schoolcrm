import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ClassesService } from 'src/app/services/classes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classallocation',
  templateUrl: './classallocation.component.html',
  styleUrls: ['./classallocation.component.css']
})
export class ClassallocationComponent implements OnInit {
  public staffList = []
  public roomList = []
  public sectionList = []
  public selectedRoom
  public selectedSection = []
  public staffId
  constructor(private staffservice: FacultyService,
              private classservice: ClassesService,
              private toastservice: ToastrService) { }

  ngOnInit() {
    this.getAllstaff()
    this.getAllclass()
  }

  async getAllstaff() {
    this.staffservice.getAllstaff().subscribe(data => this.staffList = data.data)
  }

  async getAllclass() {
    this.classservice.getAllclass().subscribe(data => this.roomList = data.data)
  }

  async classSelection(room) {
    if(room.value !== 'null' && room.value !== undefined) {
      this.selectedRoom = room.value
    const popdata = this.roomList.find(element => element.name === room.value)
    this.sectionList = popdata.section
    } else {
      this.sectionList = []
    }

  }

  async sectionSelection(section) {
    if (section.value !== 'null' && section.value !== undefined){
      this.selectedSection = section.value
    }
    
  }
  
  async add(staff) {
    console.log(this.selectedRoom)
    if (this.selectedRoom !== 'null' && this.selectedRoom !== undefined && this.selectedSection.length > 0) {
      const check = staff.assignedClass.some(element => element.room === this.selectedRoom)
      if (check !== true) {
      const assignedClass = {
        room: this.selectedRoom,
        section: [this.selectedSection]
      }
      staff.assignedClass.push(assignedClass)
      console.log(staff)
      } else {
        staff.assignedClass.findIndex(element => {
          if (element.room === this.selectedRoom) {
            const check2 = element.section.some(data => data === this.selectedSection)
            if (check2 !== true) {
              element.section.push(this.selectedSection)
            } else {
              this.toastservice.warning('Already in selection', 'Warning')
            }
          }
        })
      console.log(staff)
      }
    } else {
      this.toastservice.warning('some field mising', 'warning')
    }
  }

  async update(staff) {
    this.staffId = staff._id
    delete staff._id
    this.staffservice.updateFaculty(this.staffId, staff).subscribe(data => {
      if (data.status === 'success') {
        this.toastservice.success(`${staff.firstname} updated successfully`, 'Success')
      } else {
        this.toastservice.error(`something wrong`, 'Error')
        console.log(staff)
      }
    })
  }
 

  async delete(index, staff) {
    staff.assignedClass.splice(index, 1)
  }
}
