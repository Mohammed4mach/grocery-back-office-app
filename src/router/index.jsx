import { createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  OrdersLayout,
} from "@/layouts";
import {
  DashboardPage,
  ProductsPage as DashboardProductsPage,
  AccountPage,
} from "@/pages";
import {
  OrdersPage,
  ShowPage as OrderShowPage,
} from "@/pages/orders";
import { AuthRoute, UnauthedRoute } from '@/routes';
import { FormLayout } from "@/layouts";
import {
  LoginPage,
  RegisterPage,
  EditPassword,
  CartPage,
} from "@/pages";
import {
  CreatePage as ProductCreatePage,
  EditPage as ProductEditPage,
} from "@/pages/products";
import {
  LandingPage,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <UnauthedRoute />,
    children: [
      {
        element: <FormLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,

        children: [
          {
            path: '',
            element: <DashboardPage />
          },
          {
            path: 'orders',
            element: <OrdersLayout />,
            children: [
              {
                path: '',
                element: <OrdersPage />,
              },
              {
                path: ':orderId',
                element: <OrderShowPage />,
              },
            ],
          },
          {
            path: 'products',
            element: <DashboardProductsPage />,
          },
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'my-account',
            element: <AccountPage />,
          },
        ],
      },
      {
        element: <FormLayout />,
        children: [
          {
            path: 'products/create',
            element: <ProductCreatePage />,
          },
          {
            path: 'products/:productId/edit',
            element: <ProductEditPage />,
          },
          {
            path: 'my-account/password/edit',
            element: <EditPassword />,
          },
        ]
      },
    ]
  },
]);

export default router;

