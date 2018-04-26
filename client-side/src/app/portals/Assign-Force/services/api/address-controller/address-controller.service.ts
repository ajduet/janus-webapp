import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Address } from '../../../model/Address';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class AddressControllerService {
  constructor(private http: HttpClient) {}

  private addressController = environment.apiUrls.addressController;

  public create(location: Address): Observable<Address> {
    return this.http.post<Address>(this.addressController.baseUrl + this.addressController.create, location);
  }
  public update(location: Address): Observable<Address> {
    return this.http.put<Address>(
      this.addressController.baseUrl + this.addressController.update + location.id,
      location
    );
  }
  public findAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressController.baseUrl + this.addressController.findAll);
  }
  public remove(id: number): Observable<Address> {
    return this.http.delete<Address>(this.addressController.baseUrl + this.addressController.remove + id);
  }

  public find(id: number): Observable<Address> {
    return this.http.get<Address>(this.addressController.baseUrl + this.addressController.find + id);
  }
}
