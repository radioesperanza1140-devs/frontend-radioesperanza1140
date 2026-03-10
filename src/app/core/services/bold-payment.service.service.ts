import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

declare const BoldCheckout: any;

@Injectable({ providedIn: 'root' })
export class BoldPaymentService {
  private apiUrl = 'https://api.cms.radioesperanza1140.com/api'; // tu URL de Strapi

  constructor(private http: HttpClient) {}

  async openDonationCheckout(description: string) {
    // Pedir un order-id único a Strapi
    const { orderId } = await firstValueFrom(
      this.http.post<{ orderId: string }>(`${this.apiUrl}/bold/create-order`, { description })
    );

    const checkout = new BoldCheckout({
      apiKey: 'O_IFO4EUoYzGI3xz3Sj9TFA04QrjKkNoInRn59Yt09c',   // llave de identidad (pública)
      orderId,
      currency: 'COP',
      // Sin 'amount' → monto libre (ideal para donaciones)
      description,
      redirectionUrl: 'https://radioesperanza1140.com/donacion/gracias',
    });

    checkout.open();
  }
}
