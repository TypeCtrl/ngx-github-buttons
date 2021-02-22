/* tslint:disable:max-line-length */
import { Component, Input, OnChanges } from '@angular/core';

import { getRepo, getUser } from '../util';

@Component({
  selector: 'gh-button',
  template: `
    <div>
      <a [href]="buttonHref" class="gh-btn" [attr.aria-label]="text + ' on GitHub'"
      [target]="target">
        <svg
          version="1.1"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          class="gh-octicon"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
          ></path>
        </svg>
        <span> {{ text }}</span>
      </a>
      <ng-template [ngIf]="count && counter !== undefined">
        <gh-counter
          [count]="counter"
          [counterLabel]="counterLabel"
          [counterHref]="counterHref"
        ></gh-counter>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .gh-btn {
        display: inline-block;
        list-style-type: none;
        tab-size: 4 !important;
        box-sizing: border-box;
        font: inherit;
        margin: 0;
        overflow: visible;
        text-transform: none;
        font-family: inherit;
        position: relative;
        font-weight: 500;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        border: 1px solid;
        border-radius: 6px;
        -webkit-appearance: none;
        color: #24292e;
        border-color: rgba(27, 31, 35, 0.15);
        padding: 3px 12px;
        font-size: 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fafbfc;
        transition: none;
        z-index: 1;
        outline: none;
        box-shadow: none;
      }
      .gh-btn:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .gh-btn:hover {
        text-decoration: none;
        background-color: #f3f4f6;
        transition-duration: 0.1s;
      }
      .gh-btn:focus {
        border-color: rgba(27, 31, 35, 0.2);
      }
      .gh-btn:active {
        background-color: #e9ecef;
        background-image: none;
      }
      .gh-octicon {
        list-style-type: none;
        font: inherit;
        text-transform: none;
        font-family: inherit;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        font-size: 12px;
        line-height: 20px;
        tab-size: 4 !important;
        height: 16;
        width: 16;
        box-sizing: border-box;
        display: inline-block;
        fill: currentColor;
        overflow: hidden;
        color: #6a737d;
        vertical-align: text-top;
        margin-right: 0;
      }
    `,
  ],
})
export class GhButtonComponent implements OnChanges {
  /** GitHub username that owns the repo */
  @Input() user!: string;
  /** GitHub repository to pull the forks and watchers counts */
  @Input() repo!: string;
  /** Type of button to show */
  @Input() type: 'follow' | 'watch' | 'star' | 'fork' | 'issue' | 'download' = 'star';
  /** Show the optional watchers or forks count */
  @Input() count = false;
  /** Use the github logo as the icon */
  @Input() standardIcon = false;
  /** Specifies where to open the linked github URL. */
  @Input() target:
    '_blank'  // Opens the linked document in a new window or tab
  | '_self' // Opens the linked document in the same frame as it was clicked (this is default)
  | '_parent' //Opens the linked document in the parent frame
  | '_top'  // Opens the linked document in the full body of the window
  = '_self'
  text = '';
  buttonHref = '';
  counterHref = '';
  counter?: number;
  counterLabel = '';
  countAttr = '';

  ngOnChanges() {
    this.text = 'Star';
    this.countAttr = 'stargazers_count';
    this.counterLabel = ' stargazers';
    this.buttonHref = 'https://github.com/' + this.user + '/' + this.repo;
    this.counterHref = 'https://github.com/' + this.user + '/' + this.repo + '/stargazers';

    if (this.count && this.user && this.type !== 'download') {
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
    this.counter = data[this.countAttr ?? ''];
  }
}
