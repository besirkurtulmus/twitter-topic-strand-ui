<?php
 $list = array(
     "Project1" => "Pie_Chart",
     "Project2" => "Twitter_Project",
     "Project3" => "Twitter_Project2"
 )
?>
<!DOCTYPE html>
<html>
    <head>
        <title>MLL Projects</title>
    </head>
    <body>
        <ol>
            <?php
            foreach ($list as $key => $value) {
                echo '<li><a href="./'.$value.'">'.$value.'</a></li>';
            }
            ?>
        </ol>
    </body>
</html>