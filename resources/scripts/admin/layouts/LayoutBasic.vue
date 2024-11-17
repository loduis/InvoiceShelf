<template>
  <div v-if="isAppLoaded" class="h-full">
    <NotificationRoot />

    <SiteHeader />

    <SiteSidebar />

    <ExchangeRateBulkUpdateModal />

    <main
      class="h-screen h-screen-ios overflow-y-auto md:pl-56 xl:pl-64 min-h-0"
    >
      <div class="pt-16 pb-16">
        <router-view />
      </div>
    </main>
  </div>

  <BaseGlobalLoader v-else />
</template>

<script setup>
import { useGlobalStore } from '@/scripts/admin/stores/global'
import { onMounted, computed } from 'vue'
import { useModalStore } from '@/scripts/stores/modal'
import { useExchangeRateStore } from '@/scripts/admin/stores/exchange-rate'
import { useCompanyStore } from '@/scripts/admin/stores/company'

import SiteHeader from '@/scripts/admin/layouts/partials/TheSiteHeader.vue'
import SiteSidebar from '@/scripts/admin/layouts/partials/TheSiteSidebar.vue'
import NotificationRoot from '@/scripts/components/notifications/NotificationRoot.vue'
import ExchangeRateBulkUpdateModal from '@/scripts/admin/components/modal-components/ExchangeRateBulkUpdateModal.vue'

const globalStore = useGlobalStore()
const modalStore = useModalStore()
const exchangeRateStore = useExchangeRateStore()
const companyStore = useCompanyStore()

const isAppLoaded = computed(() => {
  return globalStore.isAppLoaded
})

onMounted(() => {
  if (companyStore.selectedCompanySettings.bulk_exchange_rate_configured === 'NO') {
    exchangeRateStore.fetchBulkCurrencies().then((res) => {
      if (res.data.currencies.length) {
        modalStore.openModal({
          componentName: 'ExchangeRateBulkUpdateModal',
          size: 'sm',
        })
      } else {
        let data = {
          settings: {
            bulk_exchange_rate_configured: 'YES',
          },
        }
        companyStore.updateCompanySettings({
          data,
        })
      }
    })
  }
})
</script>
