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

  function send_feedback(){
  var name=$('#name').val();
  var email=$('#email').val();
  var message=$('#message').val();
  var event="send_feedback";
  // console.log();
  if (name!=''&&email!=''&&$('input.checkbox').prop("checked")){
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
    xmlhttp.open('POST', '/php/content_event_class.php', true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
    xmlhttp.send("event=" + encodeURIComponent(event) + "&name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message)+ "&email=" + encodeURIComponent(email)); // Отправляем POST-запрос
    xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
      if (xmlhttp.readyState == 4) { // Ответ пришёл
      if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
        if (xmlhttp.responseText=='1'){
          $('#message').css('border','');
          $('#email').css('border','');
          $('#name').css('border','');
          $('#name').val('');
          $('#email').val('');
          $('#message').val('');
          $('#response').html('Ваша заявка успешно отправлена! Спасибо!');
          $('#response').css('color','#5A3370');
        } else {$('#response').html('Упс! Что-то пошло не так! =( Попробуйте еще раз позже!'); $('#response').css('color','red');}
      }
      }
    };
  }
  else {
    if (name=="") {$('#name').css('border','1px red solid');} else {$('#name').css('border','');}
    if (email=="") {$('#email').css('border','1px red solid');} else {$('#email').css('border','');}
    if (message=="") {$('#message').css('border','1px red solid');} else {$('#message').css('border','');}
    if($('input.checkbox').prop("checked")) {
            $('input.checkbox').removeClass('wrong');
    } else {
      $('input.checkbox').addClass('wrong');
    }
  }
  }
  