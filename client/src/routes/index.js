/* eslint-disable import/no-unresolved */
import RegisterUser from 'views/auth/Register';
import RegisterAdmin from 'views/auth/RegisterAdmin';
import UserDashboard from 'views/dashboard/UserDashboard';
import AdminDashboard from 'views/dashboard/AdminDashboard';
import Login from 'views/auth/Login';

const indexRoute = [
  { path: '/signup', name: 'Register', component: RegisterUser },
  { path: '/admin/signup', name: 'Signup', component: RegisterAdmin },
  { path: '/user/:id/dashboard', name: 'UserDashboard', component: UserDashboard },
  { path: '/admin/:id/dashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/login', name: 'Login Page', component: Login },
];

export default indexRoute;
