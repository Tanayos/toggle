(function ($) {
$(document).ready(function(){
  $('.article-box').each(function() {
    var title = $(this).find('h2').html()
    var subtitle = $(this).find('h3').html()
    var text = ''
    $(this).find('p').each(function() {
      text += this.outerHTML
    })

    if (subtitle !== undefined) {
      $('<div class="asset toggle"><div class="toggle-visible"><h2 class="title">' + title + '</h2><h3 class="subtitle">' + subtitle + '</h3></div><div class="toggle-hidden">' + text + '</div></div>').insertBefore('.article-text > p:first')
    }
    else {
      $('<div class="asset toggle"><div class="toggle-visible"><h2 class="title">' + title + '</h2></div><div class="toggle-hidden">' + text + '</div></div>').insertBefore('.article-text > p:first')

    }
  })

  $('.toggle-visible').click(function() {
    $(this).parent().toggleClass('active')
  })
})
})(jQuery);
