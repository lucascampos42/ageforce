window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackTopButtonOnScroll()
}

function showNavOnScroll() {
  if (window.scrollY > 100) {
    $("#navigation").addClass("scroll")
  } else {
    $("#navigation").removeClass("scroll")
  }
}

function showBackTopButtonOnScroll() {
  if (window.scrollY > 600) {
    $('#backToTopButton').show(200)
  } else {
    $('#backToTopButton').hide(200)
  }
}

$(window).on("load", function(){
  $('#video').html(`
  <video width="848" height="480" class="embed-responsive-item" controls>
    <source src="./assets/video/madeireira_petyk.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  `)
});