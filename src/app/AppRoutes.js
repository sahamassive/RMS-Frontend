import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Homepage = lazy(() => import('../homepage/Index.js'));

const SuperAdmin = lazy(() => import('../app/user-pages/admin/superAdmin.js'));
const Admin = lazy(() => import('../app/user-pages/admin/admin.js'));
const SubAdmin = lazy(() => import('../app/user-pages/admin/superAdmin.js'));
const AllAdmin = lazy(() => import('../app/user-pages/admin/all.js'));

const Brand = lazy(() => import('../app/user-pages/catelogue/brand.js'));
const Category = lazy(() => import('../app/user-pages/catelogue/category.js'));
const Section = lazy(() => import('../app/user-pages/catelogue/section.js'));
const Food = lazy(() => import('../app/user-pages/catelogue/food.js'));

const CreateBrand = lazy(() => import('../app/user-pages/catelogue/createBrand.js'));
const CreateCategory = lazy(() => import('../app/user-pages/catelogue/createCategory.js'));
const CreateSection = lazy(() => import('../app/user-pages/catelogue/createSection.js'));
const CreateFood = lazy(() => import('../app/user-pages/catelogue/createFood.js'));

const QuickOrder = lazy(() => import('../app/user-pages/pos/quickOrder.js'));

const Waste= lazy(() => import('../app/user-pages/waste/insert.js'));
const NewWaste = lazy(() => import('../app/user-pages/waste/insert.js'));

const Booking = lazy(() => import('../app/user-pages/booking/createBooking'));
const CreateBooking = lazy(() => import('../app/user-pages/booking/createBooking.js'));

const Restaurant = lazy(() => import('../app/user-pages/restaurant/newRestaurant.js'));
const NewRestaurant = lazy(() => import('../app/user-pages/restaurant/newRestaurant.js'));


const RegisterEmployee = lazy(() => import('../app/user-pages/registration/EmployeeRegistration.js'));


const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/login/login.js'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/" component={Homepage} />
          
          <Route exact path="/login" component={ Login } />

          <Route path="/super-admin/super-admin" component={SuperAdmin} />
          <Route path="/super-admin/admin" component={Admin} />
          <Route path="/super-admin/all-admin" component={AllAdmin} />
          <Route path="/super-admin/sub-admin" component={SubAdmin} />

          <Route path="/catalogue/section" component={ Section } />
          <Route path="/catalogue/create-section" component={ CreateSection } />
          <Route path="/catalogue/category" component={ Category } />
          <Route path="/catalogue/create-category" component={ CreateCategory } />
          <Route path="/catalogue/brand" component={ Brand } />
          <Route path="/catalogue/create-brand" component={ CreateBrand } />
          <Route path="/catalogue/food" component={Food} />
          <Route path="/catalogue/create-food" component={CreateFood} />

          <Route path="/pos/quick-order" component={QuickOrder} />
          
          <Route path="/waste" component={Waste} />
          <Route path="/waste/new-waste" component={NewWaste} />

          <Route path="/booking" component={ Booking } />
          <Route path="/booking/new-booking" component={ CreateBooking } />
          
          <Route path="/restaurant" component={ Restaurant } />
          <Route path="/restaurant/new-restaurant" component={ NewRestaurant } />
          
          <Route path="/super-admin/employee/registration" component={ RegisterEmployee  } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;