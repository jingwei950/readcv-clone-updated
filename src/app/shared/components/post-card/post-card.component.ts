// Angular imports
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Components
import { AvatarComponent } from '../avatar/avatar.component';

// Models
import { Post } from '@models/post.model';
import { PostUser } from '@models/user.model';
import { PostButtonObj } from '@models/nav-button.model';

// Pipes
import { DateAsAgoPipe } from '../../pipes/date-as-ago.pipe';

// Icons
import {
  bookmarkIcon,
  commentIcon,
  ellipsisIcon,
  heartIcon,
  repostIcon,
} from '@components/svg-icon/icons';

// Spartan-ng imports
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuGroupComponent,
  HlmMenuItemSubIndicatorComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { SvgIconComponent } from '@components/svg-icon/svg-icon.component';

@Component({
  selector: 'App-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DateAsAgoPipe,
    AvatarComponent,
    HlmButtonDirective,
    SvgIconComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
    HlmMenuItemSubIndicatorComponent,
    HlmSubMenuComponent,
  ],
})
export class PostCardComponent {
  // Input
  post = input.required<Post>();

  // Icons
  // commentIcon: PostButton = commentIcon;
  // repostIcon: PostButton = repostIcon;
  // heartIcon: PostButton = heartIcon;
  // ellipsisIcon: PostButton = ellipsisIcon;

  commentIcon = commentIcon;
  repostIcon = repostIcon;
  heartIcon = heartIcon;
  ellipsisIcon = ellipsisIcon;
  bookmarkIcon = bookmarkIcon;

  postIcons?: PostButtonObj[];
  user?: PostUser;

  ngOnInit() {
    if (this.post()) {
      this.user = {
        name: this.post().name,
        username: this.post().username,
        avatar: this.post().avatar,
      };
    }
    // Post buttons
    this.postIcons = [
      {
        name: 'comment',
        alias: 'comment',
        commentCount: this.post()?.commentCount,
        path: '',
        icon: this.commentIcon,
      },
      {
        name: 'repost',
        alias: 'repost',
        repostCount: this.post()?.repostCount,
        icon: this.repostIcon,
      },
      {
        name: 'like',
        alias: 'like',
        likeCount: this.post()?.likeCount,
        icon: this.heartIcon,
      },
      {
        name: 'bookmark',
        alias: 'bookmark',
        icon: this.bookmarkIcon,
      },
    ];
  }

  addBookmark() {
    console.log('add bookmark clicked');
  }

  copyLink() {
    console.log('copy link');
  }
}
