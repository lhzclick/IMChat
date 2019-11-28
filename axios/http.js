import Request from './request'

const http = new Request()

// 加载laoding
let loading
function startLoading() {   
  uni.showLoading({
      title: '加载中'
  });
}
function endLoading() {    
  uni.hideLoading();
}

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://api.liuhu66.cn' /* 根域名不同 */
  config.header = {
    ...config.header,
  }
  return config
})

http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  startLoading()
  config.header = {
    ...config.header,
  }
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  endLoading()
  if (response.statusCode == 200) {
      if(!response.data.err){
          return response.data.data
      }else{
  		uni.showToast({
  		    title: response.data.msg,
  		    duration: 2000
  		})
      }
  } else {
  	uni.showToast({
  	    title: response.data.msg,
  	    duration: 2000
  	})        
  }
  return response
}, (response) => { 
	let text = JSON.parse(JSON.stringify(error)).response.statusCode === 404 ?
	    '404' :
	    '网络异常，请重试'
		uni.showToast({
			title: text,
			duration: 2000
		})  
	return Promise.reject(error)
	return response
})

export default http
