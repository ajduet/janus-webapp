import { InMemoryDbService } from 'angular-in-memory-web-api';

/** This service is for Bucket entity only that has these properties, data
  * within this service is for development purpose only.

  ex.)
    id: number;
    name: string;
    description: string;
    isActive?: boolean = true;
    mappedToSkillType?: boolean = false;
    weight?: number;

  * Remove these when not being used, or after development.
    In 'caliber.module.ts'=> main import
    In 'caliber.module.ts'=> @NgModule => import:
  */

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const buckets = [
      { id: 1, name: 'OOP', description: 'Inheritance, polymorphism, encapsulation, abstraction', isActive: true },
      { id: 12, name: 'SQL', description: 'Database knowledge', isActive: true },
      { id: 13, name: 'REST', description: 'Consume, and exposing RESTful service', isActive: false },
      { id: 14, name: 'Front-end', description: 'Plan design client side structure and attributes', isActive: true },
      { id: 15, name: 'Back-end', description: 'Clean up the junk in the trunk' },
      { id: 16, name: 'United-BA', description: 'I will talk to you, and will do something?' },
      { id: 17, name: 'Canoeing 101', description: 'Remember not the canoe by a waterfall' },
      { id: 18, name: 'PEGA', description: "Cut the horn and don't let it fly" },
      { id: 50, name: 'SalesForce 101', description: 'Just copy and past it, wash rinse, repeat' },
      { id: 17, name: 'AP PION?', description: 'Suggest all tech you know' }
    ];
    return {buckets};
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
