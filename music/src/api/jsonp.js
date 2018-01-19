import originJsonp from "jsonp"

// 在Promise构造函数内调用jsonp，当然请求成功的时候会调用resolve函数把data的值传出去，请求错误的时候会调用reject函数将err的值传出去
let jsonp = (url,data,option) => {
  return new Promise((resolve,reject) => {
    originJsonp(buildUrl(url,data),option,(err,data) => {
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  })
}

// buildUrl函数是把json对象的参数拼接到url后面最后变成xxxx?参数名1=参数值1&参数名2=参数值2这种形式
function buildUrl(url,data){
  let params = [];
  for(var k in data){
    params.push(`${k}=${data[k]}`);
  }
  let param = params.join("&");
  if(url.indexOf("?") === -1){
    url += "?" + param;
  }else{
    url += "&" + param;
  }
  return url;
}

export default jsonp