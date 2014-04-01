<!-- SandD Modal 1 -->
<div style="height: 550px;" id="SandDModal-1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="SandDModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Similar and Disimilar</h3>
  </div>
  <div class="row-fluid modal-body SandDBody-1" style="width: 95%; height: 80%;">
        <div class="span6">
            <center><em>Similar Topics</em></center>
          <select id="similar" multiple style="width:100%; height: 140px;">
          </select>
            <div class="span12">
                <div class="span6">
                    <a href="#" id="simLeftTopic" class="btn btn-block" role="button">Show Left Topic</a>
                </div>
                <div class="span6">
                    <a href="#" id="simRightTopic" class="btn btn-block" role="button">Show Right Topic</a>
                </div>
            </div>
        </div>
        <div class="span6">
            <center><em>Disimilar Topics</em></center>
          <select id="disimilar" multiple style="width:100%; height: 140px;">
          </select>
            <div class="span12">
                <div class="span6">
                    <a href="#" id="disLeftTopic" class="btn btn-block" role="button">Show Left Topic</a>
                </div>
                <div class="span6">
                    <a href="#" id="disRightTopic" class="btn btn-block" role="button">Show Right Topic</a>
                </div>
            </div>
        </div>
        <div class="span11">
            <center><em>All Topics</em></center>
          <select id="all" multiple style="width:100%; height: 140px;">
          </select>
        </div>
      <hr>
        <div class="span11">
            <div class="span4">
                <a href="#" id="SandDDelete" class="btn btn-block" role="button">Delete</a>
            </div>
            <div class="span4">
                <a href="#" id="SandDSimilar" class="btn btn-block" role="button">Similar</a>
            </div>
            <div class="span4">
                <a href="#" id="SandDDisimilar" class="btn btn-block" role="button">Disimilar</a>
            </div>
        </div>
  </div>
    <div class="modal-footer row-fluid" style="width: 95%;">
          <div class="span12">
              <a id="saveSandD" href="#" class="btn btn-block" role="button">Save</a>
          </div>
    </div>
</div>