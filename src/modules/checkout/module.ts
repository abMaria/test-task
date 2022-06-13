import type { Module } from "@/lib/modules";

const checkout: Module = {
  routes: [
    {
      path: "/checkout",
      component: () =>
        import(
          /* webpackChunkName: "auth" */ "@/modules/checkout/views/Checkout.vue"
        ),
      children: [
        {
          name: "checkout",
          path: "",
          component: () =>
            import(
              /* webpackChunkName: "auth" */ "@/modules/checkout/views/CheckoutIndex.vue"
            ),
        },
      ],
    },
  ],
};

export default checkout;
