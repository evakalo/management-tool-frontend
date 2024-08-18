import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-container">
      <div class="message-div">{{ description.content }}</div>
    </div>
  `,
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() description: any;
}
