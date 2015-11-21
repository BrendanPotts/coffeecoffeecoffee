* {
  background: transparent !important;
  color: #000 !important;
  /* Black prints faster: h5bp.com/s */
  box-shadow: none !important;
  text-shadow: none !important; }

a,
a:visited {
  text-decoration: underline; }

body > div.container a[href]:after {
  content: " (" attr(href) ")"; }
body > div.container abbr[title]:after {
  content: " (" attr(title) ")"; }

/*
 * Don't show links for images, or javascript/internal links
 */
.ir a:after,
a[href^="javascript:"]:after,
a[href^="#"]:after {
  content: ""; }

pre,
blockquote {
  border: 1px solid #999;
  page-break-inside: avoid; }

thead {
  display: table-header-group;
  /* h5bp.com/t */ }

tr,
img {
  page-break-inside: avoid; }

img {
  max-width: 100% !important; }

@page {
  margin: 0.5cm; }

p,
h2,
h3 {
  orphans: 3;
  widows: 3; }

h2,
h3 {
  page-break-after: avoid; }

#menu_container {
  display: none; }

footer .upper-footer {
  display: none; }

.modal-box, #search-field, #article_search {
  display: none; }

#article_sidebar {
  display: none; }

.span-9[role="main"] {
  width: 100%; }

.demo-container #slider, .demo-container .hidden-logo, .demo-container .iframe-container {
  display: none; }
.demo-container:after {
  content: "Check this page on a computer for a cool demo!"; }

#forum-settings, #thread_reply, #footer_paginator, .forum-sidebar, #admin_tools_container, #forum-breadcrumbs, .post-anchor {
  display: none; }

.span-9[role="main"] {
  width: 100%; }

.postmeta a[href]:after, .usermeta a[href]:after {
  content: none !important; }
.postmeta abbr[title]:after, .usermeta abbr[title]:after {
  content: none !important; }