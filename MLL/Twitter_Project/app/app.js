//////////////////////////////////
//                               /
//   T.W.A JAVASCRIPT LIBRARY    /
//                               /
// Written by A. Besir Kurtulmus /
//                               /
// Version: 2.1                  /
//                               /
/////////////////////////////////

// Define global variables for the data table
var hashtag_index;
var hashtag_table;
var hashtag_score;
var hashtag_percentage = [];
var hashtag_wordCloud = [];
var hashtag_userTweetCounts = [];

// Define global volume variables for the charts
var hashtag_firstDate;
var hashtag_lastDate;

var hashtag_title;

// Define global variable newSettings Array
var newSettings = {};

var hashtag_heroVolume;
var hashtag_participantVolume;
var hashtag_missionaryVolume;
var hashtag_veteranVolume;
var hashtag_apostleVolume;
var hashtag_tweetVolume;

var hashtag_original;

// Define global user IDs
var hashtag_heroUserID;
var hashtag_missUserID;
var hashtag_veteranUserID;
var hashtag_apostleUserID;
var hashtag_topReTweet;

// Define global count variables for the charts
var hashtag_heroCount;
var hashtag_tweetCount;
var hashtag_veteranCount;
var hashtag_apostleCount;
var hashtag_participantCount;

// Define global summary variables for the charts
var hashtag_heroSummary;
var hashtag_tweetSummary;
var hashtag_veteranSummary;
var hashtag_missionarySummary;
var hashtag_participantSummary;
var hashtag_apostleSummary;
var hashtag_userTweetSummary;

// Define global variables for hashtag time
var hashtag_firstYear;
var hashtag_firstMonth;
var hashtag_firstDay;
var hashtag_firstHour;

var hashtag_lastYear;
var hashtag_lastMonth;
var hashtag_lastDay;
var hashtag_kastHour;

// Define the global table variables
var app_table;
var app_parameter = [];
var app_table_heroUserID = [];
var app_table_veteranUserID = [];
var app_table_missUserID = [];
var app_table_apostleUserID = [];
var app_table_topReTweet = [];

// Define Java Process Variables
var app_process_parameters = [];

// Define selected miniChart
var app_selected_miniChart;

// Define the class...
function App(){};

// App Initialization Method
App.prototype.init = function() {
    
    // Initiate the hashtag_index as an array
    hashtag_index  = [];
    
    app.getDataContent();
    
    if(window.timestamp == 'test'){
        window.urlIndexStructure = './test/index.json'
    }else{
        window.urlIndexStructure = './data/' + window.timestamp + '/index.json';
    }
    
    // Load the Topic JSON File
    $.ajax({
        url : window.urlIndexStructure,
        
        type : 'GET',
        
        dataType : 'json',
        
        // If the file loading fails, give an error
        error : function(){
            
            // Give an error
            alert('Error loading the index file.');
            
        },
        
        // If the file loading is successful, save the index data
        success : function(data){
            
            // Create the hashtag_index
            app.createHashtagIndex(data);
            
            // Show the Java Process Parameters
            app.showProcessParameters();
            
            // Load the table
            app.loadTable();

            // Refresh the minicharts
            app.refreshMiniChart();
            
            // Show the tooltips
            app.showTooltip();
            
            // Enable editing settings
            app.editSettings();
            
            // Enable SandD settings
            app.SandD();
            
            // Show the last analysis time
            app.liveAnalysisTime(window.latestData);

        }
    });
}

// Increment the last analysis time by 1 second
App.prototype.liveAnalysisTime = function(timeStamp) {
    app.showLastAnalysis(timeStamp);
    setInterval(function(){
        app.showLastAnalysis(timeStamp);
    }, 1000);
}

// Show the last analysis time
App.prototype.showLastAnalysis = function(timeStamp) {
        var ts = timeStamp;
        var now = new Date().getTime();
        var dt = now - ts;
        var diff = new Date(dt);

        var text = 'Last Analysis: ' + diff.getHours() + ' hours, ' + diff.getMinutes() + ' minutes, ' + diff.getSeconds() + ' seconds ago...';
        $('small.lastAnalysis').empty();
        $('small.lastAnalysis').append(text);
}

// Edit java app settings
App.prototype.editSettings = function() {
    
    // Get the latest settings
    app.readSettings();
    
    $('#settingsButton').click(function(){
        window.newSettings['apostleThresholdFraction'] = $('input#apostleThresholdFraction').val();
        window.newSettings['apostleWindowSize'] = $('input#apostleWindowSize').val();
        window.newSettings['missionaryThresholdFraction'] = $('input#missionaryThresholdFraction').val();
        window.newSettings['missionaryWindowSize'] = $('input#missionaryWindowSize').val();
        window.newSettings['noisyK'] = $('input#noisyK').val();
        window.newSettings['veteranFraction'] = $('input#veteranFraction').val();
        window.newSettings['veteranSegCount'] = $('input#veteranSegCount').val();
        app.writeSettings(window.newSettings);
    })
}

