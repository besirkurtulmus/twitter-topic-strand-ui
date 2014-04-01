<?php

class App{
    
    function __construct($settings) {
        $this->name = $settings["Name"];
        $this->title = $settings["Title"];
        $this->header = $settings["Header"];
        $this->footer = $settings["Footer"];
        $this->main = $settings["Main"];
        $this->css_path = $settings["Css_Path"];
        $this->js_path = $settings["Js_Path"];
        $this->img_path = $settings["Img_Path"];
        $this->modal_path = $settings["Modal_Path"];
        $this->slogan = $settings["Slogan"];
        $this->app_path = $settings["App_Path"];
        $this->data_path = $settings["Data_Path"];
        
        $this->init(); // Initiate the application ..
    }
    
    function init(){
        
        $this->getHeader();
        
        $this->getBody();
        
        $this->getModal();
        
        $this->getDataDir();
        
        $this->getFooter();
        
    }
    
    function getHeader(){
        
        include($this->header);
        
    }
    
    function getFooter(){
        
        include($this->footer);
        
    }
    
    function getBody(){
        
        include($this->main);
        
    }
    
    function getModal(){
        
        echo("\n <!-- MODAL START --> \n");
        
        include_once($this->modal_path."heroUserID.php");
        
        include_once($this->modal_path."veteranUserID.php");
        
        include_once($this->modal_path."missUserID.php");
        
        include_once($this->modal_path."topReTweet.php");
        
        include_once($this->modal_path."apostleUserID.php");
        
        include_once($this->modal_path."wordCloud.php");
        
        include_once($this->modal_path."SandD.php");
        
        include_once($this->modal_path."settings.php");
        
        
        echo("\n <!-- MODAL END --> \n");
        
    }
    
    function getDataDir(){
        $dataStack = array();
        if ($handle = opendir($this->data_path)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != ".." && is_dir($this->data_path . $entry)) {
                        array_push($dataStack, $entry);
                }
            }
            closedir($handle);
       }
       echo "\n".'<script type="text/javascript"> window.dataStack = ' . json_encode($dataStack) . '; </script>'."\n";
    }
}

?>
