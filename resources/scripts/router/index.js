import { createRouter, createWebHistory } from 'vue-router'
import { loadLocale, includes } from '@/scripts/i18n'
import { useUserStore } from '@/scripts/admin/stores/user'
import Ls from '@/scripts/services/ls.js'
import { useGlobalStore as customerStore } from '@/scripts/customer/stores/global'
import { useGlobalStore as adminStore } from '@/scripts/admin/stores/global'

//admin routes
import AdminRoutes from '@/scripts/admin/admin-router'
//  Customers routes
import CustomerRoutes from '@/scripts/customer/customer-router'
//Payment Routes

let routes = []
routes = routes.concat(AdminRoutes, CustomerRoutes)

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

async function localeFromNavigator(langDef) {
  let lang = Ls.get('selectedLocale') || navigator.language;
  if (!includes(lang)) {
    lang = lang.includes('-') ? lang.split('-')[0] : null;
    if (!includes(lang)) {
      lang = langDef;
    }
  }
  await loadLocale(lang)
}

function getGlobalStore(isCustomer) {
  const store = isCustomer ? customerStore : adminStore;
  return store()
  getGlobalStore = store
}

router.beforeEach(async (to, from, next) => {
  const { ability, requiresAuth, isOwner, isCustomer } = to.meta
  const userStore = useUserStore()
  const globalStore = getGlobalStore(isCustomer)
  if (!globalStore.isAppLoaded) {
    if (requiresAuth) {
      const { data } = await globalStore.bootstrap(to.params.company)
      const language = isCustomer ?
        data.meta.current_company_language :
        data.current_user_settings.language
      await loadLocale(language, true)
    } else {
      await localeFromNavigator('en', globalStore)
    }
  }
  if (globalStore.isAppLoaded) {
    if (requiresAuth && ability && !userStore.hasAbilities(ability)) {
      return next({ name: 'account.settings' })
    } else if (isOwner && !userStore.currentUser.is_owner) {
      return next({ name: 'dashboard' })
    }
  }
  next()
})

export default router
