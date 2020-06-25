import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TimetableService } from 'src/app/services/timetable.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classtimetable',
  templateUrl: './classtimetable.component.html',
  styleUrls: ['./classtimetable.component.css']
})
export class ClasstimetableComponent implements OnInit {
  public timetableList
  public roomId

  constructor(private timetableservice: TimetableService,
              private toastrservice: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.getAlltimetable()
  }

  async getAlltimetable() {
    this.timetableservice.getAlltimetable().subscribe(data => {
      this.timetableList = data.data
    })
  }

  async edit(timetable) {
    const options: NavigationExtras = {
      state: {data: timetable}
    }
    this.router.navigate(['/sadmin/home/createtimetable'],options)
  }

  async delete(item,index) {
    this.timetableservice.deletetimetable(item._id).subscribe(data => {
      if (data.status === 'success') {
        this.toastrservice.success('deleted successfully', 'Success')
        this.timetableList.splice(index, 1)
      } else {
        this.toastrservice.error('Something wrong', 'Error')
      }
    })
  }

}
