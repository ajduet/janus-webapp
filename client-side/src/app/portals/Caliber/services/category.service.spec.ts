import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AlertsService } from '../services/alerts.service';
import { SkillsService } from './category.service';

xdescribe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        SkillsService,
        HttpClient,
        AlertsService
      ]
    });
  });

  it('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));
});
