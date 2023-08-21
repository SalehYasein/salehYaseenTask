import { Component } from '@angular/core';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salehTask';
}
