import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../../../core/domain/models/contacto';
import { StrapiService } from '../../../../core/services/strapi.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
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
          console.log('Contacto enviado con éxito:', response);
          alert('Mensaje enviado con éxito');
          this.contacto = { fullname: '', email: '', mensaje: '', asunto:'' };
        },
        error: (err) => {
          console.error('Error al enviar el contacto:', err);
          alert('Hubo un error al enviar el mensaje.');
        }
      });
    }else {
      console.log('Form is invalid');
    }
  }
}



