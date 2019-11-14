<template>
	<view id="retroclockbox_counter" class="xdsoft">
		<view class="xdsoft_flipcountdown " ref="flipcountdown">
			<view :style="{'background-position': ''+item.X+' '+item.Y+'' }" :class="[item.value ==='.'? 'xdsoft_digit xdsoft_dot' : item.value ===':'?'xdsoft_digit  xdsoft_space':'xdsoft_digit']"
			 :data-value="item.value" v-for="(item,index) of dataList" :key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//小数点X位置
			dotX: {
				type: [String, Number],
				default: "-27"
			},
			//小数点y位置
			dotY: {
				type: [String, Number],
				default: "-3120"
			},
			//1正常计时，2倒计时
			selectType: {
				type: [String, Number],
				default: 1
			},
			// 雪碧图里的每个数字的共同高度
			numHeight: {
				type: [String, Number],
				default: 52
			},
			// 数字 0 、0.1
			dataOrNum: {
				type: [String, Number],
				default: ""
			},
			// 结束时间
			endTime: {
				type: [String, Number],
				default: 4070880000000
			},
			// 自定义函数
			tick: {
				type: Function,
				default: function tick() {}
			},
			// 初始个数,比如雪碧图0-1，0到1需要翻转6次，所以填6，自定义的雪碧图0到1只要翻转1次，所以填1
			rollingNumber: {
				type: [String, Number],
				default: 6
			},
			// 所有个数,比如0-9-0共10个，就填10，不包括.和:
			total: {
				type: [String, Number],
				default: 60
			},

		},
		data() {
			return {
				oldDataList: [],
				dataList: [],
				blocks: [],
				speedFlip: 60,
				propsDataOrNum: this.dataOrNum,
			}
		},
		mounted() {
			this.blocks = this.propsDataOrNum.toString().split("")
			if (this.blocks.includes(":") || this.propsDataOrNum.toString().trim() === "") {
				this._selectType()
			}
			this._calcMoment()
			this._timingExecution()

		},
		methods: {
			_calcMoment() {
				let value = this.propsDataOrNum,
					chars = [],
					dataListNoDomArray = [],
					_self = this

				switch (value.constructor) {
					case String:
						chars = value.replace(/[^0-9\:\.\s]/g, '').split('');
						break;
					case Number:
						chars = value.toString().split('');
						break;
				}
				chars.forEach(function(item, value) {
					if (item === ".") {
						dataListNoDomArray.push({
							value: item,
							X: _self.dotX + 'px',
							Y: _self.dotY + 'px'
						})
					} else {
						dataListNoDomArray.push({
							value: item,
							X: "0px",
							Y: -(item * Number(_self.rollingNumber) * Number(_self.numHeight) + 1) + 'px'
						})
					}
				})
				this.dataList = dataListNoDomArray
				this._generate(chars)
			},

			_generate(chars) {
				let _self = this,
					box;

				if (!(chars instanceof Array) || !chars.length)
					return false;
				for (var i = 0, n = chars.length; i < n; i++) {
					let _i = i
					_self.$nextTick(function() {
						_self.blocks[_i] = Number(_self.blocks[_i])
						var old = parseInt(_self.blocks[_i]),
							ii = parseInt(Object.keys(_self.blocks)[_i])
						//#ifdef  H5
						if (_self.$refs.flipcountdown !== undefined) {
							//#endif
							if (_self.blocks[_i] != chars[_i]) {
								var crnt = parseInt(chars[_i]);
								if (Number(_self.selectType) === 1) {
									old = (crnt - 1) < 0 ? 9 : crnt - 1;
								} else if (Number(_self.selectType) === 2) {
									old = (crnt + 1) < 0 ? 9 : crnt + 1;
									if (old === 10) {
										old = 8
									}
								}
								// #ifdef H5
								box = _self.$refs.flipcountdown.$children[ii]
								//#endif
								// #ifndef H5
								box = null
								//#endif
							
								_self._animateRange(box, old, crnt);
							} else {
								// #ifdef H5
								_self.$refs.flipcountdown.$children[ii].$el.style.backgroundPosition = '0px ' + -(old * Number(this.rollingNumber) *
									Number(this.numHeight) + 1) + 'px'
								//#endif
							}
							//#ifdef  H5
						}
						//#endif
					})
				}
			},

			_animateRange(box, a, b) {
				this._animateOne(box, a, (a > b && !(a == 9 && b == 0)) ? -1 : 1, !(a == 9 && b == 0) ? Math.abs(a - b) : 1);
			},

			_animateOne(box, a, arrow, range) {
				if (range < 1)
					return;
				this._setMargin(box, -(a * Number(this.rollingNumber) * Number(this.numHeight) + 1), 1, arrow, function() {
					_animateOne(box, a + arrow, arrow, range - 1);
				}, range);
			},

			_setMargin(box, marginTop, rec, arrow, callback, range) {
				let _self = this;
				if (marginTop <= -Number(this.numHeight) * Number(this.total)) {
					marginTop = -1;
				}
				//#ifdef  H5
				if (box.$attrs["data-value"] === ".") {
					box.$el.style.backgroundPosition = this.dotX + 'px ' + this.dotY + 'px'
				} else {
					box.$el.style.backgroundPosition = '0px ' + marginTop + 'px'
				}
				//#endif
				if (rec <= Number(this.rollingNumber)) {
					setTimeout(function() {
						_self._setMargin(box, marginTop - arrow * Number(_self.numHeight), ++rec, arrow, callback, range);
					}, parseInt(_self.speedFlip / range));
				}
			},

			// 定时执行
			_timingExecution() {
				let _self = this
				setInterval(function() {
					_self.blocks = _self.propsDataOrNum.toString().split("")
					if (_self.blocks.includes(":")) {
						_self._selectType()
					} else {
						_self.tick()
					}
					_self._calcMoment()
				}, 1000)
			},

			// time
			time(value) {
				let lastArray = this.zeroFill(value.toString().split(":"))
				return lastArray[0] + lastArray[1] + lastArray[2]
			},

			/*
			 *倒计时
			 * startTime 开始时间
			 *  endTime 结束时间
			 * */
			count_down(startTime, endTime) {
				// 计算时间差
				let time_distance = endTime - startTime;
				// 时
				let int_hour = Math.floor(time_distance / 3600000)
				time_distance -= int_hour * 3600000;
				// 分
				let int_minute = Math.floor(time_distance / 60000)
				time_distance -= int_minute * 60000;
				// 秒
				let int_second = Math.floor(time_distance / 1000)
				let timeArray = [int_hour, int_minute, int_second]
				// 补0
				let lastArray = this.zeroFill(timeArray)
				return lastArray[0] + lastArray[1] + lastArray[2]
			},
			//补0
			zeroFill(array) {
				let lastArray = []
				array.forEach(function(item, value) {
					if (item.toString().length < 2) {
						item = "0" + item
					}
					if (value !== 2) {
						item = item + ":"
					}
					lastArray.push(item)
				})
				return lastArray
			},
			_selectType() {
				if (Number(this.selectType) === 1) {
					this.propsDataOrNum = this.time(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
				} else if (Number(this.selectType) === 2) {
					if (!this.count_down(new Date().getTime(), this.endTime).includes("-")) {
						this.propsDataOrNum = this.count_down(new Date().getTime(), this.endTime)
					} else {
						uni.$emit('timeOut', {
							msg: '00:00:00'
						})
						this.propsDataOrNum = "00:00:00"
					}
				}
			}
		}
	}
</script>

<style>
	.xdsoft_flipcountdown {
		display: inline-block;
	}

	.xdsoft_flipcountdown .xdsoft_digit {
		float: left;
		background-repeat: no-repeat;
	}

	.xdsoft_flipcountdown>.xdsoft_digit {
		background-position: 0px 0px;
	}

	.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_separator,
	.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_dot {
		opacity: 0.9;
	}

	.xdsoft_flipcountdown>.xdsoft_digit {
		width: 36px;
		height: 51px;
		background-image: url(~@/static/flipcountdown-uni/digit-md.png);
	}

	.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_dot {
		width: 10px;
		background-position: -27px -3120px
	}

	.xdsoft_flipcountdown>.xdsoft_digit.xdsoft_space {
		width: 10px;
		background-position: -13px -3120px;
	}
</style>
