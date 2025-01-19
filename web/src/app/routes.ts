import { IconType } from 'react-icons';
import { FaPlus, FaUser } from 'react-icons/fa';

export type RouteType = {
  id: number;
  name: string;
  path: string;
  icon: IconType;
};

export const ROUTES: RouteType[] = [
  {
    id: 1,
    name: 'List',
    path: '/dashboard',
    icon: FaUser,
  },
  {
    id: 2,
    name: 'Create',
    path: '/dashboard/create',
    icon: FaPlus,
  },
];
