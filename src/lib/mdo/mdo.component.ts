/* tslint:disable:max-line-length */
import { Component, Input, OnChanges } from '@angular/core';

import { getRepo, getUser } from '../util';

@Component({
  selector: 'mdo-github-button',
  template: `
    <div class="{{ mainButton }}">
      <a class="gh-btn" [href]="buttonHref" [target]="target" [attr.aria-label]="text + ' on GitHub'">
        <span class="gh-ico" aria-hidden="true"></span>
        <span class="gh-text">{{ text }}</span>
      </a>
      <ng-template [ngIf]="count && counter !== undefined">
        <mdo-counter
          [count]="counter"
          [large]="size === 'large'"
          [counterLabel]="counterLabel"
          [counterHref]="counterHref"
        ></mdo-counter>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .github-btn {
        display: inline-block;
        font: bold 11px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        height: 20px;
      }
      .gh-btn {
        padding: 2px 5px 2px 4px;
        color: #333;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 3px;
        background-color: #eee;
        background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#eeeeee', GradientType=0);
        background-repeat: no-repeat;
        border: 1px solid #d5d5d5;
        display: inline-block;
      }
      .gh-btn:hover,
      .gh-btn:focus {
        text-decoration: none;
        background-color: #ddd;
        background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd', GradientType=0);
        border-color: #ccc;
      }
      .gh-btn:active {
        background-image: none;
        background-color: #dcdcdc;
        border-color: #b5b5b5;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
      }
      .gh-ico {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 4px;
        margin-bottom: -3px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .github-btn-large {
        height: 32px;
      }
      .github-btn-large .gh-btn {
        padding: 4px 10px 4px 8px;
        font-size: 16px;
        line-height: 22px;
        border-radius: 4px;
      }
      .github-btn-large .gh-ico {
        width: 20px;
        height: 20px;
      }
    `,
  ],
})
export class MdoGithubButtonComponent implements OnChanges {
  /** GitHub username that owns the repo */
  @Input() user!: string;
  /** GitHub repository to pull the forks and watchers counts */
  @Input() repo!: string;
  /** Type of button to show */
  @Input() type: 'watch' | 'fork' | 'follow' | 'star' = 'star';
  /** Show the optional watchers or forks count */
  @Input() count = false;
  /** Optional flag for using a larger button */
  @Input() size: 'none' | 'large' = 'none';
  /** Specifies where to open the linked github URL. */
  @Input() target:
    '_blank'  // Opens the linked document in a new window or tab
  | '_self' // Opens the linked document in the same frame as it was clicked (this is default)
  | '_parent' //Opens the linked document in the parent frame
  | '_top'  // Opens the linked document in the full body of the window
  = '_self'
  text = '';
  mainButton = '';
  buttonHref = '';
  counterHref = '';
  counter?: number;
  counterLabel = '';
  countAttr = '';

  ngOnChanges() {
    this.buttonHref = 'https://github.com/' + this.user + '/' + this.repo + '/';
    let mainButton = this.size === 'large' ? 'github-btn github-btn-large' : 'github-btn';
    // Add the class, change the text label, set count link href
    switch (this.type) {
      case 'watch':
        mainButton += ' github-watchers';
        this.text = 'Watch';
        this.countAttr = 'subscribers_count';
        this.counterHref = 'https://github.com/' + this.user + '/' + this.repo + '/watchers';
        break;
      case 'star':
        mainButton += ' github-stargazers';
        this.text = 'Star';
        this.counterLabel = ' stargazers';
        this.countAttr = 'stargazers_count';
        this.counterLabel = ' watchers';
        this.counterHref = 'https://github.com/' + this.user + '/' + this.repo + '/stargazers';
        break;
      case 'fork':
        mainButton += ' github-forks';
        this.text = 'Fork';
        this.counterLabel = ' forks';
        this.countAttr = 'network_count';
        this.buttonHref = 'https://github.com/' + this.user + '/' + this.repo + '/fork';
        this.counterHref = 'https://github.com/' + this.user + '/' + this.repo + '/network';
        break;
      case 'follow':
        mainButton += ' github-me';
        this.text = 'Follow @' + this.user;
        this.counterLabel = ' followers';
        this.countAttr = 'followers';
        this.buttonHref = 'https://github.com/' + this.user;
        this.counterHref = 'https://github.com/' + this.user + '/followers';
        break;
    }
    this.mainButton = mainButton;
    if (this.count && this.user) {
      this.fetch();
    }
  }
  fetch() {
    let sub: Promise<any>;
    if (this.type === 'follow') {
      sub = getUser(this.user);
    } else {
      if (!this.repo) {
        return;
      }
      sub = getRepo(this.user, this.repo);
    }
    sub.then(d => this.callback(d));
  }
  callback(data: any) {
    this.counter = data[this.countAttr];
  }
}
