<template>
	<view class="login" v-if="userId==0">
		<view class="list2">用户登录</view>
		<view class="list1">
			<text>用户名：</text>
			<input v-model="username" placeholder="请输入用户名"/>
		</view>
		<view class="list1">
			<text>密&ensp;&ensp;码：</text>
			<input v-model="password" placeholder="请输入密码"/>
		</view>
		<view class="list1">
			<button @click="register()">注册账号</button>
			<button @click="login()">登录账号</button>
		</view>
	</view>
	<view class="userinfo" v-else>
		<view class="userinfo-avatar">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<!-- <open-data type="userNickName"></open-data> -->
		<view>{{username}}</view>
		<view class="list" v-for="(item,index) in listData" :key="index" @click="jump(item.type)">
			<view class="list1">{{item.text}}</view>
		</view>
	</view>
</template>
<script>
	import request from '../../utils/request.js'
export default{
	data(){
		return{
			listData:[
				{
					text:"收藏图书",
					type:"star_book"
				},
				{
					text:"借阅图书",
					type:"loan_book"
				},
				{
					text:"借书单",
					type:"loan_book_list"
				},
				{
					text:"归还图书",
					type:"return_book"
				},
				{
					text:"借阅记录",
					type:"history"
				},
				{
					text:"退出登录",
					type:"exit"
				}
			],
			userId:getApp().globalData.userId
		}
	},
	methods:{
		jump(type){
			if(type=='exit'){
				getApp().globalData.userId=0
				this.userId=0
				this.username=""
				this.password=""
			}
			else
				uni.navigateTo({
					url: '../'+type+'/'+type,
				});
		},
		async login(){
			if(this.username==undefined||this.password==undefined)
				uni.showToast({
					icon:'error',
					title: this.username==undefined?'用户名不能为空':'密码不能为空',
					duration:1000
				});
			else{
				const res=await request('/login?username='+this.username+'&password='+this.password)
				if(res.userId!=null){
					uni.showToast({
						icon:'success',
						title: '登录成功',
						duration:1000
					});
					getApp().globalData.userId=res.userId
					this.userId=getApp().globalData.userId
				}
				else
					uni.showToast({
						icon:'error',
						title: '登录失败',
						duration:1000
					});	
			}
		},
		async register(){
			if(this.username==undefined||this.password==undefined)
				uni.showToast({
					icon:'error',
					title: this.username==undefined?'用户名不能为空':'密码不能为空',
					duration:1000
				});
			else{
				const res=await request('/register?username='+this.username+'&password='+this.password)
				if(res==true)
					uni.showToast({
						icon:'success',
						title: '注册成功',
						duration:1000
					});
				else
					uni.showToast({
						icon:'error',
						title: '注册失败',
						duration:1000
					});
			}
		}
	},
}
</script>
<style lang="stylus">
	.login
		margin-top: 40rpx
		.list2
			margin-bottom: 40rpx
			text-align: center
			font-size: 40rpx
		.list1
			padding: 20rpx;
			line-height: 2;
			display: flex;
			font-size: 30rpx;
			border-top: 1rpx solid #e8e8e8;
			display: flex 
			text
				margin-top: 10rpx
				width: 120rpx
			input
				margin-top: 8rpx
				height: 60rpx
				width: 400rpx
			button
				width: 300rpx
	.userinfo 
		display: flex
		flex-direction: column
		align-items: center
		margin-top: 80rpx
		font-size: 40rpx
		// margin-bottom: 60rpx
		.userinfo-avatar
			overflow: hidden
			width: 200rpx
			height: 200rpx
			margin: 20rpx
			border-radius: 50%
		.list
			margin-top:20rpx 
			text-align: center
			border: 1rpx solid #e8e8e8;
			width: 100% 
			height: 100rpx
			font-size: 40rpx
			.list1
				margin-top: 40rpx
				background: #fff
				height: 82rpx
			
</style>
