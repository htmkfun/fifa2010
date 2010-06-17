// js class template
Fifa = (function(){
  // class private attributes
  // var __foo;

  // class private methods
  // var __bar = function(){ return __foo };

  // instance definition
  function self(){
    // instance private attributes
    var $this = this;

    // instance private methods
    // var _bar = function(){ return _foo };

    // instance public attributes
    // this.foo = 'foo';

    // instance public methods
    // this.bar = function(){ return this.foo() + _bar() };

    // instance constructor
    function constructor(){
      
    }

    // end of instance definition
    // apply constructor
    constructor.apply(this, arguments);
  }

  // class public attributes
  // self.foo = 'self.foo';
  self.teamGroups = {};

  self.KoboardMap = {
    'Roundof16': {
      'g_A_r_0': 'ko_ht49', // 1A
      'g_A_r_1': 'ko_at52', // 2A
      'g_B_r_0': 'ko_ht52', // 1B
      'g_B_r_1': 'ko_at49', // 2B
      'g_C_r_0': 'ko_ht50', // 1C
      'g_C_r_1': 'ko_at51', // 2C
      'g_D_r_0': 'ko_ht51', // 1D
      'g_D_r_1': 'ko_at50', // 2D
      'g_E_r_0': 'ko_ht53', // 1E
      'g_E_r_1': 'ko_at55', // 2E
      'g_F_r_0': 'ko_ht55', // 1F
      'g_F_r_1': 'ko_at53', // 2F
      'g_G_r_0': 'ko_ht54', // 1G
      'g_G_r_1': 'ko_at56', // 2G
      'g_H_r_0': 'ko_ht56', // 1H
      'g_H_r_1': 'ko_at54' // 2H
    },
    'Quarter-finals': {
      'ko_ht58': ['ko_ht49', 'ko_at49'], // W49
      'ko_at58': ['ko_ht50', 'ko_at50'], // W50
      'ko_at59': ['ko_ht51', 'ko_at51'], // W51
      'ko_ht59': ['ko_ht52', 'ko_at52'], // W52
      'ko_ht57': ['ko_ht53', 'ko_at53'], // W53
      'ko_at57': ['ko_ht54', 'ko_at54'], // W54
      'ko_ht60': ['ko_ht55', 'ko_at55'], // W55
      'ko_at60': ['ko_ht56', 'ko_at56'] // W56
    },
    'Semi-finals': {
      'ko_at61': ['ko_ht57', 'ko_at57'], // W57
      'ko_ht61': ['ko_ht58', 'ko_at58'], // W58
      'ko_ht62': ['ko_at59', 'ko_ht59'], // W59
      'ko_at62': ['ko_ht60', 'ko_at60'] // W60
    },
    'Finals': {
      'ko_ht64': ['ko_ht61', 'ko_at61'], // W61
      'ko_at64': ['ko_ht62', 'ko_at62'] // W62
    },
    'Champin': {
    }
  };

  // class public methods
  // self.bar = function(){ return self.foo };
  
  self.init = function(){
    self.initDatas();
    self.initTeamGroups();
    self.initRoundof16();
    self.initQuarterFinals();
    self.initSemiFinals();
  };

  self.initDatas = function(){
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
    self.teamGroups = teamGroups;
  };

  self.initTeamGroups = function(){
    $("#groups").each(function(){
      var groupBoxTpl = $("#team-model").html();
      var teamBoxTpl = $("#team-model").find(".teams").html();
      var groupsBox = $(this);
      groupsBox.html("");

      // init html
      $.each(self.teamGroups, function(groupNo, teams){
        var groupBox = $(groupBoxTpl).appendTo(groupsBox);
        groupBox.data('groupNo', groupNo);
        groupBox.attr('id', 'groupBox'+groupNo);
        groupBox.find("h2").html("Group "+groupNo);
        groupBox.find(".teams").html("");
        $.each(teams, function(i, team){
          var teamBox = $(teamBoxTpl).appendTo(groupBox.find(".teams"));
          teamBox.find(".team").html(team.name);
          teamBox.find(".team").data('team', team);
        });
      });

      // init groupsBox behaviors
      groupsBox.find(".teams").sortable({
        containment: 'parent',
        update: function(event, ui){
          // get rank
          self.updateKoboardBoxBygroupsBox(ui.item.parents(".group"));
        },
        cursor: 'crosshair'
      });

      // init koboardBox
      $("#koboard .fteam").hover(function(){
        $(this).addClass('mouseover');
      }, function(){
        $(this).removeClass('mouseover');
      });

    });
  };

  self.initRoundof16 = function(){
    $.each(self.KoboardMap['Roundof16'], function(team_key, r16){
      $("#"+r16).click(function(){
        self.setQuarterFinals(self.findQuarterFinals($(this)), $(this));
      });
    })
  };

  self.initQuarterFinals = function(){
    $.each(self.KoboardMap['Quarter-finals'], function(qf, r16s){
      $("#"+qf).click(function(){
        self.setSemiFinals(self.findSemiFinals($(this)), $(this));
      });
    });
  };

  self.initSemiFinals = function(){
    $.each(self.KoboardMap['Semi-finals'], function(sf, qfs){
      $("#"+sf).click(function(){
        $.each(self.KoboardMap['Finals'], function(f, sfs){
          if(sfs.indexOf(sf) != -1){
            self.setFinals($("#"+f), $("#"+sf));
          }
        });
      });
    });
  };

  self.updateKoboardBoxBygroupsBox = function(groupBox){
    groupBox.find(".teamBox").each(function(i, teamBox){
//      var groupNo = groupBox.attr('id').match(/groupBox([A-Z])/)[1];
      var groupNo = groupBox.data('groupNo');
      var key = "g_"+groupNo+"_r_"+i;
      var id = self.KoboardMap["Roundof16"][key];
      if(id){
        self.setRoundof16($("#"+id), $(teamBox));
      }
    });
  };

  self.findQuarterFinals = function(r16){
    var $qf;
    $.each(self.KoboardMap['Quarter-finals'], function(qf, r16s){
      if(r16s.indexOf(r16.attr('id')) != -1){
        $qf = $("#"+qf);
      }
    });
    return $qf;
  };

  self.findSemiFinals = function(qf){
    var $sf;
    $.each(self.KoboardMap['Semi-finals'], function(sf, qfs){
      if(qfs.indexOf(qf.attr('id')) != -1){
        $sf = $("#"+sf);
      }
    });
    return $sf;
  };

  self.findFinals = function(sf){
    var $f;
    $.each(self.KoboardMap['Finals'], function(f, sfs){
      if(sfs.indexOf(sf.attr('id')) != -1){
        $f = $("#"+f);
      }
    });
    return $f;
  };

  self.setRoundof16 = function(r16, teamBox){
    var teamData = teamBox.find('.team').data('team');
    if(!r16.data('html')){
      r16.data('html', r16.html());
    }
    r16.html(teamData.name);
    self.setQuarterFinals(self.findQuarterFinals(r16));
  };

  self.setQuarterFinals = function(qf, r16){
    if(r16){
      var html = r16.html();
      if(r16.data('html') && html != r16.data('html')){
        if(!qf.data('html')){
          qf.data('html', qf.html());
        }
        qf.html(html);
      }
    }else if(qf.data('html')){
      qf.html(qf.data('html'));
      self.setSemiFinals(self.findSemiFinals(qf));
    }
    
  };

  self.setSemiFinals = function(sf, qf){
    if(qf){
      var html = qf.html();
      if(qf.data('html') && html != qf.data('html')){
        if(!sf.data('html')){
          sf.data('html', sf.html());
        }
        sf.html(html);
      }
    }else if(sf.data('html')){
      sf.html(sf.data('html'));
      self.setFinals(self.findFinals(sf));
    }
  };


  self.setFinals = function(f, sf){
    if(sf){
      var html = sf.html();
      if(sf.data('html') && html != sf.data('html')){
        if(!f.data('html')){
          f.data('html', f.html());
        }
        f.html(html);
      }
    }else if(f.data('html')){
      f.html(f.data('html'));
    }
  };

  // end of class definition
  return self;
})();


$(function(){
  Fifa.init();
});
