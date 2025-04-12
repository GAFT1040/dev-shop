import Cart from "@/components/Cart";
import Header from "@/components/Header";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Cart />
    </div>
  );
}
