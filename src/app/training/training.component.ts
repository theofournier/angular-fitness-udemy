import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromRoot from "../app.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromRoot.getIsOngoingExercise);
  }
}
