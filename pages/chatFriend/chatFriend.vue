<template>
	<view class="content">
		<uni-indexed-list :options="list" :showSelect="false" @click="toChat"></uni-indexed-list>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import {
		uniIndexedList
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				list: [{
					"letter": "A",
					"data": [
						"阿刚1",
						"阿刚2",
						"阿刚3",
						"阿刚4",
						"阿刚5",
						"阿刚6"
					]
				}, {
					"letter": "X",
					"data": [
						"小白1",
						"小白2",
						"小白3",
						"小白4",
						"小白5"
					]
				}]
			}
		},
		components: {
			uniIndexedList
		},
		computed: {
			...mapState(['num'])
		},
		onLoad() {
			// this.$http.request({
			// 	method: "GET",
			// 	url: "/getNewsTitle",
			// 	header: {},
			// 	data: {}
			// }).then(res => {
			// 	this.newsList = res
			// });
		},
		methods: {
			...mapMutations(['changeNum']),
			toChat(){
				uni.navigateTo({
					url: `/pages/HM-chat/HM-chat?cIndex=${1}`
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.listNews {
		border-bottom: 1px solid #999;
		margin-bottom: 20upx;
		padding-bottom: 20upx;
	}

	.listNews:nth-last-of-type(1) {
		border: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
</style>
