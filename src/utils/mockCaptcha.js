/**
 * @description: JS模拟生成图形验证码
 * @param {String} canvasId
 * @param {Number} codeLength
 */
export default (canvasId, codeLength = 4) => {
  // 1. 生成4位随机字符串
  let code = "";
  let stringList = "ASDFGHJKLasdfghjkl123456789";
  for (let i = 0; i < codeLength; i++) {
    const index = Math.floor(Math.random() * stringList.length);
    code += stringList[index];
  }
  // 2. 将生成的随机数进行Canvas绘制
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 背景颜色 (没什么必要, 直接用DOM的背景色也可以)
  // ctx.fillStyle = "#f4f4f5";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 文字样式
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(code, canvas.width / 2, canvas.height / 2);
  // 3. 将绘制好的Canvas转换成图片返回
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
};
