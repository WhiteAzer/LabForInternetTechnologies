<?php
function can_upload($file){
    if($file['name'] == '')
		return 'Вы не выбрали файл.';
	
	if($file['size'] == 0)
		return 'Файл слишком большой.';
    
	$getMime = explode('.', $file['name']);
	$mime = strtolower(end($getMime));
	$types = array('jpg', 'png', 'gif', 'bmp', 'jpeg');
	
	if(!in_array($mime, $types))
		return 'Недопустимый тип файла.';
	
	return true;
  }

  function make_upload($file){	
	$fileName = 'picture.jpg';
	copy($file['tmp_name'], 'img/' . $fileName);
  }

if(isset($_FILES['file'])) {
    
    $check = can_upload($_FILES['file']);
  
    if($check === true){
      make_upload($_FILES['file']);
    }
    else{
      echo "<strong>$check</strong>";  
    }
  }

    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $patronymic = $_POST["patronymic"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $repeatPassword = $_POST["repeatPassword"];
    $role = $_POST["role"];
    $reputation = $_POST["reputation"];
    $date = $_POST["date"];
    $univercity1 = $_POST["univercity1"];
    $univercity2 = $_POST["univercity2"];
    $file = $_POST["file"];
    $text = $_POST["text"];
    $send = $_POST["send"];

    $data = "Name: " . $name . "\n" . 
    "Surname: " . $surname . "\n" . 
    "Patronymic: " . $patronymic . "\n" . 
    "Email: " . $email . "\n" . 
    "Password: " . $password . "\n" . 
    "Repeat password: " . $repeatPassword . "\n" .
    "Role: " . $role . "\n" .
    "Reputation: " . $reputation . "\n" .
    "Date: " . $date . "\n" . 
    "First univercity: " . $univercity1 . "\n" . 
    "Second univercity: " . $univercity2 . "\n" . 
    "File: " . $file . "\n" . 
    "Text: " . $text . "\n" . 
    "Send: " . $send;

    $filename = 'file.txt';
    file_put_contents($filename, $data);

    
    

    header("Location: /answer.html");
?>