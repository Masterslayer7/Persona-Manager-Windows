# -*- mode: python ; coding: utf-8 -*-

import os
from PyInstaller.utils.hooks import collect_submodules, collect_data_files

block_cipher = None

project_root = os.path.abspath('.')  # Change if needed

# Collect Django and your app dependencies
hiddenimports = (
    collect_submodules('django') +
    collect_submodules('rest_framework') +
    collect_submodules('PersonaManager') +
    collect_submodules('PersonaManager.api') +
    collect_submodules('personas') +
    collect_submodules('personas.api') +
    collect_submodules('personaTeams') +
    collect_submodules('personaTeams.api') +
    ['django.core.management.commands.runserver']
)

datas = [
    ('db.sqlite3', '.'),

    # PersonaManager project
    ('PersonaManager/__init__.py', 'PersonaManager'),
    ('PersonaManager/settings.py', 'PersonaManager'),
    ('PersonaManager/urls.py', 'PersonaManager'),
    ('PersonaManager/api/__init__.py', 'PersonaManager/api'),
    ('PersonaManager/api/urls.py', 'PersonaManager/api'),

    # personas app
    ('personas/__init__.py', 'personas'),
    ('personas/admin.py', 'personas'),
    ('personas/apps.py', 'personas'),
    ('personas/models.py', 'personas'),
    ('personas/tests.py', 'personas'),
    ('personas/views.py', 'personas'),
    ('personas/api/__init__.py', 'personas/api'),
    ('personas/api/urls.py', 'personas/api'),
    ('personas/migrations/__init__.py', 'personas/migrations'),

    # personaTeams app
    ('personaTeams/__init__.py', 'personaTeams'),
    ('personaTeams/admin.py', 'personaTeams'),
    ('personaTeams/apps.py', 'personaTeams'),
    ('personaTeams/models.py', 'personaTeams'),
    ('personaTeams/tests.py', 'personaTeams'),
    ('personaTeams/views.py', 'personaTeams'),
    ('personaTeams/api/__init__.py', 'personaTeams/api'),
    ('personaTeams/api/urls.py', 'personaTeams/api'),
    ('personaTeams/migrations/__init__.py', 'personaTeams/migrations'),
]

a = Analysis(
    ['backend_launcher.py'],
    pathex=[project_root],
    binaries=[],
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='persona_backend',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,  # True = console visible, False = silent backend
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='persona_backend'
)