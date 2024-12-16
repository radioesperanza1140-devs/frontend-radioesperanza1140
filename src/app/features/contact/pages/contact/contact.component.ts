import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../../../core/domain/models/contacto';
import { StrapiService } from '../../../../core/services/strapi.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  form: FormGroup;
  contacto: Contacto | undefined;

  constructor(private fb: FormBuilder, private strapiService: StrapiService) {
    this.form = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      mensaje: ['', [Validators.required, Validators.min(3)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.contacto = this.form.value as Contacto;
      this.strapiService.addContact(this.contacto).subscribe({
        next: (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tu mensaje se ha enviado',
            showConfirmButton: false,
            timer: 1500,
          });

          this.contacto = { fullname: '', email: '', mensaje: '', asunto: '' };
          this.form.reset(); // Reseteamos el formulario después de un envío exitoso
        },
        error: (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrió un error al enviar el mensaje',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      // Marca todos los campos como tocados para mostrar los errores
      this.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  // Método para marcar todos los controles del formulario como tocados
  private markAllAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
