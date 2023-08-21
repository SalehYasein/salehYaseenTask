import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { user } from 'src/app/app.module';
import { GetUsersService } from 'src/app/services/get-users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  user: Observable<user> | undefined;

  //variables for loading bar
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: GetUsersService
  ) {
    this.subscription = this.userService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //get the requested user information
  getUserDetails() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const id = parseInt(userId, 10);
      this.user = this.userService.getUserById(id);
    }
  }

  //back to users list component
  backToUsersList() {
    this.router.navigate(['/']);
  }
}
