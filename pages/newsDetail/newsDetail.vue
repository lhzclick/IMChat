<template>
	<view class="news_wrap">
		<view class="n_head">
			<view class="title">{{newsDetail.title}}</view>
			<view class="time">{{newsDetail.time}}</view>
		</view>
		<uni-card class="card">
			<view v-html="newsDetail.content"></view>
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
		uniListItem
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				newsDetail: {}
			}
		},
		components: {
			uniCard,
		},
		computed: {
			...mapState(['num'])
		},
		onLoad(option) {
			this.$http.request({
				method: "GET",
				url: `/getNewsDetail`,
				header: {},
				data: {},
				params: { // 会拼接到url上
					cIndex: option.cIndex
				 }
			}).then(res => {
				this.newsDetail = res
				this.newsDetail.content = this.newsDetail.content.replace(/<img/g,'<img style="width:100%"')
			});
		},
		methods: {
			...mapMutations(['changeNum'])
		}
	}
</script>

<style>
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	} */

	/* .news_title{
	    font-size: 5vw;
	}
	.time{
	    color: #999;
	    margin-top: 10px;
	} */
	/* .uni-card__header-title-text[data-v-5adb6b59]{
		font-size: 100rpx!important;
	} */
	.news_wrap{
	    width: 100%;
		
	}
	.news_wrap .card{
		font-size: 30rpx;
		line-height: 48rpx;
	}
	.news_wrap img{
	    width: 680rpx!important;
	}
	* img{
		width: 680rpx!important;
	}
	
	.n_head{
		margin: 16px;
		
	}
	.n_head .title{
		font-size: 40rpx;
		line-height: 60rpx;
		margin-bottom: 20rpx;
	}
	.n_head .time{
		font-size: 30rpx;
		color: #999;
	}
</style>
