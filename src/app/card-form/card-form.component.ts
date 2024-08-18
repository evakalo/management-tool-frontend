import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card-name">
      <input
        type="text"
        class="card-name-input"
        placeholder="Type card name"
        [(ngModel)]="cardName"
      />
      <div class="buttons-div">
        <button class="form-button" (click)="createCard()">Create</button>
        <button class="form-button" (click)="closeForm()">X</button>
      </div>
    </div>
  `,
  styleUrl: './card-form.component.css',
})
export class CardFormComponent {
  @Input() listId: string = ''; // Board ID to associate the list with
  @Output() closeFormEvent = new EventEmitter<void>();
  @Output() cardCreated = new EventEmitter<any>(); // Emits when a list is created

  cardName: string = '';

  createCard() {
    const cardData = { title: this.cardName, list: { id: this.listId } };
    fetch('http://localhost:8080/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        console.log('Card created successfully', data);
        this.cardCreated.emit(data);
        this.closeForm();
      })
      .catch((error) => {
        console.error('Error creating list', error);
      });
  }
  closeForm() {
    this.closeFormEvent.emit();
  }
}
