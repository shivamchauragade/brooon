import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Users',
    href: '/user',
    icon: 'user',
    label: 'Users'
  },
  {
    title: 'Associations',
    href: '/association',
    icon: 'association',
    label: 'Associations'
  },
  {
    title: 'Log Out',
    href: '/login',
    icon: 'login',
    label: 'Login'
  }
];


export type User_data = {
  id: number;
  profile_pic: string;
  user_name: string | null;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  is_verified: boolean;
  gender: string;
  longitude: number;
  latitude: number;
  address: string;
  created_at:number;
  updated_at: number;
  total_properties: number;
  total_inquiries: number;
  association: string;
  association_info: {
    code: string;
    name: string;
    city: string;
    state: string | null;
    picture: string;
    status: boolean;
  };
};

export type Associations_data = {
    id: number;
    code: string;
    name: string;
    city: string;
    state: string ;
    picture: string;
    status: boolean;
    created_at: number,
    updated_at: number,
    total_members: number
  };

