import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <Header />
      <Products />
      <Footer />
    </main>
  );
}
