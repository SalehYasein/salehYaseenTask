import { Component, EventEmitter, Output } from '@angular/core';
import { GetUsersService } from 'src/app/services/get-users.service';
import { Router } from '@angular/router';
import { user } from 'src/app/app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userIDs: number[] = [];
  userIsExists: boolean = false;
  show = false;
  searchQuery = '';
  user: any;
  id: number = 0;

  totalPages: number = 0;
  usersPerPage: number = 0;
  totalUsers: number = 0;

  constructor(private router: Router, private userService: GetUsersService) { }

  //send total pages to users list component
  @Output() sendTotalPages: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.getApiInfo();
  }

  //get information about API (all pages, users per page,...)
  getApiInfo() {
    this.userService.getApiInfo(1).subscribe((response: any) => {
      this.totalPages = response.total_pages;
      const SendedTotalPages = response.total_pages;
      this.sendTotalPages.emit(SendedTotalPages);
      this.userService.totalPages = this.totalPages;
      this.usersPerPage = response.per_page;
      this.totalUsers = response.total;
    });
  }

  //get IDs for all users in all pages in API
  getUserIDs(): void {
    this.userService.getAllUsers(this.totalPages).subscribe(
      (users: user[]) => {
        this.userIDs = users.flatMap(user => user.id);
      },
      err => console.log(err.message)
    );
  }

  /* search about user id and show button (go to user details if user is exists)
   else show clear input failed */
  searchBtn(): void {
    if (this.searchQuery.trim() !== '') {
      this.show = true;
      this.id = parseInt(this.searchQuery);
      if (this.userIDs.includes(this.id)) {
        this.userIsExists = true;
      }
      else {
        this.userIsExists = false;
      }
    }
    else {
      this.show = false;
      this.userIsExists = false;
    }
  }

  //method of (go to user details) button
  getUserById(): void {
    this.router.navigate(['user', this.id]);
  }

  //method of (clear input failed) button
  clearSearchQuery() {
    this.searchQuery = '';
    this.show = false;
  }

}
