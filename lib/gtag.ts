export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  ;(window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
    debug_event: process.env.NODE_ENV === 'production' ? undefined : '1',
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    debug_event: process.env.NODE_ENV === 'production' ? undefined : '1',
  })
}
