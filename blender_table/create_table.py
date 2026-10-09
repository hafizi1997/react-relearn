import bpy, math, os
from mathutils import Vector

OUT = os.path.dirname(os.path.abspath(__file__))
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

def wood(name, dark, light, scale):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*light, 1)
    m.use_nodes = True
    n = m.node_tree.nodes; l = m.node_tree.links
    p = n.get('Principled BSDF')
    p.inputs['Roughness'].default_value = .38
    p.inputs['Specular IOR Level'].default_value = .18
    p.inputs['Coat Weight'].default_value = .08
    p.inputs['Coat Roughness'].default_value = .23
    tex = n.new('ShaderNodeTexCoord')
    mapping = n.new('ShaderNodeVectorMath'); mapping.operation = 'MULTIPLY'
    mapping.inputs[1].default_value = scale
    l.new(tex.outputs['Generated'], mapping.inputs[0])
    noise = n.new('ShaderNodeTexNoise'); noise.inputs['Scale'].default_value = 4
    noise.inputs['Detail'].default_value = 4; noise.inputs['Roughness'].default_value = .7
    l.new(mapping.outputs[0], noise.inputs['Vector'])
    ramp = n.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].position = .18; ramp.color_ramp.elements[0].color = (*dark,1)
    ramp.color_ramp.elements[1].position = .82; ramp.color_ramp.elements[1].color = (*light,1)
    l.new(noise.outputs['Fac'], ramp.inputs[0]); l.new(ramp.outputs[0], p.inputs['Base Color'])
    bump = n.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = .13
    bump.inputs['Distance'].default_value = .0006
    l.new(noise.outputs['Fac'], bump.inputs['Height']); l.new(bump.outputs[0], p.inputs['Normal'])
    return m

mahogany = wood('Polished reddish mahogany', (.095,.016,.005), (.43,.095,.022), (2,32,5))
walnut = wood('Dark figured wood inlay', (.065,.015,.005), (.26,.067,.019), (3,20,3))
maple = wood('Golden maple inlay', (.42,.19,.055), (.79,.49,.20), (3,28,3))
line = wood('Fine maple border', (.5,.27,.09), (.85,.59,.28), (2,30,3))

def finish(obj, mat, bevel=0):
    obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new('Soft crafted edges', 'BEVEL'); mod.width=bevel; mod.segments=3
        mod = obj.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL')
    return obj

def box(name, loc, size, mat=mahogany, bevel=.003):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o=bpy.context.object; o.name=name; o.dimensions=size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(o,mat,bevel)

box('Solid tabletop', (0,0,.325), (1,1,.045), bevel=.009)
box('Lower decorative molding', (0,0,.296), (.995,.995,.013), bevel=.005)
box('Upper rolled molding', (0,0,.350), (1.016,1.016,.018), bevel=.007)
box('Wood surface beneath inlay', (0,0,.359), (.984,.984,.008), bevel=.002)

# Individual flush wooden inlays, eight rows and eight columns.
for row in range(8):
    for col in range(8):
        box('Inlay %s%d' % (chr(65+col),row+1),
            ((col-3.5)*.1,(row-3.5)*.1,.364),(.1,.1,.002),
            maple if (row+col)%2 else walnut,0)

