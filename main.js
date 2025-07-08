// main.js
window.addEventListener("DOMContentLoaded", () => {
  // UMD 로드된 전역 객체
  const THREE = window.THREE;                           // Three.js r178
  const { MindARThree } = window.MINDAR.IMAGE;          // MindAR v1.2.5

  // 1) MindAR 초기화
  const mindAR = new MindARThree({
    container: document.body,
    // HIRO 마커용 mind 파일 (변경 없음)
    imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js-examples@master/image-tracking/assets/targets/hiro.mind'
  });
  const { renderer, scene, camera } = mindAR;

  // 2) 간단한 조명 추가
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));

  // 3) GLTFLoader로 3D 모델 로드
  const loader = new THREE.GLTFLoader();                // GLTFLoader r178
  loader.load('./model/table_set.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);

    // 4) 첫 번째 앵커(마커)에 모델 붙이기
    const anchor = mindAR.addAnchor(0);
    anchor.group.add(model);
  });

  // 5) AR 세션 시작 및 렌더 루프
  mindAR.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
