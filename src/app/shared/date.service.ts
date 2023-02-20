import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment())

  changeMoment(dir: number){
    const val = this.date.value.add(dir, 'month')
    this.date.next(val)
  }

  change(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    })
    this.date.next(value)
  }
}
