const MONTHLY_LIMITS: Record<string, number> = {
  proposal: 20,
  'cold-email': 20,
  'cold-call': 20,
}

export function getMonthlyLimits(_plan = 'free'): Record<string, number> {
  return { ...MONTHLY_LIMITS }
}

export { MONTHLY_LIMITS }