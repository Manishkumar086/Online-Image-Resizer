const file = document.getElementById("file");
const dropArea = document.getElementById("dropArea");
const originalImg = document.getElementById("originalImg");
const compressedImg = document.getElementById("compressedImg");
const originalSize = document.getElementById("originalSize");
const compressedSize = document.getElementById("compressedSize");
const quality = document.getElementById("quality");
const qv = document.getElementById("qv");
const compressBtn = document.getElementById("compressBtn");
const downloadBtn = document.getElementById("downloadBtn");

let img = new Image();
let compressedURL = "";

/* Quality value */
quality.oninput = () => qv.innerText = quality.value + "%";

/* Click upload */
dropArea.onclick = () => file.click();

/* File select */
file.onchange = () => {
    const f = file.files[0];
    if(!f) return;

    originalSize.innerText = (f.size / 1024).toFixed(1) + " KB";

    const reader = new FileReader();
    reader.onload = e => {
        img.src = e.target.result;
        originalImg.src = e.target.result;
    };
    reader.readAsDataURL(f);
};

/* Compress */
compressBtn.onclick = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    compressedURL = canvas.toDataURL("image/jpeg", quality.value / 100);
    compressedImg.src = compressedURL;

    compressedSize.innerText =
        ((compressedURL.length * 3 / 4) / 1024).toFixed(1) + " KB";

    downloadBtn.disabled = false;
};

/* Download */
downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = compressedURL;
    a.download = "compressed-image.jpg";
    a.click();
};
