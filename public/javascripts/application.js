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
    'Finals-lost': {
      'ko_ht63': ['ko_ht61', 'ko_at61'], // L61
      'ko_at63': ['ko_ht62', 'ko_at62'], // L62
    },
    'Second-place': {
      'ko_res63': ['ko_ht63', 'ko_at63'] // W63
    },
    'Champion': {
      'ko_res64': ['ko_ht64', 'ko_at64'] // w64
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
    self.initFinals();
    self.initFinalsLost();
    self.initKoboard();
		self.initButtons();
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
    // demos
    self.teamGroups['A'][0] = {name: "Uruguay", tag: "uru"};
    self.teamGroups['A'][1] = {name: "Mexico", tag: "mex"};
    self.teamGroups['A'][2] = {name: "South Africa", tag: "rsa"};
    self.teamGroups['A'][3] = {name: "France", tag: "fra"};

    self.teamGroups['B'][0] = {name: "Argentina", tag: "arg"};
    self.teamGroups['B'][1] = {name: "Korea Republic", tag: "kor"};
    self.teamGroups['B'][2] = {name: "Greece", tag: "gre"};
    self.teamGroups['B'][3] = {name: "Nigeria", tag: "nga"};

    self.teamGroups['C'][0] = {name: "USA", tag: "usa"};
    self.teamGroups['C'][1] = {name: "England", tag: "eng"};
    self.teamGroups['C'][2] = {name: "Slovenia", tag: "svn"};
    self.teamGroups['C'][3] = {name: "Algeria", tag: "alg"};

    self.teamGroups['D'][0] = {name: "Germany", tag: "ger"};
    self.teamGroups['D'][1] = {name: "Ghana", tag: "gha"};
    self.teamGroups['D'][2] = {name: "Australia", tag: "aus"};
    self.teamGroups['D'][3] = {name: "Serbia", tag: "srb"};

    self.teamGroups['E'][0] = {name: "Netherlands", tag: "ned"};
    self.teamGroups['E'][1] = {name: "Japan", tag: "jpn"};
    self.teamGroups['E'][2] = {name: "Australia", tag: "aus"};
    self.teamGroups['E'][3] = {name: "Serbia", tag: "srb"};

    self.teamGroups['F'][0] = {name: "Paraguay", tag: "par"};
    self.teamGroups['F'][1] = {name: "Slovakia", tag: "svk"};
    self.teamGroups['F'][2] = {name: "New Zealand", tag: "nzl"};
    self.teamGroups['F'][3] = {name: "Italy", tag: "ita"};

    self.teamGroups['G'][0] = {name: "Brazil", tag: "bra"};
    self.teamGroups['G'][1] = {name: "Portugal", tag: "por"};
    self.teamGroups['G'][2] = {name: "Côte d'Ivoire", tag: "civ"};
    self.teamGroups['G'][3] = {name: "Korea DPR", tag: "prk"};

    self.teamGroups['H'][0] = {name: "Chile", tag: "chi"};
    self.teamGroups['H'][1] = {name: "Spain", tag: "esp"};
    self.teamGroups['H'][2] = {name: "Switzerland", tag: "sui"};
    self.teamGroups['H'][3] = {name: "Honduras", tag: "hon"};

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
          var html = '<img src="http://img.fifa.com/imgml/flags/s/'+team.tag+'.gif">'+'<span class="name">'+team.name+'</span>';
          teamBox.find(".team").html(html).attr('title', team.name);
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

  self.initKoboard = function(){
    $("#groups .group").each(function(){
      self.updateKoboardBoxBygroupsBox($(this));
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
            // set finals lost
            $.each(sfs, function(i, _sf){
              if(sf != _sf){
                $.each(self.KoboardMap['Finals-lost'], function(fl, sfs){
                  if(sfs.indexOf(_sf) != -1){
                    self.getPromotion($("#"+_sf), $("#"+fl));
                  }
                });
              }
            });
          }
        });
      });
    });
  };

  self.initFinals = function(){
    $.each(self.KoboardMap['Finals'], function(f, sfs){
      $("#"+f).click(function(){
        $.each(self.KoboardMap['Champion'], function(c, fs){
          if(fs.indexOf(f) != -1){
            self.setChampion($("#"+c), $("#"+f));
          }
        });
      });
    });
  };

  self.initFinalsLost = function(){
    $.each(self.KoboardMap['Finals-lost'], function(f, sfs){
      $("#"+f).click(function(){
        $.each(self.KoboardMap['Second-place'], function(c, fs){
          if(fs.indexOf(f) != -1){
            self.getPromotion($("#"+f), $("#"+c));
          }
        });
      });
    });
  };

	self.initButtons = function(){
		$(".save-guess").click(function(){
			$("#form").slideDown('slow');
		});
	};

	self.generateResult = function(){

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

self.getPromotion = function(current, next){
    if(current){
      var html = current.html();
      if(current.data('html') && html != current.data('html')){
        if(!next.data('html')){
          next.data('html', next.html());
        }
        next.html(html);
      }
    }else if(next.data('html')){
      next.html(next.data('html'));
    }
  };

  self.setRoundof16 = function(r16, teamBox){
    var teamData = teamBox.find('.team').data('team');
    if(!r16.data('html')){
      r16.data('html', r16.html());
    }
    r16.html(teamBox.html()).find(".name").text(teamData.tag.toUpperCase());
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

  self.setChampion = function(c, f){
    if(f){
      var html = f.html();
      if(f.data('html') && html != f.data('html')){
        if(!c.data('html')){
          c.data('html', c.html());
        }
        c.html(html);
      }
    }else if(c.data('html')){
      c.html(c.data('html'));
    }
  };

  // end of class definition
  return self;
})();


$(function(){
  Fifa.init();
});
