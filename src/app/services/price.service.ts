import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";

const HOST: string = environment.hostEndpoint;

@Injectable()
export class PriceService {
  constructor(private httpClient: HttpClient) {}

  getPrice(age: number): Promise<any> {
    return this.httpClient
      .post(`${HOST}/api/price/get`, { age: age })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDiscount(payload): Observable<any> {
    console.log("payload: ", payload);
    return this.httpClient.post(`${HOST}/api/price/discount`, payload);
  }
}
