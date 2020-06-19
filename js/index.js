
var userAgent = window.navigator.userAgent;
var isMobile
if (userAgent.toLowerCase().match('ipad') || userAgent.toLowerCase().match('mobile')) {
  isMobile = true;
}
var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
var LBT

$(function () {
  $('.loading').fadeOut(500)

  var playGame = document.getElementById("playGame")
  
  var gameBox = $('.gameBox')
  var makeWish = $('.make_wish')
  var gobackBtn = $('.goback_btn')
  // ----------------------------------//
  makeWish.on('click', function(){
    gobackBtn.show()
    gameReset()
    playGame.volume = 0.5;
    playGame.play()
    gameBox.fadeIn(300)
    header.addClass('nowPlay')
    init_fire(1);
    init(0)
    init_nofire(0)
    // $(this).hide()
  })
  gobackBtn.on('click', function(){
    createjs.Ticker._inited = false;
    createjs.Ticker.init();
    createjs.Ticker.reset()
    $('header').removeClass('nowPlay')
    $('.gameBox').stop(true).fadeOut(250)
    document.getElementById("playGame").pause()
    init_fire(0)
  })

  // ----------------------------------//
  if (!isMobile) {
    var s = skrollr.init()
  } else {
    $('body').addClass('isMobile')
  }
  var navli = $('nav li')
  var navA = $('nav a')
  var header = $('header')
  var wrapper = $('.wrapper')
  var cake = $('.cake')
  var scrollImg = $('.scrollImg')
  var kv = $('.kv')
  var bgA = $('.bg_a')
  var bgB = $('.bg_b')
  var bgC = $('.bg_c')
  var anim03 = $('#anim03')
  var nonCube = $('.nonCube')
  var atBottom
  $(window).on('scroll', function (e) {
    var sT = $(window).scrollTop()
    var wrpH = wrapper.height()
    var winH = $(window).height()
    atBottom = sT + winH * 0.8
    if (atBottom > ($('body').height() - winH * 0.4) && !scrollImg.hasClass('hide')) {
      scrollImg.addClass('hide')
    } else if (sT + winH >= $('body').height() - 100 && !scrollImg.hasClass('hide')) {
      scrollImg.addClass('hide')
    } else if (sT + winH <= ($('body').height() - winH * 0.4)) {
      scrollImg.removeClass('hide')
    }


    // console.log(sT)
    if (sT > 50 && !header.hasClass('noTop')) {
      header.addClass('noTop')
    } else if (sT <= 50 && header.hasClass('noTop')) {
      header.removeClass('noTop')
    }
    if (!isMobile) {
      if (sT < 500 && !navli.eq(0).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(0).find('a').addClass('active')

      } else if (sT > 500 && sT < 1200 && !navli.eq(1).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(1).find('a').addClass('active')
      } else if (sT > 1200 && !navli.eq(2).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(2).find('a').addClass('active')
      } else {
        return false
      }
    } else {

      // * m版背景 *---------------------
      bgA.css({
        'background-position-y': sT*2 + 'px',
        'background-position-x': sT*-0.35 + 'px'
      })
      bgB.css({
        'background-position-y': sT*1 + 'px',
        'background-position-x': sT*0.35 + 'px'
      })
      bgC.css({
        'background-position-y': sT*0.3 + 'px',
        'background-position-x': sT*0.07 + 'px'
      })
      nonCube.css({
        'transform': 'translateY(-'+ sT*0.2 + 'px)'
      })

      // ----------------------

      if (sT < wrpH * 0.3 && anim03.hasClass('goAway')){
        anim03.removeClass('goAway')
      }else if (sT > wrpH * 0.3 && !anim03.hasClass('goAway')){
        anim03.addClass('goAway')
      }

      if (sT < wrpH * 0.2 && !navli.eq(0).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(0).find('a').addClass('active')
        if (!header.hasClass('noBottom')) {
          header.addClass('noBottom')
        }

      } else if (sT > wrpH * 0.2 && sT < wrpH * 0.4 && !navli.eq(1).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(1).find('a').addClass('active')
        if (!header.hasClass('noBottom')) {
          header.addClass('noBottom')
        }
      } else if (sT > wrpH * 0.4 && !navli.eq(2).find('a').hasClass('active')) {
        navA.removeClass('active')
        navli.eq(2).find('a').addClass('active')
        if (!header.hasClass('noBottom') && sT < wrpH * 0.5) {
          header.addClass('noBottom')
        }
      } else if (sT > wrpH * 0.5) {
        if (header.hasClass('noBottom')) {
          header.removeClass('noBottom')
        }

      } else if (sT < wrpH * 0.5) {
        if (!header.hasClass('noBottom')) {
          header.addClass('noBottom')
        }
      } else {
        return false
      }
    }

  }).scroll()

  // 輪播
  $('.store_slideBox').slick({
    dots: false,
    arrows: true,
    // infinite: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    prevArrow: '<a href="javascript:;" class="slickArrow prev_arr"><img src="images/svg/arrow_g_L.svg" alt=""></a>',
    nextArrow: '<a href="javascript:;" class="slickArrow next_arr"><img src="images/svg/arrow_g_r.svg" alt=""></a>',
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        dots: false,
        arrows: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000,
      }
    }]
  })
  $('.gift_slideBox.mobile').slick({
    dots: false,
    arrows: true,
    // infinite: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    prevArrow: '<a href="javascript:;" class="slickArrow prev_arr"><img src="images/svg/arrow_b_L.svg" alt=""></a>',
    nextArrow: '<a href="javascript:;" class="slickArrow next_arr"><img src="images/svg/arrow_b_r.svg" alt=""></a>',
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        dots: false,
        arrows: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000,
      }
    }]
  })

  // lottie 動畫載入
  // 女人
  var animation01 = lottie.loadAnimation({
    container: document.getElementById('anim01'), // 裝動畫的容器
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './json/women.json' // 動畫json 檔
  });
  // 男人01
  var animation02 = lottie.loadAnimation({
    container: document.getElementById('anim02'), // 裝動畫的容器
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './json/man01.json' // 動畫json 檔
  });
  // 男人02
  var animation03 = lottie.loadAnimation({
    container: document.getElementById('anim03'), // 裝動畫的容器
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './json/man02.json' // 動畫json 檔
  });
  animation01.play();
  animation02.play();
  animation03.play();

  // 錨點
  var anchorPos
  $('a.anchor').click(function () {
    if (!isMobile) {
      anchorPos = Number($(this).data('posx'))
      if ($(window).width() < 640 && anchorPos >= 1500) {
        anchorPos = 1320
      }
    } else {
      anchorPos = wrapper.height() * Number($(this).data('posxm'))
    }
    $body.animate({
      scrollTop: anchorPos
    }, 800);

    return false;
  });

  // scroll
  $(".scrollBox").mCustomScrollbar({
    theme: "minimal-dark",
    documentTouchScroll: false
  });

  // 開警語
  var thenBtn = $('.then_btn')
  thenBtn.on('click', function(){
    if(!$(this).hasClass('open')){
      $(this).parent('.thbtnb').nextAll('.rult02').stop(true).slideDown(250)
      $(this).addClass('open')
    }else{
      $(this).parent('.thbtnb').nextAll('.rult02').stop(true).slideUp(150)
      $(this).removeClass('open')
    }
  })


  // 開商品
  var gift = $('.gift')
  var prod = $('.prod')
  var prodTent = $('.prod .tentDiv')
  var _body = $('body')
  gift.on('click', function(){
    if(isMobile){
      LBT = $(window).scrollTop()
      _body.addClass('locked')
      wrapper.css({
        'position': 'fixed',
        'width': '100%',
        'height': 'auto',
        'left': 0,
        'top': '-'+ LBT + 'px'
      })
    }
    wrapper.addClass('noScroll')
    var $dataProd = $($(this).data('prod'))
    prodTent.hide()
    $dataProd.show()
    prod.stop(true).fadeIn(250)
  })
  // 開特約店
  var store = $('.store')
  var spStore = $('.spStore')
  var spsTent = $('.spStore .tentDiv')
  store.on('click', function(){
    if(isMobile){
      LBT = $(window).scrollTop()
      _body.addClass('locked')
      wrapper.css({
        'position': 'fixed',
        'width': '100%',
        'height': 'auto',
        'left': 0,
        'top': '-'+ LBT + 'px'
      })
    }
    wrapper.addClass('noScroll')
    var $dataStore = $($(this).data('store'))
    spsTent.hide()
    $dataStore.show()
    spStore.stop(true).fadeIn(250)
  })

})

