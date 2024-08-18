import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule, CardFormComponent, CommonModule],
  template: `
    <div class="list-wrapper">
      <h3>{{ list?.name }}</h3>
      <app-card *ngFor="let card of list?.cards" [card]="card" />
      <app-card-form
        *ngIf="showCardForm"
        [listId]="list?.id"
        (closeFormEvent)="closeCardForm()"
        (cardCreated)="onCardCreated($event)"
      />
      <button
        *ngIf="!showCardForm"
        class="add-card-button"
        (click)="openCardForm()"
      >
        + Add a card
      </button>
    </div>
  `,
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input() list: any;
  showCardForm = false;

  openCardForm() {
    this.showCardForm = true;
    console.log('open card form');
  }

  closeCardForm() {
    this.showCardForm = false;
  }

  onCardCreated(listData: any) {
    this.fetchList(); // Refetch the board to get updated lists
    this.closeCardForm();
  }

  fetchList() {
    fetch(`http://localhost:8080/lists/${this.list.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.list = data; // Update the board with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching list', error);
      });
  }
}
