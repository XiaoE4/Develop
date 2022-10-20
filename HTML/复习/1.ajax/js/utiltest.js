function queryStringify(obj) {
    let str = ''
    for (let k in obj) str += `${k}=${obj[k]}&`

    // username=xiaoE&password=789&
    return str.slice(0, -1)
}

// 封装ajax
function ajax(options) {
    let defaultoptions = {
        url: "",
        methor: "GET",
        async: true,
        data: {},
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function () { },
        error: function () { }
    }
    let { url, method, async, data, headers, success, error } = {
        ...defaultoptions,
        ...options
    }

    // 判断如果data是object，若是则判断类型为json的话data加上JSON.stringify(data)，send用
    // 不是json格式的话加上queryStringify(data)
    if (typeof data === 'object' && headers["content-type"]?.indexOf("json") > -1) {
        data = JSON.stringify(data)
    } else {
        data = queryStringify(data)
    }
    // 如果是get请求，并且有参数，那么直接组装一下 url 信息
    if (/^get$/i.test(method) && data) url += '?' + data

    // 发送请求
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onload = function () {
        if (!/^2\d{2}$/.test(xhr.status)) {
            error(`错误状态码：${xhr.status}`)  // 回调
            return
        }   
        // 执行解析

        try{
            let result =JSON.parse(xhr.responseText)
            success(result)
        }catch(err){
            error("解析失败 ! 因为后端返回的结果不是 json 格式字符串")
        }
    }

    // 设置请求头内的信息
    for(let k in headers) xhr.setRequestHeader (k,headers[k])
    if(/^get$/i.test(method)){
        xhr.send()
    }else{
        xhr.send(data)
    }
}

// export default ajax