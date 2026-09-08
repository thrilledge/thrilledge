import { NextResponse } from 'next/server'
import { getMonthlyLimits } from '@/lib/usage'

export async function GET() {
  return NextResponse.json({
    plan: 'free',
    usage: {},
    limits: getMonthlyLimits('free'),
  })
}