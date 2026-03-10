import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  PLATFORM_ID,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  BoldCheckoutService,
  BoldCheckoutConfig,
  BoldCheckoutInstance,
} from '../../../core/services/bold-checkout.service';

/** Predefined donation amounts in COP */
interface DonationPreset {
  label: string;
  value: number;
}

@Component({
  selector: 'app-donation-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donation-section.component.html',
  styleUrl: './donation-section.component.scss',
})
export class DonationSectionComponent implements OnInit {
  // ── Injections ──
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  boldService = inject(BoldCheckoutService);

  // ── Preset amounts (COP) ──
  readonly presets: DonationPreset[] = [
    { label: '$10.000', value: 10000 },
    { label: '$20.000', value: 20000 },
    { label: '$50.000', value: 50000 },
    { label: '$100.000', value: 100000 },
  ];

  // ── Reactive state ──
  readonly step = signal(1);
  readonly selectedAmount = signal(10000); // default first preset
  readonly isCustomAmount = signal(false);

  // ── Forms ──
  readonly customAmountControl = this.fb.control<number | null>(null, [
    Validators.required,
    Validators.min(1000),
  ]);

  readonly donorForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^\d{7,10}$/)],
    ],
  });

  // ── Bridge Reactive Forms → Signals ──
  // computed() only tracks signals, NOT FormGroup.valid directly.
  // We convert statusChanges (Observable) into signals so computed() reacts.

  private readonly donorFormValid = toSignal(
    this.donorForm.statusChanges.pipe(
      startWith(this.donorForm.status),
      map(() => this.donorForm.valid)
    ),
    { initialValue: false }
  );

  private readonly customAmountValid = toSignal(
    this.customAmountControl.statusChanges.pipe(
      startWith(this.customAmountControl.status),
      map(() => this.customAmountControl.valid)
    ),
    { initialValue: false }
  );

  private readonly customAmountValue = toSignal(
    this.customAmountControl.valueChanges.pipe(
      startWith(this.customAmountControl.value)
    ),
    { initialValue: null as number | null }
  );

  // ── Computed ──
  readonly currentAmount = computed(() => {
    if (this.isCustomAmount()) {
      return this.customAmountValue() ?? 0;
    }
    return this.selectedAmount();
  });

  readonly formattedAmount = computed(() => {
    const amount = this.currentAmount();
    if (!amount || amount === 0) return 'Monto libre';
    return `$${amount.toLocaleString('es-CO')} COP`;
  });

  readonly isAmountValid = computed(() => {
    if (this.isCustomAmount()) {
      return this.customAmountValid();
    }
    return this.selectedAmount() > 0;
  });

  readonly canPay = computed(() => {
    return (
      this.isAmountValid() &&
      this.donorFormValid() &&
      this.boldService.isReady() &&
      !this.boldService.isLoading()
    );
  });

  // ── Checkout instance ──
  private checkout: BoldCheckoutInstance | null = null;

  // ── Lifecycle ──
  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      await this.boldService.loadScript();
    } catch (err) {
      console.error('[DonationSection] Error loading Bold script:', err);
    }
  }

  // ── Amount selection ──
  selectPreset(value: number): void {
    this.isCustomAmount.set(false);
    this.selectedAmount.set(value);
    this.customAmountControl.reset();
  }

  enableCustomAmount(): void {
    this.isCustomAmount.set(true);
    this.selectedAmount.set(0);
  }

  // ── Navigation ──
  goToStep(s: number): void {
    if (s === 2 && !this.isAmountValid()) return;
    this.step.set(s);
  }

  // ── Bold Checkout ──
  async openBoldCheckout(): Promise<void> {
    if (!this.canPay()) return;

    const donor = this.donorForm.value;
    const amount = this.currentAmount();

    // Build config
    const config: BoldCheckoutConfig = {
      apiKey: environment.boldApiKey,
      description: 'Donación Radio Esperanza 1140 AM',
      redirectionUrl: environment.boldRedirectUrl,
      renderMode: 'embedded',
      customerData: JSON.stringify({
        email: donor.email,
        fullName: donor.fullName,
        phone: donor.phone,
        dialCode: '+57',
      }),
    };

    // If a specific amount is selected, we need orderId + integritySignature
    if (amount && amount >= 1000) {
      const orderId = `DON-${Date.now()}`;

      // Fetch the integrity hash from Strapi backend
      const signature = await this.fetchIntegritySignature(
        orderId,
        amount,
        'COP'
      );

      config.orderId = orderId;
      config.amount = String(amount);
      config.currency = 'COP';
      config.integritySignature = signature;
    }

    try {
      this.checkout = this.boldService.createCheckout(config);
      this.checkout.open();
    } catch (err) {
      console.error('[DonationSection] Error opening Bold Checkout:', err);
    }
  }

  /**
   * Calls your Strapi backend to generate the SHA-256 integrity hash.
   * Endpoint: POST /api/bold-webhook/get-signature
   */
  private async fetchIntegritySignature(
    orderId: string,
    amount: number,
    currency: string
  ): Promise<string> {
    const res = await fetch(
      `${environment.API_URL}/bold-webhook/get-signature`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error obteniendo firma de integridad: ${res.status}`);
    }

    const data = await res.json();
    return data.integritySignature;
  }
}
