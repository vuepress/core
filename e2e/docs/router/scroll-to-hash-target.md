<header class="e2e-fixed-header">Fixed header</header>

## Hash Target

Target content

<div class="spacer"></div>

<style>
.spacer {
  height: 1000px;
}

/* mimic a theme with a fixed navbar: the header covers the top of the viewport,
   so a hash target must be kept clear of it by `scroll-margin-top` */
.e2e-fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  height: 100px;
  background: #f2f2f2;
}

#hash-target {
  /* keep the anchor target away from the top of the viewport, matching the
     height of the fixed header above */
  scroll-margin-top: 100px;
}
</style>
