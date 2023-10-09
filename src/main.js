
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

const cubeUVs = [
    // Front
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0),

    // Left
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0),

    // Back
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0),

    // Right
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0),

    // Top
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0),

    // Bottom
    vec2(1.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 0.0)
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
var V_loc;
var program;

var left = -10;          
var right = 10;          
var bottom = -10;        
var topBound = 10;       
var near = -10;          
var far = 10;            

var cubes = [];
var cubes_degs = [];
var cubes_delta_degs = [];
var degs = 0;

var sphere1;
var sphere2;

var plane;

var camera;

function DegsToRads(degree) {
    var rad = degree * (Math.PI / 180);
    return rad;
}    

function loadTexture(url) {
    const texture = gl.createTexture();
    const image = new Image();

    image.onload = e => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.generateMipmap(gl.TEXTURE_2D);
    };

    image.src = url;
    return texture;
}

function createSphereVertices(radius, segments, rings) {
    const vertices = [];

    for (let i = 0; i <= rings; i++) {
        const phi = (i * Math.PI) / rings;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        for (let j = 0; j <= segments; j++) {
            const theta = (j * 2 * Math.PI) / segments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const x = cosTheta * sinPhi;
            const y = cosPhi;
            const z = sinTheta * sinPhi;

            vertices.push(vec3(x * radius, y * radius, z * radius));
        }
    }

    return vertices;
}

function calculateSphereNormals(vertices) {
    const normals = [];

    for (let i = 0; i < vertices.length; i ++) {
        const x = vertices[i][0];
        const y = vertices[i][1];
        const z = vertices[i][2];

        // Calculate the normal vector by normalizing the vertex position
        const length = Math.sqrt(x * x + y * y + z * z);
        const normalX = x / length;
        const normalY = y / length;
        const normalZ = z / length;

        normals.push(vec3(normalX, normalY, normalZ));
    }

    return normals;
}

function generateSphereUVs(segments, rings) {
    const uvs = [];

    for (let i = 0; i <= rings; i++) {
        const v = 1 - (i / rings); // Calculate V (vertical) coordinate

        for (let j = 0; j <= segments; j++) {
            const u = 1 - (j / segments); // Calculate U (horizontal) coordinate
            uvs.push(vec2(u, v)); // Store the UV coordinate
        }
    }

    return uvs;
}


function createPlaneVertices(width, length, dX, dY)
{
    const z = 0;
    vertices = [];
    for(let x = 0; x < length; x+=dX)
    {
        for(let y = 0; y < width; y+=dY)
        {
            let x1 = x;
            let y1 = y;
            let z1 = z;

            let x2 = x + dX;
            let y2 = y + dY;
            let z2 = z;

            let x3 = x + dX;
            let y3 = y;
            let z3 = z;

            let x5 = x;
            let y5 = y + dY;
            let z5 = z;

            vertices.push(vec3(x1, y1, z1));
            vertices.push(vec3(x2, y2, z2));
            vertices.push(vec3(x3, y3, z3));
            vertices.push(vec3(x1, y1, z1));
            vertices.push(vec3(x5, y5, z5));
            vertices.push(vec3(x2, y2, z2));
        }
    }
    return vertices;
}

function calculatePlaneNormals(vertices)
{
    var normals = [];
    for(let i = 0; i < vertices.length; i++)
    {
        normals.push(vec3(0, 0, 1));
    }
    return normals;
}

function generatePlaneUVs(width, length, dX, dY) {
    const uvs = [];

    for (let x = 0; x < length; x += dX) {
        for (let y = 0; y < width; y += dY) {
            // Calculate U (horizontal) and V (vertical) coordinates
            const u = x / length;
            const v = y / width;
            
            // Add the four UV coordinates for the current quad
            uvs.push(vec2(u, v));
            uvs.push(vec2(u + dX / length, v));
            uvs.push(vec2(u + dX / length, v + dY / width));
            uvs.push(vec2(u, v));
            uvs.push(vec2(u, v + dY / width));
            uvs.push(vec2(u + dX / length, v + dY / width));
        }
    }

    return uvs;
}

function CreateCubeGrid(x, y)
{
    for(let i = 0; i < x; i++)
    {
        for(let j = 0; j < y; j++)
        {
            var cube = new Cube();
            cube.setPosition(i*(35/x) - 31/2, j*(20/y) - 15/2, 0);
            cube.setColor(Math.random(), Math.random(), Math.random());
            cube.setScale(2.5, 2.5, 2.5);
            cubes.push(cube);
            cubes_degs.push(0);
            cubes_delta_degs.push(Math.random()*2 + .25);
        }
    }
}

