import React from 'react'
import OverviewTable from './_component/OverviewTable'
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Student Overview');

export default function page() {
    return (
        <OverviewTable />
    )
}
