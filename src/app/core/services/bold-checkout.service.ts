import { Injectable, signal } from '@angular/core';

export interface BoldCheckoutConfig {
  orderId?: string;
  currency?: 'COP' | 'USD';
  amount?: string;
  apiKey: string;
  integritySignature?: string;
  description?: string;
  tax?: string;
  redirectionUrl?: string;
  originUrl?: string;
  renderMode?: 'embedded' | 'redirect';
  expirationDate?: number;
  customerData?: string;
  billingAddress?: string;
  extraData1?: string;
  extraData2?: string;
}

@Injectable({ providedIn: 'root' })
export class BoldCheckoutService {
  private scriptUrl = 'https://checkout.bold.co/library/boldPaymentButton.js';

  /** Reactive state: true once the Bold script is loaded and ready */
  readonly isReady = signal(false);

  /** Reactive state: true while the script is loading */
  readonly isLoading = signal(false);

  /** Reactive state: holds any load error message */
  readonly error = signal<string | null>(null);

  /**
   * Dynamically loads the Bold Checkout script into the <head>.
   * Safe to call multiple times — it will only load once.
   */
  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Already loaded
      if (this.isReady()) {
        resolve();
        return;
      }

      // Already in DOM (e.g., from a previous navigation)
      if (document.querySelector(`script[src="${this.scriptUrl}"]`)) {
        this.isReady.set(true);
        this.isLoading.set(false);
        resolve();
        return;
      }

      this.isLoading.set(true);
      this.error.set(null);

      const script = document.createElement('script');
      script.src = this.scriptUrl;

      script.onload = () => {
        this.isReady.set(true);
        this.isLoading.set(false);
        resolve();
      };

      script.onerror = () => {
        const msg = 'No se pudo cargar el script de Bold Checkout';
        this.error.set(msg);
        this.isLoading.set(false);
        reject(new Error(msg));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Creates a new BoldCheckout instance with the given config.
   * The script must be loaded first via loadScript().
   */
  createCheckout(config: BoldCheckoutConfig): BoldCheckoutInstance {
    const BoldCheckout = (window as any).BoldCheckout;

    if (!BoldCheckout) {
      throw new Error(
        'BoldCheckout no está disponible. Asegúrate de llamar loadScript() primero.'
      );
    }

    return new BoldCheckout(config) as BoldCheckoutInstance;
  }
}

/**
 * Typed wrapper for the BoldCheckout instance methods.
 * @see https://developers.bold.co/pagos-en-linea/boton-de-pagos/integracion-manual/integracion-personalizada
 */
export interface BoldCheckoutInstance {
  /** Opens the Bold payment gateway (redirect or embedded modal) */
  open(): void;

  /** Gets a config property value */
  getConfig(key: string): string;

  /** Updates a config property value (always a string) */
  updateConfig(key: string, value: string): void;
}
