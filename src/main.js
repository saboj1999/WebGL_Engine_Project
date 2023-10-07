
const cubeVertices = [
    //Front
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, -.5, 0.5),
    vec3(-.5, 0.5, 0.5),
    vec3(-.5, 0.5, 0.5),
    vec3(0.5, -.5, 0.5),
    vec3(-.5, -.5, 0.5),

    //Left
    vec3(-.5, 0.5, 0.5),
    vec3(-.5, -.5, 0.5),
    vec3(-.5, 0.5, -.5),
    vec3(-.5, 0.5, -.5),
    vec3(-.5, -.5, 0.5),
    vec3(-.5, -.5, -.5),

    //Back
    vec3(-.5, 0.5, -.5),
    vec3(-.5, -.5, -.5),
    vec3(0.5, 0.5, -.5),
    vec3(0.5, 0.5, -.5),
    vec3(-.5, -.5, -.5),
    vec3(0.5, -.5, -.5),

    //Right
    vec3(0.5, 0.5, -.5),
    vec3(0.5, -.5, -.5),
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, -.5, 0.5),
    vec3(0.5, -.5, -.5),

    //Top
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, 0.5, -.5),
    vec3(-.5, 0.5, 0.5),
    vec3(-.5, 0.5, 0.5),
    vec3(0.5, 0.5, -.5),
    vec3(-.5, 0.5, -.5),

    //Bottom
    vec3(0.5, -.5, 0.5),
    vec3(0.5, -.5, -.5),
    vec3(-.5, -.5, 0.5),
    vec3(-.5, -.5, 0.5),
    vec3(0.5, -.5, -.5),
    vec3(-.5, -.5, -.5)
];

const cubeNormals = [
    //Front
    vec3(0, 0, 1),
    vec3(0, 0, 1),
    vec3(0, 0, 1),
    vec3(0, 0, 1),
    vec3(0, 0, 1),
    vec3(0, 0, 1),
        
    //Left
    vec3(-1, 0, 0),
    vec3(-1, 0, 0),
    vec3(-1, 0, 0),
    vec3(-1, 0, 0),
    vec3(-1, 0, 0),
    vec3(-1, 0, 0),

    //Back
    vec3(0, 0, -1),
    vec3(0, 0, -1),
    vec3(0, 0, -1),
    vec3(0, 0, -1),
    vec3(0, 0, -1),
    vec3(0, 0, -1),
        
    //Right
    vec3(1, 0, 0),
    vec3(1, 0, 0),
    vec3(1, 0, 0),
    vec3(1, 0, 0),
    vec3(1, 0, 0),
    vec3(1, 0, 0),

    //Top
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),

    //Bottom
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
    vec3(0, 1, 0),
];

var gl;
var aspect;        
var projectionMatrix;
var vPositionLoc;
var colorLoc;
var MV_loc;
var P_loc;
var normals_Loc;
var N_loc;
var program;

var left = -10;          
var right = 10;          
var bottom = -10;        
var topBound = 10;       
var near = -10;          
var far = 10;            

var cube;
var degs = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "canvas" ); 
    
    gl = canvas.getContext('webgl2');                   
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport(0, 0, canvas.width, canvas.height);  
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );  
    gl.enable(gl.DEPTH_TEST);        

    // program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program = initShaders( gl, "dl-vertex-shader", "dl-fragment-shader" ); 
    gl.useProgram(program); 
        
    cube = new Object(cubeVertices, 3);
    cube.setPosition(0, 0, 0);
    cube.setColor(.5, 0, 1);
    cube.setScale(8, 8, 8);

    aspect = canvas.width / canvas.height;
    left  *= aspect;                                  
    right *= aspect;    
    projectionMatrix = ortho(left, right, bottom, topBound, near, far*10); 
    // projectionMatrix = perspective(Math.PI/2, aspect, -10, 10);                             

    colorLoc = gl.getUniformLocation(program, "color");  
    MV_loc = gl.getUniformLocation(program, "MV");
    vPositionLoc = gl.getAttribLocation(program, "vPosition");  
    P_loc = gl.getUniformLocation(program, "P"); 
    normals_Loc = gl.getUniformLocation(program, "vNormal");
    N_loc = gl.getUniformLocation(program, "N");
    reverseLightingDirection = gl.getUniformLocation(program, "reverseLightingDirection");

    gl.uniformMatrix4fv(P_loc, false, flatten(projectionMatrix));      
    gl.uniformMatrix3fv(reverseLightingDirection, false, vec3(0, 1, 0));

    var vbo_normals = Vbo(gl, cubeNormals, 3);
    vbo_normals.BindToAttribute(normals_Loc);

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);                            
    
    degs += 2;

    cube.draw();
    cube.rotateX(degs*1.5);
    cube.rotateY(degs/2);
    cube.rotateZ(degs/4);

    requestAnimationFrame(render);                           
}
