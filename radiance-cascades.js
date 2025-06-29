// FRAGMENT SHADER TO RENDER THE INITIAL SCENE
// This shader draws three circles: one orange, one transparent black, and one white.
// It now correctly uses GLSL 3.00 ES syntax.
const sceneShaderFrag = `#version 300 es
            precision mediump float;

            out vec4 radiance;
            uniform vec2 resolution;

            // Function to draw a circle using signed distance fields
            void sdCircle(inout vec4 radiance, vec2 position, float radius, vec4 color) {
                if (length(position) - radius < radius) radiance = color;
            }

            void main() {
                vec2 center = (resolution * 0.5) - gl_FragCoord.xy;
                radiance = vec4(0.0); // undefined on Apple OpenGL
                sdCircle(radiance,  gl_FragCoord.xy, 30.0, vec4(1.0, 0.5, 0.0, 1.0));
                sdCircle(radiance, center + vec2(0, 0), 30.0, vec4(0, 0, 0, 0.01));
                sdCircle(radiance, center + vec2(150, 0), 30.0, vec4(1, 1, 1, 1));
            }
        `;
// FRAGMENT SHADER FOR RADIANCE CASCADING
// This shader performs the core radiance cascade algorithm, merging information
// from previous cascades to create a global illumination effect.
// It's now fully compliant with GLSL 3.00 ES.
const rcShaderFrag = `#version 300 es
        precision mediump float;

        out vec4 radiance;

        uniform sampler2D sceneTexture;
        uniform sampler2D cascadeTexture;
        uniform int baseProbeSize;
        uniform float baseIntervalLength;
        uniform int cascadeIndex;
        uniform vec2 resolution;

        const float PI = acos(-1.0);

        // https://github.com/mrdoob/three.js/blob/1f603c32b8a21d43102e9b31dc8bf271679784bc/src/renderers/shaders/ShaderChunk/colorspace_pars_fragment.glsl.js
        // srgb -> srgb-linear
        vec4 sRGBTransferEOTF(vec4 value) {
	          return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
        }

        // https://github.com/mrdoob/three.js/blob/1f603c32b8a21d43102e9b31dc8bf271679784bc/src/renderers/shaders/ShaderChunk/colorspace_pars_fragment.glsl.js
        // srgb-linear -> srgb
        vec4 sRGBTransferOETF(vec4 value) {
	          return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
        }

        // https://m4xc.dev/articles/fundamental-rc
        // https://jsfiddle.net/cbenn/c0dyh6pm
        float getIntervalScale(int cascadeIndex) {
            if (cascadeIndex <= 0) return 0.0;
            return float(1 << (2 * cascadeIndex));
        }

        vec2 getIntervalRange(int cascadeIndex, float baseIntervalLength) {
            return baseIntervalLength * vec2(getIntervalScale(cascadeIndex), getIntervalScale(cascadeIndex + 1));
        }

        vec4 castInterval(vec2 intervalStart, vec2 intervalEnd, int cascadeIndex) {
            vec2 dir = intervalEnd - intervalStart;
            int steps = 16 << cascadeIndex;
            vec2 stepSize = dir / float(steps);

            vec3 radiance = vec3(0);
            // transmittance determines how much light reaches a point (volumetrics)
            // start at 1.0 and keep stepping if you reach a light then transmittance becomes 0 because beyond that, light cannot reach the original point
            // unless the light has an alpha value that is in between 0 and 1 which acts as glass sort of
            float transmittance = 1.0;

            for (int a = 0; a < steps; a++) {
                vec2 coord = intervalStart + (stepSize * float(a));
                vec4 scene = (texelFetch(sceneTexture, ivec2(coord), 0));
                radiance += scene.rgb * transmittance * scene.a;
                transmittance *= 1.0 - scene.a;

            }

            return vec4(radiance, transmittance);
        }

        vec4 mergeIntervals(vec4 near, vec4 far) {
            vec3 radiance = near.rgb + (far.rgb * near.a);
            return vec4(radiance, near.a * far.a);
        }

        vec4 getBilinearWeights(vec2 ratio) {
            return vec4(
            (1.0 - ratio.x) * (1.0 - ratio.y),
            ratio.x * (1.0 - ratio.y),
            (1.0 - ratio.x) * ratio.y,
            ratio.x * ratio.y
            );
        }

        void getBilinearSamples(vec2 baseCoord, out vec4 weights, out ivec2 baseIndex) {
            // get fractional part of baseCoord
            vec2 ratio = fract(baseCoord);
            weights = getBilinearWeights(ratio);
            baseIndex = ivec2(floor(baseCoord));
        }

        ivec2 getBilinearOffset(int offsetIndex) {
            const ivec2 offsets[4] = ivec2[](ivec2(0, 0), ivec2(1, 0), ivec2(0, 1), ivec2(1, 1));
            return offsets[offsetIndex];
        }

        // http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0
        float rand(const in vec2 uv) {
            const float a = 12.9898, b = 78.233, c = 43758.5453;
            float dt = dot(uv.xy, vec2(a, b)), sn = mod(dt, PI);
            return fract(sin(sn) * c);
        }

        // https://shadertoy.com/view/MslGR8
        vec4 dithering(vec4 color) {
            // Calculate grid position
            float grid_position = rand(gl_FragCoord.xy);
            // Shift the individual colors differently, thus making it even harder to see the dithering pattern
            vec3 dither_shift_RGB = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);
            // modify shift according to grid position.
            dither_shift_RGB = mix(2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position);
            // shift the color by dither_shift
            return vec4(color.rgb + dither_shift_RGB, color.a);
        }

        void main() {
            // Probe parameters for cascade N
            // shift the bits of baseProbeSize left by cascadeIndex number of bits
            int probeSize = baseProbeSize << cascadeIndex;
            vec2 probeCenter = floor(gl_FragCoord.xy / float(probeSize)) + 0.5;
            vec2 probePosition = probeCenter * float(probeSize);

            ivec2 dirCoord = ivec2(gl_FragCoord.xy) % probeSize;
            int dirIndex = dirCoord.x + dirCoord.y * probeSize;
            int dirCount = probeSize * probeSize;

            // Interval direction at cascade N
            float angle = 2.0 * PI * ((float(dirIndex) + 0.5) / float(dirCount));
            vec2 dir = vec2(cos(angle), sin(angle));

            radiance = vec4(0, 0, 0, 1);

            // Merge cascade N+1 -> cascade N
            vec4 weights;
            ivec2 baseIndex;
            int bilinearProbeSize = baseProbeSize << (cascadeIndex + 1);
            // -0.5 to uncenter the coordinate
            vec2 bilinearBaseCoord = (probePosition / float(bilinearProbeSize)) - 0.5;
            getBilinearSamples(bilinearBaseCoord, weights, baseIndex);

            // look at 4 probes in cascade n+1 (top left, top right, bottom left, bottom right)
            for (int b = 0; b < 4; b++) {
                // Probe parameters for cascade N+1
                ivec2 baseOffset = getBilinearOffset(b);
                ivec2 bilinearIndex = baseIndex + baseOffset;
                vec2 bilinearPosition = (vec2(bilinearIndex) + 0.5) * float(bilinearProbeSize);

                // Cast 4 intervals at cascade N -> cascade N+1 (bilinear fix)
                // x position has the interval length for the current cascade n, y position has for cascade n+1
                vec2 intervalRange = getIntervalRange(cascadeIndex, baseIntervalLength);
                vec2 intervalStart = probePosition + dir * intervalRange.x;
                vec2 intervalEnd = bilinearPosition + dir * intervalRange.y;
                // step between intervalStart and intervalEnd sampling sceneTexture
                vec4 destInterval = castInterval(intervalStart, intervalEnd, cascadeIndex);

                vec4 bilinearRadiance = vec4(0.0);
                // look at 4 consecutive angles in n+1 cascade 
                for (int d = 0; d < 4; d++) {
                    // b/4 bilinear probe parameters at cascade N+1
                    // current cascade has probeSize^2 directions
                    // next cascade has (baseProbeSize << (cascadeIndex + 1))^2 directions
                    // probeSize doubles so 2(probeSize) * 2(probeSize) = 4probeSize^2
                    // to get the equivalent direction in next cascade get current dirIndex and then multiply by 4
                    int baseDirIndex = dirIndex * 4;
                    int bilinearDirIndex = baseDirIndex + d;

                    // Fetch merged interval at cascade N+1
                    // reverse and turn the 1D index back into 2D get local coordinate of current direction square 
                    ivec2 bilinearDirCoord = ivec2(bilinearDirIndex % bilinearProbeSize, bilinearDirIndex / bilinearProbeSize);
                    // get top left of bilinear probe
                    vec2 bilinearOffset = vec2(bilinearIndex * bilinearProbeSize);
                    bilinearOffset = clamp(bilinearOffset, vec2(0.5), resolution - float(bilinearProbeSize)); // vignette
                    ivec2 bilinearTexel = ivec2(bilinearOffset) + bilinearDirCoord;
                    vec4 bilinearInterval = texelFetch(cascadeTexture, bilinearTexel, 0);
                    bilinearInterval = sRGBTransferEOTF(bilinearInterval);

                    float weight;
                    // weight = weights[b] fails to compile due to emulated slow path
                    if (b == 0) weight = weights[0];
                    else if (b == 1) weight = weights[1];
                    else if (b == 2) weight = weights[2];
                    else if (b == 3) weight = weights[3];

                    bilinearRadiance += mergeIntervals(destInterval, bilinearInterval) * weight;
                }

                // Average of 4 bilinear samples
                radiance += bilinearRadiance * 0.25;
                // if (destInterval.a > 0.) {
                //   radiance.xyz += vec3(191.0, 255.0, 230.0) / vec3(255.0) * vec3(0.001);
                // }
            }

            radiance = sRGBTransferOETF(radiance);
            radiance = dithering(radiance);
        }
        `;

