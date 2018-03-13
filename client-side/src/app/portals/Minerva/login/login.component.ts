import { Component, OnInit } from '@angular/core';
import {UrlService} from '../services/url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private url: UrlService) {

    }

  ngOnInit() {
      window.location.href = this.url.getUrl() + '/login';
  }

}
