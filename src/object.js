class Object
{
    dim;
    vertices;
    vbo;
    position;
    rotation;
    scale;
    color;

    m_rotationX;
    m_rotationY;
    m_rotationZ;
    m_scale;
    m_translate;
    m_modelView;
    m_normal;

    drawMode;

    constructor(vertices, dim)
    {
        this.vertices = vertices;
        this.position = vec3(0,0,0);
        this.rotation = vec3(0,0,0);
        this.scale = vec3(1,1,1);
        this.color = vec3(1,0,0);
        this.dim = dim; 
        
        this.init();

        this.m_translate = translate(0.0, 0.0, 0.0);     
        this.m_scale = scale(1.0, 1.0, 1.0);     
        this.m_rotationX = rotate(0, vec3(1.0, 0.0, 0.0));
        this.m_rotationY = rotate(0, vec3(0.0, 1.0, 0.0));
        this.m_rotationZ = rotate(0, vec3(0.0, 0.0, -1.0));
        this.updateModelView();
        this.m_normal = normalMatrix(this.m_modelView, true);
        
        this.drawMode = gl.TRIANGLES;
    }

    init()
    {
        this.vbo = Vbo(gl, this.vertices, this.dim);
    }

    setPosition(x, y, z)
    {
        this.position = vec3(x, y, z);
        this.m_translate = translate(x, y, z);
    }

    setScale(x, y, z)
    {
        this.scale = vec3(x, y, z);
        this.m_scale = scale(x, y, z);                            
    }

    setColor(r, g, b)
    {
        this.color = vec3(r, g, b);
    }

    setDrawMode(mode)
    {
        this.drawMode = mode;
    }

    rotateX(degs)
    {
        var R1 = rotate(degs, vec3(1.0, 0.0, 0.0));
        var T = translate(this.position[0], this.position[1], this.position[2]);
        var positionI = negate(this.position);
        var TI = translate(positionI[0], positionI[1], positionI[2]);

        this.m_rotationX = mult(T, mult(R1, TI)); 
    }

    rotateY(degs)
    {
        var R1 = rotate(degs, vec3(0.0, 1.0, 0.0));
        var T = translate(this.position[0], this.position[1], this.position[2]);
        var positionI = negate(this.position);
        var TI = translate(positionI[0], positionI[1], positionI[2]);

        this.m_rotationY = mult(T, mult(R1, TI)); 
    }

    rotateZ(degs)
    {
        var R1 = rotate(degs, vec3(0.0, 0.0, -1.0));
        var T = translate(this.position[0], this.position[1], this.position[2]);
        var positionI = negate(this.position);
        var TI = translate(positionI[0], positionI[1], positionI[2]);

        this.m_rotationZ = mult(T, mult(R1, TI));  
    }

    updateModelView()
    {
        var m_rotation = mult(this.m_rotationZ, mult(this.m_rotationY, this.m_rotationX));
        this.m_modelView = mult(this.m_translate, this.m_scale);                    
        this.m_modelView = mult(m_rotation, this.m_modelView);
    }

    draw()
    {
        this.updateModelView();
        this.m_normal = normalMatrix(this.m_modelView, true);
        
        gl.uniform4f(colorLoc, this.color[0], this.color[1], this.color[2], 1.0);                 
        this.vbo.BindToAttribute(vPositionLoc); 
        gl.uniformMatrix4fv(MV_loc, false, flatten(this.m_modelView)); 
        gl.drawArrays(this.drawMode, 0, this.vertices.length); 
    }

    copy()
    {
        // This could be way better
        return new Object(this.vertices, this.dim, this.normals);
    }


}