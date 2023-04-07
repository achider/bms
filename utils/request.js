export default (url,data={},method='GET')=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:'http://localhost'+url,
			// url:'http://124.71.140.250:80'+url,
			data,
			method,
			success:(res)=> {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}