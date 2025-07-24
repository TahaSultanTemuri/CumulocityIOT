import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    A <b><a href="https://www.mazikglobal.com/" target="_blank">MazikGlobal</a></b> Product {{date}} All rights reserved.
     </span>
    <div class="socials">
     
      <a href="https://www.facebook.com/mazikglobalpakistan/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/mazikglobalinc?lang=en" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/mazik-global?originalSubdomain=pk" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {

  date = (new Date()).getFullYear();
}
