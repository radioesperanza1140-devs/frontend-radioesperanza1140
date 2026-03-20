import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

type TxStatus = 'approved' | 'pending' | 'declined' | 'rejected';

interface StatusConfig {
  icon: string;
  title: string;       // use {name} as placeholder
  subtitle: string;
  message: string;     // use {name} as placeholder
  accent: string;
  badge: string;
  badgeBg: string;
}

const STATUS_MAP: Record<TxStatus, StatusConfig> = {
  approved: {
    icon: '✓',
    title: '¡Gracias, {name}!',
    subtitle: 'Tu donación fue recibida con éxito',
    message:
      '{name}, tu generosidad nos llena de alegría. Gracias a personas como tú, seguimos llevando el mensaje de esperanza a miles de familias cada día.',
    accent: '#3eccb5',
    badge: 'Aprobada',
    badgeBg: '#e6faf5',
  },
  pending: {
    icon: '◷',
    title: 'Estamos procesando tu donación, {name}',
    subtitle: 'En breve confirmaremos tu aporte',
    message:
      '{name}, si pagaste por PSE o transferencia, el proceso puede tomar hasta 24 horas. Te notificaremos cuando esté listo.',
    accent: '#ad875f',
    badge: 'En proceso',
    badgeBg: '#fdf3e8',
  },
  declined: {
    icon: '✕',
    title: 'Algo salió mal, {name}',
    subtitle: 'No se pudo completar tu donación',
    message:
      '{name}, no te preocupes, no se realizó ningún cobro a tu cuenta. Puedes intentarlo de nuevo con otro medio de pago.',
    accent: '#e05252',
    badge: 'Rechazada',
    badgeBg: '#fde8e8',
  },
  rejected: {
    icon: '✕',
    title: 'Algo salió mal, {name}',
    subtitle: 'No se pudo completar tu donación',
    message:
      '{name}, no te preocupes, no se realizó ningún cobro a tu cuenta. Puedes intentarlo de nuevo con otro medio de pago.',
    accent: '#e05252',
    badge: 'Rechazada',
    badgeBg: '#fde8e8',
  },
};

@Component({
  selector: 'app-donation-thanks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donation-thanks.component.html',
  styleUrl: './donation-thanks.component.scss',
})
export class DonationThanksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  /** Query params from Bold + custom ones passed via redirectionUrl */
  readonly txStatus = signal<TxStatus>('approved');
  readonly orderId = signal('');
  readonly donorName = signal('Amigo/a');
  readonly donorAmount = signal(0);

  /** Resolved status config */
  readonly config = computed(() => STATUS_MAP[this.txStatus()]);

  /** Personalized title with donor's first name */
  readonly title = computed(() => {
    const firstName = this.donorName().split(' ')[0];
    return this.config().title.replace('{name}', firstName);
  });

  /** Personalized message with donor's first name */
  readonly personalMessage = computed(() => {
    const firstName = this.donorName().split(' ')[0];
    return this.config().message.replace('{name}', firstName);
  });

  /** Formatted donation amount */
  readonly formattedAmount = computed(() => {
    const amount = this.donorAmount();
    if (!amount || amount === 0) return 'Monto libre';
    return `$${amount.toLocaleString('es-CO')} COP`;
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.queryParamMap.subscribe((params) => {
      // Bold params
      const status = params.get('bold-tx-status') as TxStatus | null;
      const order = params.get('bold-order-id');

      // Custom params (passed in the redirectionUrl before opening Bold)
      const name = params.get('donor-name');
      const amount = params.get('donor-amount');

      if (status && STATUS_MAP[status]) {
        this.txStatus.set(status);
      }
      if (order) {
        this.orderId.set(order);
      }
      if (name) {
        this.donorName.set(decodeURIComponent(name));
      }
      if (amount) {
        this.donorAmount.set(Number(amount));
      }
    });
  }
}
