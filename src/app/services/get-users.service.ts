import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { user } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  currentPage: number = 0; // currentPage here to save API's page that was loaded before going to user details
  totalPages: number = 0;

  //loading bar
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  private API_URL = 'https://reqres.in/api/users';

  //access API info
  public getApiInfo(page: number) {
    return this.http.get(`${this.API_URL}?page=${page}`);
  }

  //access users data specific page
  public getSinglePageUsers(page: number): Observable<user[]> {
    this.isLoadingSubject.next(true);
    return this.http.get(`${this.API_URL}?page=${page}`).pipe(
      map((response: any) => response.data as user[]),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }


  //access all users in all pages depending on total Pages that updated from users-list component
  public getAllUsers(totalPages: number): Observable<user[]> {
    this.isLoadingSubject.next(true);
    const requests: Observable<user[]>[] = [];
    for (let page = 1; page <= totalPages; page++) {
      requests.push(this.getSinglePageUsers(page));
    }
    return forkJoin(requests).pipe(
      map((responses: user[][]) => responses.reduce((acc, users) => acc.concat(users), [])),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  //access requested user by it's id
  public getUserById(id: number): Observable<user> {
    this.isLoadingSubject.next(true);
    return this.http.get<user>(`${this.API_URL}/${id}`).pipe(
      map((response: any) => response.data),
      finalize(() => {
          this.isLoadingSubject.next(false);
      })
    );
  }
}
