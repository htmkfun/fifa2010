$(function(){

  // init datas
  var teamGroups = {}; // { A: [{name: "T1", tag: "T1"}, '{name: "T2", tag: "T2"}, {name: "T3", tag: "T3"}, '{name: "T4", tag: "T4"}], B;[...] }
  // prepare fake data
  for(var i="A".charCodeAt();i <= "H".charCodeAt();i++){
    var groupNo = String.fromCharCode(i);
    teamGroups[groupNo] = [];
    for(var j=1;j<=4;j++){
      teamGroups[groupNo].push( {name:("Group "+groupNo+" Team "+j), tag: ("g_"+groupNo+"_t_"+j)} );
    }
  }

  $("#groups").each(function(){
    var groupBoxTpl = $("#team-model").html();
    var teamBoxTpl = $("#team-model").find(".teams").html();
    var groupsBox = $(this);
    groupsBox.html("");

    // init html
    $.each(teamGroups, function(groupNo, teams){
      var groupBox = $(groupBoxTpl).appendTo(groupsBox);
      groupBox.find("h2").html("Group "+groupNo);
      groupBox.find(".teams").html("");
      $.each(teams, function(i, team){
        var teamBox = $(teamBoxTpl).appendTo(groupBox.find(".teams"));
        teamBox.find(".team").html(team.name);
      });
    });

    // init groupsBox behaviors
    groupsBox.find(".teams").sortable({
      containment: 'parent',
      cursor: 'crosshair'
    });

    // init koboardBox
    $("#koboard .fteam").hover(function(){
      $(this).addClass('mouseover');
    }, function(){
      $(this).removeClass('mouseover');
    });

  });


});