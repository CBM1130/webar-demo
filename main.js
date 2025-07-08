// main.js
import * as THREE        from 'three';
import { GLTFLoader }    from 'three/addons/loaders/GLTFLoader.js';
import { MindARThree }   from 'mindar-image-three';

window.addEventListener("DOMContentLoaded", async () => {
  // 1) MindAR 초기화
  const mindar = new MindARThree({
    container: document.body,
    imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js-examples@master/image-tracking/assets/targets/hiro.mind'
  });
  const { renderer, scene, camera } = mindar;

  // 2) 라이트
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));

  // 3) 모델 로드 & 앵커에 붙이기
  const loader = new GLTFLoader();
  const gltf  = await loader.loadAsync('./model/table_set.glb');
  const model = gltf.scene;
  model.scale.set(0.3, 0.3, 0.3);
  mindar.addAnchor(0).group.add(model);

  // 4) AR 시작 & 렌더 루프
  await mindar.start();
  renderer.setAnimationLoop(() => renderer.render(scene, camera));
});
