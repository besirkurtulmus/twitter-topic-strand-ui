<!-- settings Modal 1 -->
<div style="height: 550px;" id="settingsModal-1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel"><i class="fa fa-cogs"></i> Settings</h3>
  </div>
  <div class="row-fluid modal-body settingsBody-1" style="width: 95%; height: 80%;">
    <ul class="nav nav-tabs" id="settingsTab">
      <li class="active"><a href="#editParam" role="button" data-toggle="tab"><i class="fa fa-cog"></i> Edit Parameters</a></li>
      <li><a href="#usedParam" role="button" data-toggle="tab"><i class="fa fa-exclamation-circle"></i> Used Parameters</a></li>
      <li><a href="#topicScore" role="button" data-toggle="tab"><i class="fa fa-superscript"></i> Topic Scoring</a></li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane active" id="editParam">
            <div class="form-horizontal">
              <div class="control-group">
                <label class="control-label" for="apostleThresholdFraction">Apostle Threshold Fraction</label>
                <div class="controls">
                  <input type="text" id="apostleThresholdFraction" placeholder="Apostle Threshold Fraction">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="apostleWindowSize">Apostle Window Size</label>
                <div class="controls">
                  <input type="text" id="apostleWindowSize" placeholder="Apostle Window Size">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="missionaryThresholdFraction">Missionary Threshold Fraction</label>
                <div class="controls">
                  <input type="text" id="missionaryThresholdFraction" placeholder="Missionary Threshold Fraction">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="missionaryWindowSize">Missionary Window Size</label>
                <div class="controls">
                  <input type="text" id="missionaryWindowSize" placeholder="Missionary Window Size">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="noisyK">Noisy k</label>
                <div class="controls">
                  <input type="text" id="noisyK" placeholder="Noisy k">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="veteranFraction">Veteran Fraction</label>
                <div class="controls">
                  <input type="text" id="veteranFraction" placeholder="Veteran Fraction">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="veteranSegCount">Veteran Seg. Count</label>
                <div class="controls">
                  <input type="text" id="veteranSegCount" placeholder="Veteran Seg. Count">
                </div>
              </div>
              <div class="control-group">
                <div class="controls">
                  <button class="btn" id="settingsButton">Save Settings</button>
                </div>
              </div>
            </div>
        </div>
        <div class="tab-pane" id="usedParam">
            <table class="table table-striped table-bordered" id="settingsTable-1">
                <tr>
                    <td>Duration seconds:</td>
                    <td class="durationSeconds"></td>
                </tr>
                <tr>
                    <td>Start Date:</td>
                    <td class="startDate"></td>
                </tr>
                <tr>
                    <td>End Date:</td>
                    <td class="endDate"></td>
                </tr>
                <tr>
                    <td>Apostle Threshold Fraction:</td>
                    <td class="apostleThresholdFraction"></td>
                </tr>
                <tr>
                    <td>Apostle Window Size:</td>
                    <td class="apostleWindowSize"></td>
                </tr>
                <tr>
                    <td>Missionary Threshold Fraction:</td>
                    <td class="missionaryThresholdFraction"></td>
                </tr>
                <tr>
                    <td>Missionary Window Size:</td>
                    <td class="missionaryWindowSize"></td>
                </tr>
                <tr>
                    <td>Noisy k:</td>
                    <td class="noisyK"></td>
                </tr>
                <tr>
                    <td>Veteran Fraction:</td>
                    <td class="veteranFraction"></td>
                </tr>
                <tr>
                    <td>Veteran Seg. Count:</td>
                    <td class="veteranSegCount"></td>
                </tr>
            </table>
        </div>
        <div class="tab-pane" id="topicScore">
            <img style="height: 100%; width: 100%;" src="./res/img/score_formula2.png">
        </div>
    </div>
  </div>
</div>