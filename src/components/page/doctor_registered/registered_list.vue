<template>
<div>

	<!--挂号中间list列表组件-->
	<div class="wrapper wrapper-content animated fadeInRight">

		 <div class="pull-right search_input" style="margin:-5px 10px 10px 0px">
			<input v-model="searchUserName" @keyup.enter="registeredList()" placeholder="请输入需要搜索的姓名" type="text" style="outline: none;width:200px;border: none;">
			<a @click="registeredList()"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
  	</div>

		<div class="col-sm-12 no-padding">
			<ul>
				<li v-for="data_item in data_items" class="col-md-4 item_list">
					<div class="ibox patient_item">
						<div class="ibox-title patient_list_item_title">
							<h5 maxlength = "5">{{data_item.userName.length > 8 ? data_item.userName.substring(0,8)+"...":data_item.userName}}</h5>
							<small class="m-l-sm">{{$stringUtils.dateAge(data_item.birthdayDate)}}岁 / {{ data_item.userSex == 9 ? '未知' : data_item.userSex == 1 ? '男' : '女' }} / {{data_item.billId}}</small>
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
									<p class="patient_msg_content">{{data_item.registeredType == 1 ? '初诊' : '复诊'}}</p>
								</div>

							</div>

							<div style="margin-top: 10px">
								<button @click="perfect_information_click(data_item)" type="button" class="perfect_information" data-toggle="modal" data-target="#perfect_information_modal" data-backdrop="static">完善信息</button>
								<button @click="physical_check_click(data_item)" type="button" class="physical_check" data-toggle="modal" data-target="#physical_check_modal" data-backdrop="static">体格检查</button>
							</div>

							<div v-show="data_item.isEmergency == 2" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>
							<div :class="{'wait_clinic' : data_item.state == 1 } " class="patient_state_clinic">{{data_item.state == 1 ? '待接诊' : '已接诊'}}</div>

						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<div v-show="data_items.length <= 0" style="width:100%; height:100%; text-align:center; margin-top:150px">
		<img src="../../../../static/img/patient_nor.png">
		<h5>暂无患者</h5>
	</div>

	<!--完善信息弹窗-->
	<registered_modal_perfect :userId="data_item.userId"></registered_modal_perfect>
	<!--体格检查弹框-->
	<registered_modal_physical :registeredOrdId="data_item.registeredOrdId"></registered_modal_physical>
	<!--分页-->
	<pagination v-show="data_items.length > 0" :iDisplayLength="data_items.length"></pagination>

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

	.wait_clinic{
		color: #ED6777;
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
				registeredOrdId:'',
				birthdayDate:26,
				searchUserName: '',
				pageIndex: '',
				pageSize: this.$enumerationType.pageSize,
			}
		},

		created(){
			this.registeredList();
		},
		components:{
			pagination,
			registered_modal_perfect,
			registered_modal_physical
		},

		computed:{
		},

		methods: {

			pageIndexNo:function(){
        		return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      		},

			registeredList:function () {
				var that=this;
				that.pageIndex = this.pageIndexNo();
				this.$api.get(this,this.$requestApi.registeredList,{pageIndex:this.pageIndex,pageSize:this.pageSize,userName:this.searchUserName},function  (data) {
					if(data.status=='200'){
						that.data_items = data.body.data;
            			that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
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

			request_list:function (index) {
				this.registeredList();
			},
		},

	}
</script>
