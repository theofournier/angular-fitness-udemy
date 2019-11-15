import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { UIService } from "../shared/ui.service";
import * as fromRoot from "../app.reducer";
import * as UI from "../shared/ui.actions";
import * as Training from "./training.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  private firebaseSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.firebaseSubs.push(
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()["name"],
                duration: doc.payload.doc.data()["duration"],
                calories: doc.payload.doc.data()["calories"]
              };
            });
          })
        )
        .subscribe(
          (exs: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableExercises(exs));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartExercise(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromRoot.getCurrentExercises)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: "completed"
        });
        this.store.dispatch(new Training.StopExercise());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromRoot.getCurrentExercises)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: "cancelled",
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100)
        });
        this.store.dispatch(new Training.StopExercise());
      });
  }

  fetchPastExercises() {
    this.firebaseSubs.push(
      this.db
        .collection("pastExercises")
        .valueChanges()
        .subscribe((exs: Exercise[]) => {
          this.store.dispatch(new Training.SetPastExercises(exs));
        })
    );
  }

  cancelSubscription() {
    this.firebaseSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("pastExercises").add(exercise);
  }
}
