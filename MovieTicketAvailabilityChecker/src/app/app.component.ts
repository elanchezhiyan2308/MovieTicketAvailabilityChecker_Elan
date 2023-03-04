import { Component,ElementRef } from '@angular/core';
import {theatreApiService} from "./services/theatreapi.service";
import { Posts } from './classes/postparm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private _theatreApiService: theatreApiService){
}
letMovie: Array<any> = [];
letTheatre: Array<any> = [];
letTheatreSeat: Array<any> = [100]; 
letSelectSeat:Array<any> = [];
divMovie:boolean=true;
divTheatre:boolean=false;
btnTheatre:boolean = false;
divTheatreSeat:boolean = false;
btnTheatreSeat:boolean = false;


getSelectSeat(event: any)
{
  this.letSelectSeat.unshift(event.target.id);
  if(event.target.className.indexOf('seatSelected') === -1)
  {
    event.target.classList.add('seatSelected');
    //this.letSelectSeat.slice(event.target.id);
  }
  else{
    event.target.classList.remove('seatSelected');
  }
  console.log(this.letSelectSeat);
 }
      divTheatreSeatFunction(value: string){
        alert(value);
        this.divMovie=false;
        this.divTheatre=false;
        this.divTheatreSeat=true;
        this.btnTheatreSeat= true;
    }
        divBackTheatreFunction(){
            this.divMovie=false;
            this.divTheatre=true;
            this.divTheatreSeat=false;
            this.btnTheatreSeat= false;
        }

        divBackMovieFunction(){
          this.divMovie=true;
          this.divTheatre=false;
          this.divTheatreSeat=false;
          this.btnTheatre=true;
      }
      bookTicket(value: string)
      {
        this.divTheatre=true
        this.divMovie= false
        this.divTheatreSeat= false;
        this.btnTheatre=true;
         //alert(this.letTheatre)
      }
  ngOnInit()
  {
      this.letTheatreSeat = Array(100);
      var opost = new Posts()
      opost.user_mail_id = "elanchezhiyan.m08@gmail.com"
      this._theatreApiService.post(opost)
      .subscribe
      (
        data =>
        {
          this.letMovie =data.movies;
          this.letTheatre =data.theatre;
           console.log(data)
          this.letTheatreSeat = Array(100).fill(100, 0).map((v,i) => i+1);
        }
      )
  }
}
