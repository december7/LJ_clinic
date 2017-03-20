<template>

	<div class="modal inmodal fade" id="perfect_information_modal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">

				<h4 style="margin: 15px 20px; display: inline-block">完善信息</h4>
				<button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
					aria-hidden="true">&times;</span></button>
				<div class="hr-tcline"></div>

				<div class="ibox-title no-borders msg_item_title">
					<h5>患者基本信息</h5>
				</div>

				<!--弹窗详细内容-->
				<div class="ibox-content no-borders" style="margin-top: -20px">
					<form method="get" class="form-horizontal m-l-md">
						<div class="form-group">
							<div class="col-md-4 no-padding">
								<div class="col-md-3 pull-left no-padding left_text_tips">患者姓名<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.userName" type="text" placeholder="请填写真实姓名" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
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

							<div class="col-md-4 no-padding" style="margin-top: 0px">
								<div class="form-group">
									<p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">性&nbsp;&nbsp;&nbsp;&nbsp;别 :</p>
									<div class="col-md-9">
										<div class="radio radio-info radio-inline">
											<input :disabled="editable" v-model="itemData.userSex" type="radio" id="Radio1" value="1" name="radioInline" style="margin-top: 2px">
											<label style="margin-left: -15px">男</label>
										</div>
										<div class="radio radio-inline">
											<input :disabled="editable" v-model="itemData.userSex" type="radio" id="Radio2" value="2" name="radioInline"
														 style="margin-top: 2px">
											<label style="margin-left: -15px">女</label>
										</div>
										<div class="radio radio-inline">
											<input :disabled="editable" v-model="itemData.userSex" type="radio" id="Radio3" value="9" name="radioInline"
														 style="margin-top: 2px">
											<label>未知</label>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">手机号码<span class="text-danger" style="margin-left: 2px">*</span></div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.billId" type="text" placeholder="请输入手机号码" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding" style="margin-top: 8px">
								<div class="pull-left col-md-3 no-padding left_text_tips">身份证号</div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.idCardNo" type="text" placeholder="请填写真实身份证号" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

						</div>

					</form>
				</div>

				<div class="ibox-title no-borders msg_item_title" style="margin-top: -30px">
					<h5>拓展信息</h5>
				</div>


				<div class="ibox-content no-borders" style="margin-top: -20px">
					<form method="get" class="form-horizontal m-l-md">
						<div class="form-group">

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">邮箱地址</div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.email" type="text" placeholder="填写邮箱地址" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</div>
								<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
									<input @click="selectNationList" v-model="itemData.nation" placeholder="请选择民族" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 93%; margin-left: 16px">
										<li v-for="(nation, index) in nationList">
											<a @click="selectNationValue(nation.codeValue)" class="no-padding" style="text-align: center">{{nation.codeValue}}</a>
										</li>
									</ul>
								</div>
							</div>

							<div class="col-md-4 no-padding">
								<div class="pull-left col-md-3 no-padding left_text_tips">婚姻状况</div>
								<div class="col-md-9" style="padding-right: 0; margin-left: -20px">
									<input readonly v-model="maritalValue" placeholder="请选择婚姻状况" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 93%; margin-left: 16px">
										<li>
											<a @click="selectMarryValue(0)" class="no-padding" style="text-align: center">未婚</a>
										</li>
										<li>
											<a @click="selectMarryValue(1)" class="no-padding" style="text-align: center">已婚</a>
										</li>
									</ul>
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">工作单位</div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.company" type="text" placeholder="请填写工作单位" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-4 no-padding m-t">
								<div class="pull-left col-md-3 no-padding left_text_tips">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</div>
								<div class="col-md-9" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.occupation" type="text" placeholder="请填写职业" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>

							<div class="col-md-12 no-padding m-t">
								<div class="pull-left col-md-1 no-padding left_text_tips">家庭住址</div>
								<div class="col-md-2" style="padding-right: 0; margin-left: -20px">
									<input v-model="itemData.privCode" @click="selectProvinceList" readonly placeholder="省" data-toggle="dropdown" style="width: 100%; text-align: left" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 88%; margin-left: 16px">
										<li v-for="(province, index) in province_items">
											<a @click="selectProvinceValue(province)" class="no-padding" style="text-align: center">{{province.districtName}}</a>
										</li>
									</ul>
								</div>
								<div class="col-md-2" style="padding-right: 0">
									<input v-model="itemData.cityCode" @click="selectCityList" readonly placeholder="市" data-toggle="dropdown" style="width: 100%; text-align: left" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>
									<ul class="dropdown-menu" style="width: 88%; margin-left: 16px">
										<li v-for="(city, index) in city_items">
											<a @click="selectCityValue(city)" class="no-padding" style="text-align: center">{{city.districtName}}</a>
										</li>
									</ul>
								</div>
								<div class="col-md-7" style="padding-right: 0">
									<input :disabled="editable" v-model="itemData.address" type="text" placeholder="详细地址" class="form-control gray-bg input_circular_corner">
								</div>
							</div>

							<div class="col-md-12 no-padding m-t">
								<div class="pull-left col-md-1 no-padding left_text_tips">备注信息</div>
								<div class="col-md-11" style="padding-right: 0px">
									<input :disabled="editable" v-model="itemData.remark" type="text" placeholder="备注信息" class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
								</div>
							</div>
						</div>
					</form>
				</div>

				<div  style="text-align: center; margin-bottom: 20px">
					<button @click="perfectRequest" class="btn_save">保存</button>
					<button class="btn_cancel" data-dismiss="modal">取消{{editable1}}</button>
				</div>

			</div>
		</div>
	</div>

