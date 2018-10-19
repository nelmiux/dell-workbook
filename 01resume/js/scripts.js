$(document).ready(function() {
  /*============================================
	Page Preloader
	==============================================*/

  $(window).load(function() {
    $('#page-loader').fadeOut(500, function() {});
  });

  /*============================================
	Header
	==============================================*/

  $('#home').height($(window).height() + 50);

  $.backstretch('images/header-bg.jpg');

  $(window).scroll(function() {
    var st = $(this).scrollTop(),
      wh = $(window).height(),
      sf = 1 + st / (10 * wh);

    $('.backstretch img').css({
      transform: 'scale(' + sf + ')',
      '-webkit-transform': 'scale(' + sf + ')'
    });

    $('#home .container').css({ opacity: 1.6 - st / 400 });

    if ($(window).scrollTop() > $(window).height() + 50) {
      $('.backstretch').hide();
    } else {
      $('.backstretch').show();
    }
  });

  var st = $(this).scrollTop(),
    wh = $(window).height(),
    sf = 1 + st / (10 * wh);

  $('.backstretch img').css({
    transform: 'scale(' + sf + ')',
    '-webkit-transform': 'scale(' + sf + ')'
  });

  $('#home .container').css({ opacity: 1.6 - st / 400 });

  /*============================================
	Navigation Bar
	==============================================*/
  if ($(window).scrollTop() < $(window).height() - 35) {
    $('#main-nav').removeClass('scrolled');
  } else {
    $('#main-nav').addClass('scrolled');
  }

  $(window).scroll(function() {
    if ($(window).scrollTop() < $(window).height() - 35) {
      $('#main-nav').removeClass('scrolled');
    } else {
      $('#main-nav').addClass('scrolled');
    }
  });

  /*============================================
	Navigation Links
	==============================================*/
  $('#main-nav a').click(function() {
    element = $(this).attr('href');
    $('html, body').animate(
      {
        scrollTop: $(element).offset().top - 30
      },
      1000
    );
    if ($('#site-nav').is(':visible') && $(window).width() < 769) {
      $('.navbar-toggle').trigger('click');
    }
    return false;
  });

  /*============================================
    Skills
    ==============================================*/
  var colorval = $('.hello h1').css('backgroundColor');
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete parts[0];
  for (var i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length == 1) parts[i] = '0' + parts[i];
  }
  color = '#' + parts.join('');

  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  var distance = $('.chart').offset().top - $(window).height() + 100,
    $window = $(window);

  $window.scroll(function() {
    if ($window.scrollTop() >= distance) {
      $('.chart').easyPieChart({
        animate: 2000,
        scaleColor: false,
        trackColor: '#fff',
        barColor: color,
        lineWidth: 14,
        size: 175,
        onStep: function(from, to, percent) {
          $(this.el)
            .find('.percent')
            .text(Math.round(percent));
        }
      });
    }
  });

  /*============================================
	Project thumbs
	==============================================*/
  $(window).load(function() {
    $('#projects-container').css({ visibility: 'visible' });

    $('#projects-container').masonry({
      itemSelector: '.project-item:not(.filtered)',
      columnWidth: 350,
      isFitWidth: true,
      isResizable: true,
      isAnimated: !Modernizr.csstransitions,
      gutterWidth: 25
    });
  });

  /*============================================
	Filter Projects
	==============================================*/
  $('#filter-works a').click(function(e) {
    e.preventDefault();

    $('#filter-works li').removeClass('active');
    $(this)
      .parent('li')
      .addClass('active');

    var category = $(this).attr('data-filter');

    $('.project-item').each(function() {
      if ($(this).is(category)) {
        $(this).removeClass('filtered');
      } else {
        $(this).addClass('filtered');
      }

      $('#projects-container').masonry('reload');
    });
  });
});
