
<body class="center">
    <!-- PRELOADER START -->
    <div id="loadingMessage">
        <div style="position: relative; z-index: 1000;" class="modal">
            <br>
            <h4 class="alert-heading center"><i class="icon-info-sign"></i> Please wait!</h4>
            <br><br><br>
            <img class="center" src="<?php echo $this->img_path; ?>loading.gif">
            <br><br><br>
            <p class="center">The web application is loading...</p>
            <br>
        </div>
    </div>
    <!-- PRELOADER END -->
    <div class="row-fluid mainPage">
    <div class="span1"></div>
    <div class="hero-unit span10">
        
        <!-- MAIN MODAL HEADER START -->
        <h1><a href="./"> <p class="btn btn-info disabled btn-large">Version 2.5</p> <i class="fa fa-twitter"></i> <?php echo $this->name; ?> <small><?php echo $this->slogan; ?></small></a></h1>
        <div><small class="lastAnalysis pull-right" style="color: red;"></small></div>
        <br>
        <!-- MAIN MODAL HEADER END -->
        
        <!-- MAIN MODAL TABS START -->
        
        <div class="navbar row-fluid">
            <div class="navbar-inner">
                <a class="brand"><i class="fa fa-bar-chart-o"></i> Charts: </a>
                <ul class="nav">
                    <li class="active tweetVolumeChart"><a href="#tweetVolumeChart" data-toggle="tab"><i class="fa fa-twitter"></i> Tweet Volume</a></li>
                    <li class="userVolumeChart"><a href="#userVolumeChart" data-toggle="tab"><i class="fa fa-users"></i> User Volume</a></li>
                    <!--
                    <li class="tweetSummaryChart"><a href="#tweetSummaryChart" data-toggle="tab"><i class="fa fa-twitter"></i> Tweet Summary</a></li>
                    <li class="userSummaryChart"><a href="#userSummaryChart" data-toggle="tab"><i class="fa fa-users"></i> User Summary</a></li>
                    -->
                    <!--<li class="topicStatisticsChart"><a href="#topicStatisticsChart" data-toggle="tab">Topic Statistics</a></li>-->
                    <!--<li class="wordCloud"><a href="#wordCloud" data-toggle="tab">Word Clouds</a></li>-->
                </ul>
                <ul class="nav pull-right">
                    <li class="pull-right"><i class="fa fa-calendar ui-datepicker-trigger"></i> <input style="position: relative; z-index: 100; margin-top: 10px;" class="span7" type="text" id="dataDate"></li>
                    <li class="divider-vertical"></li>
                    <li><a href="#SandDModal-1" role="button" data-toggle="modal"><i class="fa fa-cogs"></i> S and D</a></li>
                    <li class="divider-vertical"></li>
                    <li><a href="#settingsModal-1" role="button" data-toggle="modal"><i class="fa fa-cogs"></i> Settings</a></li>
                </ul>
            </div>
            <hr>
            <!-- MAIN MODAL CHARTS & WORD CLOUD START -->
            <div class="tab-content">
                
                <!-- TWEET VOLUME CHART START [tvchart] -->
                <div class="tab-pane active" id="tweetVolumeChart">
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="tvchart1" style="height: 400px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p></center></div>
                        </div>
                        <div class="span3">
                            <div id="wchart1" style="height: calc(width / 2); width: calc(100% - 2px); border: 1px solid black;"></div>
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- TWEET VOLUME CHART END -->
                
                <!-- USER VOLUME CHART START [uvchart] -->
                <div class="tab-pane" id="userVolumeChart">
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="uvchart1" style="height: 100%; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span3">
                            <div id="wchart2" style="height: calc(width / 2); width: calc(100% - 2px); border: 1px solid black;"></div>
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="row-fluid span11">
                        <div class="span8">
                            <div id="uvchart2" style="height: 300px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span4">
                            <div id="topicInfo2" style="height: 300px; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <!-- USER VOLUME CHART END -->
                
                <!-- TWEET SUMMARY CHART START [tschart] -->
                <div class="tab-pane row-fluid" id="tweetSummaryChart">
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="tschart1" style="height: 100%; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span3">
                            <div id="wchart3" style="height: calc(width / 2); width: calc(100% - 2px); border: 1px solid black;"></div>
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="row-fluid span11">
                        <div class="span8">
                            <div id="tschart2" style="height: 300px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span4">
                            <div id="topicInfo2" style="height: 300px; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <!-- TWEET SUMMARY CHART END -->
                
                <!-- USER SUMMARY CHART START [uschart] -->
                <div class="tab-pane row-fluid" id="userSummaryChart">
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="uschart1" style="height: 100%; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span3">
                            <div id="wchart4" style="height: calc(width / 2); width: calc(100% - 2px); border: 1px solid black;"></div>
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="row-fluid span11">
                        <div class="span8">
                            <div id="uschart2" style="height: 300px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span4">
                            <div id="topicInfo2" style="height: 300px; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <!-- USER SUMMARY CHART END -->
                
                <!-- TOPIC STATISTICS CHART START [schart] -->
                <div class="tab-pane row-fluid" id="topicStatisticsChart">
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="schart1" style="height: 100%; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span3">
                            <div id="wchart5" style="height: calc(width / 2); width: calc(100% - 2px); border: 1px solid black;"></div>
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="row-fluid span11">
                        <div class="span8">
                            <div id="schart2" style="height: 300px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p><img class="loading" style="visibility: hidden;" src="./res/img/loading.gif"></center></div>
                        </div>
                        <div class="span4">
                            <div id="topicInfo2" style="height: 300px; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <!-- TOPIC STATISTICS CHART END -->
                
                <!-- WORD CLOUD START [wchart] -->
                <!--
                <div class="tab-pane row-fluid" id="wordCloud">
                    <h3 class="center">Word Clouds</h3>
                    <hr>
                    <div class="row-fluid">
                        <div class="span9">
                            <div id="wchart1" style="height: 400px; width: 100%; border: 1px solid black;"><br /><br /><br /><center><p class="loading" style="visibility: visible;"> Please generate a chart.</p></center></div>
                        </div>
                        <div class="span3">
                            <div id="topicInfo1" style="height: 100%; width: 100%;">
                                <p class="center">Please generate a chart...</p>
                            </div>
                        </div>
                    </div>
                </div>-->
                <!-- WORD CLOUD END -->
            </div>
            <!-- MAIN MODAL CHARTS & WORD CLOUD END -->
        </div>
        
        <!-- MAIN MODAL TABS END -->
        
        
        <hr>
        
        <!-- MAIN MODAL TABLE START -->
        <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="tw_table"></table>
        <!-- MAIN MODAL TABLE END -->
        
        <hr>
        
        <!-- MAIN MODAL FOOTER START -->
        <p class="lead text-right">Twitter Web App Version 2.1 - Istanbul Sehir University 2013</p>
        <!-- MAIN MODAL FOOTER END -->
        
    </div>
</body>