</template>

<style>
	.dropdown-menu{
		min-width: 100px;
	}
	.btn_save{
		width: 100px;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
		margin-left: 0px;
	}

	.btn_cancel{
		width: 100px;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}
</style>

<script>
	export default{
		data(){
			return {
				data_item:{},
				nationList:[],
				maritalValue: '',
				province_items: [],
				city_items: [],
				itemData:
				{
					address: '',
					billId: '',
					birthdayDate: '',
					cityCode: '',
					company: '',
					email: '',
					idCardNo: '',
					isMarital: '',
					nation: '',
					occupation: '',
					privCode: '',
					userId: '',
					userName: '',
					userSex: ''
				},
			}
		},
		props: {
			userId:{
				default: ""
			},
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
				format: "yyyy/mm/dd"
			});
		},

		methods: {
			//请求患者信息
			showPhysique:function () {
				var that=this;
				this.$api.get(this,this.$requestApi.showPatientInfo+this.userId,'',function  (data) {
					if(data.status=='200'){
						that.data_item = data.body.data;

						that.itemData.address = that.data_item.address;
						that.itemData.billId = that.data_item.billId;
						that.itemData.birthdayDate = that.$stringUtils.dateFormat(that.data_item.birthdayDate);
						that.itemData.cityCode = that.data_item.cityCode;
						that.itemData.company = that.data_item.company;
						that.itemData.email = that.data_item.email;
						that.itemData.idCardNo = that.data_item.idCardNo;
						that.itemData.isMarital = that.data_item.isMarital;
						that.itemData.nation = that.data_item.nation;
						that.itemData.occupation = that.data_item.occupation;
						that.itemData.privCode = that.data_item.privCode;
						that.itemData.userId = that.data_item.userId;
						that.itemData.userName = that.data_item.userName;
						that.itemData.userSex = that.data_item.userSex;
						that.itemData.remark = that.data_item.remark;
						$('#birthdayDate').val(that.$stringUtils.dateFormat(that.data_item.birthdayDate));

						if (that.itemData.isMarital == '1') {
							that.maritalValue = '已婚';
						}else if (that.itemData.isMarital == '0'){
							that.maritalValue = '未婚';
						}else {
							that.maritalValue = '';
						}

					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			//完善患者信息
			perfectRequest: function () {
				var that=this;
				this.itemData.birthdayDate = $('#birthdayDate').val();
				this.$api.post(this,this.$requestApi.perfectRequest,that.itemData,function  (data) {
					if(data.status=='200'){
						swal({title:data.body.msg,text:"",type:"success",timer:2000,showConfirmButton:false});
						$("#perfect_information_modal").modal('hide');
					}else{
						swal({title:data.body.msg,text:"",type: "error",timer:2000,showConfirmButton:false});
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			//民族列表请求
			selectNationList: function () {
				var that=this;
				this.$api.get(this,this.$requestApi.staticDataList,{codeType:'USER_NATION'},function  (data) {
					if(data.status=='200'){
						that.nationList = data.body.data;
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			//民族选择
			selectNationValue: function (nationValue) {
				this.itemData.nation = nationValue;
			},

			//婚姻状况选择
			selectMarryValue: function (marryValue) {
				this.itemData.isMarital = marryValue;
				if (marryValue == 0) {
					this.maritalValue = "未婚";
				}else {
					this.maritalValue = "已婚";
				}
			},

			//省份
			selectProvinceList: function () {
				var that=this;
				this.$api.get(this,this.$requestApi.provinceList,'',function  (data) {
					if(data.status=='200'){
						that.province_items = data.body.data;
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			selectProvinceValue: function (province) {
				this.itemData.privCode = province.districtName;
				this.provinceCode = province.districtCode;
			},

			selectCityValue: function (city) {
				this.itemData.cityCode = city.districtName;
			},

			//城市
			selectCityList: function () {
				var that=this;
				if (this.provinceCode == '') {
					swal({title: "请先选择省份",text: "",type: "error",timer: 2000,showConfirmButton: false });
					return;
				}
				this.$api.get(this,this.$requestApi.cityList,{parentCode:this.provinceCode},function  (data) {
					if(data.status=='200'){
						that.city_items = data.body.data;
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},
		},

		computed:{
			editable:function () {
				return this.$store.getters.getEditable;
			},
			editable1:function () {

				this.registeredOrdId= this.$store.getters.getUserData;

				if (this.userId.length > 0){
					return this.showPhysique();
				}else {
					return;
				}

			},
		}
	}
</script>
