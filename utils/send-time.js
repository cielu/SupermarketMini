"use strict";

// 格式化时间
function formatTime(time) {
  return time < 10 ? '0' + time : time;
} // 获取送达时间段


function getSendDuration() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00';
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '23:30';
  // 格式化传入的时间段
  var sArr = start.split(':');
  var eArr = end.split(':');
  var startHour = parseInt(sArr[0]);
  var startMin = parseInt(sArr[1]);
  var endHour = parseInt(eArr[0]); // let endMin = parseInt(eArr[1])
  // 结束时间大于 23

  if (endHour > 23) {
    endHour = 23;
  }

  if (startMin > 30) {
    startHour += 1;
  } // console.log(startHour)


  var timeArr = []; // 组合时间段

  for (var i = 0; i < 24; i++) {
    // 过滤小于开始时间的时间段
    if (i < startHour) {
      continue;
    }

    if (i >= endHour) {
      break;
    } // console.log(i, startHour, endHour)
    // 判断开始时间是0 还是 30


    if (startMin < 30) {
      timeArr.push(formatTime(i) + ':' + '30 ～ ' + formatTime(i + 1) + ':00');
      timeArr.push(formatTime(i + 1) + ':' + '00 ～ ' + formatTime(i + 1) + ':30');
    } else {
      timeArr.push(formatTime(i) + ':' + '00 ～ ' + formatTime(i) + ':30');
      timeArr.push(formatTime(i) + ':' + '30 ～ ' + formatTime(i + 1) + ':00');
    }
  }

  return timeArr;
} // 获取最近七天


function getSendDay(today, curHour) {
  // get week
  function getWeek(day) {
    return day >= 7 ? day % 7 : day;
  }

  var date = new Date(); // 定义周末

  var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var dayArr = [];
  var month = date.getMonth() + 1;
  var day = date.getDate(); // 获取最近七天

  for (var i = 0; i < 7; i++) {
    var tmpObj = {
      idx: i,
      children: []
    };

    switch (i) {
      case 0:
        if (curHour < 23) {
          tmpObj.text = "\u4ECA\u5929 (".concat(weekday[today], ")");
        }

        break;

      case 1:
        tmpObj.text = "\u660E\u5929 (".concat(weekday[getWeek(today + i)], ")");
        break;

      default:
        tmpObj.text = "".concat(formatTime(month), "-").concat(day + i, " (").concat(weekday[getWeek(today + i)], ")");
    }

    if (typeof tmpObj.text !== 'undefined') {
      dayArr.push(tmpObj);
    }
  }

  return dayArr;
}

module.exports = {
  formatTime: formatTime,
  getSendDuration: getSendDuration,
  getSendDay: getSendDay
};