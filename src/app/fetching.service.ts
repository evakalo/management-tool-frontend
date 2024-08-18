import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FetchingService {
  private apiUrl = 'http://localhost:8080'; // Base URL for your API

  // Fetch a single board by ID
  getBoard(boardId: string): Promise<any> {
    return fetch(`${this.apiUrl}/boards/${boardId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Board fetched', data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching board', error);
      });
  }
}