function CreateCubeRing(count, radius)
{
    var box_degs = 0;
    var loc_degs = 360/(count);
    for(let i = 0; i < count; i++)
    {
        var cube = new Cube();
        cube.setPosition(radius*Math.cos(DegsToRads(box_degs)), radius*Math.sin(DegsToRads(box_degs)), 0.0);
        cube.setColor(Math.random(), Math.random(), Math.random());
        cube.setScale(1.0, 1.0, 1.0);
        cubes.push(cube);
        cubes_degs.push(0);
        cubes_delta_degs.push(Math.random()*2 + .25);

        box_degs += loc_degs;
        
    }
}

function DrawCubes()
{
    for(let i = 0; i < cubes.length; i++)
    {
        cubes[i].draw();

        // cubes_degs[i] += 2;
        cubes_degs[i] += cubes_delta_degs[i];

        cubes[i].rotateX(cubes_degs[i]*1.2);
        cubes[i].rotateY(cubes_degs[i]*0.6);
        cubes[i].rotateZ(cubes_degs[i]);

    }
}

window.onload = function init()
{

    var canvas = document.getElementById( "canvas" ); 
    
    gl = canvas.getContext('webgl2');                   
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport(0, 0, canvas.width, canvas.height);  
    // gl.clearColor( 0.0, 0.0, 0.0, 1.0 );  
    gl.enable(gl.DEPTH_TEST);      
    
    
    // Textures
    const default_Texture = loadTexture(`/static/default.png`);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, default_Texture);

    // Create shader program
    // program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program = initShaders( gl, "dl-vertex-shader", "dl-fragment-shader" ); 
    gl.useProgram(program); 
        
    aspect = canvas.width / canvas.height;
    left  *= aspect;                                  
    right *= aspect;    
    projectionMatrix = ortho(left, right, bottom, topBound, near, far*10); 
    projectionMatrix = perspective(110, aspect, 1e-4, 1e4);

    colorLoc = gl.getUniformLocation(program, "color");  
    MV_loc = gl.getUniformLocation(program, "MV");
    vPositionLoc = gl.getAttribLocation(program, "vPosition");  
    P_loc = gl.getUniformLocation(program, "P"); 
    normals_Loc = gl.getUniformLocation(program, "vNormal");
    N_loc = gl.getUniformLocation(program, "N");
    V_loc = gl.getUniformLocation(program, "V");

    gl.uniformMatrix4fv(P_loc, false, flatten(projectionMatrix));      

    // ==== Create Objects ====
    // CreateCubeGrid(8, 4);
    CreateCubeRing(50, 16);

    let plane_size = 50;
    plane = new Plane(plane_size, plane_size, 2, 2);
    plane.setColor(.2, .2, .2);
    plane.setPosition(-plane_size/2, -plane_size/5, plane_size/2);
    plane.rotateX(90);
    plane.setDrawMode(gl.LINE_LOOP);

    // Texure Testing
    var test_verts = createSphereVertices(1, 100, 50);
    var test_uvs = generateSphereUVs(100, 50);
    console.log(test_verts.length);
    console.log(test_uvs.length);

    test_verts = createPlaneVertices(50, 50, 2, 2);
    test_uvs = generatePlaneUVs(50, 50, 2, 2);
    console.log(test_verts.length);
    console.log(test_uvs.length);

    sphere1 = new Sphere(1, 200, 100);
    sphere1.setScale(5, 5, 5);
    sphere1.setPosition(0, 0, -7);

    sphere2 = new Sphere(1, 100, 50);
    sphere2.setScale(3, 3, 3);
    sphere2.setColor(0.041, 0.78, 0.361);

    // ==== Create Camera ====
    camera = new Camera();
    camera.setPosition(0, 10, 10);

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);                            
    
    camera.setPosition(15*Math.cos(degs/80), sphere2.position[1]+5, 15*Math.sin(degs/80));
    camera.update();
    camera.lookAt(sphere2.position);
    // camera.lookAt(vec3(0,0,0));


    degs += 2;

    DrawCubes();

    sphere1.draw();
    sphere1.setPosition(0, 20*Math.sin(degs/80), 20*Math.cos(degs/80));

    sphere2.draw();
    sphere2.setPosition(5*Math.sin(degs/60), 2*Math.sin(sphere2.position[0]/2), 5*Math.sin(degs/80))

    plane.draw();

    requestAnimationFrame(render);                           
}
