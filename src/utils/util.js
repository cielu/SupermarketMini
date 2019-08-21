// import wepy from '@wx/core'
// const HOST = 'https://ns.suning.com'
const HOST = 'https://market.linghui.co/api'
// const HOST = 'http://ciel.s1.natapp.cc'
// 封装微信请求
const wxRequest = async function (url, data = {}, method = 'GET', showLoading = true) {
    // 显示加载状态
    showLoading && toast('加载中...', 'loading', 10000)
    // wx.showNavigationBarLoading()
    // 获取授权
    const authorization = wx.getStorageSync('authorization')
    // 组合url
    url = url.indexOf('http') > -1 ? url : HOST + url
    // 数据请求
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                // 'Cookie': '',
                'authorization': authorization
            },
            method: method,
            success: res => {
            // 筛选状态
                switch (res.statusCode) {
                case 401 :
                    toast('请重新登录!')
                    wx.removeStorageSync('userInfo')
                    wx.removeStorageSync('authorization')
                    navigateTo('/pages/other/login')
                    return false
                case 500 :
                case 501 :
                case 502 :
                    toast('操作失败，请稍后再试!')
                    return false
                default:
                    if (res.data.status === 'error') {
                        toast(res.data.msg)
                        return false
                    }
                    resolve(res.data)
                }
            },
            fail: res => {
                reject(res)
            },
            complete(res) {
                wx.hideToast()
                wx.stopPullDownRefresh()
            // wx.hideNavigationBarLoading()
            }
        })
    })
}

// toast
function toast(title, type = 'none', duration = 2000) {
    let TOAST = { title, duration }
    if (type === 'smile') {
        TOAST.image = '/images/smile.png'
    } else {
        TOAST.icon = type
    }
    wx.showToast(TOAST)
}
// navigate to
function navigateTo (path, param = '') {
    path += '?' + param
    wx.navigateTo({url: path})
}

module.exports = {
    toast,
    navigateTo,
    wxRequest
}
