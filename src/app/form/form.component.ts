import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule], // Import FormsModule here
  template: `
    <div class="board-name">
      <input
        type="text"
        class="board-name-input"
        placeholder="Type board name"
        [(ngModel)]="boardName"
      />
      <div class="buttons-div">
        <button class="form-button" (click)="createBoard()">Create</button>
        <button class="form-button" (click)="closeForm()">X</button>
      </div>
    </div>
  `,
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() closeFormEvent = new EventEmitter<void>(); // Emits when the form is closed
  @Output() boardCreated = new EventEmitter<any>();
  boardName: string = ''; // Holds the board name

  createBoard() {
    const boardData = { name: this.boardName }; // Create the data object

    fetch('http://localhost:8080/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Board created successfully', data);
        this.boardCreated.emit(data); // Emit the new board data
        this.closeForm(); // Close the form after successful creation
      })
      .catch((error) => {
        console.error('Error creating board', error);
      });
  }

  closeForm() {
    this.closeFormEvent.emit(); // Emit the event when the close button is clicked
  }
}
