<template>
	<view class="login" v-if="show==1">
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
	<view v-else>
		<view class="main">
			<image :src="infData.imgUrl" mode="widthFix"></image>
			<view class="text">
				<view class="text1">{{infData.loanMark?"已出借":"未出借"}}</view>
				<view>书&ensp;&ensp;&ensp;&ensp;名：{{infData.bookName}}</view>
				<view v-if="infData.author">作&ensp;者&ensp;名：{{infData.author}}</view>
				<view v-if="infData.translator">译&ensp;者&ensp;名：{{infData.translator}}</view>
				<view>出版社名：{{infData.publishingHouse}}</view>
			</view>
			<view class="text" v-if="infData.briefIntroduction">作品介绍：{{infData.briefIntroduction}}</view>
			<view class="text"  v-if="infData.authorIntroduction">作者介绍：{{infData.authorIntroduction}}</view>
			<view class="text">
				<view>价&ensp;&ensp;&ensp;&ensp;格：{{infData.price}}元</view>
				<view>页&ensp;&ensp;&ensp;&ensp;数：{{infData.pages}}</view>
				<view>I&nbsp;&nbsp;S&nbsp;&nbsp;B&ensp;N：{{infData.isbn}}</view>
				<view>出版时间：{{infData.publishDate}}</view>
			</view>
		</view>
		<view style="bottom: 0;height: 80rpx;"></view>
		<view class="books_nav">
			<image v-if="newData.starMark==0" src="../../static/icon/star.png" mode="widthFix" @click="tostar()"></image>
			<image v-else src="../../static/icon/star_filled.png" mode="widthFix"  @click="tostar()"></image>
			<image src="../../static/icon/list.png" mode="widthFix" @click="toloanlist()"></image>
			<button v-if="newData.loanList==1" style="background-color:#8b8b8b;" @click="addtoloanlist()">已加入借书单</button>
			<button v-else style="background-color:#ff0000;" @click="addtoloanlist()">加入借书单</button>
			<button v-if="infData.loanMark==1" style="background-color:#8b8b8b;">已被租借</button>
			<button v-else style="background-color:#0000ff;" @click="toloan()">立即租借</button>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				infData:{
					imgUrl:[],
					bookName:[],
					author:[],
					id:[],
					publishingHouse:[],
					translator:[],
					publishDate:[],
					pages:[],
					isbn:[],
					price:[],
					briefIntroduction:[],
					authorIntroduction:[],
					loanMark:[],
				},
				newData:{
					starMark:[],
					loanList:[]
				},
				id:[],
				type:[],
				show:[0]
			}
		},
		methods:{
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
						this.show=0
						this.insert()
						this.getbook1()
					}
					else
						uni.showToast({
							icon:'error',
							title: '登录失败',
							duration:1000
						});	
				}
			},
			async getbook(){
				const res=await request('/book?id='+this.id)
				this.infData=res
			},
			async getbook1(){
				const res=await request('/book1?id='+this.id+'&userId='+getApp().globalData.userId)
				this.newData=res
			},
			async update(){
				await request('/update?type='+this.type+'&id='+this.id+"&userId="+getApp().globalData.userId)
			},
			async insert(){
				await request('/insert?id='+this.id+'&userId='+getApp().globalData.userId)
			},
			async loan(){
				await request('/history?type=1&id='+this.id+'&userId='+getApp().globalData.userId)
			},
			addtoloanlist(){
				if(getApp().globalData.userId==0)
					this.tologin()
				else{
					this.type="loan_list"
					this.update().then(()=>this.getbook1())
					uni.showToast({
						title: this.newData.loanList?'从借书单中删除':'已加入借书单',
						duration:1000
					});
				}	
			},
			toloan(){
				if(getApp().globalData.userId==0)
					this.tologin()
				else
					uni.showModal({
						title: '提示',
						content: '是否租借',
						success: res => {
							if(res.confirm){
								this.type="loan_mark"
								this.update().then(()=>this.loan().then(()=>this.getbook()))
								uni.showToast({
									title: '成功租借',
									duration: 1000
								});
							}
						}
					});
			},
			tologin(){
				uni.showModal({
					title: '提示',
					content: '请先登录',
					success: res => {
						this.show=1
					},
				});
			},
			toloanlist(){
				if(getApp().globalData.userId==0)
					this.tologin()
				else
					uni.navigateTo({
						url:'/pages/loan_book_list/loan_book_list'
					});
			},
			tostar(){
				if(getApp().globalData.userId==0)
					this.tologin()
				else{
					this.type="star_mark"
					this.update().then(()=>this.getbook1())
					uni.showToast({
						title:this.newData.starMark==0?'收藏成功':'取消收藏',
						duration: 1000
					}) 
				}
			},
		},
		onLoad(option) {
			this.id=option.id
			this.insert().then(()=>this.getbook().then(()=>this.getbook1()	))
		}
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
	.main
		overflow: hidden
		background: #e8e8e8
		image
			height: 100%
			width: 100%
		.text
			margin: 20rpx 15rpx
			border-radius: 20rpx
			background: #fff
			.text1
				font-size: 40rpx
				font-weight: bold
	.books_nav
		position: fixed
		bottom: 0
		width: 100%
		background: #fff
		display: flex
		text-align: center
		height: 80rpx
		margin-right: 40rpx
		image
			margin-right: 40rpx
			width: 100rpx
		button
			margin: 6rpx 10rpx 0 0
			width: 300rpx
			color: #fff
			height: 70rpx
			font-size: 30rpx
		
</style>
