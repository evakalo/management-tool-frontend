import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MessageComponent, MatSlideToggleModule, CommonModule, FormsModule],
  template: `
    <div class="card-wrapper">
      <h4>{{ card?.title }}</h4>
      <div class="messages-wrapper">
        <app-message
          *ngFor="let description of card?.messages"
          [description]="description"
        />
      </div>
      <div>
        <input
          type="text"
          class="description-input"
          placeholder="Write a description..."
          [(ngModel)]="description"
        />
        <button class="comment-button" (click)="createDescription()">
          Submit
        </button>
      </div>
    </div>
  `,
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() card: any;
  //  cardId: string = card.id;
  description: string = '';
  showInput = true;

  createDescription() {
    const descriptionData = {
      content: this.description,
      card: { id: this.card.id },
    };
    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descriptionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        this.showInput = false;
        this.fetchCard();
        console.log('Card created successfully', data);
      })
      .catch((error) => {
        console.error('Error creating list', error);
      });
  }

  fetchCard() {
    fetch(`http://localhost:8080/cards/${this.card.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.card = data; // Update the board with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching list', error);
      });
  }
}
