$(document).ready(function () {
  $('.float-shares').click(function () {
    $('.float-shares').toggleClass('hide');
  });

  $('body').on('click', '[class *= "load--"]', function () {

    if ($(this).attr('disabled')) {
      return false;
    }

    var tpl = String($(this).attr('class').split(' ').filter(function (e) {
      return e.indexOf('load--') !== -1;
    })).replace("load--", "");

    $.ajax({ // инициaлизируeм ajax зaпрoс
      url: '/includes/' + tpl + '.php',
      type: "GET",
      contentType: false, // важно - убираем форматирование данных по умолчанию
      processData: false, // важно - убираем преобразование строк по умолчанию
      dataType: 'html', // oтвeт ждeм в html фoрмaтe
      beforeSend: function () { // сoбытиe дo oтпрaвки
        $(this).attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
      },
      success: function (data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
        if (tpl == 'agreement' || tpl == 'site-rules') {

          $('body').append('<section class="float-box"><div style="position: relative;"><div class="float-box_inset">' + data + '</div><a class="exit" style="right: 25px;"></a></div></section>');

        } else {

          $('body').append('<section class="float-box"><div style="position: relative;"><div class="float-box_inset">' + data + '</div><a class="exit"></a></div></section>');

        }

        $("section.float-box > div").css('margin-top', $(window).scrollTop() + (Math.abs($(window).height() - $("section.float-box .float-box_inset").outerHeight())) / 2 + "px");
        $("section.float-box").animate({
          opacity: "1"
        }, 300);
      },
      error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
        $('body').append('<section class="float-box"><div class="float-box_inset"><h1>Не удалось загрузить данные для всплывающей формы!</h1><a class="exit"></a></div></section>');
      },
      complete: function () { // сoбытиe пoслe любoгo исхoдa
        $(this).removeAttr('disabled'); // в любoм случae включим кнoпку oбрaтнo
      }
    });
  });

  //Отлавливание клика по кнопке закрыть
  $('body').on('click', '.exit', function () {
    $(this).parents('section').remove();
  });

  // Mobile nav
  var mainNav = document.querySelector('.main-nav');
  var topLine = document.querySelector('.top-line');
  var topLineHeight = Math.floor(topLine.offsetHeight);
  var mainNavList = mainNav.querySelector('.main-nav__list');
  var toggleMenu = document.querySelector('.main-nav__toggle');


  if (toggleMenu && window.matchMedia('(max-width: 1017px)').matches) {
    mainNavList.style.paddingTop = topLineHeight + 'px';
    mainNav.classList.remove('main-nav--no-js');

    toggleMenu.addEventListener('click', function (event) {
      event.preventDefault();
      document.body.classList.toggle('no-scroll');
      mainNav.classList.toggle('main-nav--closed');
      toggleMenu.classList.toggle('is-active');
    });
  }

  // Services nav
  var servicesNav = document.querySelectorAll('.services nav');

  function createOption(item) {
    var option = document.createElement('option');
    var link = item.querySelector('a');
    var href = link.href.split('/');
    var pathname = href.slice(href.lastIndexOf('yslugi'));

    option.value = pathname.join('/');
    option.textContent = link.textContent;

    if (item.classList.contains('active')) {
      option.selected = true;
    }

    return option;
  }

  function createServicesNavForm(nav) {
    var fragment = document.createDocumentFragment();
    var servicesNavForm = document.createElement('form');
    var select = document.createElement('select');
    var navItems = nav.querySelectorAll('li');

    servicesNavForm.className = 'services-nav-form';

    for (var i = 0; i < navItems.length; i++) {
      select.appendChild(createOption(navItems[i]));
    }

    servicesNavForm.appendChild(select);
    nav.appendChild(servicesNavForm);

    select.addEventListener('change', function () {
      location.pathname = '/' + select.value;
    });
  }

  if (servicesNav.length && window.matchMedia('(max-width: 1017px)').matches) {
    Array.from(servicesNav).forEach(createServicesNavForm);
  }

});
