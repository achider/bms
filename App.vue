<script>
	export default {
		globalData:{
			userId:[0]
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
	.search
		display: flex 
		padding: 10rpx 5rpx
		.search1
			width: 560rpx
			height: 60rpx
			input
				background: #f5f5f5
				height: 60rpx
				width: 600rpx
				border: 1rpx solid #ccc
				margin-left: 6rpx
		button
			width: 120rpx
			height: 60rpx
			text-align: center
			line-height: 60rpx
			padding: 0 6rpx
			margin-left: 60rpx
	.side
		overflow: hidden
		swiper
			margin-top: 5rpx
			height: 600rpx
			image
				height: 100%
				width: 100%
		.list
			display: flex
			background: #b4b4b4
			flex-wrap: wrap
			text-align: center
			justify-content: space-between
			// border-top: 1rpx solid #e8e8e8;
			.list1
				margin-top: 5rpx
				background: #fff
				image
					width: 186rpx
					height: 100rpx
			
</style>
