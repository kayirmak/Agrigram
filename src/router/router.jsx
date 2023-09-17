import { createBrowserRouter } from "react-router-dom";

import Authorization from "../components/Authorization/Authorization";
import Register from "../components/Authorization/Register";
import EmptyProfile from "../components/Authorization/EmptyProfile";

import DeleteAccount from "../components/Profile/DeleteAccount";
import Languages from "../components/Profile/Languages";
import MyBonus from "../components/Profile/MyBonus";
import MyData from "../components/Profile/MyData";
import MyHistory from "../components/Profile/MyHistory";
import Notifications from "../components/Profile/Notifications";
import PrivacyPolicy from "../components/Profile/PrivacyPolicy";
import Questions from "../components/Profile/Questions";
import UserAgreement from "../components/Profile/UserAgreement";
import CartPage from "../pages/CartPage";
import FavoritePage from "../pages/FavoritePage";
import Main from "../pages/Main";
import MainLayout from "../layouts/MainLayout";
import ProfilePage from "../pages/ProfilePage";
import SingleCardPage from "../pages/SingleCardPage";
import SingleCategoryPage from "../pages/SingleCategoryPage";
import SingleStorePage from "../pages/SingleStorePage";
import StoresPage from "../pages/StoresPage";
import WelcomeLayout from "../layouts/WelcomeLayout";
import RequireAuth from "../hoc/RequireAuth";
import SearchPage from "../pages/SearchPage";
import AllCategoriesPage from "../pages/AllCategoriesPage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactsPage from "../pages/ContactsPage";
import ForgotPassword from "../components/Authorization/ForgotPassword";
import Verification from "../components/Authorization/Verification";
import NewPassword from "../components/Authorization/NewPassword";
import Сonfirmation from "../components/Authorization/Confirmation";
import RequireCart from "../hoc/RequireCart";
import Checkout from "../components/Cart/Checkout";
import Confirm from "../components/Cart/Confirm";
import Completed from "../components/Cart/Completed";
import TechnicalSupport from "../pages/TechnicalSupport";
import UserAgreementPage from "../pages/UserAgreement";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import ServicePage from "../pages/ServicePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "service",
        element: <ServicePage />,
      },
      {
        path: "search-product",
        element: <SearchPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "category",
        element: <AllCategoriesPage />,
      },
      {
        path: "category/:categoryId",
        element: <SingleCategoryPage />,
      },
      {
        path: "products/:productId",
        element: <SingleCardPage />,
      },
      {
        path: "stores",
        element: <StoresPage />,
      },
      {
        path: "stores/:storeId",
        element: <SingleStorePage />,
      },
      {
        path: "stores/apple",
        element: <SingleStorePage />,
      },
      {
        path: "wish-list",
        element: <FavoritePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "technical-support",
        element: <TechnicalSupport />,
      },
      {
        path: "user-agreement-page",
        element: <UserAgreementPage />,
      },
      {
        path: "privacy-policy-page",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "checkout",
        element: <RequireCart />,
        children: [
          {
            index: true,
            element: <Checkout />,
          },
          {
            path: "confirm",
            element: <Confirm />,
          },
          {
            path: "completed",
            element: <Completed />,
          },
          {
            path: "my-data",
            element: <MyData />,
          },
        ],
      },
      {
        path: "profile",
        element: <RequireAuth />,
        children: [
          {
            element: <ProfilePage />,
            children: [
              {
                path: "my-data",
                element: <MyData />,
              },
              {
                path: "my-bonus",
                element: <MyBonus />,
              },
              {
                path: "my-history",
                element: <MyHistory />,
              },
              {
                path: "settings/notifications",
                element: <Notifications />,
              },
              {
                path: "settings/spoken-language",
                element: <Languages />,
              },
              {
                path: "settings/clarity",
                element: <Questions />,
              },
              {
                path: "settings/delete-account",
                element: <DeleteAccount />,
              },
              {
                path: "user-agreement",
                element: <UserAgreement />,
              },
              {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <WelcomeLayout />,
        children: [
          {
            index: true,
            element: <EmptyProfile />,
          },
          {
            path: "sign-in",
            element: <Authorization />,
          },
          {
            path: "sign-up",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "verification",
            element: <Verification />,
          },
          {
            path: "new-password",
            element: <NewPassword />,
          },
          {
            path: "confirmation",
            element: <Сonfirmation />,
          },
        ],
      },
    ],
  },
]);

export default router;
