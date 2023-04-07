<template>
	<view class="listBox">
		<scroll-view class="left" scroll-y>
			<view v-for="(item,index) in country" :key="index" @click="toCoun(item)" :class="item==coun?'active':'inactive'">{{item}}</view>
		</scroll-view>
		<scroll-view scroll-y class="right" @scrolltolower="reachBottom" :scroll-top="scrollTop" @scroll="scroll">
			<view v-for="item in infData" :key="item.id" @click="tobook(item.id)">
				<image :src="item.imgUrl" mode="widthFix"></image>
				<view>{{item.bookName}}</view>
				<view>{{item.author}}</view>
			</view>
			<view class="text">---------无更多结果--------</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				country:[
					'American',
					'Argentina',
					'Australia',
					'Austria',
					'Belarus',
					'Brazil',
					'Canada',
					'Chile',
					'Colombia',
					'Cuba',
					'Czech',
					'Denmark',
					'English',
					'France',
					'Germany',
					'Greece',
					'Hungary',
					'Ireland',
					'Israel',
					'Italy',
					'Japanese',
					'Korea',
					'Malaysia',
					'Mexico',
					'Netherlands',
					'Norway',
					'Poland',
					'Portugal',
					'Russia',
					'Spain',
					'Sweden',
					'Switzerland',
					'Taiwan',
					'Turkey',
					'Uruguay',
					'Ussr',
					'China_and_Unknown'
				],
				infData:{
					img:[],
					bookName:[],
					author:[],
					id:[]
				},
				page:1,
				coun:['American'],
				scrollTop:0,
                old: { scrollTop: 0 },
			}
		},
		methods: {
			toCoun(coun){
				if(this.conn!=coun)
					this.page=1
				this.coun=coun
				this.getCoun()
				this.scrollTop = this.old.scrollTop
                this.$nextTick(function(){
                    this.scrollTop=0;
                });
			},
			tobook(id){
				uni.navigateTo({
					url:'../book_detail/book_detail?id='+id
				})
			},
			async getCoun(){
				const res=await request('/coun?coun='+this.coun+'&page='+this.page)
				this.infData=res
			},
			reachBottom(){
				this.page++,
				this.getCoun()
			},
			scroll:function(e){
				this.old.scrollTop = e.detail.scrollTop
			}
		},
		onLoad(){
			this.getCoun()
		}
	}
</script>

<style lang="stylus">
	.listBox
		display: flex
		flex-direction: row
		flex-wrap: nowrap
		justify-content: flex-start
		align-items: flex-start;
		align-content: flex-start;
		font-size: 30rpx
		text-align: center
		.left
			width: 220rpx
			height: 1100rpx
			view
				margin-top: 5rpx
				height: 90rpx
				line-height: 90rpx
			.active
				background: #ff0000
				color: #fff
		.right
			width: 540rpx
			height: 1100rpx
			image
				width: 100%
			.text
				font-size: 40rpx
				font-weight: bold
</style>
