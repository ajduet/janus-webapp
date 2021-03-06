import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Associate } from '../../models/associate.model';
import { Response } from '@angular/http/';
import { environment } from '../../../../../environments/environment';

/**
 * Service for retrieving and updating data relating to associates.
 * @author Alex, Xavier
 */
@Injectable()
export class AssociateService {

    status: string;
    client: string;

    constructor(private http: HttpClient) {}

    /**
     * Get all of the associates
     */
    getAllAssociates(): Observable<any> {
        const url: string = environment.url + 'TrackForce/track/associates/all';

        return this.http.get(url);
    }

    getAssociate(id: number) {
        const url: string = environment.url + 'TrackForce/track/associates/' + id;

        return this.http.get<Associate>(url);
    }

    /**
     * Update the given associates statuses/clients
     * @param ids of associates to be updated
     */
    updateAssociates(ids: number[], ustatus: string, uclient: number): Observable<any> {
        const url: string = environment.url + 'TrackForce/track/associates/update/' + ustatus + '/' + uclient;

        return this.http.put(url, ids);
    }

    updateAssociate(id: number, ustatus: string, uclient: string) {
        const url: string = environment.url + 'TrackForce/track/associates/' + id + '/update/' + ustatus + '/' + uclient;

        return this.http.put(url, null);
    }
}
