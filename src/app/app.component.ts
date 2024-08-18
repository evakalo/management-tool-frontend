import { Input, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { BoardComponent } from './board/board.component';
import { FormComponent } from './form/form.component';
import { FetchingService } from './fetching.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Include CommonModule here
    RouterOutlet,
    BoardComponent,
    FormComponent,
  ],
  template: `<main class="main">
    <div class="content">
      <h1>Taskflow</h1>
      <app-form
        *ngIf="openForm"
        (closeFormEvent)="closeForm()"
        (boardCreated)="onBoardCreated($event)"
      ></app-form>
      <button
        *ngIf="!openForm"
        class="new-board-button"
        (click)="openBoardForm()"
      >
        New board
      </button>
    </div>
    <app-board *ngIf="newBoard" [board]="newBoard"></app-board>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newBoard: any = null;
  title = 'trello-app';
  @Input() openForm = false;

  constructor(private fetchingService: FetchingService) {}

  openBoardForm() {
    console.log('clicked yay');
    this.openForm = true;
  }

  closeForm() {
    this.openForm = false;
  }

  onBoardCreated(boardData: any) {
    this.fetchingService
      .getBoard(boardData.id)
      .then((board) => {
        this.newBoard = board;
        this.closeForm();
      })
      .catch((error) => {
        console.error('Error fetching the newly created board', error);
      });
  }
}
