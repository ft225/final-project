function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
}

function rgb01(r, g, b){
  var r0 = r/255.0;
  var g0 = g/255.0;
  var b0 = b/255.0;
  return [r0, g0, b0, 1];
}

var domain = INTERVALS(1)(50)
var dom2d = DOMAIN([[0,1],[0,1]])([60,60]);
var domainRot = DOMAIN([[0,1],[0,PI]])([50,50]);

var points11 = [[0,0,0],[1.5,0,0],[1.5,0,0],[2,3.5,0],[5,4,0],[8,3.5,0],[8.5,0,0],[8.5,0,0],[10,0,0],[10,0,0],[10,-1,0],[8.5,-4,0],[5,-5.5,0],[1.5,-4,0],[0,-1,0],[0,0,0]]
var knots11 = generateKnot(points11)
var nubs11 = NUBS(S0)(2)(knots11)(points11);
var curve11 = MAP(nubs11)(domain);

var points12 = [[0,0,3],[1.5,0,3],[1.5,0,3],[2,3.5,3],[5,4,3],[8,3.5,3],[8.5,0,3],[8.5,0,3],[10,0,3],[10,0,3],[10,-1,3],[8.5,-4,3],[5,-5.5,3],[1.5,-4,3],[0,-1,3],[0,0,3]]
var knots12 = generateKnot(points12)
var nubs12 = NUBS(S0)(2)(knots12)(points12);
var curve12 = MAP(nubs12)(domain);

var points13 = [[0,0,1.5],[1.5,0,1.5],[1.5,0,1.5],[2,3.5,1,5],[5,4,1.5],[8,3.5,1.5],[8.5,0,1.5],[8.5,0,1.5],[10,0,1.5],[10,0,1.5],[10,-1,1.5],[9,-4.5,1.5],[5,-6,1.5],[1,-4.5,1.5],[0,-1,1.5],[0,0,1.5]]
var knots13 = generateKnot(points13)
var nubs13 = NUBS(S0)(2)(knots13)(points13);
var curve13 = MAP(nubs13)(domain);

var sur12 = BEZIER(S1)([nubs11,nubs13,nubs12])
var surface12 = MAP(sur12)(dom2d)

var sur11 = BEZIER(S1)([nubs11,[5,0,0]])
var surface11 = MAP(sur11)(dom2d)

var sur22 = BEZIER(S1)([nubs12,[5,0,3]])
var surface22 = MAP(sur22)(dom2d)

var pillowAnt = STRUCT([surface11,surface12,surface22])

//schienale

var points1 = [[3.5,0,2],[5,0,2],[5,0,2],[5,0,5.5],[5,0,5.5],[6,0,5.5],[5,0,7],[3.5,0,6],[3.5,0,2]]
var knots1 = generateKnot(points1)
var nubs1 = NUBS(S0)(2)(knots1)(points1);
var curve1 = MAP(nubs1)(domain);

var sur1 = BEZIER(S1)([nubs1,[4.2,0,5.5]])
var surface1 = MAP(sur1)(dom2d)


var mapping = ROTATIONAL_SURFACE(nubs1)
var schien= MAP(mapping)(domainRot)

var pointc1 = [[0,0,0],[0,1,1.5],[0,0,3],[0,-1,2.5],[0,0,1.5],[0,-0.2,0],[0,0,0]]
var knotsc1 = generateKnot(pointc1)
var nubsc1 = NUBS(S0)(2)(knotsc1)(pointc1);
var curvec1 = MAP(nubsc1)(domain);

var pointc2 = [[2,0,0],[2,1,1.5],[2,0,3],[2,-1,2.5],[2,0,1.5],[2,-0.2,0],[2,0,0]]
var knotsc2 = generateKnot(pointc2)
var nubsc2 = NUBS(S0)(2)(knotsc2)(pointc2);
var curvec2 = MAP(nubsc2)(domain);

var surc12 = BEZIER(S1)([nubsc1,nubsc2])
var surfacec12 = MAP(surc12)(dom2d)

var surc1 = BEZIER(S1)([nubsc1,[0,0,1.5]])
var surfacec1 = MAP(surc1)(dom2d)

var surc2 = BEZIER(S1)([nubsc2,[2,0,1.5]])
var surfacec2 = MAP(surc2)(dom2d)

var poggiaTesta = S([0,2])([2,1.5])(STRUCT([surfacec1,surfacec12,surfacec2]))


var bottone =S([0,1,2])([0.2,0.2,0.2])(STRUCT([EXTRUDE([0.3])(DISK()()),S([0,1])([0.2,0.2])(EXTRUDE([1])(DISK()()))]))
var bottoni = STRUCT([T([0,2])([0.2,5])(R([1,2])(PI/2)(bottone)),T([0,2])([10,5])(R([1,2])(PI/2)(bottone)),T([0,1,2])([7,5.3,7])(R([0,2])([PI/2])(bottone)),T([0,1,2])([3,5.3,7])(R([0,2])([-PI/2])(bottone))])

var base = S([0,1])([5,5])(COLOR(rgb01(0,0,0))(EXTRUDE([0.3])(DISK()())))

var model = COLOR(rgb01(140,72,50))(STRUCT([T([0,1,2])([3,5.5,2.2])(poggiaTesta),pillowAnt,T([0,2])([5,-2])(schien),T([0,2])([5,-2])(surface1),T([0,2])([5,-2])(R([0,1])(PI)(surface1))]))
var model_complete = STRUCT([S([2])([1.2])(model),T([0,2])([5,-0.3])(base),bottoni])

DRAW(model_complete)
