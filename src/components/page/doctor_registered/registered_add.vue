<template>
	<div>
		<delete-toast :selectedIndex="selectedIndex" :selectedTitle="selectedTitle" :selectedContent="selectedContent"></delete-toast>
	
		<div class="ibox animated fadeInRight" style="margin: 15px 20px 0px 20px">
			<!--患者基本信息-->
			<div class="col-md-12 no-padding">
				<div class="ibox float-e-margins no-margins border-bottom">
					<div class="ibox-title no-borders msg_item_title">
						<h5>患者基本信息</h5>
						<small v-show="" class="m-l-sm text-danger">&#9888 该患者有费用未缴</small>
					</div>
	
					<div class="ibox-content no-borders no_top_padding">
						<form method="get" class="form-horizontal m-l-md">
							<div class="form-group">
								<div class="col-md-4 no-padding">
									<div class="col-md-3 pull-left no-padding left_text_tips">患者姓名<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0">
										<input id="patientName" @input="patientsRequest()" v-model="itemData.userName" type="text" placeholder="请填写真实姓名" data-toggle="dropdown" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
										<ul v-show="patientsNameArr.length>0" class="dropdown-menu attopic" style="width: 95%; margin-right: 8%;">
											<li v-for="(patient,index) in patientsNameArr">
												<a @click="selectedPatientName(patient)" class="no-padding" style="text-align: center">{{patient.userName}} <span style="color: #999999">{{patient.userSex == 1 ? '男':'女'}} {{$stringUtils.dateAge(patient.birthdayDate)}}岁 {{patient.billId}}</span></a>
											</li>
										</ul>
									</div>
								</div>
	
								<div class="col-md-4 no-padding">
									<div class="col-md-3 pull-left no-padding left_text_tips">出生年月<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0">
										<input readonly @click="$stringUtils.layDateUi('#birthdayDate',{max:today})" id="birthdayDate" type="text" placeholder="请选择出生年月" class="form-control layer-date gray-bg input_circular_corner" style="margin-left: -20px">
										<span class="fa fa-calendar" style="margin-left:-25px; position:absolute; top:10px"></span>
									</div>
								</div>
	
								<div class="col-md-4 no-padding m-t" style="margin-top: 0px">
									<div class="form-group">
										<p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</p>
										<div class="col-md-9">
											<div class="radio radio-info radio-inline">
												<input v-model="itemData.userSex" type="radio" id="userSex1" value="1" name="radioUserSex" style="margin-top: 2px">
												<label for="userSex1" style="margin-left: -15px">男</label>
											</div>
											<div class="radio radio-inline">
												<input v-model="itemData.userSex" type="radio" id="userSex2" value="2" name="radioUserSex" style="margin-top: 2px">
												<label for="userSex2" style="margin-left: -15px">女</label>
											</div>
											<div class="radio radio-inline">
												<input v-model="itemData.userSex" type="radio" id="userSex9" value="9" name="radioUserSex" style="margin-top: 2px">
												<label for="userSex9">未知</label>
											</div>
										</div>
									</div>
								</div>
	
								<div class="col-md-4 no-padding" style="margin-top: 8px">
									<div class="pull-left col-md-3 no-padding left_text_tips">身份证号</div>
									<div class="col-md-9" style="padding-right: 0">
										<strictInput check="id" v-model="itemData.idCardNo" type="text" placeholder="请填写真实身份证号" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
									</div>
								</div>
	
								<div class="col-md-4 no-padding" style="margin-top: 8px">
									<div class="pull-left col-md-3 no-padding left_text_tips">手机号码<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0">
										<strictInput check="phone" v-model="itemData.billId" type="text" placeholder="请输入手机号码" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
									</div>
								</div>
	
							</div>
	
						</form>
					</div>
				</div>
			</div>
	
			<!--就诊信息-->
			<div class="col-md-12 no-padding">
				<div class="ibox float-e-margins no-margins border-bottom">
					<div class="ibox-title no-borders msg_item_title">
						<h5>就诊信息</h5>
					</div>
	
					<div class="ibox-content no-borders no_top_padding">
						<form method="get" class="form-horizontal m-l-md">
							<div class="form-group">
	
								<div class="col-md-4 no-padding">
									<div class="pull-left col-md-3 no-padding left_text_tips">接诊类型<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
										<input readonly v-model="registeredTypeTitle" placeholder="选择接诊类型" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
										<ul class="dropdown-menu" style="width: 93%; margin-left: -20px">
											<li @click="selectTypeItem('1')">
												<a class="no-padding" style="text-align: center">初诊</a>
											</li>
											<li @click="selectTypeItem('2')">
												<a class="no-padding" style="text-align: center">复诊</a>
											</li>
										</ul>
									</div>
								</div>
	
								<div class="col-md-6 no-padding">
									<div class="form-group">
										<p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">是否急诊<span class="text-danger" style="margin-left: 2px">*</span></p>
										<div class="col-md-6">
											<div class="radio radio-info radio-inline">
												<input v-model="itemData.isEmergency" type="radio" id="isEmergency2" value="2" name="radioInline" style="margin-top: 1px">
												<label for="isEmergency2" style="margin-left: -15px">是</label>
											</div>
											<div class="radio radio-inline">
												<input v-model="itemData.isEmergency" type="radio" id="isEmergency1" value="1" name="radioInline" style="margin-top: 1px">
												<label for="isEmergency1" style="margin-left: -15px">否</label>
											</div>
										</div>
									</div>
								</div>
	
								<div class="col-md-4 no-padding" style="margin-top: 8px">
									<div class="pull-left col-md-3 no-padding left_text_tips">选择科室<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
										<input @click="registerDepartList()" readonly v-model="departObject.departname" placeholder="选择科室" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
										<ul v-show="departListArr.length>0" class="dropdown-menu attopic" style="width: 93%; margin-left: -20px">
											<li @click="selectDepartItem(depart)" v-for="(depart, index) in departListArr">
												<a class="no-padding" style="text-align: center">{{depart.departname}}</a>
											</li>
										</ul>
									</div>
								</div>
	
								<div class="col-md-4 no-padding" style="margin-top: 8px">
									<div class="pull-left col-md-3 no-padding left_text_tips">选择医生<span class="text-danger" style="margin-left: 2px">*</span></div>
									<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
										<input @click="registerDoctorList()" readonly v-model="doctorObject.doctorName" placeholder="选择医生" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
										<ul v-show="doctorListArr.length>0" class="dropdown-menu attopic" style="width: 93%; margin-left: -20px">
											<li @click="selectDoctorItem(doctor)" v-for="(doctor, index) in doctorListArr">
												<a class="no-padding" style="text-align: center">{{doctor.doctorName}}</a>
											</li>
										</ul>
									</div>
								</div>
	
								<div class="col-md-4 no-padding" style="margin-top: 8px">
									<div class="pull-left col-md-3 no-padding left_text_tips">挂 号 费</div>
									<div class="col-md-9" style="padding-right: 0">
										<span class="form-control gray-bg input_circular_corner" style="margin-left: -20px">{{itemData.registeredFee/100}}</span>
									</div>
								</div>
	
							</div>
						</form>
					</div>
				</div>
	
				<!--患者体格检查-->
				<div class="col-md-12 no-padding">
					<div class="ibox float-e-margins no-margins border-bottom">
						<div class="ibox-title no-borders msg_item_title">
							<h5>患者体格检查</h5>
						</div>
	
						<div class="ibox-content no-borders no_top_padding">
							<form method="get" class="form-horizontal m-l-md">
								<div class="form-group">
									<div class="col-md-4 no-padding">
										<div class="col-md-3 pull-left no-padding left_text_tips">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" @input="bmiNumCalculator()" v-model="itemData.height" type="text" placeholder="身高 (cm)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px"></number>
										</div>
									</div>
	
									<div class="col-md-4 no-padding">
										<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" @input="bmiNumCalculator()" v-model="itemData.weight" type="text" placeholder="体重 (kg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px"></number>
										</div>
									</div>
	
									<div class="col-md-4 no-padding">
										<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" v-model="itemData.temperature" type="text" placeholder="体温 (℃)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">BMI指数</div>
										<div class="col-md-9" style="padding-right: 0">
											<span placeholder="BMI指数" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">{{itemData.bmiNum}}</span>
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" v-model="itemData.breathing" type="text" placeholder="呼吸 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">氧饱和度</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" v-model="itemData.oxygen" type="text" placeholder="氧饱和度 (％)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">疼痛评分</div>
										<div class="col-md-9" style="padding-right: 0">
											<number :max="10" v-model="itemData.painScore" type="text" placeholder="疼痛评分 (0-10)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏</div>
										<div class="col-md-9" style="padding-right: 0">
											<number v-model="itemData.pulse" type="text" placeholder="脉搏 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<span class="form-control" style="border:none"></span>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">收 缩 压</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" v-model="itemData.systolicPressure" type="text" placeholder="收缩压 (mmHg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
									<div class="col-md-4 no-padding m-t">
										<div class="pull-left col-md-3 no-padding left_text_tips">舒 张 压</div>
										<div class="col-md-9" style="padding-right: 0">
											<number decimals="2" v-model="itemData.diastolicPressure" type="text" placeholder="舒张压 (mmHg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px" />
										</div>
									</div>
	
								</div>
	
								<div style="text-align: center; margin-top: 40px">
									<button @click="registerRequest()" :disabled="sending" class="check_add" type="button" style="width: 100px">确认新增</button>
									<button class="check_add" type="button" style="width: 100px">保存并打印</button>
									<button data-backdrop="static" data-toggle="modal" data-target="#selfinfo" class="check_back" type="button" style="width: 100px">放弃</button>
								</div>
	
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.check_add {
		width: 45%;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
		margin-left: 0px;
	}
	
	.check_back {
		width: 45%;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}
</style>

<script>
	import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
	import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
	import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min';
	import deleteToast from "../medicine/deleteAlert/deleteToast.vue";
	import number from '../../commonView/number.vue'
	import strictInput from '../../commonView/strictInput.vue'
	
	function newData() {
		return {
			patientsNameArr: [],
			departListArr: [],
			doctorListArr: [],
			registeredTypeTitle: '初诊',
			departObject: '',
			doctorObject: '',
			focus: false,
			sending: false,
			itemData: {
				userName: '',
				birthdayDate: '',
				userSex: '9',
				idCardNo: '',
				billId: '',
				registeredType: '1',
				isEmergency: '1',
				doctorId: '',
				registeredFee: '',
				height: '',
				weight: '',
				temperature: '',
				bmiNum: 0,
				breathing: '',
				oxygen: '',
				painScore: '',
				pulse: '',
				diastolicPressure: '',
				systolicPressure: '',
			},
			selectedIndex: 0,
			selectedTitle: '新增挂号',
			selectedContent: '确定要放弃吗？',
			today: '',
		};
	}
	
	export default {
		data: function() {
			return newData();
		},
	
		components: {
			deleteToast,
			number,
			strictInput
		},
	
		methods: {
			selectItem: function(selectedIndex) {
				this.selectedIndex = selectedIndex;
			},
	
			bmiNumCalculator: function() {
				if (this.itemData.weight > 0 && this.itemData.height > 0) {
					this.itemData.bmiNum = (this.itemData.weight / ((this.itemData.height / 100) * (this.itemData.height / 100))).toFixed(1);
				} else {
					this.itemData.bmiNum = 0
				}
			},
	
			selectedPatientName: function(patient) {
	
				var that = this;
				this.itemData.userName = patient.userName;
				this.itemData.userSex = patient.userSex;
				this.itemData.idCardNo = patient.idCardNo;
				this.itemData.billId = patient.billId;
	
				if (patient.birthdayDate.length > 0) {
					this.itemData.birthdayDate = that.$stringUtils.dateFormat(patient.birthdayDate);
					$('#birthdayDate').val(this.itemData.birthdayDate);
				}
				$('#patientName').attr("readonly", true);
				this.patientsNameArr = [];
			},
			//模糊查询患者姓名
			patientsRequest: function() {
	
				var that = this;
				if (this.itemData.userName == '') {
					console.log("姓名为空");
					return;
				}
	
				this.$api.post(this, this.$requestApi.historyPatientNameRequest, {
					userName: this.itemData.userName
				}, function(data) {
					if (data.status == '200') {
						that.patientsNameArr = data.body.data;
						console.log(data.body.data);
					} else {
						console.log(data.body.msg);
					}
				}, function(err) {
					console.log(err);
				});
			},
	
			//选择接诊类型
			selectTypeItem: function(index) {
				this.itemData.registeredType = index;
				if (index == 1) {
					this.registeredTypeTitle = '初诊';
				} else {
					this.registeredTypeTitle = '复诊';
				}
			},
	
			//选择科室
			selectDepartItem: function(depart) {
				this.departObject = depart;
				this.doctorObject = '';
				this.doctorListArr = [];
				this.itemData.doctorId = '';
				this.itemData.registeredFee = '';
			},
	
			//选择医生
			selectDoctorItem: function(doctor) {
				this.doctorObject = doctor;
				this.itemData.doctorId = doctor.doctorId;
				this.itemData.registeredFee = doctor.registrationFee;
			},
	
			//查询科室列表
			registerDepartList: function() {
				var that = this;
				if (that.departListArr.length > 0) {
					return;
				}
				this.$api.get(this, this.$requestApi.registerDepartList, '', function(data) {
					if (data.status == '200') {
						that.departList = data.body.data;
						that.departListArr = data.body.data;
					} else {
						console.log(data.body.msg);
					}
				}, function(err) {
					console.log(err);
				});
			},
	
			//根据科室ID查询挂号医生列表
			registerDoctorList: function() {
				if (this.departObject == '') {
					swal({
						title: "请选择科室",
						text: "",
						type: "error",
						timer: 2000,
						showConfirmButton: false
					});
					return;
				}
				var that = this;
				this.$api.get(this, this.$requestApi.registerDoctorList + this.departObject.departid, '', function(data) {
					if (data.status == '200') {
						that.doctorListArr = data.body.data;
					} else {
						console.log(data.body.msg);
					}
				}, function(err) {
					console.log(err);
				});
			},
	
			//请求挂号
			registerRequest: function() {
				var that = this;
	
				this.itemData.birthdayDate = $('#birthdayDate').val();
	
				if (
					this.itemData.userName == '' ||
					this.itemData.birthdayDate == '' ||
					this.itemData.billId == '' ||
					this.itemData.registeredType == '' ||
					this.itemData.doctorId == ''
				) {
					swal({
						title: "请填写完整必填项",
						text: "",
						type: "error",
						timer: 2000,
						showConfirmButton: false
					});
					return;
				}
				if (this.itemData.billId.length != 11) {
					swal({
						title: "手机号码有误",
						text: "",
						type: "error",
						timer: 2000,
						showConfirmButton: false
					});
					return;
				}
				if (this.itemData.idCardNo.length > 0 && !this.$stringUtils.checkLegalCard(this.itemData.idCardNo)) {
					swal({
						title: "身份证号码有误",
						text: "",
						type: "error",
						timer: 2000,
						showConfirmButton: false
					});
					return;
				}
				that.sending = true;
				this.$api.post(this, this.$requestApi.registerRequest, this.itemData, function(data) {
					that.sending = false;
					if (data.body.code == '00') {
						swal({
							title: data.body.msg,
							text: "",
							type: "success",
							timer: 2000,
							showConfirmButton: false
						});
						that.resetSelf();
						$('#birthdayDate').val('');
						$('#patientName').attr("readonly", false);
					} else {
						swal({
							title: data.body.msg,
							text: "",
							type: "error",
							timer: 2000,
							showConfirmButton: false
						});
						console.log(this.itemData);
					}
				}, function(err) {
					that.sending = false;
					console.log(err);
				});
			},
			resetSelf: function() {
				Object.assign(this.$data, newData());
				this.today = laydate.now();
			},
			//放弃挂号调用方法
			procurementDelete: function(selectIndex) {
				this.resetSelf();
				$('#birthdayDate').val('');
				$('#patientName').attr("readonly", false);
			},
		},
	
		mounted: function() {
			this.today = laydate.now();
		}
	}
</script>
