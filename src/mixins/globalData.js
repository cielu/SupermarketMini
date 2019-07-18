
export default {
    data: {
        StatusBarHeight: 50,
        isIPhoneX: false,
        userInfo: null
    },
    created () {
        this.isIPhoneX = this.$app.$options.globalData.isIPhoneX
        this.StatusBarHeight = this.$app.$options.globalData.StatusBarHeight
        this.userInfo = this.$app.$options.globalData.userInfo
    }
}
