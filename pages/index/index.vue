<template>
	<view class="content">
		<uni-card v-for="(item,i) in newsList" :key="i" :title="'热点新闻'+(i+1)">
			<view class="listNews" @click="toDetail(item2.cIndex)" v-for="(item2,i2) in item" :show-arrow="false" :key="i2">
				{{item2.text}}
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	import {
		uniCard,
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		components: {
			uniCard,
			uniList,
			uniListItem,
		},
		computed: {
			...mapState(['num'])
		},
		onLoad() {
			this.$http.request({
				method: "GET",
				url: "/getNewsTitle",
				header: {},
				data: {}
			}).then(res => {
				this.newsList = res
			});
		},
		methods: {
			...mapMutations(['changeNum']),
			toDetail(cIndex) {
				uni.navigateTo({
					url: '/pages/newsDetail/newsDetail?cIndex=' + cIndex
				});
			},
			change() {}
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
	.listNews{
		border-bottom: 1px solid #999;
		margin-bottom: 20upx;
		padding-bottom: 20upx;
	}
	.listNews:nth-last-of-type(1){
		border:none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
</style>
