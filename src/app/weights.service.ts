import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import * as Rx from "rxjs"
import { buffer } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeightsService {

  private socket;

  public weight$ = new Rx.BehaviorSubject(0)
  public todayWeights$ = new Rx.BehaviorSubject([])
  public dateWeights$ = new Rx.BehaviorSubject([])
  public plate$ = new Rx.BehaviorSubject('')
  public stream$ = new Rx.BehaviorSubject('')

  constructor() {

    this.socket = io('zkn-web.herokuapp.com', { transports: ['websocket'], upgrade: true })

    this.socket.on('connectStatus', function (data) {
      console.log(data)
    });

    this.socket.emit('join', 'Client connected')

    this.socket.on('weight', (data) => {
      this.weight$.next(data)
    });

    this.socket.on('tableupdate', (data) => {
      this.todayWeights$.next(data)
    });

    this.socket.on('updatebydate', (data) => {
      this.dateWeights$.next(data)
    });

    this.socket.on('stream', (data) => {
      this.stream$.next(data)
    });

  }

  getWeight() {
    return this.weight$
  }

  getTodayWeights() {
    return this.todayWeights$
  }

  getDateWeights() {
    return this.dateWeights$
  }

  getStream() {
    return this.stream$
  }

  public updateByDate(date) {
    this.socket.emit('dateinput', date)
  }

}
