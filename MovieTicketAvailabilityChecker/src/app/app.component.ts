import { Component,ElementRef } from '@angular/core';
import {theatreApiService} from "./services/theatreapi.service";
import { Posts, BooKSeats } from './classes/postparm';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private _theatreApiService: theatreApiService, public datepipe: DatePipe){
}

letMovie: Array<any> = [];
letTheatre: Array<any> = [];
letTheatreSeat: Array<any> = [100]; 
letSelectSeat:Array<any> = [];
letSeatResult:Array<any> = [];
txtShow_time:string="";
txtMovie_name:string="";
txtTheatre_name:string="";
txtBooked_seats:string="";
txtDate:string="";
txtUser_mail_id:string="elanchezhiyan.m08@gmail.com";
txtCurrentDate:string="";
todayDate:Date=new Date();
displayStyle = "none";
txtRelease_date:string="";
txtRunning_time:string="";
txtLanguage:string="";
txtImdb_rating:string="";
txtTags:string="";

  openPopup(value: string) {
    this.displayStyle = "block";
    let theatreInfo= value.split("--")
    this.txtShow_time = theatreInfo[0];
    this.txtMovie_name = theatreInfo[1];
    this.txtTheatre_name = theatreInfo[2];
    let latest_date = this.datepipe.transform(this.todayDate, 'dd/MM/yyyy')
    this.txtCurrentDate = latest_date?.toString()??"";
  }
  closePopup() {
    this.displayStyle = "none";
    this.removeColor();
    this.ngOnInit();
  }

  removeColor()
  {
    for(let Seat of this.letTheatreSeat)
    {
   // console.log(Seat);
    document.getElementById(Seat)?.classList.remove('savedSelectedSeat'); 
    document.getElementById(Seat)?.classList.remove('seatSelected'); 
    }
  }

postBookSeat() {
  //console.log(this.letSeatResult);
      var oBookSeat = new BooKSeats()
     //this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');
      oBookSeat.show_time =this.txtShow_time;
      oBookSeat.movie_name =this.txtMovie_name;
      oBookSeat.theatre_name= this.txtTheatre_name;
      oBookSeat.booked_seats = "["+this.letSelectSeat+"]";
      oBookSeat.date= this.txtCurrentDate;
      oBookSeat.user_mail_id = this.txtUser_mail_id;
      if(this.letSelectSeat.toString() === "")
      {
        alert("Please select the seats")
      }
      else{

        this._theatreApiService.bookSeat(oBookSeat)
        .subscribe
        (
        data =>
        {
          this.removeColor();
          alert(data.message.toString()); 
        }
        )
      }
      this.letSelectSeat=[];
      this.letSeatResult=[];
      this.closePopup();
      this.ngOnInit();
}

getSelectSeat(event: any)
{
      //alert(this.letSelectSeat);
      if(event.target.className.indexOf('seatSelected') === -1)
      {
          event.target.classList.add('seatSelected');
      }
      else{
          event.target.classList.remove('seatSelected');
      }
      if((this.letSelectSeat.find(x => x === event.target.id)) != event.target.id)
      {
        this.letSelectSeat.push(event.target.id);
      }else{
        this.letSelectSeat.splice(this.letSelectSeat.indexOf(event.target.id), 1);
      }
 
      //console.log(this.letSelectSeat);
      
 }
      divTheatreSeatFunction(value: string){
        this.displayStyle = "block";
        let theatreInfo= value.split("--")
        this.txtShow_time = theatreInfo[0];
        this.txtMovie_name = theatreInfo[1];
        this.txtTheatre_name = theatreInfo[2];
        let latest_date = this.datepipe.transform(this.todayDate, 'dd/MM/yyyy')
        this.txtCurrentDate = latest_date?.toString()??"";
        //console.log(this.letMovie);
        let result: Array<any> = this.letMovie.filter(
          (element, index, array) => {
              if (theatreInfo[1].toString() === element.movie_name.toString()) {
                  this.txtRelease_date = element.release_date;
                  this.txtRunning_time = element.running_time;
                  this.txtImdb_rating = element.imdb_rating;
                  this.txtTags = element.tags ;
                  this.txtLanguage = element.language;
              }
          }
        );

        const letTheatreResut = this.letTheatre.filter((theatre, index) => {
          //console.log(theatre.theatre_name);
            return (theatre.show1_movie == this.txtMovie_name || theatre.show2_movie == this.txtMovie_name || theatre.show3_movie == this.txtMovie_name || theatre.show4_movie == this.txtMovie_name) && theatre.theatre_name == this.txtTheatre_name && (theatre.show1_time == this.txtShow_time ||theatre.show2_time == this.txtShow_time || theatre.show3_time == this.txtShow_time||theatre.show4_time == this.txtShow_time ) ;
       });
       //console.log(letTheatreResut);
       this.letSeatResult =[];
       for (let TheatreResut of letTheatreResut) {
        //console.log(TheatreResut.booked_seats);
        let txt = TheatreResut.booked_seats
        //console.log(this.txtShow_time);
          if(TheatreResut.booked_seats !== undefined)
          {
            if(TheatreResut.booked_seats[0].date === this.txtCurrentDate)
            {
              if(TheatreResut.booked_seats[0].show1_time === this.txtShow_time )
              {
                this.letSeatResult=TheatreResut.booked_seats[0].show1_booked_seats;
                //this.letSelectSeat = TheatreResut.booked_seats[0].show1_booked_seats.toString();
              }
              if(TheatreResut.booked_seats[0].show2_time === this.txtShow_time )
              {
                this.letSeatResult= TheatreResut.booked_seats[0].show2_booked_seats;
                //this.letSelectSeat =TheatreResut.booked_seats[0].show2_booked_seats.toString();
              }
              if(TheatreResut.booked_seats[0].show3_time === this.txtShow_time )
              {
                this.letSeatResult=TheatreResut.booked_seats[0].show3_booked_seats;
                //this.letSelectSeat =TheatreResut.booked_seats[0].show3_booked_seats;
              }
            }
          }
          else{
            this.letSeatResult =[];
            this.letSelectSeat =[];
          }
        }
       
      let seatSn= this.letSeatResult.toString().replace('[','').replace(']','').split(',')
        
      for (let seatResult of seatSn) {
            //console.log(seatResult)
            document.getElementById(seatResult.trim())?.classList.add('savedSelectedSeat'); 
      }

    }
        
  ngOnInit()
  {
      var opost = new Posts()
      opost.user_mail_id = "elanchezhiyan.m08@gmail.com"
      this._theatreApiService.post(opost)
      .subscribe
      (
        data =>
        {
          this.letMovie =data.movies;
          this.letTheatre =data.theatre;
          //console.log(data)
          this.letTheatreSeat = Array(100).fill(100, 0).map((v,i) => i+1);
        }
      )
  }
  
}
