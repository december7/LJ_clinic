<template>

	<div class="ibox" style="margin: 15px 20px 0px 20px">

		<!--患者基本信息-->
		<div class="col-md-12 no-padding">
			<div class="ibox float-e-margins no-margins border-bottom">
				<div class="ibox-title no-borders msg_item_title">
					<h5>患者基本信息</h5>
					<small class="m-l-sm text-danger">&#9888 该患者有费用未缴</small>
				</div>

				<div class="ibox-content no-borders no_top_padding">
					<form method="get" class="form-horizontal m-l-md">
						<div class="form-group">
							<div class="col-md-4 no-padding">
								<div class="col-md-3 pull-left no-padding left_text_tips">患者姓名<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.userName" type="text" placeholder="请填写真实姓名" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">出生年月<span class="text-danger" style="margin-left: 2px">*</span>
								</div>
								<div class="col-md-9 no-padding" id="data_1" style="margin-left: -5px">
									<div class="col-md-11 no-padding input-group date gray-bg" style="line-height: 34px; border-radius: 4px; border: 1px solid #e5e6e7;">
										<div class="pull-left col-md-9 no-padding">
											<input style="background-color: #F4F4F4; height: 20px; width: 100%;padding-left: 12px;border: none;" id="birthdayDate" readonly
														 type="text" placeholder="请选择出生年月">
										</div>
										<span style="margin-top: 2px; margin-left: 15px; background-color: #F4F4F4;" class="pull-left input-group-addon no-borders m-t-xxs" id="startDate"><i class="fa fa-calendar"></i></span>
									</div>
								</div>
							</div>

							<div class="col-md-4 no-padding m-t" style="margin-top: 0px">
								<div class="form-group">
									<p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别 <span class="text-danger" style="margin-left: 2px">*</span></p>
									<div class="col-md-9">
										<div class="radio radio-info radio-inline">
											<input v-model="itemData.userSex" type="radio" id="Radio1" value="1" name="radioInline" style="margin-top: 2px">
											<label for="inlineRadio1" style="margin-left: -15px">男</label>
										</div>
										<div class="radio radio-inline">
											<input v-model="itemData.userSex" type="radio" id="Radio2" value="2" name="radioInline"
														 style="margin-top: 2px">
											<label for="inlineRadio2" style="margin-left: -15px">女</label>
										</div>
										<div class="radio radio-inline">
											<input v-model="itemData.userSex" type="radio" id="Radio3" value="9" name="radioInline"
														 style="margin-top: 2px">
											<label for="inlineRadio2">未知</label>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">身份证号</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.idCardNo" type="text" placeholder="请填写真实身份证号" class="form-control gray-bg input_circular_corner"  style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">手机号码<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.billId" type="text" placeholder="请输入手机号码" class="form-control gray-bg input_circular_corner"  style="margin-left: -20px">
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
									<p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">是否急诊 <span class="text-danger" style="margin-left: 2px">*</span></p>
									<div class="col-md-6">
										<div class="radio radio-info radio-inline">
											<input v-model="itemData.isEmergency" type="radio" id="inlineRadio1" value="1" name="radioInline" style="margin-top: 1px">
											<label for="inlineRadio1" style="margin-left: -15px">是</label>
										</div>
										<div class="radio radio-inline">
											<input v-model="itemData.isEmergency" type="radio" id="inlineRadio2" value="2" name="radioInline"
														 style="margin-top: 1px">
											<label for="inlineRadio2" style="margin-left: -15px">否</label>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">选择科室<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
									<input @click="registerDepartList" readonly v-model="departObject.departname" placeholder="选择科室" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 93%; margin-left: -20px">
										<li @click="selectDepartItem(depart)" v-for="(depart, index) in departListArr">
											<a class="no-padding" style="text-align: center">{{depart.departname}}</a>
										</li>
									</ul>
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">选择医生<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
									<input @click="registerDoctorList" readonly v-model="doctorObject.doctorName" placeholder="选择医生" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 93%; margin-left: -20px">
										<li @click="selectDoctorItem(doctor)" v-for="(doctor, index) in doctorListArr">
											<a class="no-padding" style="text-align: center">{{doctor.doctorName}}</a>
										</li>
									</ul>
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">挂 号 费</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.registeredFee" type="text" placeholder="请填写挂号费 (元)" class="form-control gray-bg input_circular_corner"  style="margin-left: -20px">
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
									<input v-model="itemData.height" type="text" placeholder="身高 (cm)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.weight" type="text" placeholder="体重 (kg)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.temperature" type="text" placeholder="体温 (℃)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">BMI指数</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.bmiNum" type="text" placeholder="BMI指数" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.breathing" type="text" placeholder="呼吸 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">氧饱和度</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.oxygen" type="text" placeholder="氧饱和度 (％)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">疼痛评分</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.painScore" type="text" placeholder="疼痛评分 (0-10)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏</div>
								<div class="col-md-9" style="padding-right: 0">
									<input v-model="itemData.pulse" type="text" placeholder="脉搏 (次/分钟)" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>


							<div class="col-md-8 no-padding m-t">
								<div class="pull-left col-md-1 no-padding left_text_tips">血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压</div>
								<div class="col-md-10 gray-bg m-l input_circular_corner" style="margin-left: 22px; border: 1px solid #E5E6E7">
									<div class=" col-md-2 pull-left left_text_tips" style="padding-left: 0">收缩压:</div>
									<div class="col-md-4 no-padding" style="margin-left: -20px">
										<input v-model="itemData.systolicPressure" type="text" class="form-control gray-bg no-borders no-padding" placeholder="(mmHg)">
									</div>

									<div class=" col-md-2 left_text_tips" style="padding-left: 0; margin-left: 20px">舒张压:</div>
									<div class="col-md-4 no-padding" style="margin-left: -20px">
										<input v-model="itemData.diastolicPressure" type="text" class="form-control gray-bg no-borders no-padding" placeholder="(mmHg)">
									</div>
								</div>
							</div>
						</div>

						<div style="text-align: center; margin-top: 40px">
							<button @click="registerRequest" class="check_add" type="button" style="width: 100px">确认新增</button>
							<button class="check_add" type="button" style="width: 100px">保存并打印</button>
							<button class="check_back" type="reset" style="width: 100px">放弃</button>
						</div>

					</form>
				</div>
			</div>
		</div>

	</div>
