<template>
	<view class="list">
		<view class="list2" v-for="item in infData" :key="item.id"  @click="tobook(item.id)">
			<image :src="item.imgUrl" mode="widthFix"></image>
			<view>{{item.bookName}}</view>
			<view>{{item.author}}</view>
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
		text-align: center
		justify-content: space-between
		vertical-align: middle
		.list2
			width: 50%
			background: #fff
			white-space: nowrap
			text-overflow: ellipsis
			image
				width: 370rpx
	.text
		font-size: 50rpx
		text-align: center
</style>