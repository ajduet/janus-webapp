import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
/**
 * This Class servers the purpose of providing the other services with the appropriate urls for consuming hydra.
 *
 * @export
 * @class UrlService
 */
@Injectable()
export class UrlService {
  private context: string;

  /**
   * All urls associated with skills will come from this object
   */
  skills = {
    findAll: () => `${this.context}skills`,
    findAllActive: () => `${this.context}skills/active`,
    findById: (id: number) => `${this.context}skills/${id}`,
    save: () => `${this.context}skills`,
    update: () => `${this.context}skills`,
  };

  constructor() {
    this.context = environment.hydraContext;
  }

}
