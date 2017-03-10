<template>
<div>

	<!--挂号中间list列表组件-->
	<div class="wrapper wrapper-content animated fadeInRight">

		<!--搜索-->
		<div class="search_background" style="float: right; margin: -10px 16px 10px 0px">
			<input v-model="searchUserName" type="text" placeholder="请输入需要搜索的姓名" class="serach_box" id="search">
			<span style="color: lightgray; margin-left: 25px">|</span>
			<button @click="registeredList" style="border: none; background-color: white"><img src="../../../../static/img/set_manage_img/search.png"></button>
		</div>

		<div class="col-sm-12 no-padding">
			<ul>
				<li v-for="data_item in data_items" class="col-md-4 item_list">
					<div class="ibox patient_item">
						<div class="ibox-title patient_list_item_title">
							<h5>{{data_item.userName}}</h5>
							<small class="m-l-sm">{{birthdayDate}}岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
						</div>
						<div class="ibox-content patient_ibox-content">

							<div class="patient_msg_list">

								<div>
									<p class="patient_msg_title">挂号医生:</p>
									<p class="patient_msg_content">{{data_item.doctorName}} ({{data_item.departName}})</p>
								</div>

								<div style="margin: 3px 0">
									<p class="patient_msg_title">门 诊 号:</p>
									<p class="patient_msg_content">{{data_item.registeredOrdId}}</p>
								</div>

								<div style="margin: 3px 0">
									<p class="patient_msg_title">接诊类型:</p>
									<p class="patient_msg_content">{{data_item.registeredType == 0 ? '初诊' : '复诊'}}</p>
								</div>

							</div>

							<div style="margin-top: 10px">
								<button @click="perfect_information_click(data_item)" type="button" class="perfect_information" data-toggle="modal" data-target="#perfect_information_modal">完善信息</button>
								<button @click="physical_check_click(data_item)" type="button" class="physical_check" data-toggle="modal" data-target="#physical_check_modal">体格检查</button>
							</div>

							<div v-show="data_item.isEmergency == 1" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>
							<div :class="{'wait_clinic' : data_item.acceptsType == 0 } " class="patient_state_clinic">{{data_item.acceptsType == 0 ? '待接诊' : '已接诊'}}</div>

						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>


	<!--完善信息弹窗-->
	<registered_modal_perfect :userId="data_item.userId"></registered_modal_perfect>
	<!--体格检查弹框-->
	<registered_modal_physical :registeredOrdId="data_item.registeredOrdId"></registered_modal_physical>
	<!--分页-->
	<pagination v-show="data_items.length >= 9"></pagination>

</div>
</template>
<style>

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

	.patient_state_clinic{
		position: absolute;
		right: 10px;
		top: 105px;
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

	.perfect_information{
		width: 49%;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
	}

	.physical_check{
		width: 49%;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}

</style>

<script>
	import pagination from "../doctor_clinic/bottom_pagination.vue";
	import registered_modal_perfect from "./registered_modal_perfect.vue";
	import registered_modal_physical from "./registered_modal_physical";
	export default{
		data(){
			return {
				data_items:[],
				data_item:{},
				currentNo: 1,
				registeredOrdId:'',
				birthdayDate:26,
				searchUserName: '',
			}
		},

		created(){
			this.registeredList();
		},
		mounted: function(){
			var that=this;
			//回车绑定
			$("#search").keydown(function(event){
				if(event.which == "13"){
					that.registeredList();
			}});
		},
		components:{
			pagination,
			registered_modal_perfect,
			registered_modal_physical
		},

		computed:{
			currentPageNo:function () {
				return this.$store.getters.getCurrentPageNo;
			}
		},

		methods: {

			registeredList:function () {
				var that=this;
				this.$api.get(this,this.$requestApi.registeredList,{pageIndex:1,pageSize:9,userName:this.searchUserName},function  (data) {
					if(data.status=='200'){
						that.data_items = data.body.data;
						that.$store.dispatch('setPageCount', data.body.data.length);
					}else{
						console.log(data.body.msg);
					}

				},function (err) {
					console.log(err);
				});
			},
			perfect_information_click:function (data_item) {
				this.data_item = data_item;
				console.log(data_item.registeredOrdId);
				this.$store.dispatch('show_physique_user_data',  data_item.userId);

			},

			physical_check_click:function (data_item) {
				this.data_item = data_item;
				console.log("physical_check_click"+data_item.registeredOrdId);
				this.$store.dispatch('show_phisical_data',  data_item.registeredOrdId);
			},
		},

	}
</script>
