// main.js
window.addEventListener("DOMContentLoaded", () => {
  // UMD 객체 읽어오기
  const THREE = window.THREE;
  const { MindARThree } = window.MINDAR.IMAGE;

  // MindAR 초기화
  const mindAR = new MindARThree({
    container: document.body,
    imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js-examples@master/image-tracking/assets/targets/hiro.mind'
  });
  const { renderer, scene, camera } = mindAR;

  // 조명
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));

  // 모델 로드
  const loader = new THREE.GLTFLoader();
  loader.load('./model/table_set.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);
    const anchor = mindAR.addAnchor(0);
    anchor.group.add(model);
  });

  // AR 시작 & 렌더
  mindAR.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
