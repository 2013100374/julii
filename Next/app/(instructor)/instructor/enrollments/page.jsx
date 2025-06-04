
import React from 'react'
import PurchaseTable from './_component/PurchaseTable'
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Purchase History');
export default  function PurchaseHistory() {
 
  return (
    <PurchaseTable/>
  )
}
