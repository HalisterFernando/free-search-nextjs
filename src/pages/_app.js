import '@/styles/globals.css';
import ProductsProvider from '../context/ProductsProvider';

export default function App({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  );
}
