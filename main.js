// main.js

// 1) main.js가 로드되었는지 확인
alert('main.js 실행됨');

// 2) mindAR UMD 스크립트가 로드되었는지 확인
alert('window.MINDAR is ' + (window.MINDAR ? 'OK' : 'undefined'));

window.addEventListener("DOMContentLoaded", () => {
  const THREE = window.THREE;
  const mindarObj = window.MINDAR;

  // 3) mindAR 내부 IMAGE 모듈이 로드되었는지 확인
  alert('window.MINDAR.IMAGE is ' + (mindarObj && mindarObj.IMAGE ? 'OK' : 'undefined'));

  // mindARThree 클래스 가져오기
  const { MindARThree } = mindarObj.IMAGE;

  // 4) MindAR 초기화
  const mindAR = new MindARThree({
    container: document.body,
    imageTargetSrc: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js-examples@master/image-tracking/assets/targets/hiro.mind'
  });
  const { renderer, scene, camera } = mindAR;

  // 5) 조명 추가
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));

  // 6) GLTF 모델 로드
  const loader = new THREE.GLTFLoader();
  loader.load('./model/table_set.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);

    // 7) 첫 번째 마커 앵커에 모델 붙이기
    const anchor = mindAR.addAnchor(0);
    anchor.group.add(model);
  });

  // 8) AR 시작 및 렌더 루프
  mindAR.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
