import { Route, Routes } from "react-router-dom";
import { AboutPage } from "@/pages/about";
import { AccountPage } from "@/pages/account";
import { CategoryPage } from "@/pages/category";
import { DeliveryPage } from "@/pages/delivery";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { OrderPage } from "@/pages/order";
import { PriceListsPage } from "@/pages/price-lists";
import { ProductPage } from "@/pages/product";
import { ProductListPage } from "@/pages/product-list";
import { ServicesPage } from "@/pages/services";
import { Layout } from "./layout/layout";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog/:category" element={<CategoryPage />} />
        <Route path="/catalog/:category/:sub" element={<ProductListPage />} />
        <Route path="/search" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServicesPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/price-lists" element={<PriceListsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
