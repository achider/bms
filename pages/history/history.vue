<template>
	<view class="list">
		<view class="list1" v-for="item in infData" :key="item.id" @click="tobook(item.id)">
			<image :src="item.imgUrl" mode="widthFix"></image>
			<view class="list2">
				<view>书&ensp;&ensp;名：{{item.bookName}}</view>
				<view>作者名：{{item.author}}</view>
			</view>
			<view>
				<view v-if="item.history==0" class="t">归还</view>
				<view v-if="item.history==1" class="t">借阅</view>
			</view>
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
					bookName:[],
					author:[],
					imgUrl:[],
					history:[]
				}
			}
		},
		methods: {
			async getInf(){
				const res=await request('/look?userId='+getApp().globalData.userId)
				this.infData=res
			},
			tobook(id){
				uni.navigateTo({
					url:'../book_detail/book_detail?id='+id
				})
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
				width: 500rpx
			.t
				font-weight: bold
				color: #ff0000
				text-align: center
	.text
		font-size: 50rpx
		text-align: center
</style>
