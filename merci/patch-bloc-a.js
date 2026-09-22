(function(){
 var ed = window.__ED, v = ed.getValue(), rapports = [];
 var AJOUTS = "4557400154:58,4345260154:59,4475810154:60,4348200154:61,4357700154:62,4477860154:63,4372240154:64,4481700154:65,4196440154:66,4560400154:67,4864760154:68,4582030154:69,4584450154:70,4510020154:71,4869020154:72,4587960154:73,4593320154:74,4597090154:75,4801070154:76,4513790154:77,4517540154:78,4804310154:79,4807900154:80,4523130154:81";
 var PREFIXES_LIGNE = "  var PREFIXES=['12025372','12025383','12025384'];";
 var VIEUX_COM = "/* identifiant de pub sans le préfixe 12025372 : numéro de la vidéo (SUIVI/pubs-promesses.json) */";
 var NEUF_COM = "/* Identifiants de pub Meta : le préfixe change d'une campagne à l'autre. 12025372 = campagnes chaude et froide,\n     12025383 = test des vidéos de l'agence (58 a 67, lance le 21/09), 12025384 = test Bordeaux 14-09 (68 a 81, lance le 22/09).\n     La table ci-dessous donne le numero de video pour l'identifiant PRIVE de son prefixe (10 chiffres, aucune collision entre les trois).\n     Sources : SUIVI/pubs-promesses.json, SUIVI/pubs-agence-bordeaux-68-81.json et les campagne_*.json des ateliers. */\n" + PREFIXES_LIGNE;
 var VIEUX_CODE = "var court=pub.indexOf('12025372')===0?pub.slice(8):'', num='';";
 var NEUF_CODE = "var court='', num='';\n    for(var pi=0;pi<PREFIXES.length;pi++){ if(pub.indexOf(PREFIXES[pi])===0){ court=pub.slice(PREFIXES[pi].length); break; } }";
 if (v.indexOf('PREFIXES') >= 0) return 'DEJA FAIT, rien touche';
 var n1 = v.split(VIEUX_COM).length - 1, n2 = v.split(VIEUX_CODE).length - 1;
 if (n1 !== 1 || n2 !== 1) return 'ARRET : commentaire x' + n1 + ', code x' + n2;
 v = v.replace(VIEUX_COM, NEUF_COM).replace(VIEUX_CODE, NEUF_CODE);
 var i = v.indexOf("var VIDEOS='"); var j = v.indexOf("'", i + 12);
 if (i < 0 || j < 0) return 'ARRET : table VIDEOS introuvable';
 var table = v.slice(i + 12, j);
 var cles = {}; table.split(',').forEach(function(x){ cles[x.split(':')[0]] = 1; });
 var doublons = AJOUTS.split(',').filter(function(x){ return cles[x.split(':')[0]]; });
 if (doublons.length) return 'ARRET : collision ' + doublons.join(' ');
 v = v.slice(0, j) + ',' + AJOUTS + v.slice(j);
 ed.setValue(v, -1);
 var w = ed.getValue();
 return 'POSE ok | chars ' + window.__AVANT.length + ' -> ' + w.length + ' | prefixes=' + (w.indexOf("['12025372','12025383','12025384']") >= 0) + ' | entrees=' + (w.split(':').length - 1);
})()