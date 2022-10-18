import business from './categories/business.json'
import coding from './categories/coding.json'
import cooking from './categories/cooking.json'
import crypto from './categories/crypto.json'
import culture from './categories/culture.json'
import gaming from './categories/gaming.json'
import health from './categories/health.json'
import investing from './categories/investing.json'
import life from './categories/life.json'
import politics from './categories/politics.json'
import productivity from './categories/productivity.json'
import technology from './categories/technology.json'

export const data = {
  cooking: [...new Set(cooking)],
  politics: [...new Set(politics)],
  life: [...new Set(life)],
  coding: [...new Set(coding)],
  business: [...new Set(business)],
  investing: [...new Set(investing)],
  crypto: [...new Set(crypto)],
  technology: [...new Set(technology)],
  health: [...new Set(health)],
  culture: [...new Set(culture)],
  gaming: [...new Set(gaming)],
  productivity: [...new Set(productivity)],
} as const
