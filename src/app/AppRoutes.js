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

const AllOrder = lazy(() => import("../app/user-pages/order/allOrder.js"));

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

const Brand = lazy(() => import("../app/user-pages/catelogue/brand/brand.js"));
const CreateBrand = lazy(() =>
  import("../app/user-pages/catelogue/brand/createBrand.js")
);
const EditBrand = lazy(() =>
  import("../app/user-pages/catelogue/brand/editBrand.js")
);

const Category = lazy(() =>
  import("../app/user-pages/catelogue/category/category.js")
);
const CreateCategory = lazy(() =>
  import("../app/user-pages/catelogue/category/createCategory.js")
);

const Section = lazy(() =>
  import("../app/user-pages/catelogue/section/section.js")
);
const CreateSection = lazy(() =>
  import("../app/user-pages/catelogue/section/createSection.js")
);
const editSection = lazy(() =>
  import("../app/user-pages/catelogue/section/editSection.js")
);

const Food = lazy(() => import("../app/user-pages/catelogue/food/food.js"));
const CreateFood = lazy(() =>
  import("../app/user-pages/catelogue/food/createFood.js")
);
const EditFood = lazy(() =>
  import("../app/user-pages/catelogue/food/editFood.js")
);

const QuickOrder = lazy(() => import("../app/user-pages/pos/quickOrder.js"));

const CustomerOrder = lazy(() =>
  import("../app/user-pages/customer_order/customerOrder.js")
);

const NewWaste = lazy(() => import("../app/user-pages/waste/insert.js"));
const Waste = lazy(() => import("../app/user-pages/waste/waste.js"));
const EditWaste = lazy(() => import("../app/user-pages/waste/editWaste.js"));

const NewInventory = lazy(() => import("../app/user-pages/inventory/inventory/newInventory.js"));
const InventoryList = lazy(() => import("../app/user-pages/inventory/inventory/inventoryList.js"));

const Booking = lazy(() => import("../app/user-pages/booking/booking.js"));
const CreateBooking = lazy(() =>
  import("../app/user-pages/booking/createBooking.js")
);

const Restaurant = lazy(() =>
  import("../app/user-pages/restaurant/restaurant.js")
);
const NewRestaurant = lazy(() =>
  import("../app/user-pages/restaurant/newRestaurant.js")
);
const EditRestaurant = lazy(() =>
  import("../app/user-pages/restaurant/editRestaurant.js")
);
const AllRestaurantBranches = lazy(() =>
  import("../app/user-pages/restaurant/restaurantsBranches.js")
);

const NewBranch = lazy(() =>
  import("../app/user-pages/restaurant/branch/newBranch.js")
);
const AllBranch = lazy(() =>
  import("../app/user-pages/restaurant/branch/allBranch.js")
);
const EditBranch = lazy(() =>
  import("../app/user-pages/restaurant/branch/editBranch")
);
const FoodAdd = lazy(() =>
  import("../app/user-pages/restaurant/branch/foodAdd")
);

const NewRecipe = lazy(() => import("../app/user-pages/recipe/newRecipe.js"));

const Ingredient = lazy(() => import("../app/user-pages/inventory/ingredient/ingredient.js"));
const IngredientList = lazy(() => import("../app/user-pages/inventory/ingredient/ingredientList.js"));
const EditIngredient = lazy(() => import("../app/user-pages/inventory/ingredient/editIngredient.js"));


const NewSupplier = lazy(() => import("./user-pages/inventory/supplier/newSupplier.js"));
const AllSupplier = lazy(() => import("./user-pages/inventory/supplier/allSuppliers.js"));
const EditSupplier = lazy(() => import("./user-pages/inventory/supplier/editSupplier.js"));
const NewInvoice= lazy(() => import("./user-pages/inventory/invoice/newInvoice.js"));

const RegisterEmployee = lazy(() =>
  import("../app/user-pages/registration/EmployeeRegistration.js")
);

const NewDiscount = lazy(() =>
  import("../app/user-pages/discount/discount/newDiscount.js")
);
const AllDiscount = lazy(() =>
  import("../app/user-pages/discount/discount/allDiscount.js")
);
const EditDiscount = lazy(() =>
  import("../app/user-pages/discount/discount/editDiscount.js")
);

const NewCoupon = lazy(() =>
  import("../app/user-pages/discount/coupon/newCoupon.js")
);
const AllCoupon = lazy(() =>
  import("../app/user-pages/discount/coupon/allCoupon.js")
);
const EditCoupon = lazy(() =>
  import("../app/user-pages/discount/coupon/editCoupon.js")
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
          <Route path="/waste/edit-waste/:id" component={EditWaste} />

          <Route path="/recipe/new-recipe" component={NewRecipe} />

          <Route path="/booking/all" component={Booking} />
          <Route path="/booking/new-booking" component={CreateBooking} />

          <Route path="/restaurant/all" component={Restaurant} />
          <Route path="/restaurant/new-restaurant" component={NewRestaurant} />
          <Route
            path="/restaurant/edit-restaurant/:id"
            component={EditRestaurant}
          />
          <Route
            path="/restaurant/branchs/:restaurant_id"
            component={AllRestaurantBranches}
          />

          <Route path="/branch/new-branch" component={NewBranch} />
          <Route path="/branchs" component={AllBranch} />
          <Route path="/branch/edit-branch/:id" component={EditBranch} />
          <Route path="/branch/food-add" component={FoodAdd} />

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

          <Route path="/discount/new-discount" component={NewDiscount} />
          <Route path="/discount/all-discount" component={AllDiscount} />
          <Route path="/discount/edit-discount/:id" component={EditDiscount} />

          <Route path="/discount/coupon/new-coupon" component={NewCoupon} />
          <Route path="/discount/coupon/all-coupon" component={AllCoupon} />
          <Route
            path="/discount/coupon/edit-coupon/:id"
            component={EditCoupon}
          />

          <Route path="/order/all-order" component={AllOrder} />

          <Route
            path="/super-admin/employee/registration"
            component={RegisterEmployee}
          />

          <Route path="/inventory/new-inventory" component={NewInventory} />
          <Route path="/inventory/all-inventory" component={InventoryList} />

          <Route path="/inventory/ingredient" component={Ingredient} />
          <Route path="/inventory/ingredient-list" component={IngredientList} />
          <Route path="/inventory/edit-ingredient/:id" component={EditIngredient} />

          <Route path="/inventory/new-supplier" component={NewSupplier} />
          <Route path="/inventory/all-supplier/:id" component={AllSupplier} />
          <Route path="/inventory/edit-supplier/:id" component={EditSupplier} />
          <Route path="/inventory/new-invoice" component={NewInvoice} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
