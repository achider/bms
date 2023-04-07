<template>
	<view class="search">
		<view class="search1">
			<input v-model="id" v-if="type=='book_name'" placeholder="请输入书名..." />
			<input v-model="id" v-if="type=='publishing_house'" placeholder="请输入出版社名..." />
			<input v-model="id" v-if="type=='author'" placeholder="请输入作者名..." />
			<input v-model="id" v-if="type=='translator'" placeholder="请输入译者名..." />
			<input v-model="id" v-if="type=='isbn'" placeholder="请输入isbn号..." />
		</view>
		<button type="default" @click="tofind()">搜索</button>
	</view>
	<view class="side">
		<swiper indicator-dots="true" autoplay="false" interval="3000" duration="500" circular="true">
			<swiper-item v-for="item in imgData" :key="item.id">
				<image :src="item.imgUrl" mode="widthFix" @click="tobook(item.id)"></image>
			</swiper-item>
		</swiper>
		<view class="list">
			<view class="list1" v-for="(item,index) in iconData" :key="index" @click="clicklist(item.type)">
				<image :src="item.iconPath"></image>
				<view>{{item.text}}</view>
			</view>
		</view>
		<showBooks :infData="infData"></showBooks>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default{
		data(){
			return{
				iconData:[
					{
						"type": "publishing_house",
						"text": "出版社查询",
						"iconPath": "/static/icon/publishing_house.png"
					},
					{
						"type": "translator",
						"text": "译者查询",
						"iconPath": "/static/icon/translator.png"
					},
					{
						"type": "author",
						"text": "作者查询",
						"iconPath": "/static/icon/author.png"
					},
					{
						"type": "isbn",
						"text": "isbn查询",
						"iconPath": "/static/icon/isbn.png",
					}
				],
				imgData:{
					img:[],
					id:[]
				},
				infData:{
					img:[],
					bookName:[],
					author:[],
					id:[]
				},
				page:[1],
				type:["book_name"]
			}
		},
		methods:{
			clicklist(type){
				this.type=type
			},
			tofind(){
				uni.navigateTo({
					url: '../book_list/book_list?type='+this.type+'&id='+this.id
				});
			},
			tobook(id){
				uni.navigateTo({
					url:'../book_detail/book_detail?id='+id
				})
			},
			async create(){
				await request('/create')
			},
			async getImg(){
				const res=await request('/img')
				this.imgData=res
			},
			async getInf(){
				const res=await request('/inf?page='+this.page)
				this.infData=res
			}
		},
		onLoad() {
			this.getImg(),
			this.create().then(()=>this.getInf())
			
		},
		onReachBottom() {
			this.page++,
			this.getInf()
		},
		onPullDownRefresh() {
			this.page=1,
			setTimeout(()=>{
				this.getImg()
				this.getInf().then(()=>{uni.stopPullDownRefresh()})
			},100)
		}
	}
</script>

<style lang="stylus">
	
</style>