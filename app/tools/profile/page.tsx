import type { Metadata } from 'next'
import { ProfilePageClient } from './profile-client'

export const metadata: Metadata = {
  title: 'Profile Settings | Freelancer Toolkit | Thrill Edge Technologies',
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] py-8">
      <div className="max-w-360 mx-auto px-4">
        <ProfilePageClient />
      </div>
    </div>
  )
}
