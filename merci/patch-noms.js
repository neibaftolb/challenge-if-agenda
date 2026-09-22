(function(){
 var ed = window.__ED, v = ed.getValue();
 if (v.indexOf('Test vidéos agence') >= 0) return 'DEJA FAIT';
 var C = {"120253834194540154": "Test vidéos agence (58 à 67)", "120253844500480154": "Test vidéos agence Bordeaux (68 à 81)"}, E = {"120253834195310154": "Test agence · vidéo 66", "120253834331880154": "Test agence · vidéo 59", "120253834333750154": "Test agence · vidéo 61", "120253834334680154": "Test agence · vidéo 62", "120253834337790154": "Test agence · vidéo 64", "120253834469840154": "Test agence · vidéo 60", "120253834470630154": "Test agence · vidéo 63", "120253834472000154": "Test agence · vidéo 65", "120253834552250154": "Test agence · vidéo 58", "120253834554060154": "Test agence · vidéo 67", "120253844501480154": "Test Bordeaux · vidéo 71", "120253844502460154": "Test Bordeaux · vidéo 77", "120253844504340154": "Test Bordeaux · vidéo 78", "120253844506370154": "Test Bordeaux · vidéo 81", "120253844569560154": "Test Bordeaux · vidéo 69", "120253844571800154": "Test Bordeaux · vidéo 70", "120253844574350154": "Test Bordeaux · vidéo 73", "120253844576090154": "Test Bordeaux · vidéo 74", "120253844578580154": "Test Bordeaux · vidéo 75", "120253844793920154": "Test Bordeaux · vidéo 76", "120253844795010154": "Test Bordeaux · vidéo 79", "120253844796960154": "Test Bordeaux · vidéo 80", "120253844855960154": "Test Bordeaux · vidéo 68", "120253844859150154": "Test Bordeaux · vidéo 72"};
 function completer(nom, ajouts){
   var i = v.indexOf('var ' + nom + '={'); if (i < 0) return 'ARRET : ' + nom + ' introuvable';
   var j = v.indexOf('};', i); if (j < 0) return 'ARRET : fin de ' + nom + ' introuvable';
   var dedans = v.slice(i, j);
   var neuf = Object.keys(ajouts).filter(function(k){ return dedans.indexOf("'" + k + "'") < 0; })
                    .map(function(k){ return "'" + k + "':'" + ajouts[k] + "'"; });
   if (!neuf.length) return nom + ' : rien à ajouter';
   v = v.slice(0, j) + ',\n    ' + neuf.join(',') + v.slice(j);
   return nom + ' : +' + neuf.length;
 }
 var r1 = completer('CAMPAGNES', C), r2 = completer('ENSEMBLES', E);
 if (String(r1).indexOf('ARRET') === 0 || String(r2).indexOf('ARRET') === 0) return r1 + ' | ' + r2;
 ed.setValue(v, -1);
 return r1 + ' | ' + r2 + ' | chars -> ' + ed.getValue().length;
})()