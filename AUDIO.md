# Path Drawer — Audio Map

No audio from a previous local game is used.

- `puzzle-pieces.ogg`: looping puzzle music from Abstraction/Tallbeard's CC-0 bundle, 44.1 kHz stereo.
- `draw-select.wav`: route drawing begins.
- `route-confirm.wav`: valid route locks.
- `shard-collect.wav`: map shard collected.
- `collision.wav`: route touches a blocker.
- `beacon-success.wav`: beacon reached and victory.

The five WAV files are selected from JDWasabi's 8-bit/16-bit SFX pack; the source page permits commercial game use and requests a credit. Music/SFX keys are loaded by `BootScene`, calls are guarded by `AudioService`, and browser autoplay restrictions never crash gameplay. Mute state is persistent.
