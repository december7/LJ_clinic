<template>
	<div>
		<!--挂号中间list列表组件-->
	<div class="wrapper wrapper-content animated fadeInRight">
		<div>
			<button type="button" class="btn btn-link patient_add_btn" data-toggle="modal" data-target="#patients_add"><img src="../../../../static/img/set_manage_img/add.png" style="margin-top: -3px"> 添加患者</button>
		</div>

		<div class="col-sm-12 no-padding">
			<ul>
				<li v-for="data_item in data_items" class="col-md-4 item_list">
					<div class="ibox patient_item">
						<div class="ibox-title patient_list_item_title">
							<h5>{{data_item.userName}}</h5>
							<small class="m-l-sm">{{$stringUtils.dateFormat(data_item.birthdayDate)}}岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
						</div>
						<div class="ibox-content patient_ibox-content">

							<div class="patient_msg_list">
								<div>
									<p class="patient_msg_title">门 诊 号:</p>
									<p class="patient_msg_content">{{data_item.hospitalId}}</p>
								</div>

								<div style="margin: 3px 0">
									<p class="patient_msg_title">登记时间:</p>
									<p class="patient_msg_content">{{$stringUtils.dateFormat(data_item.doneDate)}}</p>
								</div>
							</div>

							<div style="margin-top: 10px">
								<button @click="perfect_information_click(data_item)" type="button" class="patient_perfect_information" data-toggle="modal" data-target="#perfect_information_modal">完善信息</button>
								<button type="button" class="patient_perfect_information" data-toggle="modal" data-target="#physical_check_modal"><a style="color: white" href="#/doctor_clinic/history_case">查看病例</a></button>
								<button @click="reception()" type="button" class="patient_physical_check" data-toggle="modal" data-target="#physical_check_modal">方便门诊</button>
							</div>

						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<!--完善信息弹窗-->
	<registered_modal_perfect :userId="data_item.userId"></registered_modal_perfect>
	<!--添加患者-->
	<patients_add></patients_add>
	<!--底部分页-->
	<pagination v-show="data_items.length >= 9"></pagination>
	</div>
</template>

<style>

	.patient_add_btn{
		width: 100px;
		height: 28px;
		margin-bottom: 10px;
		color: #324367;
		border: none;
		background-color: inherit;
		font-size: 15px;
	}

	.item_list{
		list-style: none;
		padding-left: 0 !important;
	}

	button {
		outline: none !important;
	}

	.patient_list_item_title {
		padding: 12px 10px;
	}

	.patient_ibox-content {
		padding: 10px !important;
		text-align: center;
	}

	.patient_msg_list {
		text-align: left;
	}

	.patient_msg_title {
		display: inline;
		margin-right: 10px;
	}

	.patient_msg_content {
		display: inline;
	}

	.patient_item {
		position: inherit !important;
		margin-bottom: 20px;
	}

	.patient_state_img {
		position: absolute;
		right: 10px;
		top: 47px;
	}

	.patient_state_img img {
		width: 35px;
		height: 35px;
	}

	.doctor_workbench_top_right p {
		line-height: 30px;
		font-size: 16px;
		color: deepskyblue;
	}

	.content_top_right_container p {
		line-height: 30px;
	}

	.msg_item_title h5 {
		padding-left: 20px;
		border-left: 4px solid #314268;
	}

	.patient_perfect_information{
		width: 32%;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
	}

	.patient_physical_check{
		width: 32%;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}

</style>

<script>
	import registered_modal_perfect from "../doctor_registered/registered_modal_perfect.vue";
	import patients_add from "./patients_add.vue";
	import pagination from "../doctor_clinic/bottom_pagination.vue";
	export default {
		data(){
			return {
				data_items:[],
				data_item:{},
				currentNo: 1
			}
		},
		components:{
			registered_modal_perfect,
			patients_add,
			pagination,
		},
		created(){
			this.patientManageList();
		},

		computed:{
			currentPageNo:function () {
				console.log(this.$store.getters.getCurrentPageNo);
				return this.$store.getters.getCurrentPageNo;
			}
		},

		methods: {

			perfect_information_click: function (data_item) {
				this.data_item = data_item;
				this.$store.dispatch('show_physique_user_data',  data_item.userId);
			},

			patientManageList:function () {
				var that=this;
				this.$api.get(this,this.$requestApi.patientManageList,{pageNo:1,pageSize:9},function  (data) {
					if(data.status=='200'){
						that.data_items = data.body.data;
						console.log(data.body.data);
					}else{
						console.log(data.body.msg);
					}
				},function (err) {
					console.log(err);
				});
			},

			reception:function () {
				parent.document.getElementById("30300").click();
				parent.vueRoot.$store.dispatch("today_data","");
			},
		},
	}
</script>