// A simple vertex shader, updated to GLSL 3.00 ES syntax.
const vert = `#version 300 es
            precision mediump float;

            in vec3 aPosition;
            in vec2 aTexCoord;
            out vec2 vTexCoord;

            void main() {
                vTexCoord = aTexCoord;
                vec4 positionVec4 = vec4(aPosition, 1.0);
                positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
                gl_Position = positionVec4;
            }
        `;

const srgbToLinearShaderFrag = `#version 300 es
        precision mediump float;

        out vec4 radiance;

        uniform sampler2D sceneTexture;
        uniform vec2 resolution;

        // https://github.com/mrdoob/three.js/blob/1f603c32b8a21d43102e9b31dc8bf271679784bc/src/renderers/shaders/ShaderChunk/colorspace_pars_fragment.glsl.js
        // srgb -> srgb-linear
        vec4 sRGBTransferEOTF(vec4 value) {
	          return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
        }

        void main() {
            radiance = sRGBTransferEOTF(texelFetch(sceneTexture, ivec2(gl_FragCoord.xy), 0));
        }
        `;
class RadianceCascades {
  constructor(theGraphic) {
    this.myCascadeNumber = 8;
    this.myBaseProbeSize = 1;
    this.myBaseIntervalLength = 0.1;
    this.myRcShaders = []; // We now have an array for the cascade shaders
    this.mySceneBuffer;
    this.mySceneShader;
    this.myCascadeBuffers = [];
    this.myGraphic = createGraphics(theGraphic.width, theGraphic.height, WEBGL);

    this.myGraphic.pixelDensity(theGraphic.pixelDensity());
    this.myCanvas = theGraphic;
    this.setup();
  }

