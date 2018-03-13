import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserInfoService} from '../services/user-info.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

    constructor(private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private user: UserInfoService) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            const token = params['token'];
            console.log(token);
            this.auth.setToken(token);
            this.user.loadUser().subscribe(data => {
                this.user.setUser(data);
                console.log(JSON.stringify(this.user.getUser()));
                this.router.navigateByUrl('/overview');
            });
        });
    }
}
