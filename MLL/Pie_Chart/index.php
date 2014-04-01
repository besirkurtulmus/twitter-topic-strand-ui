<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=iso-8859-9">
    <link rel="stylesheet" type="text/css" href="./css/bootstrap-responsive.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="./css/bootstrap.css" media="screen" />
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="./js/jquery.js"></script>
    <script type="text/javascript" src="./js/bootstrap-affix.js"></script>
    <script type="text/javascript" src="./js/bootstrap-alert.js"></script>
    <script type="text/javascript" src="./js/bootstrap-button.js"></script>
    <script type="text/javascript" src="./js/bootstrap-carousel.js"></script>
    <script type="text/javascript" src="./js/bootstrap-collapse.js"></script>
    <script type="text/javascript" src="./js/bootstrap-dropdown.js"></script>
    <script type="text/javascript" src="./js/bootstrap-modal.js"></script>
    <script type="text/javascript" src="./js/bootstrap-popover.js"></script>
    <script type="text/javascript" src="./js/bootstrap-scrollspy.js"></script>
    <script type="text/javascript" src="./js/bootstrap-tab.js"></script>
    <script type="text/javascript" src="./js/bootstrap-tooltip.js"></script>
    <script type="text/javascript" src="./js/bootstrap-transition.js"></script>
    <script type="text/javascript" src="./js/bootstrap-typeahead.js"></script>
  </head>
  <body>
      <center>
            <div id="chart_div" style="width: 525px; height: 395px; visibility: hidden"></div>
            <div id="chart_div2" style="width: 525px; height: 395px; visibility: hidden"></div>
            <div class="modal">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3><a href="./">Twitter Statistics & Pie Charts</a></h3>
                </div>
                <div class="modal-body">
                    <h4>Sweet charts about #DirenGeziParki</h4>
                    <p>The following two charts has unique information about the #DirenGeziParki twitter tag.</p>
                    <!-- twitterUsers Modal -->
                    <div id="twitterUsers" class="modal hide fade" role="dialog">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h3 id="myModalLabel">1. Twitter User Chart</h3>
                        </div>
                        <div class="modal-body ut-body1">
                        </div>
                        <div class="modal-footer">
                            <a class="btn disabled" aria-hidden="true">Previous</a>
                            <a href="#sentTweets" data-toggle="modal" class="btn" data-dismiss="modal" aria-hidden="true">Next</a>
                            </div>
                    </div>
                    <!-- twitterUsers Modal End -->
                    
                    <!-- Button to twitterUsers Modal -->
                    <a href="#twitterUsers" role="button" class="btn btn-primary btn-large" data-toggle="modal">Twittter User Chart</a>
                    <!-- End Button twitterUsers Modal -->

                    
                    <!-- sentTweets Modal -->
                    <div id="sentTweets" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h3 id="myModalLabel">2. Sent Tweets Chart</h3>
                        </div>
                        <div class="modal-body ut-body2">
                        </div>
                        <div class="modal-footer">
                            <a href="#twitterUsers" data-toggle="modal" class="btn text-left" data-dismiss="modal" aria-hidden="true">Previous</a>
                            <a class="btn disabled" aria-hidden="true">Next</a>
                            </div>
                    </div>
                    <!-- sentTweets Modal End -->
                    
                    <!-- Button to sentTweets Modal -->
                    <a href="#sentTweets" role="button" class="btn btn-primary btn-large" data-toggle="modal">Sent Tweets Chart</a>
                    <!-- End Button sentTweets Modal -->
                    
                    
                </div>
                <div class="modal-footer">
                    <p>Istanbul Sehir University - Machine Learning Lab 2013</p>
                </div>
            </div>
      </center>
  </body>
</html>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      google.setOnLoadCallback(drawChart2);
      
      /* First Chart */
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Twitter', 'Kullanicilari'],
          ['Alkol', 20],
          ['Diger', 80]
        ]);

        var options = {
          title: 'Twitter Kullanicilari'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      
      
      /* Second Chart */
      function drawChart2() {
        var data = google.visualization.arrayToDataTable([
          ['Twitter', 'Kullanicilari'],
          ['Direnis Alkol', 40],
          ['Direnis Diger', 25],
          ['Diger Tweetler', 35]
        ]);

        var options = {
          title: 'Atilan Tweetler'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
      }

      /* Chart Creation in Modal */
    $('[href="#twitterUsers"]').click(function() {
        $('div#chart_div').css("visibility","visible");
        $('div#chart_div').appendTo('div.ut-body1');
    });
    
    
    $('[href="#sentTweets"]').click(function() {
        $('div#chart_div2').css("visibility","visible");
        $('div#chart_div2').appendTo('div.ut-body2');
    });
    </script>