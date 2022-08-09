import { html } from '../lib.js';


export const spinner = () => html`
<div class="spring-spinner">
  <div class="spring-spinner-part top">
    <div class="spring-spinner-rotator"></div>
  </div>
  <div class="spring-spinner-part bottom">
    <div class="spring-spinner-rotator"></div>
  </div>
</div>`;