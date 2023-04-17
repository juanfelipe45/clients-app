import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/interfaces/generalresponse.interface';
import { PageResponse } from 'src/app/interfaces/pageResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl = "http://localhost:8080/api/v1/"

  constructor(private _http: HttpClient) { }

  public page<T>(endPoint: string, pageIndex: number, pageSize: number, params?: any): Observable<GeneralResponse<PageResponse<T>>> {

    let httpParams: HttpParams = new HttpParams()
                                      .append('pageIndez', pageIndex)
                                      .append('pageSize', pageSize);
    const keys: string[] = params ? Object.keys(params): [];

    if (params && keys.length > 0) {
      for (let key of keys) {
        if (params[key] !== null) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }

    return this._http.get<GeneralResponse<PageResponse<T>>>(`${this.baseUrl}${endPoint}/page`, {params});
  }

  public list<T>(endPoint: string): Observable<GeneralResponse<T[]>> {
    return this._http.get<GeneralResponse<T[]>>(`${this.baseUrl}${endPoint}/all`);
  }

  public post<T>(endPoint: string, body: any): Observable<GeneralResponse<T>> {
    return this._http.post<GeneralResponse<T>>(`${this.baseUrl}${endPoint}`, body);
  }

  public put<T>(endPoint: string, body: any): Observable<GeneralResponse<T>> {
    return this._http.put<GeneralResponse<T>>(`${this.baseUrl}${endPoint}`, body);
  }
}
