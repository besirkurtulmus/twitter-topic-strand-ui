<?php

if(!isset($_GET['id'])){
    header('Location: ./');
}else{
    
    header('Content-disposition: attachment; filename='.$_GET['id'].'.json');
    header('Content-type: application/json');
    
    $json = file_get_contents('./data/topics/' . $_GET['id'] . ".json");
    
    echo $json;
    
}