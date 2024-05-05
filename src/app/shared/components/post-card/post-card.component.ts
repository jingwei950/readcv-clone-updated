// Angular imports
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Components
import { AvatarComponent } from '../avatar/avatar.component';

// Models
import { PostButton, PostButtonObj } from '@models/nav-button.model';
import { Post } from '@models/post.model';

// Pipes
import { DateAsAgoPipe } from '../../pipes/date-as-ago.pipe';

// Icons
import commentIcon from '@svg/comment-icon';
import repostIcon from '@svg/repost-icon';
import heartIcon from '@svg/heart-icon';

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
import { PostUser } from '@models/user.model';
import { SvgIconComponent } from '@components/svg-icon/svg-icon.component';
import { ellipsisIcon } from '@components/svg-icon/icons';

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
  commentIcon: PostButton = commentIcon;
  repostIcon: PostButton = repostIcon;
  heartIcon: PostButton = heartIcon;
  // ellipsisIcon: PostButton = ellipsisIcon;

  ellipsisIcon = ellipsisIcon;

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
    ];
  }

  addBookmark() {
    console.log('add bookmark clicked');
  }

  copyLink() {
    console.log('copy link');
  }
}
