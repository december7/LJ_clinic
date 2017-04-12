<template>
	<div class="modal inmodal fade" id="physical_check_modal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
	
				<h4 style="margin: 15px 20px; display: inline-block">体格检查</h4>
				<button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
													aria-hidden="true">&times;</span></button>
				<div class="hr-tcline"></div>
	
				<div class="ibox-title no-borders msg_item_title">
					<h5>就诊信息</h5>
					<img v-show="data_item.isEmergency == 2" src="../../../../static/img/emergency.png" style="position: absolute; right: 30px;">
				</div>
	
				<!--弹窗详细内容-->
				<div class="ibox-content no-borders" style="margin-top: -20px">
					<form method="get" class="form-horizontal m-l-md">
						<div class="form-group">
							<div class="col-md-4 no-padding">
								<div class="col-md-3 pull-left no-padding left_text_tips">患者姓名 :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.userName}}</div>
							</div>
	
							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">选择科室 :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.departName}}</div>
							</div>
	
							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">选择医生 :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.doctorName}}</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">门 诊 号 :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.registeredOrdId}}</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">挂号费(元) :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.registeredFee/100}}</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">接诊类型 :</div>
								<div class="col-md-9" style="padding-right: 0; margin-top: 8px">{{data_item.registeredType == 1 ? '初诊':'复诊'}}</div>
							</div>
	
						</div>
	
					</form>
				</div>
	
				<div class="hr-tcline" style="margin-top: -15px"></div>
	
				<div class="ibox-title no-borders msg_item_title">
					<h5>患者体格检查</h5>
				</div>
	
	
				<div class="ibox-content no-borders no_top_padding">
					<form method="get" class="form-horizontal m-l-md">
						<div class="form-group">
							<div class="col-md-4 no-padding">
								<div class="col-md-3 pull-left no-padding left_text_tips">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" @input="bmiNumCalculator()" v-model="data_physical.height" type="text" placeholder="身高 (cm)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" @input="bmiNumCalculator()" v-model="data_physical.weight" type="text" placeholder="体重 (kg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.temperature" type="text" placeholder="体温 (℃)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">BMI指数</div>
								<div class="col-md-9" style="padding-right: 0">
									<input disabled="disabled" v-model="data_physical.bmiNum" type="text" placeholder="BMI指数" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.breathing" type="text" placeholder="呼吸 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">氧饱和度</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.oxygen" type="text" placeholder="氧饱和度 (％)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">疼痛评分</div>
								<div class="col-md-9" style="padding-right: 0">
									<number :max="10" v-model="data_physical.painScore" type="text" placeholder="疼痛评分 (0-10)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.pulse" type="text" placeholder="脉搏 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<span class="form-control" style="border:none"></span>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">收 缩 压</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.systolicPressure" type="text" placeholder="收缩压 (mmHg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
	
							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">舒 张 压</div>
								<div class="col-md-9" style="padding-right: 0">
									<number decimals="2" v-model="data_physical.diastolicPressure" type="text" placeholder="舒张压 (mmHg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
								</div>
							</div>
						</div>
	
					</form>
				</div>
	
				<div style="text-align: center; margin-bottom: 20px">
					<button @click="perfectPhysical" :disabled="sending" class="btn_save">保存</button>
					<button class="btn_cancel" data-dismiss="modal">取消{{getPhysicalData}}</button>
				</div>
	
			</div>
		</div>
	</div>
</template>

<style>
	.btn_save {
		width: 100px;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
		margin-left: 0px;
	}
	
	.btn_cancel {
		width: 100px;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}
</style>

<script>
	import number from '../../commonView/number.vue'
	
	export default {
		components: {
			number
		},
		data() {
			return {
				sending: false,
				data_item: {},
				data_physical: {
					height: '',
					weight: '',
					temperature: '',
					bmiNum: '',
					breathing: '',
					oxygen: '',
					painScore: '',
					pulse: '',
					diastolicPressure: '',
					systolicPressure: ''
				},
			}
		},
		props: {
			registeredOrdId: {
				default: ""
			},
		},
		created() {},
		methods: {
	
			bmiNumCalculator: function() {
				if (this.data_physical.weight > 0 && this.data_physical.height > 0) {
					this.data_physical.bmiNum = (this.data_physical.weight / ((this.data_physical.height / 100) * (this.data_physical.height / 100))).toFixed(1);
				} else {
					this.data_physical.bmiNum = 0;
				}
			},
	
			showPhysique1: function() {
				var that = this;
				this.$api.get(this, this.$requestApi.showPhysique + this.registeredOrdId, "", function(data) {
					if (data.status == '200') {
						that.data_item = data.body.data;
						if (data.body.physique != '') {
							that.data_physical = data.body.physique;
						}
					} else {
						console.log(data.body.msg);
					}
				}, function(err) {
					console.log(err);
				});
			},
	
			perfectPhysical: function() {
				var that = this;
				this.sending = true;
				this.$api.post(this, this.$requestApi.perfectPhysical + this.registeredOrdId, that.data_physical, function(data) {
					that.sending = false;
					if (data.body.code == '00') {
						swal({
							title: data.body.msg,
							text: "",
							type: "success",
							timer: 2000,
							showConfirmButton: false
						});
						$("#physical_check_modal").modal('hide');
					} else {
						swal({
							title: data.body.msg,
							text: "",
							type: "error",
							timer: 2000,
							showConfirmButton: false
						});
						console.log(data.body.msg);
					}
				}, function(err) {
					that.sending = false;
					console.log(err);
				});
			},
		},
	
		computed: {
			getPhysicalData: function() {
	
				this.registeredOrdId = this.$store.getters.getPhysicalData;
				if (this.registeredOrdId.length > 0) {
					return this.showPhysique1();
				} else {
					return;
				}
			},
		}
	}
</script>
