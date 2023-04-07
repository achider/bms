<template>
	<view>
		<showBooks :infData="infData"></showBooks>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				infData:{
					img:[],
					bookName:[],
					author:[]
				},
				page:[1],
				type:[],
				id:[]
			}
		},
		methods:{
			async find(){
				const res=await request('/find?type='+this.type+'&id='+this.id+'&page='+this.page)
				this.infData=res
			}
		},
		onLoad(option){
			this.type=option.type,
			this.id=option.id
			this.find()
		},
		onReachBottom() {
			this.page++,
			this.find()
		}
	}
</script>

<style lang="stylus">

</style>
