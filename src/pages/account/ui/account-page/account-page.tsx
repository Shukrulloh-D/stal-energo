import { useState } from 'react'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { OrdersHistory } from '../orders-history/orders-history'
import { ProfileForm } from '../profile-form/profile-form'
import './account-page.css'

export function AccountPage() {
  const [tab, setTab] = useState<'profile' | 'orders'>('profile')

  return (
    <div className="container account-page">
      <div className="account-page-head">
        <h1 className="page-title">Личный кабинет</h1>
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Личный кабинет' }]} />
      </div>

      <div className="account-page-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'profile'}
          className={tab === 'profile' ? 'account-tab account-tab-active' : 'account-tab'}
          onClick={() => setTab('profile')}
        >
          Редактировать профиль
        </button>
        <button
          role="tab"
          aria-selected={tab === 'orders'}
          className={tab === 'orders' ? 'account-tab account-tab-active' : 'account-tab'}
          onClick={() => setTab('orders')}
        >
          История заказов
        </button>
      </div>

      {tab === 'profile' ? <ProfileForm /> : <OrdersHistory />}
    </div>
  )
}
