import { BrowserRouter } from 'react-router-dom'
import { CallbackProvider } from '@/features/callback'
import { CartProvider } from '@/features/cart'
import { AppRouter } from './router'

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <CallbackProvider>
          <AppRouter />
        </CallbackProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
