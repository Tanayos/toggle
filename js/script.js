$(document).ready(function(){

  var cssFile = '<style type="text/css">@import url(//courriermedias.courrierinternational.com/assets/list/toggle/css/toggleAsset.css);</style>'
  var jsFile = '<script src="//courriermedias.courrierinternational.com/assets/list/toggle/js/toggleAsset.js"></script>'

  // fonction pour filtrer des éléments
  var removeElements = function(text, selector) {
    var wrapped = $("<div>" + text + "</div>");
    wrapped.find(selector).remove();
    return wrapped.html();
  }

  // Bind de tous les click nécessaires
  $('.container').on('click', '.add-submit', function(){
    var title = $('.add-title').val()
    var intro = $('.add-intro').val()
    var text = $('.add-text').html()
    //var text = $('.add-text').val().replace(/\n/g, '<br />')

    if ((title !== '') && (text !== '')) {
      if (intro !== '') {
        var toggle = '<div class="toggle"><div class="toggle-delete"></div><div class="toggle-edit"></div><div class="toggle-visible"><div class="title">' + title + '</div><div class="intro">' + intro + '</div></div><div class="toggle-hidden">' + text + '</div></div>'
      }
      else {
        var toggle = '<div class="toggle"><div class="toggle-delete"></div><div class="toggle-edit"></div><div class="toggle-visible"><div class="title">' + title + '</div></div><div class="toggle-hidden">' + text + '</div></div>'
      }
      $(toggle).appendTo('.asset-preview')
      $('.asset-code').text(cssFile + jsFile + removeElements(removeElements($('.asset-preview').html(), '.toggle-edit'), '.toggle-delete'))
      $('.add-title, .add-intro').val('')
      $('.add-text').html('')
    }
  })
  .on('click', '.toggle-delete', function(){
    $(this).parent().remove()
    $('.asset-code').text(cssFile + jsFile + removeElements(removeElements($('.asset-preview').html(), '.toggle-edit'), '.toggle-delete'))
  })
  .on('click', '.toggle-edit', function(){
    var editTitle = $(this).parent().find('.title').text()
    if ($(this).parent().find('.intro')) {
      var editIntro = $(this).parent().find('.intro').text()
    }
    else {
      var editIntro = ''
    }    
    var editText = $(this).parent().find('.toggle-hidden').html()

    $('.add-title').val(editTitle)
    $('.add-intro').val(editIntro)
    $('.add-text').html(editText)

    $(this).parent().remove()
    $('.asset-code').text(cssFile + jsFile + removeElements(removeElements($('.asset-preview').html(), '.toggle-edit'), '.toggle-delete'))
  })
  .on('click', '.toggle-visible', function(){
    $(this).parent().toggleClass('active')
  })

  // Wysiwyg
  var editor = new wysihtml.Editor("textarea", {
    toolbar:        "toolbar",
    parserRules:    wysihtmlParserRules,
    useLineBreaks:  false
  })

  // Changer ordre des tiroirs
  $('.asset-preview').sortable({
    update: function( event, ui ) {
      $('.toggle').removeAttr('style')
      $('.asset-code').text(cssFile + jsFile + removeElements($('.asset-preview').html(), '.toggle-delete'))
    }
  })

}) 
