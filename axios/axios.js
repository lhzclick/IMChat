import axios from "axios"
import qs from "qs"
//  创建axios实例
const service = axios.create({
    baseURL: 'https://api.liuhu66.cn', // api的base_url
    timeout: 1000 // 请求超时时间
})

// 加载laoding
let loading
function startLoading() {    //使用Element loading-start 方法
  uni.showLoading({
      title: '加载中'
  });
}
function endLoading() {    //使用Element loading-close 方法
  uni.hideLoading();
}

//  request拦截器
service.interceptors.request.use(config => {
    startLoading() 
    config.method === 'get' ? config.data = qs.stringify({
        ...config.data
    }) : config.params = {
        ...config.params
    }
    // config.headers.common['Content-Type'] = 'application/json'            
    return config
}, error => { //请求错误处理   
    console.log(error)
    Promise.reject(error)
})

//  response拦截器
service.interceptors.response.use(
    response => { //成功请求到数据    
	console.log(response)
        endLoading()
        if (response.status == 200) {
            if(!response.data.err){
                return response.data
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
    },
    error => { //响应错误处理console.log('error')        
        let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
            '404' :
            '网络异常，请重试'
			uni.showToast({
				title: text,
				duration: 2000
			})  
        return Promise.reject(error)
    }
)

export default service