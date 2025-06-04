import React from 'react'

import DeleteForm from './_component/DeleteForm';
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Delete Account');

export default function page() {
  return (
    <DeleteForm/>
  )
}
