$(document).ready(function(){
  $('#sign-up').on('click', function(){
    $('.login-form').css('display', 'none');
    $('.sign-up-form').css('display', 'block');
  })

  $('#provide').on('click', function(){
    $('.provider').css('display', 'block');
  })

  $('#seek').on('click', function(){
    $('.provider').css('display', 'none');
  })
})
