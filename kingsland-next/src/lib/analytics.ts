// src/lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export const analytics = {
  whatsappClick: (productName?: string) =>
    trackEvent('whatsapp_click', {
      event_category: 'engagement',
      product_name: productName,
      method: 'whatsapp',
    }),
  phoneDialClick: () =>
    trackEvent('phone_dial', {
      event_category: 'engagement',
      phone: '+256757042420',
    }),
  emailClick: () =>
    trackEvent('email_click', {
      event_category: 'engagement',
      email: 'kingslanddistributors.ug@gmail.com',
    }),
  contactFormSubmit: () =>
    trackEvent('form_submit', {
      event_category: 'lead',
      form_name: 'contact_form',
    }),
  enquiryFormSubmit: (productName: string) =>
    trackEvent('form_submit', {
      event_category: 'lead',
      form_name: 'product_enquiry',
      product_name: productName,
    }),
  productView: (product: { id: number; name: string; category: string }) =>
    trackEvent('view_item', {
      currency: 'UGX',
      items: [
        {
          item_id: String(product.id),
          item_name: product.name,
          item_category: product.category,
        },
      ],
    }),
  addToCart: (product: {
    id: number
    name: string
    category: string
    price?: number
  }) =>
    trackEvent('add_to_cart', {
      currency: 'UGX',
      value: product.price,
      items: [
        {
          item_id: String(product.id),
          item_name: product.name,
          item_category: product.category,
        },
      ],
    }),
  categoryFilter: (category: string) =>
    trackEvent('select_content', {
      content_type: 'category',
      content_id: category,
    }),
  searchQuery: (query: string) =>
    trackEvent('search', { search_term: query }),
  pageNotFound: (path: string) =>
    trackEvent('page_not_found', {
      event_category: 'error',
      page_path: path,
    }),
  ageVerified: () =>
    trackEvent('age_gate_passed', { event_category: 'compliance' }),
  cookieConsent: (type: 'accepted' | 'rejected' | 'partial') =>
    trackEvent('cookie_consent', {
      event_category: 'compliance',
      consent_type: type,
    }),
}
