import { notFound } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

interface ReceiptPageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { sessionId } = await params;

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    });

    if (!session) {
      notFound();
    }

    const orderItems = session.line_items?.data?.map((item: Stripe.LineItem) => {
      // Handle different product types (string ID, Product object, or DeletedProduct)
      let productName = 'Product';
      if (item.price?.product && typeof item.price.product === 'object' && 'name' in item.price.product) {
        productName = item.price.product.name || 'Product';
      }
      
      return {
        name: productName,
        quantity: item.quantity || 1,
        price: (item.price?.unit_amount || 0) / 100
      };
    }) || [];

    const totalAmount = orderItems.reduce((sum: number, item: { price: number; quantity: number }) => 
      sum + (item.price * item.quantity), 0
    );

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN'
      }).format(amount);
    };

    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#8b4513] px-6 py-8 text-center">
              <h1 className="text-lg font-normal text-white tracking-wide">HOLISTIC POINT</h1>
            </div>

            {/* Content */}
            <div className="px-6 py-12">
              {/* Header Text */}
              <div className="text-center mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Otrzymaliśmy Twoje zamówienie</h2>
                <p className="text-sm text-gray-500">Dziękujemy za zakup</p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-5 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-500">Zamówienie</span>
                  <span className="text-xs text-gray-900 font-mono font-medium">#{sessionId.slice(-8)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-900 font-medium">Razem</span>
                    <span className="text-base text-[#8b4513] font-semibold">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <a
                  href="https://holisticpoint.booksy.com"
                  className="inline-block bg-[#8b4513] text-white px-5 py-3 rounded-md font-medium text-sm hover:bg-[#6b3410] transition-colors"
                >
                  Umów wizytę
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-5 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400">Holistic Point • Warsaw</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error retrieving session:', error);
    notFound();
  }
}

