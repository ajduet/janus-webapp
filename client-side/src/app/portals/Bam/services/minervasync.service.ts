import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable()
export class MinervasyncService {
  constructor(private http: HttpClient) { }

  /**
   * Pulls from the Assign force DB and populates the BAM DB
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param
   */
  refreshBatches() {
    this.http.get(environment.minerva.refreshBatches()).map(
      data => {
        return data;
      }
    );
  }
}