  setup() {
    let OPTIONS = {
      textureFiltering: NEAREST,
      format: UNSIGNED_BYTE,
      depth: false,
      // antialias: false,
    };

    // Create a canvas that fills the window
    this.myRcShaders = [];
    this.myCascadeBuffers = [];

    // Create offscreen buffers first
    this.mySceneBuffer = this.myGraphic.createFramebuffer(OPTIONS);

    for (let a = 0; a < 2; a++) {
      this.myCascadeBuffers.push(this.myGraphic.createFramebuffer(OPTIONS));
    }

    // --- FIX: Create shaders on the context of the buffer they will be used on ---
    this.myRcShaders.push(this.myGraphic.createShader(vert, rcShaderFrag));
    this.myRcShaders.push(this.myGraphic.createShader(vert, rcShaderFrag));
    this.mySceneShader = this.myGraphic.createShader(vert, sceneShaderFrag);
    this.mySrgbToLinearShader = this.myGraphic.createFilterShader(
      srgbToLinearShaderFrag
    );
  }

  getSceneBuffer() {
    return this.mySceneBuffer;
  }
  getGraphic() {
    return this.myGraphic;
  }

  convertBufferToLinear() {
    let buffer = this.getSceneBuffer();
    let graphic = this.getGraphic();
    buffer.begin();
    this.mySrgbToLinearShader.setUniform("resolution", [
      this.myGraphic.width,
      this.myGraphic.height,
    ]);
    this.mySrgbToLinearShader.setUniform("sceneTexture", buffer);
    graphic.filter(this.mySrgbToLinearShader);

    buffer.end();
    graphic.image(buffer, -width / 2, -height / 2, width, height);
  }

