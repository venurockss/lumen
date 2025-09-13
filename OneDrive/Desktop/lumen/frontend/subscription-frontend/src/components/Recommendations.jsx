import React from 'react';
import PlanCard from './PlanCard';
import './Recommendations.css';

const Recommendations = ({ plans, subscriptions, onSubscribe }) => {
  // Get plans with discounts
  const discountedPlans = plans.filter(plan => plan.discount > 0);
  
  // Get plans user hasn't subscribed to
  const subscribedPlanIds = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => sub.id);
  
  const unsubscribedPlans = plans.filter(plan => !subscribedPlanIds.includes(plan.id));
  
  // Get plans of different types than current subscriptions
  const currentTypes = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => sub.type);
  
  const differentTypePlans = unsubscribedPlans.filter(plan => 
    !currentTypes.includes(plan.type)
  );
  
  // Get higher-tier plans of same type
  const higherTierPlans = subscriptions
    .filter(sub => sub.status === 'active')
    .flatMap(currentSub => 
      plans.filter(plan => 
        plan.type === currentSub.type && 
        plan.price > currentSub.price &&
        !subscribedPlanIds.includes(plan.id)
      )
    );

  return (
    <div className="recommendations">
      <h2>Personalized Recommendations</h2>
      
      {discountedPlans.length > 0 && (
        <section className="recommendation-section">
          <h3>🔥 Limited Time Offers</h3>
          <p>Don't miss out on these discounted plans!</p>
          <div className="plans-grid">
            {discountedPlans.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={() => onSubscribe(plan)}
                isSubscribed={subscribedPlanIds.includes(plan.id)}
              />
            ))}
          </div>
        </section>
      )}

      {differentTypePlans.length > 0 && (
        <section className="recommendation-section">
          <h3>🆕 Try Something New</h3>
          <p>Explore different connection types for better performance!</p>
          <div className="plans-grid">
            {differentTypePlans.slice(0, 4).map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={() => onSubscribe(plan)}
                isSubscribed={subscribedPlanIds.includes(plan.id)}
              />
            ))}
          </div>
        </section>
      )}

      {higherTierPlans.length > 0 && (
        <section className="recommendation-section">
          <h3>⬆️ Upgrade Options</h3>
          <p>Get more data and better performance with these upgrades!</p>
          <div className="plans-grid">
            {higherTierPlans.slice(0, 4).map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={() => onSubscribe(plan)}
                isSubscribed={subscribedPlanIds.includes(plan.id)}
              />
            ))}
          </div>
        </section>
      )}

      {discountedPlans.length === 0 && differentTypePlans.length === 0 && higherTierPlans.length === 0 && (
        <div className="no-recommendations">
          <h3>No recommendations available</h3>
          <p>Check back later for personalized recommendations based on your usage!</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
