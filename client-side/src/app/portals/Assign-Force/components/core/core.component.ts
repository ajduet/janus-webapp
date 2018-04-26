import { Component, OnInit } from '@angular/core';

import { Curriculum } from '../../model/Curriculum';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  coreData: Curriculum[] = [];

  constructor(private curriculumControllerService: CurriculumControllerService) {}

  ngOnInit() {
    this.curriculumControllerService.findAll().subscribe(data => {
      this.coreData = data;
    });
  }
}
