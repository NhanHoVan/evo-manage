import type { Role } from './login';
import type { Device } from '@/interface/layout/index.interface';
import type { MenuChild } from '@/interface/layout/menu.interface';

export type Locale = 'en_US' | 'vi_VN';

export interface UserState {
  username: string;
  menuList: MenuChild[];
  logged: boolean;
  role: Role;
  device: Device;
  collapsed: boolean;
  noticeCount: number;
  locale: Locale;
  newUser: boolean;
}
