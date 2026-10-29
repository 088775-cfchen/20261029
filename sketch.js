// ===== 全域變數宣告 =====
let stopSheet;                  // 存放「站立」精靈圖（1/stop/stop.png）
let walkSheet;                  // 存放「走路」精靈圖（1/walk/walk.png）

const STOP_FRAMES = 14;         // 站立精靈圖共有 14 格
const STOP_W = 1955;            // 站立精靈圖整張寬度
const STOP_H = 212;             // 站立精靈圖整張高度

const WALK_FRAMES = 9;          // 走路精靈圖共有 9 格
const WALK_W = 1246;            // 走路精靈圖整張寬度
const WALK_H = 198;             // 走路精靈圖整張高度

let charX;                      // 角色目前的 X 座標（中心點）
let charY;                      // 角色目前的 Y 座標（中心點）
let speed = 5;                  // 角色每一幀移動的像素數
let facing = 1;                 // 角色面向：1 = 向右，-1 = 向左
let isWalking = false;          // 角色目前是否在走路

let frameIndex = 0;             // 目前顯示第幾格動畫
let animSpeed = 5;              // 每隔幾個 draw 幀切換一次動畫格（數字越大越慢）

// ===== 預先載入圖片 =====
function preload() {
  stopSheet = loadImage('1/stop/stop.png');   // 載入站立精靈圖
  walkSheet = loadImage('1/walk/walk.png');   // 載入走路精靈圖
}

// ===== 初始化設定（只執行一次）=====
function setup() {
  createCanvas(windowWidth, windowHeight);    // 建立與視窗同大小的全螢幕畫布
  imageMode(CENTER);                          // 圖片以中心點為基準繪製
  charX = width / 2;                          // 角色起始 X 在畫面正中間
  charY = height / 2;                         // 角色起始 Y 在畫面正中間
}

// ===== 每一幀重複執行 =====
function draw() {
  background('#caf0f8');                      // 設定背景顏色為 caf0f8

  isWalking = false;                          // 每一幀先預設為「沒在走路」

  if (keyIsDown(RIGHT_ARROW)) {               // 如果按住鍵盤右鍵
    isWalking = true;                         // 狀態改為走路
    facing = 1;                               // 角色面向右邊
    charX += speed;                           // 角色往右移動
  } else if (keyIsDown(LEFT_ARROW)) {         // 否則如果按住鍵盤左鍵
    isWalking = true;                         // 狀態改為走路
    facing = -1;                              // 角色面向左邊（需轉向）
    charX -= speed;                           // 角色往左移動
  }

  charX = constrain(charX, 0, width);         // 限制角色不要走出畫面左右邊界

  // 依照目前狀態選擇要用的精靈圖與參數
  let sheet = isWalking ? walkSheet : stopSheet;         // 選擇精靈圖
  let totalFrames = isWalking ? WALK_FRAMES : STOP_FRAMES; // 選擇總格數
  let frameW = (isWalking ? WALK_W : STOP_W) / totalFrames; // 計算單格寬度
  let frameH = isWalking ? WALK_H : STOP_H;              // 單格高度即整張高度

  if (frameCount % animSpeed === 0) {         // 每隔 animSpeed 幀
    frameIndex++;                             // 切換到下一格動畫
  }
  let current = frameIndex % totalFrames;     // 用取餘數讓動畫循環播放
  let sx = current * frameW;                  // 計算目前這格在精靈圖中的 X 起點

  push();                                     // 儲存目前的繪圖狀態
  translate(charX, charY);                    // 把座標原點移到角色位置
  scale(facing, 1);                           // facing 為 -1 時水平翻轉（轉向）
  image(sheet, 0, 0, frameW, frameH,          // 在原點畫出角色，顯示大小為單格寬高
        sx, 0, frameW, frameH);               // 從精靈圖裁切出目前這一格
  pop();                                      // 還原繪圖狀態，避免影響其他繪圖
}

// ===== 視窗大小改變時 =====
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);    // 畫布跟著視窗重新調整大小
  charY = height / 2;                         // 角色保持在畫面垂直正中間
}