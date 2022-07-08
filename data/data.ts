import { business } from "./categories/business";
import { coding } from "./categories/coding";
import { cooking } from "./categories/cooking";
import { crypto } from "./categories/crypto";
import { culture } from "./categories/culture";
import { gaming } from "./categories/gaming";
import { health } from "./categories/health";
import { investing } from "./categories/investing";
import { life } from "./categories/life";
import { politics } from "./categories/politics";
import { technology } from "./categories/technology";

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
} as const;
