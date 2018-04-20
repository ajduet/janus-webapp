import { Component, OnInit } from '@angular/core';
import { SecurityContext } from '../../services/security-context.service';
import { SecurityConfig } from '../../services/security-config';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-assign-force',
  templateUrl: './assign-force.component.html',
  styleUrls: ['./assign-force.component.css']
})
export class AssignForceComponent implements OnInit {
  private userIsAuthenticated = false;

  constructor(private securityContext: SecurityContext, private authService: AuthService) {
    const securityConfig = new SecurityConfig();

    securityConfig.roles = environment.security_config.assignForce.roles;
    securityConfig.permissions = environment.security_config.assignForce.permissions;
    securityConfig.groups = environment.security_config.assignForce.groups;

    this.securityContext.setSecurityConfig(securityConfig);
  }

  ngOnInit() {
  }
}
