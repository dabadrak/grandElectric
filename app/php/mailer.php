<?php
$to = "dabadrak@gmail.com"; // емайл получателя данных из формы
$tema = "Заявка grandElectric"; // тема полученного емайла
$message = "Имя: ".$_POST['name']."<br>";//присвоить переменной значение, полученное из формы name=name
  $message .= "Номер телефона: ".$_POST['phone']."<br>"; //полученное из формы name=phone
  $message .= "Сообщение: ".$_POST['message']."<br>"; //полученное из формы name=message
$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
if (mail($to, $tema, $message, $headers)) {
  header("location: /index.html");
} else {
  echo 'Ошибка!';
} //отправляет получателю на емайл значения переменных
