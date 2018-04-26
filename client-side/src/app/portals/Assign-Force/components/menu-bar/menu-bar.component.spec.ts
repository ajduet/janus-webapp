import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppMaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth/auth.service';
import { MockAuthService } from '../../services/auth/auth.service.spec';
import { MenuBarComponent } from './menu-bar.component';

export class MockActivatedRoute {
  private paramsSubject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  params = this.paramsSubject.asObservable();

  get testParams() {
    return this._testParams;
  }
  set testParams(newParams: any) {
    this._testParams = newParams;
    this.paramsSubject.next(newParams);
  }
}

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  const activeRoute = new MockActivatedRoute();
  let authService;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
        declarations: [MenuBarComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activeRoute },
          { provide: AuthService, useValue: authService, useClass: MockAuthService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
