<template>
	<view class="list">
		<view class="list1" v-for="item in infData" :key="item.id">
			<image :src="item.imgUrl" mode="widthFix" @click="tobook(item.id)"></image>
			<view class="list2" @click="tobook(item.id)">
				<view>书&ensp;&ensp;名：{{item.bookName}}</view>
				<view>作者名：{{item.author}}</view>
			</view>
			<button @click="toreturn(item.id)">归还</button>
		</view>
	</view>
	<view class="text">-----------无更多结果----------</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				infData:{
					id:[],
					imgUrl:[],
					bookName:[],
					author:[],
				},
			};
		},
		methods:{
			async getInf(){
				const res=await request('/get?type=loan_mark&userId='+getApp().globalData.userId)
				this.infData=res
			},
			async return_book(id){
				await request('/history?type=0&id='+id+'&userId='+getApp().globalData.userId)
			},
			async update(id){
				await request('/update?type=loan_mark&id='+id+'&userId='+getApp().globalData.userId)
			},
			tobook(id){
				uni.navigateTo({
					url:'../book_detail/book_detail?id='+id
				})
			},
			toreturn(id){
				uni.showModal({
					title: '提示',
					content: '是否归还',
					success: res => {
						if(res.confirm){
							this.update(id)
							this.return_book(id)
							this.getInf()
							uni.showToast({
								title: '成功归还',
								duration: 1000
							});
						}
					}
				});
			},
		},
		onLoad() {
			this.getInf()
		}
	}
</script>
<style lang="stylus">
	.list
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		vertical-align: middle
		background: #b4b4b4
		.list1
			display: flex
			align-items: center
			width: 750rpx
			margin-top: 1rpx
			flex-wrap: row
			background: #fff
			height: 220rpx
			image
				width: 150rpx
			.list2
				width: 600rpx
			button
				height: 180rpx
	.text
		font-size: 50rpx
		text-align: center
</style>