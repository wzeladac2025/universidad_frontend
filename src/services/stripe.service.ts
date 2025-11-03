import axios from "axios";

const STRIPE_SERVICE: string = "https://payment-service-main-3t7t.onrender.com/";

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface PayParams {
  userId: string;
  nit: string;
  items: Item[];
}

interface StripeResponse {
  url?: string;
}

export const pay = async ({ userId, nit, items }: PayParams): Promise<void> => {
  if (!userId) throw new Error("Falta userId.");
  if (!nit) throw new Error("Falta NIT (use CF si no desea facturar).");
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No hay items para pagar.");
  }

  const base = STRIPE_SERVICE.endsWith("/") ? STRIPE_SERVICE.slice(0, -1) : STRIPE_SERVICE;

  const { data } = await axios.post<StripeResponse>(
    `${base}/api/payment/create-checkout-session`,
    {
      userId,
      nit,
      items
    },
    { withCredentials: true }
  );

  if (!data?.url) throw new Error("No se recibió la URL de pago.");
  window.location.href = data.url;
};
