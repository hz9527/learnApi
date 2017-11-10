function $ (selector) {
  return document.querySelector(selector)
}

var input = $('#file')
var canvas = $('#canvas')
var btn = $('#upload')
var imgData = {}

input.addEventListener('change', (e) => {
  readFile(input.files[0], (data, width, height) => {
    draw(canvas, data, width, height)
  })
})

btn.addEventListener('click', () => {
  // application/octet-stream
  if (!imgData.data) {
    alert('请选择图片！')
  } else {
    $http('http://127.0.0.1:1800/upload', 'POST', null, {
      name: imgData.name,
      data: imgData.data
    }).then(res => {
      if (res.code === 0) {
        alert(res.data)
      } else {
        alert('fail')
      }
    })
  }
})

function readFile (file, callBack) {
  var fileReader = new FileReader()
  var img
  fileReader.readAsDataURL(file)
  imgData.name = file.name
  fileReader.onloadend = function (e) {
    img = new Image()
    imgData.data = this.result
    img.onload = function () {
      typeof callBack === 'function' && callBack(img, img.width, img.height)
    }
    img.src = imgData.data
  }
}

function draw (canvas, img, width, height) {
  canvas.width = width
  canvas.height = height
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)
}

function getAjax () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
}

function $http (url, method, type, data) {
  return new Promise((resolve, reject) => {
    var ajx = getAjax()
    type = type || 'application/json'
    ajx.open(method, url)
    ajx.setRequestHeader('Content-Type', type)
    if (type === 'application/json' && data) {
      data = JSON.stringify(data)
    }
    ajx.send(data || null)
    ajx.onreadystatechange = function () {
      if (ajx.readyState === 4) {
        resolve(JSON.parse(ajx.responseText))
      }
    }
  })
}

function dataURLtoBlob (dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
