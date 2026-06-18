const WORDS = [
  'yer','xghh','opp','lan','miv','kex','juv','zap','qol','bix',
  'duv','gew','hup','jil','kob','lun','maj','nep','pov','qir',
  'rox','sul','tam','vub','wel','yod','zin','cav','dib','fok',
  'gul','hef','iro','jek','kix','laz','mox','nud','pel','qum',
  'rit','sev','toc','vix','wub','xal','yeb','zup','cri','fap',
  'gip','hob','jex','kiv','lof','muv','nob','pib','rel','ruv',
]

function pick() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export function generateJitsiLink(): string {
  const room = `${pick()}-${pick()}-${pick()}`
  return `https://meet.jit.si/${room}`
}
