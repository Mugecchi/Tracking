import Test from "./components/Test";
import UlapTax from "./components/UlapTax";
import DefaultLayout from "./layouts/DefaultLayout";
import ulapMotorcycleDeals from "./components/ulapMotorcycle";
const routes = [
  {
    path: "/",
    element: DefaultLayout,
    children: [
      {
        path: "test",
        element: Test,
      },
      {
        path: "ulaptax",
        element: UlapTax,
      },
      {
        path: "ulapMotorcycle",
        element: ulapMotorcycleDeals,
      },
    ],
  },
];

export default routes;
