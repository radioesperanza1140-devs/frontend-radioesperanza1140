import { Component } from '@angular/core';
import { Programation } from '../../../core/domain/models/programation.mode';
import { GetProgramationUsecase } from '../../../core/domain/use-cases/get-programation.usecase';

@Component({
  selector: 'app-progamation',
  standalone: true,
  imports: [],
  templateUrl: './progamation.component.html',
  styleUrl: './progamation.component.scss'
})
export class ProgamationComponent {
  progamations?: Programation[] = [];

  constructor(private getProgramationUseCase: GetProgramationUsecase) {}

  ngOnInit(): void {
    this.getProgramationUseCase.execute().subscribe((response: any) => this.progamations = response.data);
  }
}
