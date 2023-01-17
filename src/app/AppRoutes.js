import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Homepage = lazy(() => import("../homepage/Index.js"));

const SuperAdmin = lazy(() => import("../app/user-pages/admin/superAdmin.js"));
const Admin = lazy(() => import("../app/user-pages/admin/admin.js"));
const SubAdmin = lazy(() => import("../app/user-pages/admin/superAdmin.js"));
const AllAdmin = lazy(() => import("../app/user-pages/admin/all.js"));

const AllEmployee = lazy(() => import("../app/user-pages/hr/allEmployee.js"));
const Attendence = lazy(() => import("../app/user-pages/hr/attendence.js"));
const Department = lazy(() =>
  import("../app/user-pages/hr/department/department.js")
);
const NewDepartment = lazy(() =>
  import("../app/user-pages/hr/department/newDepartment.js")
);
const EmployeeLeave = lazy(() =>
  import("../app/user-pages/hr/holiday/employeeLeave.js")
);
const NewEmployeeLeave = lazy(() =>
  import("../app/user-pages/hr/holiday/newEmployeeLeave.js")
);
const Holidays = lazy(() => import("../app/user-pages/hr/holiday/holiday.js"));
const NewHoliday = lazy(() =>
  import("../app/user-pages/hr/holiday/newHoliday.js")
);

const Brand = lazy(() => import("../app/user-pages/catelogue/brand.js"));
const Category = lazy(() => import("../app/user-pages/catelogue/category.js"));
const Section = lazy(() => import("../app/user-pages/catelogue/section.js"));
const Food = lazy(() => import("../app/user-pages/catelogue/food.js"));

const CreateBrand = lazy(() =>
  import("../app/user-pages/catelogue/createBrand.js")
);
const EditBrand = lazy(() =>
  import("../app/user-pages/catelogue/editBrand.js")
);
const CreateCategory = lazy(() =>
  import("../app/user-pages/catelogue/createCategory.js")
);
const CreateSection = lazy(() =>
  import("../app/user-pages/catelogue/createSection.js")
);
const editSection = lazy(() =>
  import("../app/user-pages/catelogue/editSection.js")
);
const CreateFood = lazy(() =>
  import("../app/user-pages/catelogue/createFood.js")
);
const EditFood = lazy(() => import("../app/user-pages/catelogue/editFood.js"));
const QuickOrder = lazy(() => import("../app/user-pages/pos/quickOrder.js"));

const CustomerOrder = lazy(() =>
  import("../app/user-pages/order/customerOrder.js")
);

const NewWaste = lazy(() => import("../app/user-pages/waste/insert.js"));
const Waste = lazy(() => import("../app/user-pages/waste/waste.js"));

const Booking = lazy(() => import("../app/user-pages/booking/booking.js"));
const CreateBooking = lazy(() => import("../app/user-pages/booking/createBooking.js"));

const Restaurant = lazy(() => import("../app/user-pages/restaurant/restaurant.js"));
const NewRestaurant = lazy(() =>import("../app/user-pages/restaurant/newRestaurant.js"));
const EditRestaurant = lazy(() => import("../app/user-pages/restaurant/editRestaurant.js"));
const AllRestaurantBranches = lazy(() => import("../app/user-pages/restaurant/restaurantsBranches.js"));

const NewBranch = lazy(() =>import("../app/user-pages/restaurant/branch/newBranch.js"));
const AllBranch = lazy(() => import("../app/user-pages/restaurant/branch/allBranch.js"));
const EditBranch = lazy(() => import("../app/user-pages/restaurant/branch/editBranch"));

const RegisterEmployee = lazy(() =>
  import("../app/user-pages/registration/EmployeeRegistration.js")
);

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/login/login.js"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Homepage} />

          <Route exact path="/login" component={Login} />

          <Route path="/super-admin/super-admin" component={SuperAdmin} />
          <Route path="/super-admin/admin" component={Admin} />
          <Route path="/super-admin/all-admin" component={AllAdmin} />
          <Route path="/super-admin/sub-admin" component={SubAdmin} />

          <Route path="/catalogue/section" component={Section} />
          <Route path="/catalogue/create-section" component={CreateSection} />
          <Route path="/catalogue/edit-section/:id" component={editSection} />

          <Route path="/catalogue/category" component={Category} />
          <Route path="/catalogue/create-category" component={CreateCategory} />
          <Route path="/catalogue/brand" component={Brand} />
          <Route path="/catalogue/create-brand" component={CreateBrand} />
          <Route path="/catalogue/edit-brand/:id" component={EditBrand} />

          <Route path="/catalogue/food" component={Food} />
          <Route path="/catalogue/create-food" component={CreateFood} />
          <Route path="/catalogue/edit-food/:id" component={EditFood} />

          <Route path="/pos/quick-order" component={QuickOrder} />

          <Route path="/waste/all" component={Waste} />
          <Route path="/waste/new-waste" component={NewWaste} />

          <Route path="/booking/all" component={Booking} />
          <Route path="/booking/new-booking" component={CreateBooking} />

          <Route path="/restaurant/all" component={Restaurant} />
          <Route path="/restaurant/new-restaurant" component={NewRestaurant} />
          <Route path="/restaurant/edit-restaurant/:id" component={EditRestaurant} />
          <Route path="/restaurant/branchs/:restaurant_id" component={ AllRestaurantBranches } />

          <Route path="/branch/new-branch" component={ NewBranch } />
          <Route path="/branchs" component={AllBranch} />
          <Route path="/branch/edit-branch/:id" component={EditBranch} />

          <Route path="/hr/add-employee" component={RegisterEmployee} />
          <Route path="/hr/all-employee" component={AllEmployee} />
          <Route path="/hr/attendence" component={Attendence} />
          <Route path="/hr/department" component={Department} />
          <Route path="/hr/new-department" component={NewDepartment} />
          <Route path="/hr/holidays" component={Holidays} />
          <Route path="/hr/new-holiday" component={NewHoliday} />
          <Route path="/hr/leave" component={EmployeeLeave} />
          <Route path="/hr/new-leave" component={NewEmployeeLeave} />

          <Route path="/customer-order" component={CustomerOrder} />

          <Route
            path="/super-admin/employee/registration"
            component={RegisterEmployee}
          />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
