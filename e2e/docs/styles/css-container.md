Check if the `@container` rule could be supported and minimized correctly.

<div class="container">

Container text

</div>

<style>
.container {
  container-type: inline-size;
}
.container p {
  font-size: clamp(.75rem, calc(100cqw / 40), 2rem);
  text-align: left;
}
@container (max-width: 480px) {
  .container p {
    text-align: center;
    font-weight: bold;
  }
}
</style>
