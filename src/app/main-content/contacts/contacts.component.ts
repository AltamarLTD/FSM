import {Component, OnDestroy, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {HttpService} from '../../shared/services/http.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  name = '';
  email = '';
  message = '';

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.http.sendFeedback(this.name, this.email, this.message).pipe(take(1), untilDestroyed(this)).subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
  }
}
