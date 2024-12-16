import {
  Component,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramationsListService } from '../../services/programations-list.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Peticion } from '../../../../core/domain/models/peticion.model';
import { StrapiService } from '../../../../core/services/strapi.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-programation-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './programation-detail.component.html',
  styleUrls: ['./programation-detail.component.scss'],
})
export class ProgramationDetailComponent {
  form: FormGroup;
  programId: string | null = null;
  program: any = {};
  public inicio;
  public fin;
  public imgUrl;
  assetsUrl = environment.UPLOADS_URL;
  public isLoading = true; // Variable para manejar el estado de carga
  peticion: Peticion | undefined;

  constructor(
    private fb: FormBuilder,
    private strapiService: StrapiService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private __servicesProgramationDetail: ProgramationsListService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.formatTimeTo12Hour(this.fin);
    this.formatTimeTo12Hour(this.inicio);

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      peticion: ['', [Validators.required, Validators.minLength(3)]],
      tipoPeticion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id');

    this.__servicesProgramationDetail
      .getDetailProgramtion(this.programId)
      .subscribe((data: any) => {
        this.program = data.data;
        this.inicio = this.formatTimeTo12Hour(data.data.horario_emision_inicio);
        this.fin = this.formatTimeTo12Hour(data.data.horario_emision_fin);

        // Después de recibir los datos, actualizar imgUrl
        if (this.program.imagen != null)
          this.imgUrl = this.assetsUrl + this.program.imagen.url;

        // Una vez que los datos se hayan cargado, establecer isLoading en false
        this.isLoading = false;

        // Forzar la detección de cambios para actualizar la vista
        this.cdRef.detectChanges();
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }

  public formatTimeTo12Hour(time24) {
    if (time24 != null) {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      this.peticion = this.form.value as Peticion;
      this.strapiService.addPeticion(this.peticion).subscribe({
        next: (response) => {
          console.log('Peticion enviado con éxito:', response);
          alert('Mensaje enviado con éxito');
          this.peticion = {
            nombre: '',
            email: '',
            peticion: '',
            tipoPeticion: '',
          };
        },
        error: (err) => {
          console.error('Error al enviar su Peticion:', err);
          alert('Hubo un error al enviar el mensaje.');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
