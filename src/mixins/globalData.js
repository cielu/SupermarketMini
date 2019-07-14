
export default {
    data: {
        StatusBarHeight: 50,
        userInfo: null
    },
    created () {
        this.StatusBarHeight = this.$app.$options.globalData.StatusBarHeight
        this.userInfo = this.$app.$options.globalData.userInfo
    }
}
