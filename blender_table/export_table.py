import bpy, os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bpy.ops.wm.open_mainfile(filepath=os.path.join(root, 'blender_table', 'wooden_chess_table.blend'))
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 1
table = [o for o in scene.objects if o.type == 'MESH' and o.name != 'Studio floor']
materials = set(m for o in table for m in o.data.materials)

# Bake the procedural wood into reusable UV textures for the web model.
for mat in materials:
    source = mat.copy()
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.mesh.primitive_plane_add(size=2)
    plane = bpy.context.object
    plane.data.materials.append(source)
    nodes = source.node_tree.nodes
    links = source.node_tree.links
    ramp = next(n for n in nodes if n.type == 'VALTORGB')
    emission = nodes.new('ShaderNodeEmission')
    links.new(ramp.outputs['Color'], emission.inputs['Color'])
    links.new(emission.outputs[0], nodes.get('Material Output').inputs['Surface'])
    image = bpy.data.images.new(mat.name + ' grain', width=512, height=512)
    target = nodes.new('ShaderNodeTexImage'); target.image = image
    nodes.active = target
    bpy.ops.object.bake(type='EMIT')
    image.pack()
    bpy.data.objects.remove(plane, do_unlink=True)
    bpy.data.materials.remove(source)
    nodes = mat.node_tree.nodes; links = mat.node_tree.links
    shader = nodes.get('Principled BSDF')
    for link in list(shader.inputs['Normal'].links): links.remove(link)
    texture = nodes.new('ShaderNodeTexImage'); texture.image = image
    links.new(texture.outputs['Color'], shader.inputs['Base Color'])

bpy.ops.object.select_all(action='DESELECT')
for obj in table:
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    if not obj.data.uv_layers:
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.uv.smart_project()
        bpy.ops.object.mode_set(mode='OBJECT')
    obj.select_set(False)
for obj in table: obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join(root, 'public', 'models', 'wooden-chess-table.glb'), export_format='GLB', use_selection=True, export_apply=True)
