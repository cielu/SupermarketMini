import wepy from 'wepy'

// format categories
function getFormatCategories(categories) {
  const arr = []
  let obj = {}
  categories.forEach(category => {
    const tmp = { ...category }
    obj = {
      label: tmp.name,
      value: String(tmp.id),
      object_type: String(tmp.object_type)
    }
    if (tmp.pid === 0) {
      obj.type = 'checkbox'
    }
    if (tmp.children) {
      obj.children = getFormatCategories(tmp.children)
    }
    arr.push(obj)
  })
  return arr
}

async function uploadImage(token, filePath, dir = 'asset/') {
  // set key
  let randomTime = new Date().getTime() + Math.random()
  let key = dir + randomTime + '.png'
  // 上传图片
  let uploadRes = await wepy.uploadFile({
    url: token.host,
    filePath,
    name: 'file',
    formData: {
      dir,
      key,
      policy: token.policy,
      OSSAccessKeyId: token.accessid,
      signature: token.signature
    }
  })
  uploadRes.key = key
  return uploadRes
}

module.exports = {
  getFormatCategories,
  uploadImage
}
