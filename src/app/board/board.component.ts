import { Component, Input } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { ListFormComponent } from '../list-form/list-form.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ListComponent, CommonModule, ListFormComponent],
  template: `
    <div class="board-wrapper">
      <header class="header-button">
        <h2>{{ board?.name || 'Project Board' }}</h2>
        <app-list-form
          *ngIf="showListForm"
          [boardId]="board?.id"
          (closeFormEvent)="closeListForm()"
          (listCreated)="onListCreated($event)"
        ></app-list-form>
        <button
          *ngIf="!showListForm"
          class="list-button"
          (click)="openListForm()"
        >
          New List
        </button>
      </header>
      <section class="lists-section">
        <app-list *ngFor="let list of board?.lists" [list]="list"></app-list>
      </section>
    </div>
  `,
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() board: any; // Accept the board object as an input
  showListForm = false; // Toggle to show or hide the form
  openListForm() {
    this.showListForm = true;
    console.log('click');
  }

  closeListForm() {
    this.showListForm = false;
  }

  onListCreated(listData: any) {
    this.fetchBoard(); // Refetch the board to get updated lists
    this.closeListForm();
  }

  fetchBoard() {
    fetch(`http://localhost:8080/boards/${this.board.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.board = data; // Update the board with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching board', error);
      });
  }
}
