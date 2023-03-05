
import {Injectable} from "@angular/core";
import {Observable } from"rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Posts, BooKSeats } from '../classes/postparm';
@Injectable()
export class theatreApiService{
    constructor(private httpClient: HttpClient){}

// getTheatres(): Observable<any>{
//  //let params1 = new HttpParams().set("user_mail_id","sample@gmail.com");
//  return this.httpClient.post("https://zincubate.in/api/MovieTicketChecker?action=getAllDetails")//,{params:params1}
// }
 post(opost:Posts): Observable<any>{
 return this.httpClient.post("https://zincubate.in/api/MovieTicketChecker?action=getAllDetails", opost);
 }
 
 bookSeat(oBookSeat:BooKSeats): Observable<any>{
    return this.httpClient.post("https://zincubate.in/api/MovieTicketChecker?action=bookSeats", oBookSeat);
    } 
}