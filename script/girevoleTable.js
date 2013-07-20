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

var points11= [[0,0,0],[-0.3,0.7,0],[0,1.9,0],[0.7,2.2,0],[1.3,2.2,0],[2,1.9,0],[2.3,0.75,0],[2,0,0],[2,0,0],[2,0,0],[0.9,0.7,0],[0,0,0]]
var knots11 = generateKnot(points11)
var nubs11 = NUBS(S0)(2)(knots11)(points11);
var curve11 = MAP(nubs11)(domain);

var points12= [[0,0,0.5],[-0.3,0.7,0.5],[0,1.9,0.5],[0.7,2.2,0.5],[1.3,2.2,0.5],[2,1.9,0.5],[2.3,0.75,0.5],[2,0,0.5],[2,0,0.5],[2,0,0.5],[0.9,0.7,0.5],[0,0,0.5]]
var knots12 = generateKnot(points12)
var nubs12 = NUBS(S0)(2)(knots12)(points12);
var curve12 = MAP(nubs12)(domain);

var surf1 = BEZIER(S1)([nubs11,[1,1,0]])
var surface1 = MAP(surf1)(dom2d)

var surf2 = BEZIER(S1)([nubs12,[1,1,0.5]])
var surface2 = MAP(surf2)(dom2d)

var surf12 = BEZIER(S1)([nubs11,nubs12])
var surface12 = MAP(surf12)(dom2d)

var semiluna = S([0,1])([3.5,3.2])(STRUCT([surface12,surface2,surface1]))

//base rot

var ellisse = S([0])([1.5])(DISK()())
var rotator = T([0,1])([3.8,4])(EXTRUDE([1])(ellisse))
var ellisse2 = S([1])([1.5])(DISK()())
var rotator2 = T([0,1])([3.8,4])(EXTRUDE([1])(ellisse2))

var girevoleTable = STRUCT([semiluna,T([0,2])([-0.5,0.5])(rotator2),T([0,2])([6.5,1.5])(R([0,1])([PI/2])(semiluna)),T([0,1,2])([5,-1.7,2])(R([0,1])([PI/3])(rotator)),T([0,2])([3.5,3])(R([0,1])([PI/4])(semiluna))])

var model = S([2])([0.7])(COLOR(rgb01(59,51,50))(girevoleTable))
DRAW(model)



