import { Component } from '@angular/core';
import { GetPromiseUsecase } from '../../../core/domain/use-cases/get-promise.usecase';
import { Promise } from '../../../core/domain/models/promise.model';

@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss',
  providers:[GetPromiseUsecase]
})
export class PromiseComponent {
  promises?: Promise[]=[];
  constructor(private getPromiseUseCase: GetPromiseUsecase) {}

  ngOnInit(): void {
    this.getPromiseUseCase.execute().subscribe((response: any) => this.promises = response.data);
  }
}
