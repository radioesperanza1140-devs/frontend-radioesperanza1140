import { Component } from '@angular/core';
import { GetProgramationUsecase } from '../../../../core/domain/use-cases/get-programation.usecase';

@Component({
  selector: 'app-programation',
  standalone: true,
  imports: [],
  templateUrl: './programation.component.html',
  styleUrl: './programation.component.scss'
})
export class ProgramationComponent{

    constructor(private getProgramationUsecase:GetProgramationUsecase) {

    }


}