</div>
</template>

<style>
	.check_add{
		width: 45%;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
		margin-left: 0px;
	}

	.check_back{
		width: 45%;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}
</style>

<script>
	import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
	import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
	import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min'

	export default{
		data(){
			return {
				departListArr: [],
				doctorListArr: [],
				registeredTypeTitle: '',
				departObject: '',
				doctorObject: '',
				focus: false,
				itemData: {
					userName: '',
					birthdayDate: '',
					userSex: '',
					idCardNo: '',
					billId: '',
					registeredType: '',
					isEmergency: '',
					doctorId: '',
					registeredFee: '',
					height: '',
					weight: '',
					temperature: '',
					bmiNum: '',
					breathing: '',
					oxygen: '',
					painScore: '',
					pulse: '',
					diastolicPressure: '',
					systolicPressure: '',
				},
			};
		},

		created: function () {
			//this.registerDepartList();
		},

		mounted: function () {
			$('#data_1 .input-group.date').datepicker({
				todayBtn: "linked",
				keyboardNavigation: false,
				forceParse: false,
				calendarWeeks: false,
				autoclose: true,
				todayHighlight: true,
				language: "zh-CN",
				format:"yyyy/mm/dd",
			});
		},

		methods:{
			selectItem:function (selectedIndex) {
				this.selectedIndex = selectedIndex;
			},

			//选择接诊类型
			selectTypeItem: function (index) {
				this.itemData.registeredType = index;
				if (index == 1) {
					this.registeredTypeTitle = '初诊';
				}else {
					this.registeredTypeTitle = '复诊';
				}
			},

			//选择科室
			selectDepartItem: function (depart) {
				this.departObject = depart;
			},

			//选择医生
			selectDoctorItem: function (doctor) {
				this.doctorObject = doctor;
				this.itemData.doctorId = this.doctorObject.doctorId;
			},

			//查询科室列表
			registerDepartList: function () {
				var that=this;
				this.$api.get(this,this.$requestApi.registerDepartList,'',function  (data) {
					if(data.status=='200'){
						that.departListArr = data.body.data;
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			//根据科室ID查询挂号医生列表
			registerDoctorList: function () {
				if (this.departObject == ''){
					swal({title: "请先选择科室",text: "",type: "error",timer: 2000,showConfirmButton: false });
					return;
				}
				var that=this;
				this.$api.get(this,this.$requestApi.registerDoctorList + this.departObject.departid,'',function  (data) {
					if(data.status=='200'){
						that.doctorListArr = data.body.data;
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			//请求挂号
			registerRequest: function () {
				var that=this;

				this.itemData.birthdayDate = $('#birthdayDate').val();

				if (
					this.itemData.userName == ''
					|| this.itemData.birthdayDate == ''
					|| this.itemData.billId == ''
					|| this.itemData.registeredType == ''
					|| this.itemData.doctorId == ''
				)
				{
					swal({title:"请注意填写必填项",text:"",type: "error",timer: 2000,showConfirmButton:false});
					return;
				}

				this.$api.post(this,this.$requestApi.registerRequest,this.itemData,function  (data) {
					if(data.status=='200'){
						swal({title:data.body.msg,text: "", type: "success",timer: 2000,showConfirmButton: false });
					}else{
						swal({title:data.body.msg,text:"",type: "error",timer: 2000,showConfirmButton:false});
						console.log(this.itemData);
					}

				},function (err) {
					console.log(err);
				});
			},
		}
	}
</script>
