<template>
	<view>
		<showBookList :infData="infData"></showBookList>
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
				}
			};
		},
		methods:{
			async getInf(){
				const res=await request('/get?type=loan_mark&userId='+getApp().globalData.userId)
				this.infData=res
			}
		},
		onLoad() {
			this.getInf()
		}
	}
</script>

<style lang="stylus">

</style>
