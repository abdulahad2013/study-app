import React, { useEffect } from 'react';

function SubscriptionSuccess() {
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      const verifyPayment = async () => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            console.log('Payment verified!');
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      };

      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your subscription. Your account has been upgraded.</p>
        <p className="loading-text">Redirecting to dashboard...</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default SubscriptionSuccess;
