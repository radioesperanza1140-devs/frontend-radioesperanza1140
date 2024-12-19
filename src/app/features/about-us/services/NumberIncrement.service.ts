// src/app/services/number-increment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberIncrementService {
  private numberSubject = new BehaviorSubject<{ [key: string]: number }>({
    sintonizantes: 0,
    ayudadores: 0,
    years: 0,
  });

  get numbers$() {
    return this.numberSubject.asObservable();
  }

  startIncrement(targetNumbers: { [key: string]: number }) {
    const currentNumbers = this.numberSubject.value;

    const interval = setInterval(() => {
      let allComplete = true;

      // Increment each number
      const updatedNumbers = { ...currentNumbers };

      for (const key in targetNumbers) {
        if (updatedNumbers[key] < targetNumbers[key]) {
          updatedNumbers[key]++;
          allComplete = false;
        }
      }

      this.numberSubject.next(updatedNumbers);

      // Stop when all numbers reach their target values
      if (allComplete) {
        clearInterval(interval);
      }
    }, 10); // Adjust the speed of the increment here (in ms)
  }
}
