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
var dom2d = DOMAIN([[0,1],[0,1]])([50,50]);
var domainRot = DOMAIN([[0,1],[0,2*PI]])([50,50]);

//superiore

var pointsup = [[0.2,0,0],[1,0,1.5],[2,0,3]]
var knotsup = generateKnot(pointsup);
var nubsup = NUBS(S0)(2)(knotsup)(pointsup)
var surSup = ROTATIONAL_SURFACE(nubsup)
var lamp = COLOR([0.4,0.4,0.4])(MAP(surSup)(domainRot))

//barra

var bar = COLOR(rgb01(246,172,0))(CYL_SURFACE([0.2,19])(30))

var base = COLOR([0.4,0.4,0.4])(EXTRUDE([0.5])(DISK()()))
var lampada = STRUCT([bar,T([2])([19])(lamp),T([2])([-0.5])(S([0,1])([2,2])(base))])
DRAW(lampada)