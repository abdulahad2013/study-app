import React, { useState, useEffect } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 'price_free',
      name: 'Free',
      price: 0,
      features: [
        '5 gradings per month',
        'Basic question generator',
        'Community support',
        'Limited to 3 subjects',
      ],
    },
    {
      id: 'price_premium_monthly',
      name: 'Premium',
      price: 500,
      features: [
        'Unlimited gradings',
        'Advanced question generator',
        'Email support',
        'Custom note generation',
        'All 4 subjects',
      ],
    },
    {
      id: 'price_pro_monthly',
      name: 'Pro',
      price: 1500,
      features: [
        'Everything in Premium',
        'Priority support (24/7)',
        'AI tutor priority responses',
        'Custom topic generation',
        'Progress tracking & analytics',
        'Export to PDF',
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free');

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const userId = localStorage.getItem('userId') || 'demo-user';
        const response = await fetch(`/api/subscription-status/${userId}`);
        const data = await response.json();
        setCurrentPlan(data.plan);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchCurrentPlan();
  }, []);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (planName === 'Free') {
      alert('You are already on the Free plan');
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem('userId') || 'demo-user';
      const email = localStorage.getItem('userEmail') || 'user@example.com';

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId,
          email,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to start subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>📊 Simple, Transparent Pricing</h1>
        <p>Choose the perfect plan for your study needs</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.name.toLowerCase()}`}>
            {plan.name === 'Pro' && <div className="badge">Most Popular</div>}

            <h2>{plan.name}</h2>

            <div className="price">
              {plan.price === 0 ? (
                <span>Free</span>
              ) : (
                <>
                  <span className="currency">$</span>
                  <span className="amount">{(plan.price / 100).toFixed(2)}</span>
                  <span className="period">/month</span>
                </>
              )}
            </div>

            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`subscribe-btn ${
                currentPlan === plan.name.toLowerCase() ? 'current' : ''
              }`}
              onClick={() => handleSubscribe(plan.id, plan.name)}
              disabled={
                loading || currentPlan === plan.name.toLowerCase()
              }
            >
              {currentPlan === plan.name.toLowerCase()
                ? '✓ Current Plan'
                : plan.name === 'Free'
                ? 'Get Started'
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Can I cancel anytime?</h3>
          <p>Yes! Cancel your subscription anytime with no penalties. You'll keep access until the end of your billing cycle.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer refunds?</h3>
          <p>We offer a 7-day money-back guarantee. Contact our support team for refund requests.</p>
        </div>
        <div className="faq-item">
          <h3>Can I upgrade or downgrade?</h3>
          <p>Yes! Change your plan anytime. If upgrading, you'll only pay the difference prorated.</p>
        </div>
        <div className="faq-item">
          <h3>What payment methods do you accept?</h3>
          <p>We accept all major credit cards, Apple Pay, and Google Pay through Stripe.</p>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
