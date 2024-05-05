import { Injectable, signal } from '@angular/core';
import {
  NavButton,
  NavButtonObj,
  NavButtonObjState,
} from '@models/nav-button.model';

// Custom Icons
import {
  bellIcon,
  bellIconSolid,
  bookmarkIcon,
  bookmarkIconSolid,
  homeIcon,
  homeIconSolid,
  paperPlaneIcon,
  paperPlaneIconSolid,
  searchIcon,
  searchIconSolid,
} from '@components/svg-icon/icons';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  homeIcon: string = homeIcon;
  homeIconSolid: string = homeIconSolid;
  bellIcon: string = bellIcon;
  bellIconSolid: string = bellIconSolid;
  searchIcon: string = searchIcon;
  searchIconSolid: string = searchIconSolid;
  paperPlaneIcon: string = paperPlaneIcon;
  paperPlaneIconSolid: string = paperPlaneIconSolid;
  bookmarkIcon: string = bookmarkIcon;
  bookmarkIconSolid: string = bookmarkIconSolid;

  navState = signal<string>('home');
  iconState = signal<NavButtonObj[]>([
    {
      name: 'home',
      alias: 'home',
      path: '/',
      icon: this.homeIcon,
      iconSolid: this.homeIconSolid,
      iconSelected: true,
    },
    {
      name: 'search',
      alias: 'search',
      path: '/search',
      icon: this.searchIcon,
      iconSolid: this.searchIconSolid,
      iconSelected: false,
    },
    {
      name: 'notifications',
      alias: 'noti',
      path: '/notification',
      icon: this.bellIcon,
      iconSolid: this.bellIconSolid,
      iconSelected: false,
    },
    {
      name: 'message',
      alias: 'msg',
      path: '/message',
      icon: this.paperPlaneIcon,
      iconSolid: this.paperPlaneIconSolid,
      iconSelected: false,
    },
    {
      name: 'bookmark',
      alias: 'bookmark',
      path: '/bookmark',
      icon: this.bookmarkIcon,
      iconSolid: this.bookmarkIconSolid,
      iconSelected: false,
    },
  ]);
  filterState = signal<string>('highlights');
  notificationFilterState = signal<string>('all');
}
