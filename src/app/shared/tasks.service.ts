import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import moment from "moment";

export interface Task {
  id?: string,
  title: string,
  date?: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://study-angular-calendar-default-rtdb.europe-west1.firebasedatabase.app/tasks'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        } else {
          return Object.keys(tasks).map((key: any) => ({...tasks[key], id: key}))
        }
      }))
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name}
    }))
  }

  remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
