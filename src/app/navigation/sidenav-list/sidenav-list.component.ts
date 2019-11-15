import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Observable } from "rxjs";
import * as fromRoot from "../../app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSidenav();
  }
}
