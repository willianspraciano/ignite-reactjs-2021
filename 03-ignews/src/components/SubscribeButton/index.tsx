import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface subscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      // verifica se usuário está logado
      signIn('github');
      return;
    }

    // criação da checkout session
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
