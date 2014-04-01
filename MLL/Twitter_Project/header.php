<!DOCTYPE html>
<html lang="en">
    <head>
        
        <!-- WEB APP TITLE START -->
        <title><?php echo $this->title; ?></title>
        <!-- WEB APP TITLE END -->
        
        <!-- META INFO START -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- META INFO END -->
        
        <!-- STYLE SHEET START -->
        <link rel="stylesheet" type="text/css" href="<?php echo $this->css_path; ?>style.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="<?php echo $this->css_path; ?>bootstrap.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="<?php echo $this->css_path; ?>bootstrap-responsive.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="<?php echo $this->css_path; ?>DT_bootstrap.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="<?php echo $this->css_path; ?>smoothness/jquery-ui-1.10.3.custom.css" media="screen" />
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <!-- STYLE SHEET END_-->

        <!-- JQUERY START -->
        <script type="text/javascript" src="<?php echo $this->js_path; ?>jquery-1.10.2.js"></script>
        <script type="text/javascript" src="<?php echo $this->js_path; ?>bootstrap-modal.js"></script>
        <script type="text/javascript" src="<?php echo $this->js_path; ?>jquery.dataTables.js"></script>
        <script type="text/javascript" src="<?php echo $this->js_path; ?>jquery.sparkline.min.js"></script>
        <!-- JQUERY END -->
        
        <!-- APP JAVASCRIPT LOAD START -->
        <script type="text/javascript" src="<?php echo $this->app_path; ?>app.js"></script>
        <script type="text/javascript" src="<?php echo $this->app_path; ?>table.js"></script>
        <!-- APP JAVASCRIPT LOAD END -->
        
        <!-- PRELOADER START -->
        <script type="text/javascript">// <![CDATA[
        $(window).ready(function() { $("#loadingMessage").fadeOut("slow"); })
        // ]]></script>
        <!-- PRELOADER END -->
    </head>