  draw() {
    // 1. Render the initial scene to a buffer

    // this.mySceneBuffer.begin();
    // this.myGraphic.shader(this.mySceneShader);
    // this.mySceneShader.setUniform("resolution", [
    //   this.myGraphic.width,
    //   this.myGraphic.height,
    // ]);
    // this.myGraphic.rect(
    //   -this.myGraphic.width / 2,
    //   -this.myGraphic.height / 2,
    //   this.myGraphic.width,
    //   this.myGraphic.height
    // );
    // this.mySceneBuffer.end();
    // 2. Perform radiance cascades using offscreen buffers (ping-pong)

    let buffer = this.getSceneBuffer();
    let graphic = this.getGraphic();
    graphic.noStroke();
    buffer.begin();
    graphic.clear();
    graphic.image(this.myCanvas, -width / 2, -height / 2, width, height);

    buffer.end();

    this.convertBufferToLinear();
    let readIndex = 0;
    let writeIndex = 1;
    for (let a = 0; a < this.myCascadeBuffers.length; a++) {
      this.myCascadeBuffers[a].begin();
      this.myGraphic.clear();
      this.myCascadeBuffers[a].end();
    }

    for (let i = this.myCascadeNumber - 1; i >= 0; i--) {
      const readBuffer = this.myCascadeBuffers[readIndex];
      const writeBuffer = this.myCascadeBuffers[writeIndex];

      // --- FIX: Use the dedicated shader for the current write buffer ---
      const activeRcShader = this.myRcShaders[writeIndex];

      // Set all uniforms on the shader program before activating it
      activeRcShader.setUniform("resolution", [
        this.myGraphic.width * this.myGraphic.pixelDensity(),
        this.myGraphic.height * this.myGraphic.pixelDensity(),
      ]);
      activeRcShader.setUniform("baseProbeSize", this.myBaseProbeSize);
      activeRcShader.setUniform(
        "baseIntervalLength",
        this.myBaseIntervalLength
      );
      activeRcShader.setUniform("sceneTexture", this.mySceneBuffer.color);
      activeRcShader.setUniform("cascadeTexture", readBuffer.color);
      activeRcShader.setUniform("cascadeIndex", i);

      // Activate the shader and run it by drawing a rectangle
      writeBuffer.begin();
      this.myGraphic.shader(activeRcShader);
      this.myGraphic.rect(
        -this.myGraphic.width / 2,
        -this.myGraphic.height / 2,
        this.myGraphic.width,
        this.myGraphic.height
      );
      writeBuffer.end();
      [readIndex, writeIndex] = [writeIndex, readIndex];
    }

    // 3. After the loop, the final result is in the last 'read' buffer.
    // Draw this final buffer to the main canvas.
    //resetShader(); // Use default shaders for drawing the image
    this.myGraphic.image(
      this.myCascadeBuffers[readIndex],
      -this.myGraphic.width / 2,
      -this.myGraphic.height / 2,
      this.myGraphic.width,
      this.myGraphic.height
    );
    return this.myGraphic;
  }
}
