  /* Данная функция создаёт кроссбраузерный объект XMLHTTP */  
  function getXmlHttp(){
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }

  function next_page(page) {
    var event="next_page_comments_block";
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
        xmlhttp.open('POST', '/php/content_event_class.php', true); // Открываем асинхронное соединение
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
        xmlhttp.send("event=" + encodeURIComponent(event) + "&page=" + encodeURIComponent(page)); // Отправляем POST-запрос
        xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
            if (xmlhttp.readyState == 4) { // Ответ пришёл
              if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
                if (xmlhttp.responseText!=''){
                  $('section.reviews').remove();
                  $('section.reviews_pagination').remove();
                  $('body main').append(xmlhttp.responseText);
                }
              }
            }
      };
  }

  function send_review() {
    var name=$('#name').val();
    var message=$('#message').val();
    var event="send_review";
     if (name!=''&&message!=''&&$('input.checkbox').prop("checked")){
     var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
        xmlhttp.open('POST', '/php/content_event_class.php', true); // Открываем асинхронное соединение
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
        xmlhttp.send("event=" + encodeURIComponent(event) + "&name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message)); // Отправляем POST-запрос
        xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
            if (xmlhttp.readyState == 4) { // Ответ пришёл
              if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
                if (xmlhttp.responseText=='1'){
                  $('#message').css('border','');
                  $('#name').css('border','');
                  $('#name').val('');
                  $('#message').val('');
                  next_page(1);
                  _click(1);
                }
              }
            }
      };
      }
      else {
        if (name=="") {$('#name').css('border','1px red solid');} else {$('#name').css('border','');}
        if (message=="") {$('#message').css('border','1px red solid');} else {$('#message').css('border','');}
        if($('input.checkbox').prop("checked")) {
            $('input.checkbox').removeClass('wrong');
        } else {
          $('input.checkbox').addClass('wrong');
        }
      }
  }

function delcomments(id) {
var event="delcomments";
var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
        xmlhttp.open('POST', '/php/content_event_class.php', true); // Открываем асинхронное соединение
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
        xmlhttp.send("id=" + encodeURIComponent(id)+ "&event=" + encodeURIComponent(event)); // Отправляем POST-запрос
        xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
            if (xmlhttp.readyState == 4) { // Ответ пришёл
              if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
                if (xmlhttp.responseText==1) { // Выводим ответ сервера
                next_page(1);
              }
              }
            }
      };
 }

 function edit_comments(id,element,event) {
  if (event==1) {
  var reviews_text=element.parent('.reviews').children(".reviews_text");
  var text=reviews_text.text();
  reviews_text.html('');
  element.html('Сохранить');
  element.attr('onclick','edit_comments('+id+',$(this),2)');
  reviews_text.append('<textarea id="edit_comments_area">'+text+'</textarea>');
  } else {
  var textarea=element.parent('.reviews').children(".reviews_text").children("#edit_comments_area");
  var event="edit_comments";
  var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
        xmlhttp.open('POST', '/php/content_event_class.php', true); // Открываем асинхронное соединение
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
        xmlhttp.send("id=" + encodeURIComponent(id)+ "&event=" + encodeURIComponent(event)+ "&comment=" + encodeURIComponent(textarea.val())); // Отправляем POST-запрос
        xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
            if (xmlhttp.readyState == 4) { // Ответ пришёл
              if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
                if (xmlhttp.responseText==1) { // Выводим ответ сервера
                next_page(1);
              }
              }
            }
      };
  }
 }