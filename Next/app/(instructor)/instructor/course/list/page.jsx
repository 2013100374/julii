import { getMetaTitle } from '@/lib/helpers';
import CourseList from './CourseList';

export const metadata = getMetaTitle('Course List');

export default function List() {
  
  return (
    <CourseList />
  )
}
