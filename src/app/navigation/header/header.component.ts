import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import * as fromRoot from "../../app.reducer";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
