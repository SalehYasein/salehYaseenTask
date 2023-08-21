import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetUsersService } from 'src/app/services/get-users.service';
import { user, options } from 'src/app/app.module';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users!: Observable<user[]>;
  totalPages!: number;

  //pages navigation declare
  pagesFilter: options[] = [{ key: 0, value: 'All Pages' }];
  selectedOption: number = 0;

  //variables for loading bar
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private router: Router, private userService: GetUsersService) {
    this.subscription = this.userService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this.loadPage(this.totalPages);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //add pages to pages navigation depending on total Pages that reserved from header component
  initialOptions(totalPages: number) {
    for (let i = 1; i <= totalPages; i++) {
      this.pagesFilter.push({ key: i, value: `page ${i}` });
    }
  }

  //update users depending on selected page in pages navigation
  onSelectionChange() {
    if (this.selectedOption != 0) {
      this.userService.currentPage = this.selectedOption;
      this.getPageUsers(this.userService.currentPage);
    } else {
      this.userService.currentPage = 0;
      this.loadUsers(this.totalPages);
    }
  }

  //load page depending on requested page
  loadPage(totalPages: number) {
    this.totalPages = totalPages;
    this.initialOptions(totalPages);
    if (this.userService.currentPage == 0) {
      this.loadUsers(totalPages);
    } else {
      this.getPageUsers(this.userService.currentPage);
    }
    this.selectedOption = this.userService.currentPage;
  }

  //get all users from all pages
  loadUsers(totalPages: number) {
    this.users = this.userService.getAllUsers(totalPages);
  }

  //get users in single page
  getPageUsers(page: number) {
    this.users = this.userService.getSinglePageUsers(page);
  }

  //go to user details
  getUserById(id: number): void {
    this.router.navigate(['/user', id]);
  }

}
