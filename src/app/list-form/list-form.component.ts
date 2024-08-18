import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="list-name">
      <input
        type="text"
        class="list-name-input"
        placeholder="Type list name"
        [(ngModel)]="listName"
      />
      <div class="buttons-div">
        <button class="form-button" (click)="createList()">Create</button>
        <button class="form-button" (click)="closeForm()">X</button>
      </div>
    </div>
  `,
  styleUrls: ['./list-form.component.css'],
})
export class ListFormComponent {
  @Input() boardId: string = ''; // Board ID to associate the list with
  @Output() closeFormEvent = new EventEmitter<void>();
  @Output() listCreated = new EventEmitter<any>(); // Emits when a list is created

  listName: string = '';

  createList() {
    const listData = { name: this.listName, board: { id: this.boardId } };
    fetch('http://localhost:8080/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        console.log('List created successfully', data);
        this.listCreated.emit(data);
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
