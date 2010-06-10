$(function(){
  
  $("#groups").each(function(){
    var groupBoxTpl = $("#team-model").html();
    var teamBoxTpl = $("#team-model").find(".teams").html();
    var groupsBox = $(this);
    groupsBox.html("");

    // init html
    for(var i="A".charCodeAt();i <= "H".charCodeAt();i++){
      var groupNo = String.fromCharCode(i);
      var groupBox = $(groupBoxTpl).appendTo(groupsBox);
      groupBox.find("h2").html("Group "+groupNo);
      groupBox.find(".teams").html("");
      for(var j=1;j<=4;j++){
        var teamBox = $(teamBoxTpl).appendTo(groupBox.find(".teams"));
        teamBox.find(".team").html("Group "+groupNo+" Team "+j);
      }
    }

    // init groupsBox behaviors
    groupsBox.find(".teams").sortable({
      cursor: 'crosshair'
    });

    // init koboardBox
    $("#koboard .fteam").hover(function(){
      $(this).addClass('mouseover');
    }, function(){
      $(this).removeClass('mouseover');
    })

  });


});