// Edit SandD settings
App.prototype.SandD = function() {
    // Reading
    $.ajax({
        type: "GET",
        dataType: "json",
        url: './test/SandDs/SandD.json',
        success: function(data){
            window.SandD = data;
            $('#SandDModal-1').on('show', function(){
                for(i = 0; i < window.SandD["s"].length; i++){
                    $("select#similar").append('<option id="' + i + '" value="' + window.SandD["s"][i][0] + "," + window.SandD["s"][i][1] + '">' + window.SandD["s"][i] + '</option>');
                }
                var usedNames = {};
                $("select#similar > option").each(function () {
                    if(usedNames[this.text]) {
                        $(this).remove();
                    } else {
                        usedNames[this.text] = this.value;
                    }
                });
                for(i = 0; i < window.SandD["d"].length; i++){
                    $("select#disimilar").append('<option id="' + i + '" value="' + window.SandD["d"][i][0] + "," + window.SandD["d"][i][1] + '">' + window.SandD["d"][i] + '</option>');
                }
                var usedNames = {};
                $("select#disimilar > option").each(function () {
                    if(usedNames[this.text]) {
                        $(this).remove();
                    } else {
                        usedNames[this.text] = this.value;
                    }
                });
                for(i = 0; i < window.SandD["all"].length; i++){
                    $("select#all").append('<option id="' + i + '" value="' + window.SandD["all"][i] + '">' + window.SandD["all"][i] + '</option>');
                }
            });
        }
    });
    
    $state = 0;
    
    $("#SandDDelete").click(function(){
        
        var similarSelected = $('select#similar :selected').text();
        
        var disimilarSelected = $('select#disimilar :selected').text();
        
        if(similarSelected != ''){
            $('select#similar :selected').remove();
        }
        
        if(disimilarSelected != ''){
            $('select#disimilar :selected').remove();
        }
    });
    
    $("#SandDSimilar").click(function(){
        $similar = [];
        $count = 0
        $('select#all :selected').each(function(index){
            $similar[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 2){
            $("select#similar").append('<option value="' + $similar.join(',') + '">' + $similar.join(',') + '</option>');
            var usedNames = {};
            $("select#similar > option").each(function () {
                if(usedNames[this.text]) {
                    $(this).remove();
                } else {
                    usedNames[this.text] = this.value;
                }
            });
        }
        
    });
    
    $("#SandDDisimilar").click(function(){
        $disimilar = [];
        $count = 0
        $('select#all :selected').each(function(index){
            $disimilar[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 2){
            $("select#disimilar").append('<option value="' + $disimilar.join(',') + '">' + $disimilar.join(',') + '</option>');
            var usedNames = {};
            $("select#disimilar > option").each(function () {
                if(usedNames[this.text]) {
                    $(this).remove();
                } else {
                    usedNames[this.text] = this.value;
                }
            });
        }
    });
    
    $("#saveSandD").click(function(){
        window.newSandD = window.SandD;
        window.newSandD["s"] = [];
        window.newSandD["d"] = [];
        
        $("select#similar option").each(function(){
            $tmp = [$(this).val().split(",")[0], $(this).val().split(",")[1]];
            window.newSandD["s"].push($tmp);
        });
        
        $("select#disimilar option").each(function(){
            $tmp = [$(this).val().split(",")[0], $(this).val().split(",")[1]];
            window.newSandD["d"].push($tmp);
        });
        
        $.ajax({
            url: "./test/SandDs/SandDEdit.php",
            type: "POST",
            data: {json: JSON.stringify(window.newSandD)},
            success: function(data){
                    var stat = jQuery.parseJSON(data);
                    if(stat['status'] == 'OK'){
                        alert("New S and D has been saved!");
                    }else if(stat['status'] == 'OK'){
                        alert("New S and D has not been saved!");
                    }
            },
            error:function(data){
                    alert("Error: Cannot connect to server.");
            }
        });
    });
    
    $("#simLeftTopic").click(function(){
        $selected = [];
        $count = 0;
        $('select#similar :selected').each(function(index){
            $selected[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 1){
            app.loadHashtag($selected[0].split(",")[0], '1');
            $("#SandDModal-1").modal('toggle');
        }
    });
    $("#simRightTopic").click(function(){
        $selected = [];
        $count = 0;
        $('select#similar :selected').each(function(index){
            $selected[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 1){
            app.loadHashtag($selected[0].split(",")[1], '1');
            $("#SandDModal-1").modal('toggle');
        }
    });
    $("#disLeftTopic").click(function(){
        $selected = [];
        $count = 0;
        $('select#disimilar :selected').each(function(index){
            $selected[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 1){
            app.loadHashtag($selected[0].split(",")[0], '1');
            $("#SandDModal-1").modal('toggle');
        }
    });
    $("#disRightTopic").click(function(){
        $selected = [];
        $count = 0;
        $('select#disimilar :selected').each(function(index){
            $selected[$count] = $(this).text();
            $count = $count + 1;
        });
        if($count == 1){
            app.loadHashtag($selected[0].split(",")[1], '1');
            $("#SandDModal-1").modal('toggle');
        }
    });
}

// Read java app settings
App.prototype.readSettings = function() {
    // Reading
    $.ajax({
        type: "GET",
        dataType: "json",
        url: './java.config.json',
        success: function(data){
            window.latestSettings = data;
            $('#settingsModal-1').on('show', function(){
                $('input#apostleThresholdFraction').attr('placeholder', latestSettings['apostleThresholdFraction']);
                $('input#apostleWindowSize').attr('placeholder', latestSettings['apostleWindowSize']);
                $('input#missionaryThresholdFraction').attr('placeholder', latestSettings['missionaryThresholdFraction']);
                $('input#missionaryWindowSize').attr('placeholder', latestSettings['missionaryWindowSize']);
                $('input#noisyK').attr('placeholder', latestSettings['noisyK']);
                $('input#veteranFraction').attr('placeholder', latestSettings['veteranFraction']);
                $('input#veteranSegCount').attr('placeholder', latestSettings['veteranSegCount']);
            })
        }
    });
}

// Write java app settings
App.prototype.writeSettings = function(newSettings) {
    $queryString = './java.config.php';
    $queryString += '?apostleThresholdFraction=' + newSettings['apostleThresholdFraction'];
    $queryString += '&apostleWindowSize=' + newSettings['apostleWindowSize'];
    $queryString += '&missionaryThresholdFraction=' + newSettings['missionaryThresholdFraction'];
    $queryString += '&missionaryWindowSize=' + newSettings['missionaryWindowSize'];
    $queryString += '&noisyK=' + newSettings['noisyK'];
    $queryString += '&veteranFraction=' + newSettings['veteranFraction'];
    $queryString += '&veteranSegCount=' + newSettings['veteranSegCount'];
    //alert($queryString);
    // Writing
    $.ajax({
        type: "POST",
        dataType: "json",
        url: $querystring,
        success: function(data){
            alert(data);
        },
        error: function(data){
            alert("Error!");
        }
    });
}

// Get the data content based on the url $_GET
App.prototype.getDataContent = function() {
    window.timestamp;
    
    // Convert str Array to int Array
    $temp = [];
    for(i = 0; i < window.dataStack.length; i++){
        $temp.push(parseInt(window.dataStack[i]));
    }
    dataStack = $temp;
    
    // Get's the latest data
    window.latestData = Math.max.apply(Math, dataStack);
    
    // Get url data
    window.curUrl = $.url();
    
    // If no timestamp specified, load the latest data
    if(curUrl.param('ts') == 'undefined' || curUrl.param('ts') == null){
        window.timestamp = window.latestData.toString();
    }else if(curUrl.param('ts') == 'test'){
        window.timestamp  = 'test';
    }else{// else load the given timestamp
        window.timestamp = curUrl.param('ts');
    }
    
    // Show the date picker
    app.showDatePicker();
}

// Show the Date Picker
App.prototype.showDatePicker = function() {
    
    $( "#dataDate" ).datepicker(
        {
            showAnim: "blind",
            beforeShowDay: app.availableDays,
            onSelect: app.loadDataDate
    });
    
}

// Load the Data with the given Date
App.prototype.loadDataDate = function(dateText, inst) {
    window.ahmet = inst;
    var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
    for(i = 0; i < window.dataStack.length; i++){
        tsDate = new Date(window.dataStack[i]);
        if(date.getYear() == tsDate.getYear() && date.getMonth() == tsDate.getMonth() && date.getDate() == tsDate.getDate()){
            window.location.search = 'ts=' + window.dataStack[i];
        }
    }
}

// Returns true if the date is available, else false
App.prototype.availableDays = function(date) {
    for(i = 0; i < window.dataStack.length; i++){
        tsDate = new Date(window.dataStack[i]);
        if(date.getYear() == tsDate.getYear() && date.getMonth() == tsDate.getMonth() && date.getDate() == tsDate.getDate()){
            return {0: true, 1:window.dataStack[i]};
        }
    }
    return {0: false}
    
}

// Show popup info
App.prototype.showTooltip = function () {
    
    var options = {
        html : true,
        trigger: "hover",
        title : "Title",
        content : "Lorem ipsum",
        placement : "top"
    };
    
    // Show popop on the score column
    $("#tw_table th:eq( 0 )").popover(options);
    
};

// Refresh the minicharts
App.prototype.refreshMiniChart = function(){
        
        // Draw the mini chart when user tables are shown
        $('#apostleUserIDModal-1').on('shown', function () {
            app.drawMiniChart('UserMiniChart');
            $("ul").bind("DOMSubtreeModified", function(){
                // Refresh the userMiniChart of the user tables
                app.drawMiniChart('UserMiniChart');
            });
        });
        $('#missUserIDModal-1').on('shown', function () {
            app.drawMiniChart('UserMiniChart');
            $("ul").bind("DOMSubtreeModified", function(){
                // Refresh the userMiniChart of the user tables
                app.drawMiniChart('UserMiniChart');
            });
        });
        $('#veteranUserIDModal-1').on('shown', function () {
            app.drawMiniChart('UserMiniChart');
            $("ul").bind("DOMSubtreeModified", function(){
                // Refresh the userMiniChart of the user tables
                app.drawMiniChart('UserMiniChart');
            });
        });
        $('#heroUserIDModal-1').on('shown', function () {
            app.drawMiniChart('UserMiniChart');
            $("ul").bind("DOMSubtreeModified", function(){
                // Refresh the userMiniChart of the user tables
                app.drawMiniChart('UserMiniChart');
            });
        });
        // Define selected miniChart
        // 0 -> Tweet Summary
        // 1 -> Participant Summary
        // 2 -> Veteran Summary
        // 3 -> Hero Summary
        // 4 -> Missionary Summary
        window.app_selected_miniChart = 0;

        // Draw the miniChart if the table header is clicked
        $( "table" ).delegate( "thead", "click", function() {

            // Refresh the userMiniChart of the user tables
            app.drawMiniChart('UserMiniChart');

            // Refresh the minichart on the Main Table
            if(window.app_selected_miniChart == 0){
                $("span.miniChart").empty();
                app.drawMiniChart('TweetSummary');
            }else if(window.app_selected_miniChart == 1){
                $("span.miniChart").empty();
                app.drawMiniChart('ParticipantSummary');
            }else if(window.app_selected_miniChart == 2){
                $("span.miniChart").empty();
                app.drawMiniChart('VetereanSummary');
            }else if(window.app_selected_miniChart == 3){
                $("span.miniChart").empty();
                app.drawMiniChart('HeroSummary');
            }else if(window.app_selected_miniChart == 4){
                $("span.miniChart").empty();
                app.drawMiniChart('MissionarySummary');
            }

        });

        $("ul").bind("DOMSubtreeModified", function(){

            // Refresh the minichart on the Main Table
            if(window.app_selected_miniChart == 0){
                $("span.miniChart").empty();
                app.drawMiniChart('TweetSummary');
            }else if(window.app_selected_miniChart == 1){
                $("span.miniChart").empty();
                app.drawMiniChart('ParticipantSummary');
            }else if(window.app_selected_miniChart == 2){
                $("span.miniChart").empty();
                app.drawMiniChart('VetereanSummary');
            }else if(window.app_selected_miniChart == 3){
                $("span.miniChart").empty();
                app.drawMiniChart('HeroSummary');
            }else if(window.app_selected_miniChart == 4){
                $("span.miniChart").empty();
                app.drawMiniChart('MissionarySummary');
            }

        });

        // After every sorting reDraw the mini charts
        $( "table" ).delegate( "a#TS_miniChart", "click", function() {
            window.app_selected_miniChart = 0;
            $("span.miniChart").empty();
            app.drawMiniChart('TweetSummary');
        });
        $( "table" ).delegate( "a#PS_miniChart", "click", function() {
            $("span.miniChart").empty();
            window.app_selected_miniChart = 1;
            app.drawMiniChart('ParticipantSummary');
        });
        $( "table" ).delegate( "a#VS_miniChart", "click", function() {
            $("span.miniChart").empty();
            window.app_selected_miniChart = 2;
            app.drawMiniChart('VetereanSummary');
        });
        $( "table" ).delegate( "a#HS_miniChart", "click", function() {
            $("span.miniChart").empty();
            window.app_selected_miniChart = 3;
            app.drawMiniChart('HeroSummary');
        });
        $( "table" ).delegate( "a#MS_miniChart", "click", function() {
            $("span.miniChart").empty();
            window.app_selected_miniChart = 4;
            app.drawMiniChart('MissionarySummary');
        });
        $( "table" ).delegate( ".userMiniChart", "click", function() {
            $(".userMiniChart").empty();
            app.drawMiniChart('UserMiniChart');
        });
    
};

// Calculate the score of the given topic
App.prototype.getScore = function(tweetCount, heroCount, missionaryCount, veteranCount, participantCount, firstHour, lastHour) {
    
    tc = parseInt(tweetCount);
    pc = parseInt(participantCount);
    nc = (parseInt(heroCount));
    mc = parseInt(missionaryCount);
    vc = parseInt(veteranCount);
    
    tweetPerUser = 1.00 * (tc / pc);
    
    percentOfCatUser = 1.00 * ((nc + mc + vc) / pc);
    
        oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    
        firstDate = new Date(parseInt(firstHour.split("-")[0]),parseInt(firstHour.split("-")[1]),parseInt(firstHour.split("-")[2]));
        
        secondDate = new Date(parseInt(lastHour.split("-")[0]),parseInt(lastHour.split("-")[1]),parseInt(lastHour.split("-")[2]));
    
    topicLife = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    
        currentDate = new Date();
        
    topicAge = Math.round(Math.abs((currentDate.getTime() - secondDate.getTime())/(oneDay)));
    
    //rVal = (tweetPerUser * (percentOfCatUser) * topicLife * (365 / topicAge) + Math.log(tc*pc));
    
    rVal = Math.log((tc*pc*topicLife)/topicAge);
    rVal = Math.round(rVal * 100) / 100;
    
    if (rVal == "-Infinity"){
        rVal = 0;
    }
    
    return rVal;
};

// Show Loading Animation Method
App.prototype.showLoadingAnimation = function() {
    
    // Hide the pre-Chart text...
    $('p.loading').css('visibility', 'hidden');
    
    // Show the loading image for the charts.
    $('img.loading').css('visibility', 'visible');
    
};

// Hide Loading Animation Method
App.prototype.hideLoadingAnimation = function() {
    
    // Hide the pre-Chart text...
    $('p.loading').css('visibility', 'visible');
    
    // Show the loading image for the charts.
    $('img.loading').css('visibility', 'hidden');
    
};

// Load the Index File Method
App.prototype.createHashtagIndex = function(data) {
    
    hashtag_table = [];
    
    // Get the Java Process Parameters
    window.app_process_parameters['durationSeconds'] = data['Parameters']['durationSeconds'];
    window.app_process_parameters['startDate'] = data['Parameters']['startDate'];
    window.app_process_parameters['endDate'] = data['Parameters']['endDate'];
    window.app_process_parameters['missionaryThresholdFraction'] = data['Parameters']['missionaryThresholdFraction'];
    window.app_process_parameters['missionaryWindowSize'] = data['Parameters']['missionaryWindowSize'];
    window.app_process_parameters['noisyK'] = data['Parameters']['noisyK'];
    window.app_process_parameters['veteranFraction'] = data['Parameters']['veteranFraction'];
    window.app_process_parameters['veteranSegCount'] = data['Parameters']['veteranSegCount'];
    window.app_process_parameters['apostleThresholdFraction'] = data['Parameters']['apostleThresholdFraction'];
    window.app_process_parameters['apostleWindowSize'] = data['Parameters']['apostleWindowSize'];
    
    // Dump the objects to the hashtag_index
    $.each(data['Topics'], function(key, val) {
        // Create an temp array
        var temp_index = [];
        
        // Iterate over hashtag_index creation
        hashtag_index.push(data['Topics'][key]);

        // Get properties of each topic
        var hashtag = data['Topics'][key]['Hashtag'];
        var tweetCount = data['Topics'][key]['TweetCount'];
        var apostleCount = data['Topics'][key]['ApostleCount'];
        var heroCount = data['Topics'][key]['NoisyCount'];
        var missionaryCount = data['Topics'][key]['MissionaryCount'];
        var veteranCount = data['Topics'][key]['VeteranCount'];
        var participantCount = data['Topics'][key]['ParticipantCount'];
        var firstHour = data['Topics'][key]['FirstHour'].slice(0,10);
        var firstHourArray = firstHour.split('-');
        var firstHourYear = firstHourArray[0];
        var firstHourMonth = firstHourArray[1];
        var firstHourDay = firstHourArray[2];
        var firstHour = firstHourDay + "-" + firstHourMonth + "-" + firstHourYear.substr(-2);
        var lastHour = data['Topics'][key]['LastHour'].slice(0,10);
        var lastHourArray = lastHour.split('-');
        var lastHourYear = lastHourArray[0];
        var lastHourMonth = lastHourArray[1];
        var lastHourDay = lastHourArray[2];
        var lastHour = lastHourDay + "-" + lastHourMonth + "-" + lastHourYear.substr(-2);
        var topicScore = app.getScore(tweetCount, heroCount, missionaryCount, veteranCount, participantCount, firstHour, lastHour);
        
        hashtag_table.push([topicScore , '#' + hashtag, tweetCount, apostleCount, missionaryCount, veteranCount, heroCount, participantCount, firstHour, lastHour,
                '<span class="miniChart" id="TS_' + hashtag + '"></span>' +
                '<span class="miniChart" id="PS_' + hashtag + '"></span>' +
                '<span class="miniChart" id="VS_' + hashtag + '"></span>' +
                '<span class="miniChart" id="HS_' + hashtag + '"></span>']);
    });
    
    
};

// Load the whole table functionalities
App.prototype.loadTable = function() {
    /* Table initialisation */
    $(document).ready(function() {
        
            // Set the data table options
            $('#tw_table').dataTable( {
                    "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    "sPaginationType": "bootstrap",
                    
                    "sScrollY": "450px",
                    
                    "sPageButton" : "<'test-class'>",
                    "bDestroy" : true,
                    "bAutoWidth": false,
                    "oLanguage": {
                            "sLengthMenu": "_MENU_ records per page"
                    },
                    
                    /*"aoColumnDefs": [
                        { "sWidth": "7%", "aTargets": [ 0, 9 ]},
                        { "sWidth": "15%", "aTargets": [ 1 ] },
                        { "sWidth": "10%", "aTargets": [ 2, 3, 4, 5, 6 ] },
                        { "sWidth": "10.5%", "aTargets": [ 7, 8 ] }
                    ],*/
                    
                    
                    "aoColumns" : [

                        {"sTitle" : "Score",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "7%"},
                        {"sTitle" : "Hashtag",
                            "asSorting": [],
                            "sWidth": "13%"},
                        {"sTitle" : "Tweet Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "8%"},
                        {"sTitle" : "Apostle Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "9%"},
                        {"sTitle" : "Missionary Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "12%"},
                        {"sTitle" : "Veteran Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "10%"},
                        {"sTitle" : "Noisy Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "8%"},
                        {"sTitle" : "Participant Count",
                            "asSorting": [ "desc", "asc" ],
                            "sWidth": "12%"},
                        {"sTitle" : "Start Date",
                            "asSorting": [],
                            "sWidth": "8%"},
                        {"sTitle" : "End Date",
                            "asSorting": [],
                            "sWidth": "8%"},
                        {"sTitle" :
                                "Chart \n "
                                + "<div class=\"fluid\">"
                                + "<a class=\"miniChartHead\" id=\"TS_miniChart\">T</a> <p class=\"miniChartHead\"> / </p> "
                                + "<a class=\"miniChartHead\" id=\"PS_miniChart\">P</a>"
                                + "</div>",
                            "asSorting": [],
                            "sWidth": "7%"
                        }

                    ],
                    
                    "aaSorting": [[ 0, "desc" ]],
                    
                    "aaData" : hashtag_table,
                    
                    "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
                        
                        $(nRow).css('font-size', '85%');
                        
                    },
                    
                    "fnHeaderCallback": function( nHead, aData, iStart, iEnd, aiDisplay ){
                        /*
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[0]).attr("id", "Score-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[1]).attr("id", "Hashtag-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[2]).attr("id", "TweetCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[3]).attr("id", "ApostleCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[4]).attr("id", "MissCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[5]).attr("id", "VeteranCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[6]).attr("id", "HeroCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[7]).attr("id", "ParticipantCount-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[8]).attr("id", "StartDate-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[9]).attr("id", "EndDate-Info");
                        
                        // Add id for score info
                        $(nHead.getElementsByTagName('th')[10]).attr("id", "Chart-Info");
                        */
                    }
                        
            });
            
            // Make the data table clickable
            app.clickableTable();
            
            // Draw all of the mini charts
            app.drawMiniChart();
    } );
};

// Load the word cloud modal
App.prototype.loadWordCloudModal = function($number) {
    
    if(window.timestamp == 'test'){
        window.hashtagImageStructure = "./test/tfidf/" + hashtag_original + ".svg";
    }else{
        window.hashtagImageStructure = "./data/" + window.timestamp + "/tfidf/" + hashtag_original + ".svg";
    }
    
    // Empty the element
    $(".wordCloud-larger").empty();
    
    // Load up the svg
    $(".wordCloud-larger").append("<img style=\"width: 100%; height: 100%;\" src=\"" + window.hashtagImageStructure + "\">");
};

// Load the Hero ID Table Modal
App.prototype.loadHeroIDTable = function($number){
   
        // Set the data table options
        $('#heroUserIDTable-' + $number).dataTable( {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span5'i><'span7'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                },
                "aoColumns" : [
                    
                    {"sTitle" : "Score",
                        "asSorting": [ "desc", "asc" ]},
                    {"sTitle" : "Twitter User ID"},
                    {"sTitle" : "User Tweet Summary",
                        "asSorting": []}

                ],
                
                "aaSorting": [[ 0, "desc" ]],
                    
                "aaData" : app_table_heroUserID,
                
                "bDestroy" : true,
                
                "bAutoWidth" : false,
                
                "bScrollAutoCss" : false,
                
                "iDisplayLength": 8,
                
                "bLengthChange": false
        } );        
   
};

// Load the Apostle ID Table Modal
App.prototype.loadApostleIDTable = function($number){
   
        // Set the data table options
        $('#apostleUserIDTable-' + $number).dataTable( {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span5'i><'span7'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                },
                "aoColumns" : [

                    {"sTitle" : "Score",
                        "asSorting": [ "desc", "asc" ]},
                    {"sTitle" : "Twitter User ID"},
                    {"sTitle" : "User Tweet Summary",
                        "asSorting": []}

                ],
                
                "aaSorting": [[ 0, "desc" ]],
                 
                "aaData" : app_table_apostleUserID,
                
                "bDestroy" : true,
                
                "bAutoWidth" : false,
                
                "bScrollAutoCss" : false,
                
                "iDisplayLength": 8,
                
                "bLengthChange": false
        } );        
        
        app.drawMiniChart('UserMiniChart');
   
};

// Load the Missionary ID Table Modal
App.prototype.loadMissIDTable = function($number){
   
        // Set the data table options
        $('#missUserIDTable-' + $number).dataTable( {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span5'i><'span7'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                },
                "aoColumns" : [

                    {"sTitle" : "Score",
                        "asSorting": [ "desc", "asc" ]},
                    {"sTitle" : "Twitter User ID"},
                    {"sTitle" : "User Tweet Summary",
                        "asSorting": []}

                ],
                
                "aaSorting": [[ 0, "desc" ]],
                 
                "aaData" : app_table_missUserID,
                
                "bDestroy" : true,
                
                "bAutoWidth" : false,
                
                "bScrollAutoCss" : false,
                
                "iDisplayLength": 8,
                
                "bLengthChange": false
        } );        
   
};

// Load the Veteran ID Table Modal
App.prototype.loadVeteranIDTable = function($number){
   
        // Set the data table options
        $('#veteranUserIDTable-' + $number).dataTable( {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span5'i><'span7'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                },
                "aoColumns" : [


                    {"sTitle" : "Score",
                        "asSorting": [ "desc", "asc" ]},
                    {"sTitle" : "Twitter User ID"},
                    {"sTitle" : "User Tweet Summary",
                        "asSorting": []}

                ],
                
                "aaSorting": [[ 0, "desc" ]],
                 
                "aaData" : app_table_veteranUserID,
                
                "bDestroy" : true,
                
                "bAutoWidth" : false,
                
                "bScrollAutoCss" : false,
                
                "iDisplayLength": 8,
                
                "bLengthChange": false
        } );        
   
};

// Load the Veteran ID Table Modal
App.prototype.loadTopReTweetTable = function($number){
   
        // Set the data table options
        $('#topReTweetTable-' + $number).dataTable( {
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span5'i><'span7'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                },
                "aoColumns" : [
                    
                    {"sTitle" : "reTweet ID",
                        "sWidth" : "26%"},
                    {"sTitle" : "User ID",
                        "sWidth" : "14%"},
                    {"sTitle" : "Text",
                        "sWidth" : "60%"}

                ],
                "aaData" : app_table_topReTweet,
                
                "bDestroy" : true,
                
                "bAutoWidth" : false,
                
                "bScrollAutoCss" : false,
                
                "iDisplayLength": 8,
                
                "bLengthChange": false
        } );        
   
};

// Load the given hashtag topics file and parse the data
App.prototype.loadHashtag = function($hashtag, $number) {
    
    if(window.timestamp == 'test'){
        window.urlHashStructure = './test/topics/' + $hashtag + '.json';
    }else{
        window.urlHashStructure = './data/' + window.timestamp + '/topics/' + $hashtag + '.json';
    }
    
    $.ajax({
        
       url : window.urlHashStructure, 
       
       type : 'GET',
       
       dataType : 'json',
       
        // If the file loading fails, give an error
       error : function(){
           
           // Show the loading text
           $('p.loading').css('visibility', 'visible');
           
           // Hide the loading animation
           $('img.loading').css('visibility', 'hidden')
           
           alert('Error loading the topic topic file.');
           
       },
       
       success : function(data){
           
           // Define the global variables
           app.defineGlobal(data);
           
           // Show the info about the hashtag after the loading the topic data ..
           app.showHashtagInfo(hashtag_title, $number);
           
           // load the top reTweet table modal
           app.loadTopReTweetTable($number);
           
           // load the apostle ID table modal
           app.loadApostleIDTable($number);
           
           // load the hero ID table modal
           app.loadHeroIDTable($number);
           
           // load the missionary ID table modal
           app.loadMissIDTable($number);
           
           // load the hero ID table modal
           app.loadVeteranIDTable($number);
           
           // load the hashtag table modal
           app.loadWordCloudModal($number);
           
           // Only render the seleceted chart
           if($("li.tweetVolumeChart").hasClass("active")){
               
               // Draw the tweet volume chart after loading the topic data ..
               app.drawTweetVolumeChart($number);
               
               // Draw the word cloud chart loading after the topic chart
               app.drawWordCloud3($number);
               
           }else if($("li.userVolumeChart").hasClass("active")){
               
               // Draw the user volume chart loading after the topic data ..
               app.drawUserVolumeChart($number);
               
           }else if($("li.tweetSummaryChart").hasClass("active")) {
               
               // Draw the tweet summary chart loading after the topic data
               app.drawTweetSummaryChart($number);
               
           }else if($("li.userSummaryChart").hasClass("active")){
               
               // Draw the user summary chart loading after the topic data
               app.drawUserSummaryChart($number);
               
           }else if($("li.topicStatisticsChart").hasClass("active")) {
               
               // Draw the topic statistics chart
               app.drawTopicStatisticsChart();
               
           }else if($("li.wordCloud").hasClass("active")){

               // Draw the word cloud chart loading after the topic chart
               app.drawWordCloud3($number);
           }
       }
       
    });
    
};

// Make the table clickable for chart rendering
App.prototype.clickableTable = function(app_table) {
    
    // Create a variable for the state of table
    var $state = 0;
    
    // Create a array for the DOM element of the selected item
    var $selectedElement;

    // Code for selecting rows
    $('#tw_table tbody').delegate('tr', 'click', function() {
        
        if( $state == 0 ){
            
            $(this).addClass('info');
            $(this).addClass('firstHashtag');
            $state = 1;
            
            $selectedElement = this;
            
            $hashtag = $(this).closest('tr').find('td:eq(1)').text().substring(1);
            
            // Show the loading message
            $("#loadingMessage").fadeIn("slow");
            

            // Load up the hashtag data
            app.loadHashtag($hashtag, '1');
            
            // Hide the loading message
            $("#loadingMessage").fadeOut("slow");
            
        }else if( $state == 1 ){
            
            if( $(this).hasClass('info') ){
                
                $(this).removeClass('info');
                $(this).removeClass('firstHashtag');
                
                $selectedElement = null;
                
                $state = 0;
                
            }else{
                
                $($selectedElement).removeClass('info');
                $($selectedElement).removeClass('firstHastag');
                
                $selectedElement = this;
                
                $hashtag = $(this).closest('tr').find('td:eq(1)').text().substring(1);
                
                $(this).addClass('info');
                $(this).addClass('firstHashtag');
                
                // Show the loading message
                $("#loadingMessage").fadeIn("slow");


                // Load up the hashtag data
                app.loadHashtag($hashtag, '1');

                // Hide the loading message
                $("#loadingMessage").fadeOut("slow");
                
            }
            
        }
    });
    
    // If user switched between tabs, reload the charts
    $("li.tweetVolumeChart, li.userVolumeChart, li.tweetSummaryChart, li.userSummaryChart, li.topicStatisticsChart, li.wordCloud").click(function(e){
        
        // Show the loading message
        $("#loadingMessage").fadeIn("slow");
        
        try{
            // Load up the hashtag data
            app.loadHashtag($hashtag, '1');
            
            // Hide the loading message
            $("#loadingMessage").fadeOut("slow");
        }catch(err){
            
            // Hide the loading message
            $("#loadingMessage").fadeOut("slow");
        }
    });
}

// Activate and define all global variables
App.prototype.defineGlobal = function(data){
    
    window.hashtag_original = data['Hashtag'];
    window.hashtag_title = '#' + data['Hashtag'];

    window.allData = data;
    
    // Define TFIDF words in the variable
    window.hashtag_wordCloud = data['TFIDFs'];

    window.hashtag_userTweetCounts = data['UserTweetCounts'];
    
    // Define the volume variables
    window.hashtag_tweetVolume = data['TweetVolume'];

    window.hashtag_heroVolume = data['NoisyVolume'];

    window.hashtag_participantVolume = data['ParticipantVolume'];

    window.hashtag_veteranVolume = data['VeteranVolume'];
    
    window.hashtag_missionaryVolume = data['MissionaryVolume'];
    
    window.hashtag_apostleVolume = data['ApostleVolume'];

    // Define the count variables

    window.hashtag_tweetCount = data['TweetCount'];
    
    window.hashtag_apostleCount = data['ApostleCount'];

    window.hashtag_heroCount = data['NoisyCount'];
    
    window.hashtag_missCount = data['MissionaryCount'];

    window.hashtag_veteranCount = data['VeteranCount'];

    window.hashtag_participantCount = data['ParticipantCount'];

    // Define the summary variables

    window.hashtag_tweetSummary = data['TweetSummary'];
    
    window.hashtag_apostleSummary = data['ApostleSummary'];

    window.hashtag_heroSummary = data['NoisySummary'];

    window.hashtag_veteranSummary = data['VeteranSummary'];

    window.hashtag_participantSummary = data['ParticipantSummary'];
    
    window.hashtag_missionarySummary = data['MissionarySummary'];
    
    window.hashtag_userTweetSummary = data['UserTweetCounts'];

    // Define the date variables
    window.hashtag_firstDate = data['FirstHour'];

    window.hashtag_lastDate = data['LastHour'];

    // Define the user IDs
    window.hashtag_heroUserID = data['Noisies'];
    
    window.hashtag_missUserID = data['Missionaries'];
    
    window.hashtag_veteranUserID = data['Veterans'];
    
    window.hashtag_apostleUserID = data['Apostles'];
    
    if(data['MostRetweetedTweets'] != null || data['MostRetweetedTweets'] != 'undefiend'){
        window.hashtag_topReTweet = data['MostRetweetedTweets'];
    }
    
    // Empty the hashtagUserID table
    window.app_table_heroUserID = [];
    window.app_table_veteranUserID = [];
    window.app_table_topReTweet = [];
    window.app_table_missUserID = [];
    window.app_table_apostleUserID = [];
    
    for(var key in hashtag_heroUserID){
        if(hashtag_userTweetSummary[key] == null || hashtag_userTweetSummary[key] == 'undefined'){
            window.app_table_heroUserID.push([hashtag_heroUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '">NO DATA</span>']);
        }else{
            window.app_table_heroUserID.push([hashtag_heroUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span class="userMiniChart" id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '"></span>']);
        }
    };
    
    // Define the apostleUserID table
    for(var key in hashtag_apostleUserID){
        if(hashtag_userTweetSummary[key] == null || hashtag_userTweetSummary[key] == 'undefined'){
            window.app_table_apostleUserID.push([hashtag_apostleUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '" thing="stuff">NO DATA</span>']);
        }else{
            window.app_table_apostleUserID.push([hashtag_apostleUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span class="userMiniChart" id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '"></span>']);
        }
    };
    
    // Define the missMissID table
    for(var key in hashtag_missUserID){
        if(hashtag_userTweetSummary[key] == null || hashtag_userTweetSummary[key] == 'undefined'){
            window.app_table_missUserID.push([hashtag_missUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '">NO DATA</span>']);
        }else{
            window.app_table_missUserID.push([hashtag_missUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span class="userMiniChart" id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '"></span>']);
        }
    };
    
    // Define the veteranUserID table
    for(var key in hashtag_veteranUserID){
        if(hashtag_userTweetSummary[key] == null || hashtag_userTweetSummary[key] == 'undefined'){
            window.app_table_veteranUserID.push([hashtag_veteranUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '">NO DATA</span>']);
        }else{
            window.app_table_veteranUserID.push([hashtag_veteranUserID[key].toFixed(2) ,'<a target="_blank" href="https://twitter.com/account/redirect_by_id?id=' + key + '">' + key + '</a>', '<span class="userMiniChart" id="userMiniChart-' + key + '" values="' + hashtag_userTweetSummary[key] + '"></span>']);
        }
    }

    // Define the Top reTweet table
    for(var i = 0; i < hashtag_topReTweet.length; i++){
        window.app_table_topReTweet.push([ '<a href="https://twitter.com/statuses/' + hashtag_topReTweet[i]["id"] + '" target="_blank">' + hashtag_topReTweet[i]['id'] + '</a>','<a href="https://twitter.com/account/redirect_by_id?id=' +  hashtag_topReTweet[i]["userId"] + '" target="_blank">' + hashtag_topReTweet[i]['userId'] + '</a>', hashtag_topReTweet[i]["text"]]);
    }

    // Define first date variables
    window.hashtag_firstDate = window.hashtag_firstDate.split('-');

    window.hashtag_firstYear = window.hashtag_firstDate[0];

    window.hashtag_firstMonth = window.hashtag_firstDate[1];

    window.hashtag_firstDay = window.hashtag_firstDate[2];

    window.hashtag_firstHour = window.hashtag_firstDate[3].split(':')[0];

    // Define last date variables
    window.hashtag_lastDate = window.hashtag_lastDate.split('-');

    window.hashtag_lastYear = window.hashtag_lastDate[0];

    window.hashtag_lastMonth = window.hashtag_lastDate[1];

    window.hashtag_lastDay = window.hashtag_lastDate[2];

    window.hashtag_lastHour = window.hashtag_lastDate[3].split(':')[0];
    
    // Define hashtag special user percentages
    window.hashtag_percentage['Apostle'] = ((parseInt(window.hashtag_apostleCount) / parseInt(window.hashtag_participantCount)) * 1000).toFixed(4);
    window.hashtag_percentage['Hero'] = ((parseInt(window.hashtag_heroCount) / parseInt(window.hashtag_participantCount)) * 1000).toFixed(4);
    window.hashtag_percentage['Missionary'] = ((parseInt(window.hashtag_missCount) / parseInt(window.hashtag_participantCount)) * 1000).toFixed(4);
    window.hashtag_percentage['Veteran'] = ((parseInt(window.hashtag_veteranCount) / parseInt(window.hashtag_participantCount)) * 1000).toFixed(4);
    
};

// Show the Java process parameters
App.prototype.showProcessParameters = function() {
    // Show the Duration Seconds Parameter
    $( ".durationSeconds" ).append(window.app_process_parameters['durationSeconds']);
    
    // Show the Start Date Parameter
    $( ".startDate" ).append(window.app_process_parameters['startDate']);
    
    // Show the End Date Parameter
    $( ".endDate" ).append(window.app_process_parameters['endDate']);
    
    // Show the Missionary Threshold Fraction Parameter
    $( ".missionaryThresholdFraction" ).append(window.app_process_parameters['missionaryThresholdFraction']);
    
    // Show the Missionary Window Size Parameter
    $( ".missionaryWindowSize" ).append(window.app_process_parameters['missionaryWindowSize']);
    
    // Show the Noisy k Parameter
    $( ".noisyK" ).append(window.app_process_parameters['noisyK']);
    
    // Show the Veteran Fraction Parameter
    $( ".veteranFraction" ).append(window.app_process_parameters['veteranFraction']);
    
    // Show the Veteran Seg. Count Parameter
    $( ".veteranSegCount" ).append(window.app_process_parameters['veteranSegCount']);
    
    // Show the Apostle Threshold Fraction
    $( ".apostleThresholdFraction" ).append(window.app_process_parameters['apostleThresholdFraction']);
    
    // Show the Apostle Window Size
    $( ".apostleWindowSize" ).append(window.app_process_parameters['apostleWindowSize']);
};

// Show the given topics hashtag info next to the chart
App.prototype.showHashtagInfo = function($hashtag, $number) {
    
    // Update the word cloud
    app.drawWordCloud3();
    
    // Delete all old content on the info field
    $("div#topicInfo" + $number).empty();
    
    // Add a table
    $("div#topicInfo" + $number).append("<table class=\"table table-bordered table-striped table-condensed center\"></table>");
    
    // Add a header & hashtag to the table
    $("div#topicInfo" + $number + " table").append("<thead><tr><td><b>Topic: </b>" + $hashtag + "</td></tr></thead>");
    
    // Add the date to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><b>Date: </b><small>" + hashtag_firstDay + "/" + hashtag_firstMonth + "/" + hashtag_firstYear.substr(-2) + " - " + hashtag_lastDay + "/" + hashtag_lastMonth + "/" + hashtag_lastYear.substr(-2) + "</small></td></tr>");
    
    // Add the tweet volume to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><b>Tweet Volume: </b> <small>" + hashtag_tweetCount + "</small></small></td></tr>");
    
    // Add the apostle count to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><small><b><a href=\"#apostleUserIDModal-" + $number + "\" role=\"button\" data-toggle=\"modal\"># Apos. : </a></b>" + hashtag_apostleCount + " (" + hashtag_percentage['Apostle'] + " per 1000)</small></td></tr>");
    
    // Add the veteran count to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><small><b><a href=\"#missUserIDModal-" + $number + "\" role=\"button\" data-toggle=\"modal\"># Miss. : </a></b>" + hashtag_missCount + " (" + hashtag_percentage['Missionary'] + " per 1000)</small></td>/tr>");
    
    // Add the veteran count to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><b><small><a href=\"#veteranUserIDModal-" + $number + "\" role=\"button\" data-toggle=\"modal\"># Vet. : </a></b>" + hashtag_veteranCount + " (" + hashtag_percentage['Veteran'] + " per 1000)</small></td>/tr>");
    
    // Add the hero count to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><small><b><a href=\"#heroUserIDModal-" + $number + "\" role=\"button\" data-toggle=\"modal\"># Nois. : </a></b>" + hashtag_heroCount + " (" + hashtag_percentage['Hero'] + " per 1000)</small></td></tr>");
    
    // Add the participant count to the table
    $("div#topicInfo" + $number + " table").append("<tr><td><small><b># Participants:</b></small> <small>" + hashtag_participantCount + "</small></td></tr>");
    
    // Add the top 3 reTweets button
    $("div#topicInfo" + $number + " table").append("<tr><td><center><small><b><a href=\"#topReTweetModal-" + $number + "\" role=\"button\" data-toggle=\"modal\"><i class=\"fa fa-star\"></i> Top reTweets</a></b></small></center></td></tr>");
    
    // Add the topic download button
    $("div#topicInfo" + $number + " table").append("<tr><td><center><small><b><a href=\"./download.php?id=" + hashtag_original + "\" target=\"_blank\"><i class=\"fa fa-cloud-download\"></i> Download Topic</a></b></small></center></td></tr>");
    
};

// Draw the mini Chart to the table rows
App.prototype.drawMiniChart = function($chartType){
   
   if($chartType == null || $chartType == 'undefined'){ 
       
       // Draw the Tweet Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("#TS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['TweetSummary']);    
          }
          
   }else if($chartType == 'TweetSummary'){
       
       // Draw the Tweet Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("#TS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['TweetSummary']);    
          }
          
   }else if($chartType == 'ParticipantSummary'){
       
       // Draw the Participant Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("#PS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['ParticipantSummary']);    
          }
          
   }else if($chartType == 'VetereanSummary'){
       
       // Draw the Veteran Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("#VS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['VeteranSummary']);    
          }
          
   }else if($chartType == 'HeroSummary'){
       
       // Draw the Hero Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("HS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['HeroSummary']);    
          }
          
   }else if($chartType == 'MissionarySummary'){
       
       // Draw the Hero Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("MS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['MissionarySummary']);    
          }
          
   }else if($chartType == 'UserTweetSummary'){
       
       // Draw the Hero Summary Chart
          for(var i = 0; i < hashtag_index.length; i++){
            $("MS_" + hashtag_index[i]['Hashtag']).sparkline(hashtag_index[i]['MissionarySummary']);    
          }
          
   }else if ($chartType == 'UserMiniChart'){
       /*
        // Draw minichart for user tweet summary apostles
        for(key in hashtag_apostleUserID){
            $("#userMiniChart-" + key).sparkline(hashtag_userTweetSummary[key]);
            $.sparkline_display_visible();
        };
        
        // Draw minichart for user tweet summary missionaries
        for(key in hashtag_missUserID){
            $("#userMiniChart-" + key).sparkline(hashtag_userTweetSummary[key]);
            $.sparkline_display_visible();
        };
        
        // Draw minichart for user tweet summary veterans
        for(key in hashtag_veteranUserID){
            $("#userMiniChart-" + key).sparkline(hashtag_userTweetSummary[key]);
            $.sparkline_display_visible();
        };*/
        
        // Draw minichart for user tweet summary heroes
        $(".userMiniChart").sparkline();
        $.sparkline_display_visible();
       
   }
   
   
   /*
   // Dummy data for chart
   for(var i = 0; i < 10; i++){
       $dummyData.push(Math.round(Math.random() * 100));
   };
   
   // Create the mini chart
   $(".miniChart").sparkline($dummyData);
   */
};

// Draw the given topics Tweet Volume Chart
App.prototype.drawTweetVolumeChart = function($number) {
    
 $options = {
                   
                   chart : {
                       
                       renderTo : 'tvchart' + $number
                       
                   },
                   
                   yAxis : {
                       
                       min : 0
                       
                   },
                   
                   title : {
                       
                       text : hashtag_title
                       
                   },
                   
                   rangeSelector : {
                       
                       selected : 1
                       
                   },
                   
                   series : [
                    {
                           
                        name : 'Tweet Volume',
                       
                        data : window.hashtag_tweetVolume,
                        
                        pointStart : Date.UTC(hashtag_firstYear, hashtag_firstMonth - 1, hashtag_firstDay, hashtag_firstHour),
                        
                        pointInterval: 3600 * 1000 // One hour
                       
                    }],
                
                    tooltip: {
                    headerFormat: '<span>{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                    }
                   
               };
               
               $('#tvchart' + $number).highcharts('StockChart', $options);
    
};

// Draw the given topics User Volume Chart
App.prototype.drawUserVolumeChart = function($number) {
    
 $options = {
                   
                   chart : {
                       
                       renderTo : 'uvchart' + $number
                       
                   },
                   
                   legend : {
                       
                       enabled : true
                       
                   },
                   
                   yAxis : {
                       
                       min : 0
                       
                   },
                   
                   title : {
                       
                       text : hashtag_title
                       
                   },
                   
                   rangeSelector : {
                       
                       selected : 1
                       
                   },
                   
                   series : [
                    {
                        name : 'Apostle Volume',
                        
                        data : window.hashtag_apostleVolume,
                        
                        pointStart : Date.UTC(hashtag_firstYear, hashtag_firstMonth - 1, hashtag_firstDay, hashtag_firstHour),
                        
                        pointInterval: 3600 * 1000 // One hour
                        
                    },
                    {
                        name : 'Missionary Volume',
                        
                        data : window.hashtag_missionaryVolume,
                        
                        pointStart : Date.UTC(hashtag_firstYear, hashtag_firstMonth - 1, hashtag_firstDay, hashtag_firstHour),
                        
                        pointInterval: 3600 * 1000 // One hour
                    },
                    {
                        name : 'Veteran Volume',
                        
                        data : window.hashtag_veteranVolume,
                        
                        pointStart : Date.UTC(hashtag_firstYear, hashtag_firstMonth - 1, hashtag_firstDay, hashtag_firstHour),
                        
                        pointInterval: 3600 * 1000 // One hour
                    },
                    {
                        name : 'Noisy Volume',
                        
                        data : window.hashtag_heroVolume,
                        
                        pointStart : Date.UTC(hashtag_firstYear, hashtag_firstMonth - 1, hashtag_firstDay, hashtag_firstHour),
                        
                        pointInterval: 3600 * 1000 // One hour
                        
                    }],
                
                    tooltip: {
                    headerFormat: '<span>{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                    }
                   
               };
               
               $('#uvchart' + $number).highcharts('StockChart', $options);
    
};

// Draw the given topics Tweet Summary Chart
App.prototype.drawTweetSummaryChart = function($number) {
    
 $options = {
                   
                   chart : {
                       
                       renderTo : 'tschart' + $number,
                       
                       type : 'column'
                       
                   },
                   
                   yAxis : {
                       
                       min : 0,
                       
                       title : {
                           
                           text : '# of tweets'
                           
                       }
                       
                   },
                   
                   xAxis : {
                       
                       categories : [
                           'Seq. 1',
                           'Seq. 2',
                           'Seq. 3',
                           'Seq. 4',
                           'Seq. 5',
                           'Seq. 6',
                           'Seq. 7',
                           'Seq. 8',
                           'Seq. 9',
                           'Seq. 10'],
                       
                       title : {
                           
                           text : 'Sequence'
                           
                       }
                       
                   },
                   
                   title : {
                       
                       text : hashtag_title
                       
                   },
                   
                   series : [
                    {
                        name : 'Tweet Summary',
                       
                        data : window.hashtag_tweetSummary
                       
                    }],
                
                    plotOptions : {
                        
                        column : {
                            
                            pointPadding : 0.2,
                            
                            borderWidth : 0
                            
                        }
                        
                    },
                
                    tooltip : {
                        
                        headerFormat: '<span>{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                        
                    }
                   
               };
               
               $('#tschart' + $number).highcharts($options);
    
};

// Draw the given topics User Summary Chart
App.prototype.drawUserSummaryChart = function($number) {
    
 $options = {
                   
                   chart : {
                       
                       renderTo : 'uschart' + $number,
                       
                       type : 'column'
                       
                   },
                   
                   yAxis : {
                       
                       min : 0,
                       
                       title : {
                           
                           text : '# of tweets'
                           
                       },
                       
                   },
                   
                   xAxis : {
                       
                       categories : [
                           'Seq. 1',
                           'Seq. 2',
                           'Seq. 3',
                           'Seq. 4',
                           'Seq. 5',
                           'Seq. 6',
                           'Seq. 7',
                           'Seq. 8',
                           'Seq. 9',
                           'Seq. 10'],
                       
                       title : {
                           
                           text : 'Sequence'
                           
                       }
                       
                   },
                   
                   title : {
                       
                       text : hashtag_title
                       
                   },
                   
                   rangeSelector : {
                       
                       selected : 1
                       
                   },
                   
                   series : [
                    {
                        name : 'Apostle Summary',
                        
                        data : window.hashtag_apostleSummary
                    },
                    {
                        name : 'Missionary Summary',
                        
                        data : window.hashtag_missionarySummary
                    },
                    {
                        name : 'Veteran Summary',
                        
                        data : window.hashtag_veteranSummary
                    },
                    {
                        name : 'Noisy Summary',
                        
                        data : window.hashtag_heroSummary
                    }],
                
                    plotOptions : {
                        
                        column : {
                            
                            pointPadding : 0.2,
                            
                            borderWidth : 0
                            
                        }
                        
                    },
                
                    tooltip: {
                    headerFormat: '<span>{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                    }
                   
               };
               
               $('#uschart' + $number).highcharts($options);
};

// Draw the given topics statistical chart
App.prototype.drawTopicStatisticsChart = function() {};

// Draw the Word Cloud using the svg files
App.prototype.drawWordCloud3 = function () {

    if(window.timestamp == 'test'){
        window.hashtagImageStructure = "./test/tfidf/" + hashtag_original + ".svg";
    }else{
        window.hashtagImageStructure = "./data/" + window.timestamp + "/tfidf/" + hashtag_original + ".svg";
    }

    for(i = 0; i < 5; i++){
        
        // Empty the world cloud
        $("#wchart" + i).empty();

        $("#wchart" + i).append("<a href=\"#wordCloudModal-1\" role=\"button\" data-toggle=\"modal\"><img style=\"width: 100%; height: 100%;\" src=\"" + window.hashtagImageStructure + "\"></a>");
        
    }
    
};

// Draw the Word Cloud using wordcloud2.js
App.prototype.drawWordCloud2 = function ($number) {
    
    // Empty the world cloud
    $("#wchart" + $number).empty();
    
    var list = [];
    
    $.each(window.hashtag_wordCloud, function(key, val){
        
        // Normalize the value of "val"
        val = parseInt(1000000 * parseFloat(val)).toFixed(1);
        
        list.push([key, parseInt(val)]);
    });
    
    window.cloudList = list;
    
    var options = {
        
        list : cloudList
    };
    
    // Initialize the word cloud
    WordCloud($("#wchart" + $number)[0], options);
    
};

// Draw the Word Cloud using awesomecloud
App.prototype.drawWordCloud = function ($number) {
    
    // Empty the word cloud
    $("div#wchart" + $number).empty();
    
    //var maximum = Array.max(parseFloat(window.hashtag_wordCloud));
    //var minimum = Array.min(parseFloat(window.hashtag_wordCloud));
    
    $.each(window.hashtag_wordCloud, function(key, val){
        
        // Normalize the value of "val"
        val = parseInt(10000 * parseFloat(val)).toFixed(1);
        
        // Add words with weight with a for loop
        $("div#wchart" + $number).append('<span data-weight="' + val + '" style="display: visible;">' + key + '</span>'); 
        
    });
    
    var wordCloudSettings = {
        "size" : {
            "grid" : 16
        },
        "color" : {
            "background" : "white"
        },
        "options" : {
            "color" : "random-dark",
            "rotationRatio" : 0.2,
            "printMultiplier" : 5,
            "sort" : "highest"
        },
        "font" : "'Times New Roman', Times, serif",
        "shape" : "circle"
    }
    
    $( "div#wchart" + $number ).awesomeCloud( wordCloudSettings );
    
    
};