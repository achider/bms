<template>
	<view class="list">
		<view class="list1" v-for="item in infData" :key="item.id"  @click="tobook(item.id)">
			<image :src="item.imgUrl" mode="widthFix">{{item.bookName}}</image>
			<view class="list2">
				<view>书&ensp;&ensp;名：{{item.bookName}}</view>
				<view>作者名：{{item.author}}</view>
			</view>
		</view>
	</view>
	<view class="text">-----------无更多结果----------</view>
</template>

<script>
	export default {
		props:['infData'],
		methods:{
			tobook(id){
				uni.navigateTo({
					url:'../book_detail/book_detail?id='+id
				})
			}
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