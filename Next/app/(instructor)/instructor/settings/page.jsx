import React from 'react'
import Profile from './_component/Profile'
import SocialForm from './_component/SocialForm'
import PasswordForm from './_component/PasswordForm'
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Settings');
export default function Settings() {
  return (
    <div className="dashboard-body">
      <div className="dashboard-body-wrapper">
        <div className="container">
          <div className="row gy-4">
            <Profile />
            <SocialForm/>
            <PasswordForm/>

          </div>
        </div>
      </div>
    </div >
  )
}
