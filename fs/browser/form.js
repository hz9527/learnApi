function $ (selector) {
  return document.querySelector(selector)
}

var input = $('#file')
var canvas = $('#canvas')
var btn = $('#upload')
var uploadFile

input.addEventListener('change', function () {
  console.log(input.files, this)
  uploadFile = this.files[0]
  readFile(uploadFile, (img, width, height) => {
    draw(canvas, img, width, height)
  })
})

btn.addEventListener('click', () => {
  if (!uploadFile) {
    alert('upload img')
  } else {
    // $http('post', 'http://10.253.101.62:18005/upload', 'application/x-www-form-urlencoded', getFormData({
    //   name: uploadFile.name,
    //   size: uploadFile.size
    // }))
    //   .then(res => {
    //     console.log(res)
    //   })
    $http('post', 'http://10.253.101.62:18005/upload', null, getForm({
      name: uploadFile.name,
      size: uploadFile.size,
      file: uploadFile
    }))
      .then(res => {
        console.log(res)
      })
  }
})

function readFile (file, callback) {
  var img = new Image()
  img.onload = function () {
    URL.revokeObjectURL(file)
    typeof callback === 'function' && callback(img, img.width, img.height)
  }
  img.src = URL.createObjectURL(file)
}

function draw (canvas, img, width, height) {
  canvas.width = width
  canvas.height = height
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)
}

function getForm (obj) {
  var result = new FormData()
  for (var key in obj) {
    result.append(key, obj[key])
  }
  return result
}

function getFormData (obj) {
  var result = ''
  var i = 0
  for(var key in obj) {
    i > 0 && (result += '&')
    i++
    result += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  }
  return result
}

function $http (method, url, type, data) {
  return new Promise((resolve, reject) => {
    var ajx = getAjx()
    ajx.open(method, url)
    if (type) {
      ajx.setRequestHeader('Content-Type', type)
      if (type === 'application/json') {
        data = JSON.stringify(data)
      }
    }
    ajx.send(data)
    ajx.onreadystatechange = function () {
      if (ajx.readyState === 4 && (ajx.status === 200 || (ajx.status >=300 && ajx.status <= 304))) {
        resolve(JSON.parse(ajx.responseText))
      } else {
        reject(ajx.status)
      }
    }
  })
}

function getAjx () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
}
