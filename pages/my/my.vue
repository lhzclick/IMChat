<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<uni-badge type="success" :text="num"></uni-badge>
		</view>
		<view>
			<button @click="changeNum('3')" type="primary">点击我</button>
		</view>
		<uni-card title="标题文字" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="额外信息" note="Tips">
		    内容主体，可自定义内容及样式
		</uni-card>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {uniBadge,uniCard} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				title: '我的'
			}
		},
		components: {uniBadge,uniCard},
		computed: {
			...mapState(['num'])
		},
		onLoad() {
		},
		methods: {
			...mapMutations(['changeNum'])
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
</style>

