import { Environment, LogLevel, Paddle as PaddleSDK } from '@paddle/paddle-node-sdk'

function getPaddle() {
  const apiKey = process.env.PADDLE_API_KEY
  if (!apiKey || apiKey === 'placeholder_paddle_api_key') {
    return null
  }

  return new PaddleSDK(apiKey, {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
      ? Environment.production
      : Environment.sandbox,
    logLevel: LogLevel.warn,
  })
}

export { getPaddle }
