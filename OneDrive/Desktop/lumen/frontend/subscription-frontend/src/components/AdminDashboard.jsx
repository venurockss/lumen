import React, { useState } from 'react';
import PlanManagement from './PlanManagement';
import Analytics from './Analytics';
import UserManagement from './UserManagement';
import './AdminDashboard.css';

const AdminDashboard = ({ 
  user, 
  plans, 
  subscriptions, 
  onPlanAdd, 
  onPlanEdit, 
  onPlanDelete, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {user.username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'plans' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('plans')}
        >
          Plan Management
        </button>
        <button 
          className={activeTab === 'analytics' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics & Insights
        </button>
        <button 
          className={activeTab === 'users' ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'plans' && (
          <PlanManagement
            plans={plans}
            onPlanAdd={onPlanAdd}
            onPlanEdit={onPlanEdit}
            onPlanDelete={onPlanDelete}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics
            plans={plans}
            subscriptions={subscriptions}
          />
        )}

        {activeTab === 'users' && (
          <UserManagement />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
