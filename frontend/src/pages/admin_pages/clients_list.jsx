import React from 'react'
import AdminDashboard from './admin_dashboard'
import ClientListing from '../../components/client_components/ClientList'

export default function ClientsList() {
  return (
      <AdminDashboard>
        <ClientListing/>
    </AdminDashboard>
  )
}
