import { defineStore } from 'pinia'

export const useCustomerStore = defineStore({
  id: 'customers',
  state: () => ({
    customers: 'okay',
  }),

  actions: {
    resetCustomers() {
      this.customers = 'okay'
    },
  }
})
