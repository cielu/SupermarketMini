// import wepy from '@wx/core'
// const HOST = 'https://app.jiehuo.site/api'
const HOST = 'https://ns.suning.com'
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
                'Cookie': 'tradeMA=249;custLevel=161000000110;TGC=TGT5065336B43C85A6FBA3B8C2EF019ADAC983057D7;tradeLdc=NJYH;ids_r_me=NzEyOTg3MTg2NV9BUFBfMTU2MDA2OTI5NjM2N18xNTYwMDY5Mjk2MzY3XzBfOGJiMmIzN2MyMTc4YjRmNzlkNTZhNmMzMTE4MjE1OTU=;idsLoginUserIdLastTime=18569401993;logonStatus=0;nick=185******93;authId=si46BC748DF3D9F820A4A5F95DEBE690B9;route=9ddb31cae800f7b5c6ef2cadbb3169b6;custno=7129871865;secureToken=41B7BB74D452F70CE065477AA022C89D;sncnstr=OpHwepxRLTEuaRrN9Irk1w==;nick2=185******93\n',
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
                    toast('操作失败，请稍后再试!')
                    return false
                default:
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
// 判断用户是否实名认证 1 实名认证|2商户认证
const isCertification = async function (type = 1) {
    // 获取用户信息
    let res = await wxRequest('/mine/information')
    switch (type) {
    case 1 :
        if (!res.result.is_certification) {
            toast('请先实名认证')
            wx.redirectTo({url: '/packageMine/mine/auth/idCard'})
            return false
        }
        break
    case 2 :
        if (!res.result.is_merchant) {
            toast('请先商户认证')
            wx.redirectTo({url: '/packageMine/mine/auth/merchant'})
            return false
        }
        break
    }
    return res.result
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
    wxRequest,
    isCertification
}
