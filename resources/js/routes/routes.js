import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Archive from '../pages/Archive';
import Profile from '../pages/Profile';
import NoMatch from '../pages/NoMatch';

// Pages
import Welcome from '../pages/Welcome';
import InstitutionProfile from '../pages/InstitutionProfile';

// Layouts
import Auth from '../layout/Auth';
import App from '../layout/App';
import Fair from '../layout/Fair';

const routes = [
  {
    path: '/',
    exact: true,
    auth: true,
    component: Dashboard,
    layout: App
  },
  {
    path: '/login',
    exact: true,
    auth: false,
    component: Login,
    layout: Auth
  },
  {
    path: '/register',
    exact: true,
    auth: false,
    component: Register,
    layout: Auth
  },
  {
    path: '/forgot-password',
    exact: true,
    auth: false,
    component: ForgotPassword,
    layout: Auth
  },
  {
    path: '/reset-password',
    exact: true,
    auth: false,
    component: ResetPassword,
    layout: Auth
  },
  {
    path: '/archive',
    exact: true,
    auth: true,
    component: Archive,
    layout: App
  },
  {
    path: '/profile',
    exact: true,
    auth: true,
    component: Profile,
    layout: App
  },
  {
    path: '/institution/:id',
    exact: true,
    auth: true,
    component: InstitutionProfile,
    layout: Fair
  },
  {
    path: '/welcome',
    exact: true,
    auth: true,
    component: Welcome,
    layout: Fair
  },
  {
    path: '',
    exact: false,
    auth: false,
    component: NoMatch,
    layout: Auth
  },
];

export default routes;
