<?php

if(isset($_POST)){
    echo json_encode(array('status' => 'OK'));
    file_put_contents('./SandD.json', $_POST["json"]);
}else{
    echo json_encode(array('status' => 'NOT_OK'));
}