def border(name, outer, inner, z, depth, mat):
    # Mitered rails with continuous top surfaces.
    for k in range(4):
        a=outer/2; b=inner/2
        pts=[(-a,-a),(a,-a),(b,-b),(-b,-b)]
        angle=k*math.pi/2
        pts=[(x*math.cos(angle)-y*math.sin(angle),x*math.sin(angle)+y*math.cos(angle)) for x,y in pts]
        verts=[(x,y,z+dz) for dz in [-depth/2,depth/2] for x,y in pts]
        faces=[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
        mesh=bpy.data.meshes.new(name); mesh.from_pydata(verts,[],faces); mesh.update()
        o=bpy.data.objects.new(name+' '+str(k+1),mesh); bpy.context.collection.objects.link(o)
        finish(o,mat,0)

border('Thin maple perimeter inlay',.813,.805,.364,.002,line)
border('Raised outer wooden rim',1.006,.965,.366,.016,mahogany)

# Curved apron with a softly scalloped lower edge on all four sides.
for side in range(4):
    verts=[]; faces=[]; count=100
    for i in range(count+1):
        x=-.418+.836*i/count
        low=.217 + .008*math.cos(i/count*math.pi*10)
        for y,z in [(-.471,low),(-.443,low),(-.443,.291),(-.471,.291)]:
            angle=side*math.pi/2
            verts.append((x*math.cos(angle)-y*math.sin(angle),x*math.sin(angle)+y*math.cos(angle),z))
    for i in range(count):
        for j in range(4): faces.append((4*i+j,4*i+(j+1)%4,4*(i+1)+(j+1)%4,4*(i+1)+j))
    faces += [(3,2,1,0),tuple(4*count+j for j in range(4))]
    mesh=bpy.data.meshes.new('Scalloped apron mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
    o=bpy.data.objects.new('Scalloped apron '+str(side+1),mesh); bpy.context.collection.objects.link(o); finish(o,mahogany,.003)

# Four short cabriole legs: rounded-square sections swell at the knee,
# tuck inward at the ankle and flare into broad carved feet.
profile=[(.012,.043,.014),(.021,.047,.015),(.045,.044,.012),(.073,.031,.001),(.095,.030,-.003),(.130,.043,.005),(.168,.056,.012),(.202,.059,.010),(.240,.051,.002),(.291,.044,0)]
for sx in [-1,1]:
    for sy in [-1,1]:
        verts=[]; faces=[]; segments=24
        for z,r,offset in profile:
            for j in range(segments):
                t=2*math.pi*j/segments
                cx=math.copysign(abs(math.cos(t))**.5,math.cos(t))
                cy=math.copysign(abs(math.sin(t))**.5,math.sin(t))
                verts.append((sx*(.441+offset)+r*cx,sy*(.441+offset)+r*cy,z))
        for i in range(len(profile)-1):
            for j in range(segments):
                a=i*segments+j; b=i*segments+(j+1)%segments
                faces.append((a,b,b+segments,a+segments))
        faces.append(tuple(reversed(range(segments))))
        faces.append(tuple((len(profile)-1)*segments+j for j in range(segments)))
        mesh=bpy.data.meshes.new('Cabriole leg mesh'); mesh.from_pydata(verts,[],faces); mesh.update()
        o=bpy.data.objects.new('Carved cabriole leg %s %s'%(sx,sy),mesh); bpy.context.collection.objects.link(o); finish(o,mahogany)
        for p in mesh.polygons: p.use_smooth=True
        sub=o.modifiers.new('Smooth carved profile','SUBSURF'); sub.levels=2

floor=bpy.data.materials.new('Warm white studio'); floor.diffuse_color=(.88,.88,.88,1)
box('Studio floor',(0,0,-.015),(200,200,.02),floor,0)
def aim(o, target): o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(0,-1.9,1.78))
cam=bpy.context.object; cam.name='Reference-style product camera'; aim(cam,(0,0,.20))
cam.data.type='ORTHO'; cam.data.ortho_scale=1.57; bpy.context.scene.camera=cam
for name, loc, power, size in [('Large softbox',(-1.5,-1,2.5),220,2),('Fill',(1.5,-.3,1.8),130,1.5),('Rim',(0,1.5,2.4),240,1.5)]:
    bpy.ops.object.light_add(type='AREA',location=loc)
    o=bpy.context.object; o.name=name; o.data.energy=power; o.data.shape='DISK'; o.data.size=size; aim(o,(0,0,.2))
scene=bpy.context.scene
scene.world.use_nodes=True
scene.world.node_tree.nodes.get('Background').inputs[0].default_value=(.8,.85,1,1)
scene.world.node_tree.nodes.get('Background').inputs[1].default_value=.18
scene.render.engine='CYCLES'; scene.cycles.samples=48
scene.cycles.use_denoising=True
scene.render.resolution_x=1200; scene.render.resolution_y=1000; scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX'
scene.unit_settings.system='METRIC'
scene['Reference notes']='Photo-based approximation. Table: 1 m square, 0.374 m tall. Hidden sides inferred; editable individual inlays, moldings, aprons and legs.'
bpy.ops.object.select_all(action='DESELECT')
for o in scene.objects:
    if o.type=='MESH' and o.name!='Studio floor': o.select_set(True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,'wooden_chess_table.blend'))
scene.render.filepath=os.path.join(OUT,'wooden_chess_table.png')
bpy.ops.render.render(write_still=True)
