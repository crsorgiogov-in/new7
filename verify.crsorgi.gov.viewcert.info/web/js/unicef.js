/**
 * Inline script for birthRegisterSuccess in birth module
 */
var birthRegisterSuccess = {
    init: function(is_edit, loaderUrl, urlAjax, subDistrictUrl) {
        this.urlAjax = urlAjax;
        if (is_edit) {
            this.district_url = '../../district';
            this.sub_district_url = '../../subDistrict';
            this.village_url = '../../village';
            this.gram_url = '../../grampanchayat';
			this.registraton_unit_url = '../../registration'; 
            this.get_selected_data_url = '../../getSelectedState';
        } else {
            this.district_url = '../birth/district';
            this.sub_district_url = '../birth/subDistrict';
            this.village_url = '../birth/village';
            this.gram_url = '../../grampanchayat';
			this.registraton_unit_url = '../../registrationunit';
            this.registraton_unit_url = '../../registration';
			this.hospital_url = '../../hospital';
            this.get_selected_data_url = 'getSelectedState';
        }
        //dynamic change of state, district and subdistrict
        this.parentStateChange(loaderUrl);
        this.parentDistrictChange(loaderUrl);
        this.parentSubDistrictChange(loaderUrl);
        this.parentgrampanchayatChange(loaderUrl);
        this.permgrampanchayatChange(loaderUrl);
        this.permStateChange(loaderUrl);
        this.permDistrictChange(loaderUrl);
        this.permSubDistrictChange(loaderUrl);
        this.birthStateChange(loaderUrl);
        this.birthDistrictChange(loaderUrl);
        this.birthSubDistrictChange(loaderUrl);
    	this.parentcityvillagehospitalChange(loaderUrl);                
        this.parentcityvillageregistrationunitChange(loaderUrl);
        this.hospitalregistrationunitChange(loaderUrl);
		this.birthcityvillageregistrationunitChange(loaderUrl);
        this.subDistrictUrl = subDistrictUrl;
		

    },
    permStateChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_perm_state').change(function() {
            var value = $.trim($("#birth_legal_bir_le_perm_state option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_perm_district', loaderUrl);
            var districtUrl = birthRegisterSuccess.urlAjax + "/district";
			
            //$('#birth_legal_bir_le_perm_district').hide().load(districtUrl + '?S=' + value, function() {
			$('#birth_legal_bir_le_perm_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_perm_district').focus();
                $('#birth_legal_bir_le_perm_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#birth_legal_bir_le_perm_sub_district").append(empty_subDistrict);

                $('#birth_legal_bir_le_perm_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_perm_cityvillage").append(empty_village);
            });
        });
    },
    permDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_perm_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_perm_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_perm_sub_district', loaderUrl);
            subDistrictUrl = birthRegisterSuccess.urlAjax + "/subDistrict";
            //$('#birth_legal_bir_le_perm_sub_district').hide().load(subDistrictUrl + '?d=' + value, function() {
			$('#birth_legal_bir_le_perm_sub_district').hide().load(subDistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																														
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_perm_sub_district').focus();
                $('#birth_legal_bir_le_perm_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_perm_cityvillage").append(empty_village);
            });
        });
    },
    permSubDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_perm_sub_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_perm_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            Utilities.ajaxBlockUI();
            $.ajax({
                url: birthRegisterSuccess.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){
					
					//-------------------------------------------------------------------------------------------------
					// Below Block Commented To Disable Gram Panchayat Permanently - 19-Dec-2014		
					//-------------------------------------------------------------------------------------------------					
                    /*var gramPanchayatData = json_parse(response);
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatPermanent").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        BirthLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatPermanent", "#birth_legal_bir_le_perm_cityvillage");  
                    }
                    else{ */
					//-------------------------------------------------------------------------------------------------
					// End of  Block Commented To Disable Gram Panchayat Permanently - 19-Dec-2014		
					//-------------------------------------------------------------------------------------------------					
					
					
                        $("#gramPanchayatPermanent").attr('disabled', true);
                        $("#gramPanchayatPermanent").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('birth_legal_bir_le_perm_cityvillage', loaderUrl);
                        villageUrl = birthRegisterSuccess.urlAjax + "/village";
                       // $('#birth_legal_bir_le_perm_cityvillage').hide().load(villageUrl + '?s=' + value, function() {
						$('#birth_legal_bir_le_perm_cityvillage').hide().load(villageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																																																					   
                            $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#birth_legal_bir_le_perm_cityvillage').focus();
                        });
                    //}
                }
            });
        });
    },
    permgrampanchayatChange: function(loaderUrl) {
        var _this = this;
        $('#gramPanchayatPermanent').change(function() {
            var value = $.trim($("#gramPanchayatPermanent option:selected").val());
            var sub = $.trim($("#birth_legal_bir_le_perm_sub_district option:selected").val());
            _this.showLoader('birth_legal_bir_le_perm_cityvillage', loaderUrl);
            gramurl = birthRegisterSuccess.urlAjax + "/grampanchayat";
            $('#birth_legal_bir_le_perm_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#birth_legal_bir_le_perm_cityvillage').focus();
             
            });
        });
    },
    parentStateChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_state').change(function() {
            var value = $.trim($("#birth_legal_bir_le_parent_state option:selected").val());
            var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
		
            _this.showLoader('birth_legal_bir_le_parent_district', loaderUrl);
            districtUrl = birthRegisterSuccess.urlAjax + "/district";
			//	alert(districtUrl);
            //$('#birth_legal_bir_le_parent_district').hide().load(districtUrl + '?S=' + value, function() {

            $.ajax({
                type: 'POST',
                url: districtUrl,
                data: 'S='+value+'&d=' + User_StateId+'&ud=' + User_DistId,
                dataType: "text",
                success: function(resultData) {
                    //alert("df");
                   // console.log(resultData);
                    $('#birth_legal_bir_le_parent_district').empty();
                    $('#birth_legal_bir_le_parent_district').hide();
                    $('#birth_legal_bir_le_parent_district').append(resultData);
                    $('#birth_legal_bir_le_parent_district').show();
                    $('.ajaxloader').hide();
                    $(this).fadeIn();
                    var empty_subDistrict = document.createElement('option');
                    $('#birth_legal_bir_le_parent_district').focus();
                    $('#birth_legal_bir_le_parent_sub_district').html('');
                    empty_subDistrict.value = '0';
                    empty_subDistrict.innerHTML = "Select Sub District";
                    $("#birth_legal_bir_le_parent_sub_district").append(empty_subDistrict);

                    $('#birth_legal_bir_le_parent_cityvillage').html('');
                    var empty_village = document.createElement('option');
                    empty_village.value = '';
                    empty_village.innerHTML = "Select Village/Town";
                    $("#birth_legal_bir_le_parent_cityvillage").append(empty_village);

                    $('#birth_legal_bir_le_reg_unit').html('');
                    var empty_ru = document.createElement('option');
                    empty_ru.value = '';
                    empty_ru.innerHTML = "Select Registration Unit";
                    $("#birth_legal_bir_le_reg_unit").append(empty_ru);
                }
            });

			/*$('#birth_legal_bir_le_parent_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																										                 $('.ajaxloader').hide();
                $(this).fadeIn();
                var empty_subDistrict = document.createElement('option');
                $('#birth_legal_bir_le_parent_district').focus();
                $('#birth_legal_bir_le_parent_sub_district').html('');
                empty_subDistrict.value = '0';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#birth_legal_bir_le_parent_sub_district").append(empty_subDistrict);

                $('#birth_legal_bir_le_parent_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_parent_cityvillage").append(empty_village);
			   
				$('#birth_legal_bir_le_reg_unit').html('');
                var empty_ru = document.createElement('option');
                empty_ru.value = '';
                empty_ru.innerHTML = "Select Registration Unit";
                $("#birth_legal_bir_le_reg_unit").append(empty_ru);
				
			    
            });*/
        });
    },
    parentDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_parent_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_parent_sub_district', loaderUrl);
            subDistrictUrl = birthRegisterSuccess.urlAjax + "/subDistrict";
            $.ajax({
                type: 'POST',
                url: subDistrictUrl,
                data: 'd=' + value,
                dataType: "text",
                success:function (resData) {
                    $('#birth_legal_bir_le_parent_sub_district').empty();
                    $('#birth_legal_bir_le_parent_sub_district').append(resData);
                    $('.ajaxloader').hide();
                    $(this).fadeIn();
                    $('#birth_legal_bir_le_parent_sub_district').focus();
                    $('#birth_legal_bir_le_parent_cityvillage').html('');
                    var empty_village = document.createElement('option');
                    empty_village.value = '';
                    empty_village.innerHTML = "Select Village/Town";
                    $("#birth_legal_bir_le_parent_cityvillage").append(empty_village);
                    
                }
            })
		//	alert(value);
            //$('#birth_legal_bir_le_parent_sub_district').hide().load(subDistrictUrl + '?d=' + value, function() {
			
		/*	$('#birth_legal_bir_le_parent_sub_district').hide().load(subDistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																									
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_parent_sub_district').focus();
                $('#birth_legal_bir_le_parent_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_parent_cityvillage").append(empty_village);
				
				
            });*/
        });
   },
   parentSubDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_sub_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_parent_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            Utilities.ajaxBlockUI();
            $.ajax({
                url: birthRegisterSuccess.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){
					
					//-------------------------------------------------------------------------------------------------
					// Below Block Commented To Disable Gram Panchayat Permanently - 19-Dec-2014		
					//-------------------------------------------------------------------------------------------------
                    //var gramPanchayatData = json_parse(response);
                    /*if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatParent").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        BirthLegalForm.fillGramPanchayatOptionsValues(panchayatDetailParam, villageNamesParam);  
                    }
                    else{*/
					//-------------------------------------------------------------------------------------------------
					// End of  Block Commented To Disable Gram Panchayat Permanently - 19-Dec-2014		
					//-------------------------------------------------------------------------------------------------
					
                        $("#gramPanchayatParent").attr('disabled', true);
                        $("#gramPanchayatParent").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('birth_legal_bir_le_parent_cityvillage', loaderUrl);
                        villageUrl = birthRegisterSuccess.urlAjax + "/village";
						//alert("districtUrl"+villageUrl + '?s='+value+'&d=' + User_StateId);
                        //$('#birth_legal_bir_le_parent_cityvillage').hide().load(villageUrl + '?s=' + value, function() {
                    $.ajax({
                        url: villageUrl,
                        type: "POST",
                        data: 's='+value+'&d=' + User_StateId+'&ud=' + User_DistId,
                        success: function(response){
                            $('#birth_legal_bir_le_parent_cityvillage').empty();
                            $('#birth_legal_bir_le_parent_cityvillage').append(response);
                            $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#birth_legal_bir_le_parent_cityvillage').focus();
                        }
                    });
						/*$('#birth_legal_bir_le_parent_cityvillage').hide().load(villageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																	$('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#birth_legal_bir_le_parent_cityvillage').focus();
                        });*/
            
                   // }
          
                }
            });

        });
    },
    parentgrampanchayatChange: function(loaderUrl) {
        var _this = this;
        $('#gramPanchayatParent').change(function() {
            var value = $.trim($("#gramPanchayatParent option:selected").val());
            var sub = $.trim($("#birth_legal_bir_le_parent_sub_district option:selected").val());
            _this.showLoader('birth_legal_bir_le_parent_cityvillage', loaderUrl);
            gramurl = birthRegisterSuccess.urlAjax + "/grampanchayat";


            $.ajax({
                url: gramurl,
                type: "POST",
                data: 's='+sub+'&d=' + value,
                success: function(response){
                    $('#birth_legal_bir_le_parent_cityvillage').append(response);
                    $('.ajaxloader').hide();
                    $(this).fadeIn();
                    $('#birth_legal_bir_le_parent_cityvillage').focus();
                }
            });


            /*$('#birth_legal_bir_le_parent_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#birth_legal_bir_le_parent_cityvillage').focus();
             
            });*/
        });
    },
	//------------------------------------REGISTRATION UNIT ACCORDINT TO VILLAGE ID-----------------------------------------
	//----------------This is to Get Hospital on behalf of City Village-------------------------------//
    parentcityvillagehospitalChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_cityvillage').change(function() {
            var value = $.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
			//alert(value)
            //var sub = $.trim($("#birth_legal_bir_le_hospital_name option:selected").val());
            _this.showLoader('birth_legal_bir_le_hospital_name', loaderUrl);
            hospitalurl = birthRegisterSuccess.urlAjax + "/hospital";
            //$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s='+sub+'&d=' + value, function() {
            $.ajax({
                url: hospitalurl,
                type: "POST",
                data: 's=' + value,
                success: function(response){
                    $('#birth_legal_bir_le_hospital_name').empty();
                    $('#birth_legal_bir_le_hospital_name').append(response);
                    $('.ajaxloader').hide();
                    $(this).fadeIn();
                    $('#birth_legal_bir_le_hospital_name').focus();
                }
            });
                /*$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#birth_legal_bir_le_hospital_name').focus();
             
            });*/
        });
    },
    //----------------This is End of to Get Hospital on behalf of City Village-------------------------------
   
   
   
   //--------------This is to Get Registration Unit on behalf of City Village
   
    /*parentcityvillageregistrationunitChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_cityvillage').change(function() {
            var value = $.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
            //alert(value);
            _this.showLoader('birth_legal_bir_le_reg_unit', loaderUrl);
            registrationuniturl = birthRegisterSuccess.urlAjax + "/registration";
           // alert(registrationuniturl + '?v=' + value);
            //$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s='+sub+'&d=' + value, function() {
            $('#birth_legal_bir_le_reg_unit').hide().load(registrationuniturl + '?v=' + value, function() {
                    $('.ajaxloader').hide();
                    $(this).fadeIn();    
                    $('#birth_legal_bir_le_reg_unit').focus();
             
            });
        });
    },*/
	
	parentcityvillageregistrationunitChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_parent_cityvillage').change(function() {
			
			var state = $.trim($("#birth_legal_bir_le_parent_state option:selected").val());
			var disrtict = $.trim($("#birth_legal_bir_le_parent_district option:selected").val());
			var subdisrtict = $.trim($("#birth_legal_bir_le_parent_sub_district option:selected").val());
            var value = $.trim($("#birth_legal_bir_le_parent_cityvillage option:selected").val());
            /*alert(state);
			alert(disrtict);
			alert(sub_disrtict);
			alert(value);*/
			
            _this.showLoader('birth_legal_bir_le_reg_unit', loaderUrl);
            registrationuniturl = birthRegisterSuccess.urlAjax + "/registration";
   
			//alert(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict);			
			
			//alert(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value);			
			
			console.log(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value);			
			
           //alert(registrationuniturl + '?v=' + value);
            //$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s='+sub+'&d=' + value, function() {
            //$('#birth_legal_bir_le_reg_unit').hide().load(registrationuniturl + '?v=' + value, function() {

            $.ajax({
                url: registrationuniturl,
                type: "POST",
                data: 's=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value,
                success: function(response){
                    $('#birth_legal_bir_le_reg_unit').empty();
                    $('#birth_legal_bir_le_reg_unit').append(response);
                    $('.ajaxloader').hide();
                    $(this).fadeIn();
                    $('#birth_legal_bir_le_reg_unit').focus();
                }
            });

            /*$('#birth_legal_bir_le_reg_unit').hide().load(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value, function() {
																										  
                    $('.ajaxloader').hide();
                    $(this).fadeIn();    
                    $('#birth_legal_bir_le_reg_unit').focus();
             
            });*/
        });
    },
	
	birthcityvillageregistrationunitChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_birth_cityvillage').change(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_cityvillage option:selected").val());
            //alert(value);
            _this.showLoader('birth_legal_bir_le_reg_unit', loaderUrl);
            registrationuniturl = birthRegisterSuccess.urlAjax + "/registration";
            //alert(registrationuniturl + '?v=' + value);
            //$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s='+sub+'&d=' + value, function() {
            $('#birth_legal_bir_le_reg_unit').hide().load(registrationuniturl + '?v=' + value, function() {
                    $('.ajaxloader').hide();
                    $(this).fadeIn();    
                    $('#birth_legal_bir_le_reg_unit').focus();
             
            });
        });
    },
	//--------------This is End of to Get Registration Unit on behalf of City Village
   
    
    
    //--------------This is to Get Registration Unit on behalf of Hospital Change
   
    hospitalregistrationunitChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_hospital_name').change(function() {
            var value = $.trim($("#birth_legal_bir_le_hospital_name option:selected").val());
            
            //var place_id = $.trim($("#userStateId").val());
            //alert(value);
            _this.showLoader('birth_legal_bir_le_reg_unit', loaderUrl);
            registrationuniturl = birthRegisterSuccess.urlAjax + "/registrationUnit";
            //alert(registrationuniturl + '?v=' + value);
            //$('#birth_legal_bir_le_hospital_name').hide().load(hospitalurl + '?s='+sub+'&d=' + value, function() {
            $('#birth_legal_bir_le_reg_unit').hide().load(registrationuniturl + '?v=' + value, function() {
                    $('.ajaxloader').hide();
                    $(this).fadeIn();    
                    $('#birth_legal_bir_le_reg_unit').focus();
             
            });
        });
    },
    //--------------This is End of to Get Registration Unit on behalf of Hospital Change

	//------------------------------------REGISTRATION UNIT ACCORDINT TO VILLAGE ID-----------------------------------------
    birthStateChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_birth_state').change(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_state option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_birth_district', loaderUrl);
            districtUrl = birthRegisterSuccess.urlAjax + "/district";
            //$('#birth_legal_bir_le_birth_district').hide().load(districtUrl + '?S=' + value, function() {
			$('#birth_legal_bir_le_birth_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																										               
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_birth_district').focus();
                $('#birth_legal_bir_le_birth_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#birth_legal_bir_le_birth_sub_district").append(empty_subDistrict);

                $('#birth_legal_bir_le_birth_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_birth_cityvillage").append(empty_village);
            });
        });
    },
    birthDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_birth_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_birth_sub_district', loaderUrl);
            subDistrictUrl = birthRegisterSuccess.urlAjax + "/subDistrict";
           // $('#birth_legal_bir_le_birth_sub_district').hide().load(subDistrictUrl + '?d=' + value, function() {
			$('#birth_legal_bir_le_birth_sub_district').hide().load(subDistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																											                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_birth_sub_district').focus();
                $('#birth_legal_bir_le_birth_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_legal_bir_le_birth_cityvillage").append(empty_village);
            });
        });
    },
	
	
    birthSubDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#birth_legal_bir_le_birth_sub_district').change(function() {
            var value = $.trim($("#birth_legal_bir_le_birth_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('birth_legal_bir_le_birth_cityvillage', loaderUrl);
            villageUrl = birthRegisterSuccess.urlAjax + "/village";
           // $('#birth_legal_bir_le_birth_cityvillage').hide().load(villageUrl + '?s=' + value, function() {
			$('#birth_legal_bir_le_birth_cityvillage').hide().load(villageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {
				$('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_legal_bir_le_birth_cityvillage').focus();
            });
        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    },
    getParentSelectedData: function(vil_id) {
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                if (response != "null")
                {
                    var data = json_parse(response);
                    var village = document.getElementById('birth_legal_bir_le_parent_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var district = document.getElementById('birth_legal_bir_le_parent_district');
                    $(district).empty();
                    var districts = data['districts'];
                    var selected_district = data['selected_dist'];
                    for (var i = 0; i < districts.length; i++) {
                        var district_option = document.createElement('option');
                        district_option.value = districts[i].id;
                        district_option.innerHTML = districts[i].label;
                        if (selected_district == districts[i].id) {
                            district_option.selected = true;
                        }
                        district.appendChild(district_option);
                    }

                    var sub_district = document.getElementById('birth_legal_bir_le_parent_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            }
        });
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    getPermSelectedData: function(vil_id) {
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('birth_legal_bir_le_perm_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('birth_legal_bir_le_perm_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('birth_legal_bir_le_perm_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    getBirthSelectedData: function(vil_id) {
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('birth_legal_bir_le_birth_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('birth_legal_bir_le_birth_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('birth_legal_bir_le_birth_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    usersSelectedData: function(vil_id) {

        /*var edit_flag = $('#is_edit_flag').val();
         var urlTogetdata;
         if(typeof(edit_flag) != 'undefined' && edit_flag !='')
         urlTogetdata = "../../getSelectedState";
         else*/
        urlTogetdata = birthRegisterSuccess.urlAjax + "/getSelectedState";
        $.ajax({
            url: urlTogetdata + "?village_id=" + vil_id,
            async: true,
            type: "GET",
            success: function(response) {
                if (response != "null")
                {
                    var data = json_parse(response);
                    var village = document.getElementById('birth_legal_bir_le_birth_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('birth_legal_bir_le_birth_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            }
        });
        $.ajax({
            url: birthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    /**
   * CALLING TYPE:
   * 0 -> FROM FORM
   * 1 -> FROM FORM SUBMIT
   **/
    regVsDobDateValidation: function(regDate, dobDate, maxRegYear, callingType) {
        $("#formFillDate").val(regDate);
        $("#dob").val(dobDate);
        var fillingDate = regDate;

        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        var splitFillingDate = fillingDate.split("-");
        var fillYear = parseInt(splitFillingDate[2]);
        var fillCompareDate = new Date(fillYear, splitFillingDate[1], splitFillingDate[0])

        var splitDobDate = dobDate.split("-");
        var incDobYear = parseInt(splitDobDate[2]) + 15;
        var dobCompareDate = new Date(incDobYear, splitDobDate[1], splitDobDate[0])

        if (dobCompareDate > currentDate) {
            if (parseInt(fillYear) > maxRegYear) {
                if (callingType == 1) {
                    alert("Age of registration is greater than 15 Years.");
                }
                else if (callingType == 2) {
                    alert("Age of registration is greater than 15 Years. Please correct the form before submittion");
                    return true;
                }
            }
        }
    },
    birthRegFormSave: function(formId) {
        var _this = this;
        $(formId).submit(function(event) {
            var regDate = $("#formFillDate").val();
            var dobDate = $("#dob").val();
            var maxRegDate = $("#maxYearValue").val();
            var callingType = 2;
            var value = _this.regVsDobDateValidation(regDate, dobDate, maxRegDate, callingType);
            if (value == true) {
                event.preventDefault();
            }
        });
    }
}


/**
 * Inline script for birthRegisterStep2Success in birth module
 */
var birthRegisterStep2Success = {
    init: function(loaderUrl, urlAjax, subDistrictUrl) {
        this.urlAjax = urlAjax;
        //    if(is_edit){
        //      this.district_url = '../../district';
        //      this.sub_district_url = '../../subDistrict';
        //      this.village_url = '../../village';
        //      this.get_selected_data_url = '../../getSelectedState';
        //    }else{
        this.district_url = '../../district';
        this.sub_district_url = '../../subDistrict';
        this.village_url = '../../village';
        this.get_selected_data_url = 'getSelectedState';
        this.gram_url = '../../grampanchayat';
        //    }  

        //dynamic change of state, district and subdistrict
        this.motherStateChange(loaderUrl);
        this.motherDistrictChange(loaderUrl);
        this.motherSubDistrictChange(loaderUrl);
        this.mothergrampanchayatChange(loaderUrl);

        this.subDistrictUrl = subDistrictUrl;
    },
    motherStateChange: function(loaderUrl) {
        var _this = this;
        $('#birth_stat_bir_st_state').change(function() {
            var value = $.trim($("#birth_stat_bir_st_state option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
            _this.showLoader('birth_stat_bir_st_district', loaderUrl);
            // var edit_flag = $('#is_edit_flag').val();

            //  if(typeof(edit_flag) != 'undefined' && edit_flag !='')
            //  districtUrl = "../../../../district";
            //else
            districtUrl = birthRegisterStep2Success.urlAjax + "/district";
            //$('#birth_stat_bir_st_district').hide().load(districtUrl + '?S=' + value, function() {
			$('#birth_stat_bir_st_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId, function() {																					                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_stat_bir_st_district').focus();
                $('#birth_stat_bir_st_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#birth_stat_bir_st_sub_district").append(empty_subDistrict);

                $('#birth_stat_bir_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_stat_bir_st_cityvillage").append(empty_village);
                
                $('#gramPanchayatMother').html('');
                var empty_gram = document.createElement('option');
                empty_gram.value = '';
                empty_gram.innerHTML = "Select Gram Panchayat";
                $("#gramPanchayatMother").append(empty_gram);
            });
        });
    },
    motherDistrictChange: function(loaderUrl) {

        var _this = this;
        $('#birth_stat_bir_st_district').change(function() {
            var value = $.trim($("#birth_stat_bir_st_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
            _this.showLoader('birth_stat_bir_st_sub_district', loaderUrl);
            //  var edit_flag = $('#is_edit_flag').val();
            // if(typeof(edit_flag) != 'undefined' && edit_flag !='')
            //      subDistrictUrl = "../../../../subDistrict";
            // else
            subDistrictUrl = birthRegisterStep2Success.urlAjax + "/subDistrict";

            //$('#birth_stat_bir_st_sub_district').hide().load(subDistrictUrl + '?d=' + value, function() {
			$('#birth_stat_bir_st_sub_district').hide().load(subDistrictUrl + '?d='+value+'&s=' + User_StateId, function() {																										
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#birth_stat_bir_st_sub_district').focus();
                $('#birth_stat_bir_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#birth_stat_bir_st_cityvillage").append(empty_village);
            });
        });
    },
    motherSubDistrictChange: function(loaderUrl) { 
        var _this = this;
        $('#birth_stat_bir_st_sub_district').change(function() {
            var value = $.trim($("#birth_stat_bir_st_sub_district option:selected").val());
      		var User_StateId = $.trim($("#userStateId").val());
			
            Utilities.ajaxBlockUI();
            $.ajax({
                url: birthRegisterStep2Success.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){
                  /*  var gramPanchayatData = json_parse(response);
                    //          console.log(gramPanchayatData)
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatMother").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        BirthLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatMother", "#birth_stat_bir_st_cityvillage");  
                   
                    }
                    else{*/
                        $("#gramPanchayatMother").attr('disabled', true);
                        $("#gramPanchayatMother").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('birth_stat_bir_st_cityvillage', loaderUrl);
                        var edit_flag = $('#is_edit_flag').val();
                        /*if(typeof(edit_flag) != 'undefined' && edit_flag !='')
             villageUrl = "../../../../village";
             else*/
                        villageUrl = birthRegisterStep2Success.urlAjax + "/village";
                        //$('#birth_stat_bir_st_cityvillage').hide().load(villageUrl + '?s=' + value, function() {
                        $('#birth_stat_bir_st_cityvillage').hide().load(villageUrl + '?s='+value+'&d=' + User_StateId, function() {	 
						 $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#birth_stat_bir_st_cityvillage').focus();
                        });
                  //  }
                }
      
            });
        });
    },
    mothergrampanchayatChange: function(loaderUrl) {
        var _this = this;
        $('#gramPanchayatMother').change(function() { 
            var value = $.trim($("#gramPanchayatMother option:selected").val());
            var sub = $.trim($("#birth_stat_bir_st_sub_district option:selected").val());
            _this.showLoader('birth_stat_bir_st_cityvillage', loaderUrl);
            gramurl =birthRegisterStep2Success.urlAjax + "/grampanchayat";
            $('#birth_stat_bir_st_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#birth_stat_bir_st_cityvillage').focus();
             
            });
        });
    },
    motherCopyAddress: function() {
        var _this = this;
        var legal_village = document.getElementById('legal_village');
        var vil_id = legal_village.value;

        $('#addresschk').click(function() {
            if ($('#addresschk').attr('checked') == false) {
                $('#birth_stat_bir_st_cityvillage').val('');
                $('#birth_stat_bir_st_sub_district').val('');
                return;
            }
            /*var edit_flag = $('#is_edit_flag').val();
             var urlTogetdata;
             if(typeof(edit_flag) != 'undefined' && edit_flag !='')
             urlTogetdata = "../../../../getSelectedState";
             else*/
            urlTogetdata = birthRegisterStep2Success.urlAjax + "/getSelectedState";

            $.ajax({
                url: urlTogetdata + "?village_id=" + vil_id,
                type: "GET",
                success: function(response) {
                    var data = json_parse(response);
                    var village = document.getElementById('birth_stat_bir_st_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];

                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('birth_stat_bir_st_sub_district');

                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            });
            $.ajax({
                url: birthRegisterStep2Success.urlAjax + "/getVillageFlag?village_id=" + vil_id,
                type: "GET",
                success: function(response) {
                    var data = json_parse(response);
                    if (data == 1) {
                        $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                    } else if (data == 2) {
                        $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                    }

                }

            });
        });
    },
    usersSelectedData: function(vil_id) {
        /* var edit_flag = $('#is_edit_flag').val();
         var urlTogetdata;
         if(typeof(edit_flag) != 'undefined' && edit_flag !='')
         urlTogetdata = "../../../../getSelectedState";
         else*/
        urlTogetdata = birthRegisterStep2Success.urlAjax + "/getSelectedState";
        $.ajax({
            url: urlTogetdata + "?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                if (response != "null")
                {
                    var data = json_parse(response);
                    var village = document.getElementById('birth_stat_bir_st_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('birth_stat_bir_st_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            }
        });
        $.ajax({
            url: birthRegisterStep2Success.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#birth_stat_bir_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#birth_stat_bir_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    }
}



/**
 * Inline script for Still Birth Register Success Page in stillbirth module
 */
var stillBirthRegisterSuccess = {
    init: function(is_edit, loaderUrl, urlAjax) {
        this.urlAjax = urlAjax;
        if (is_edit) {
            this.district_url = '../../district';
            this.sub_district_url = '../../subDistrict';
            this.village_url = '../../village';
            this.get_selected_data_url = '../../getSelectedState';
            this.gram_url = '../../grampanchayat';
            this.addressCheck();
        } else {
            this.district_url = '../birth/district';
            this.sub_district_url = '../birth/subDistrict';
            this.village_url = '../birth/village';
            this.get_selected_data_url = 'getSelectedState';
            this.gram_url = '../../grampanchayat';
        }

        this.birthStateChange(loaderUrl);
        this.birthDistrictChange(loaderUrl);
        this.birthSubDistrictChange(loaderUrl);        
        this.placeChange();
        this.informantCheckboxChange();
        this.pincodeChange();
        this.showPlaceAddress();
    },
    birthStateChange: function(loaderUrl) {
        var _this = this;
        $('#stillBirth_legal_sbi_le_birth_state').change(function() {
            var value = $.trim($("#stillBirth_legal_sbi_le_birth_state option:selected").val());
            _this.showLoader('stillBirth_legal_sbi_le_birth_district', loaderUrl);
            $('#stillBirth_legal_sbi_le_birth_district').hide().load(stillBirthRegisterSuccess.urlAjax + '/district?S=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#stillBirth_legal_sbi_le_birth_district').focus();
                $('#stillBirth_legal_sbi_le_birth_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#stillBirth_legal_sbi_le_birth_sub_district").append(empty_subDistrict);

                $('#stillBirth_legal_sbi_le_birth_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#stillBirth_legal_sbi_le_birth_cityvillage").append(empty_village);
            });
        });
    },
    birthDistrictChange: function(loaderUrl) {
        var _this = this;
        $('#stillBirth_legal_sbi_le_birth_district').change(function() {
            var value = $.trim($("#stillBirth_legal_sbi_le_birth_district option:selected").val());
            _this.showLoader('stillBirth_legal_sbi_le_birth_sub_district', loaderUrl);
            $('#stillBirth_legal_sbi_le_birth_sub_district').hide().load(_this.sub_district_url + '?d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#stillBirth_legal_sbi_le_birth_sub_district').focus();
                $('#stillBirth_legal_sbi_le_birth_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#stillBirth_legal_sbi_le_birth_cityvillage").append(empty_village);
            });
        });
    },
    birthSubDistrictChange: function(loaderUrl) {
        var _this = this;

        $('#stillBirth_legal_sbi_le_birth_sub_district').change(function() {

             var value = $.trim($("#stillBirth_legal_sbi_le_birth_sub_district option:selected").val());
            var User_StateId = $.trim($("#userStateId").val());
            var User_DistId = $.trim($("#userDistrictId").val());

             //alert(_this.village_url + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId+'&ru='+regUnitNo);
            _this.showLoader('stillBirth_legal_sbi_le_birth_cityvillage', loaderUrl);
            $('#stillBirth_legal_sbi_le_birth_cityvillage').hide().load(_this.village_url + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId+'&ru='+regUnitNo, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#stillBirth_legal_sbi_le_birth_cityvillage').focus();
            });
        });
    },
  
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    },
    placeChange: function() {
        $("#stillBirth_legal_sbi_le_birth_place").change(function() {
            //      var value = $(this).val();
            //      if(value == 1){
            $('#hospital_address_checkbox').show();
        //      }else{
        //        $('#hospital_address_checkbox').hide();
        //      }
        })
    },
    addressCheck: function() {
        $('#hospital_address_checkbox').show();
        $('#addresschk2').attr('checked', 'checked');
    },
    informantCheckboxChange: function() {
        $("#addresschk3").click(function() {
            if ($("#addresschk3").attr('checked') == false) {
                $('#stillBirth_legal_sbi_le_informant_address').val('');
                $('#stillBirth_legal_sbi_le_informant_name').val('');
                return;
            }
            var hosp = $('#stillBirth_legal_sbi_le_birth_place_name');
            if (hosp.val() == "") {
                var checkbox = document.getElementById('addresschk3');
                checkbox.checked = false;
                alert("Please select the hospital.");
            } else {
                $('#stillBirth_legal_sbi_le_informant_address').val($('#stillBirth_legal_sbi_le_birth_place_name option:selected').html());
                $('#stillBirth_legal_sbi_le_informant_name').val('HOSPITAL');
            }
        });
    },
    usersSelectedData: function(vil_id) {
        var _this = this;
        $.ajax({
            url: _this.get_selected_data_url + "?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data) {
                    var village = document.getElementById('stillBirth_legal_sbi_le_birth_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('stillBirth_legal_sbi_le_birth_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }


                    var district = document.getElementById('stillBirth_legal_sbi_le_birth_district');
                    $(district).empty();
                    var districts = data['districts'];
                    var selected_district = data['selected_dist'];
                    for (var i = 0; i < districts.length; i++) {
                        var district_option = document.createElement('option');
                        district_option.value = districts[i].id;
                        district_option.innerHTML = districts[i].label;
                        if (selected_district == districts[i].id) {
                            district_option.selected = true;
                        }
                        district.appendChild(district_option);
                    }

                    var state = document.getElementById('stillBirth_legal_sbi_le_birth_state');
                    state.value = data['selected_state'];


                }
            }
        });
        $.ajax({
            url: stillBirthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    pincodeChange: function() {
        var place_pincode = document.getElementById('stillBirth_legal_sbi_le_birth_pincode');
        if (place_pincode.value == 0)
            place_pincode.value = "";

        var informant_pincode = document.getElementById('stillBirth_legal_sbi_le_informant_pincode');
        if (informant_pincode.value == 0)
            informant_pincode.value = "";
    },
    showPlaceAddress: function() {
        var place_of_birth = document.getElementById('stillBirth_legal_sbi_le_birth_place').value;
        //    if(place_of_birth != "" || place_of_birth != 1){
        if (place_of_birth != "") {
            if (place_of_birth == 1) {
                $("#hospital_1").show();
            }
            else {
                $('#address').show();
            }
        }
    },
    getPlaceSelectedData: function(vil_id) {

        $.ajax({
            url: stillBirthRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('stillBirth_legal_sbi_le_birth_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var sub_district = document.getElementById('stillBirth_legal_sbi_le_birth_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: stillBirthRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    }
}


/**
 * Inline script for deathRegisterStep2Success in birth module
 */
var stillBirthRegisterStep2Success = {
    init: function(loaderUrl, urlAjax, subDistrictUrl) {
        this.urlAjax = urlAjax;
        //    if(is_edit){
        //      this.district_url = '../../district';
        //      this.sub_district_url = '../../subDistrict';
        //      this.village_url = '../../village';
        //      this.get_selected_data_url = '../../getSelectedState';
        //    }else{
        this.district_url = '../../district';
        this.sub_district_url = '../../subDistrict';
        this.village_url = '../../village';
        this.get_selected_data_url = 'getSelectedState';
        this.gram_url = '../../grampanchayat';
        //    }
        //dynamic change of state, district and subdistrict
        this.motherStateChange(loaderUrl);
        this.motherDistrictChange(loaderUrl);
        this.motherSubDistrictChange(loaderUrl);
        this.birthgrampanchayatChange(loaderUrl);
        this.subDistrictUrl = subDistrictUrl;
    },
    motherStateChange: function(loaderUrl) {
        var _this = this;
        districtUrl = stillBirthRegisterStep2Success.urlAjax + '/district';
        $('#StilBirthRegStep2_sbi_st_state').change(function() {
            var value = $.trim($("#StilBirthRegStep2_sbi_st_state option:selected").val());
            _this.showLoader('StilBirthRegStep2_sbi_st_district', loaderUrl);
            $('#StilBirthRegStep2_sbi_st_district').hide().load(stillBirthRegisterStep2Success.urlAjax + '/district?S=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#StilBirthRegStep2_sbi_st_district').focus();
                $('#StilBirthRegStep2_sbi_st_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#StilBirthRegStep2_sbi_st_sub_district").append(empty_subDistrict);

                $('#StilBirthRegStep2_sbi_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#StilBirthRegStep2_sbi_st_cityvillage").append(empty_village);
            });
        });
    },
    motherDistrictChange: function(loaderUrl) {
        var _this = this;
        subDistrict = stillBirthRegisterStep2Success.urlAjax + '/subDistrict';
        $('#StilBirthRegStep2_sbi_st_district').change(function() {
            var value = $.trim($("#StilBirthRegStep2_sbi_st_district option:selected").val());
            _this.showLoader('StilBirthRegStep2_sbi_st_sub_district', loaderUrl);
            $('#StilBirthRegStep2_sbi_st_sub_district').hide().load(subDistrict + '?d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#StilBirthRegStep2_sbi_st_sub_district').focus();
                $('#StilBirthRegStep2_sbi_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#StilBirthRegStep2_sbi_st_cityvillage").append(empty_village);
            });
        });
    },
    motherSubDistrictChange: function(loaderUrl) {
        var _this = this;
        village = stillBirthRegisterStep2Success.urlAjax + '/village';
        $('#StilBirthRegStep2_sbi_st_sub_district').change(function() {
            var value = $.trim($("#StilBirthRegStep2_sbi_st_sub_district option:selected").val());
      
            Utilities.ajaxBlockUI();
            $.ajax({
                url: stillBirthRegisterStep2Success.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){
                    var gramPanchayatData = json_parse(response);
                    //          console.log(gramPanchayatData)
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatMother").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        StillBrithLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatMother", "#StilBirthRegStep2_sbi_st_cityvillage");  
                    }
                    else{
                        $("#gramPanchayatMother").attr('disabled', true);
                        $("#gramPanchayatMother").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('StilBirthRegStep2_sbi_st_cityvillage', loaderUrl);
                        $('#StilBirthRegStep2_sbi_st_cityvillage').hide().load(village + '?s=' + value, function() {
                            $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#StilBirthRegStep2_sbi_st_cityvillage').focus();
                        });

                    }
                }
      
            });
      
      
        });
    },
    birthgrampanchayatChange: function(loaderUrl) {
        var _this = this;
        $('#gramPanchayatMother').change(function() {
            var value = $.trim($("#gramPanchayatMother option:selected").val());
            var sub = $.trim($("#StilBirthRegStep2_sbi_st_sub_district option:selected").val());
            _this.showLoader('StilBirthRegStep2_sbi_st_cityvillage', loaderUrl);
            gramurl = stillBirthRegisterStep2Success.urlAjax + "/grampanchayat";
            $('#StilBirthRegStep2_sbi_st_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#StilBirthRegStep2_sbi_st_cityvillage').focus();
             
            });
        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    },
    usersSelectedData: function(vil_id) {
        var _this = this;
        $.ajax({
            url: stillBirthRegisterStep2Success.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('StilBirthRegStep2_sbi_st_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }
        
        
                if($.isEmptyObject(data['parentGramPanchayat']) == false){ // where gram panchayat exsists
                    $.each(data['parentGramPanchayat'][data['selected_sub_dist']]['panchayatDetail'], function(index, value) {
                        $("#gramPanchayatMother").attr('disabled', false);
                        $("#gramPanchayatMother").append(
                            $('<option></option>').val(index).html(value)
                            );
                    });
                    $("#gramPanchayatMother").val(data['villageGramPanchayat'][data['selected_sub_dist']]['selectedPanchayatCode']);
                }
                else{
                    $("#gramPanchayatMother").attr('disabled', true);
                }

                var sub_district = document.getElementById('StilBirthRegStep2_sbi_st_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }


                var district = document.getElementById('StilBirthRegStep2_sbi_st_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var state = document.getElementById('StilBirthRegStep2_sbi_st_state');
                state.value = data['selected_state'];


            }
        });
        $.ajax({
            url: stillBirthRegisterStep2Success.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#StilBirthRegStep2_sbi_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    }
}


/**
 * Inline script for Death Register Success page in death module
 */
var deathRegisterSuccess = {
    init: function(is_edit, loaderUrl, urlAjax, subDistrictUrl) {
        this.urlAjax = urlAjax;
        if (is_edit) {
            this.district_url = '../../district';
            this.sub_district_url = '../../subDistrict';
            this.village_url = '../../village';
            this.gram_url = '../../grampanchayat';
			this.registraton_unit_url = '../../registration';
        } else {
            this.district_url = '../birth/district';
            this.sub_district_url = '../birth/subDistrict';
            this.village_url = '../birth/village';
            this.gram_url = '../../grampanchayat';
			this.registraton_unit_url = '../../registrationunit';
            this.registraton_unit_url = '../../registration';
			this.hospital_url = '../../hospital';
        }
        this.deathStateChange(loaderUrl);
        this.deathDistrictChange(loaderUrl);
        this.deathSubDistrictChange(loaderUrl);
        this.permStateChange(loaderUrl);
        this.permDistrictChange(loaderUrl);
        this.permSubDistrictChange(loaderUrl);
        this.deathgrampanchayatChange(loaderUrl);
        this.permgrampanchayatChange(loaderUrl);
        this.placeStateChange(loaderUrl);
        this.placeDistrictChange(loaderUrl);
        this.placeSubDistrictChange(loaderUrl);
		
        this.placeChange();
        this.informantCheckboxChange();
		this.deathcityvillageregistrationunitChange(loaderUrl);   
		this.deathcityvillagehospiatlChange(loaderUrl);  // added by Himanshu   
        this.subDistrictUrl = subDistrictUrl;
    },

   permStateChange: function(loaderUrl) {
        var _this = this;

        districtUrl = deathRegisterSuccess.urlAjax + "/district";
        $('#Deathreg_dea_le_perm_state').change(function() {
            var value = $.trim($("#Deathreg_dea_le_perm_state option:selected").val());
            var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
			//alert("User_StateId "+User_StateId);

            _this.showLoader('Deathreg_dea_le_perm_district', loaderUrl);
          //  $('#Deathreg_dea_le_perm_district').hide().load(districtUrl + '?S=' + value, function() {
			$('#Deathreg_dea_le_perm_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																										                 $('.ajaxloader').hide();
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_perm_district').focus();
                $('#Deathreg_dea_le_perm_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#Deathreg_dea_le_perm_sub_district").append(empty_subDistrict);

                $('#Deathreg_dea_le_perm_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_perm_cityvillage").append(empty_village);
            });
        });
    },
    permDistrictChange: function(loaderUrl) {
        var _this = this;
        subdistrictUrl = deathRegisterSuccess.urlAjax + "/subDistrict";
        $('#Deathreg_dea_le_perm_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_perm_district option:selected").val());
  			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
          _this.showLoader('Deathreg_dea_le_perm_sub_district', loaderUrl);
          //  $('#Deathreg_dea_le_perm_sub_district').hide().load(subdistrictUrl + '?d=' + value, function() {
 			$('#Deathreg_dea_le_perm_sub_district').hide().load(subdistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																														
               $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_perm_sub_district').focus();
                $('#Deathreg_dea_le_perm_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_perm_cityvillage").append(empty_village);
            });
        });
    },
    permSubDistrictChange: function(loaderUrl) {
        var _this = this;
        cityVillageUrl = deathRegisterSuccess.urlAjax + "/village";
        $('#Deathreg_dea_le_perm_sub_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_perm_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            Utilities.ajaxBlockUI();
            $.ajax({
                url: deathRegisterSuccess.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){/*
                    var gramPanchayatData = json_parse(response);
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatPermanent").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        deathLegalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatPermanent", "#Deathreg_dea_le_perm_cityvillage");  
                    }
                    else{*/
                        $("#gramPanchayatPermanent").attr('disabled', true);
                        $("#gramPanchayatPermanent").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('Deathreg_dea_le_perm_cityvillage', loaderUrl);
                      //  $('#Deathreg_dea_le_perm_cityvillage').hide().load(cityVillageUrl + '?s=' + value, function() {
						$('#Deathreg_dea_le_perm_cityvillage').hide().load(cityVillageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																																																					   
                            $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#Deathreg_dea_le_perm_cityvillage').focus();
                        });
                   // }
                }
            });
      
      
        });
    },     
    permgrampanchayatChange: function(loaderUrl) { 
        var _this = this;
        $('#gramPanchayatPermanent').change(function() {
            var value = $.trim($("#gramPanchayatPermanent option:selected").val());
            var sub = $.trim($("#Deathreg_dea_le_perm_sub_district option:selected").val());
            _this.showLoader('Deathreg_dea_le_perm_cityvillage', loaderUrl);
            gramurl = deathRegisterSuccess.urlAjax + "/grampanchayat";
            $('#Deathreg_dea_le_perm_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#Deathreg_dea_le_perm_cityvillage').focus();
             
            });
        });
    },
    deathStateChange: function(loaderUrl) {
        var _this = this;
        districtUrl = deathRegisterSuccess.urlAjax + "/district";
        $('#Deathreg_dea_le_state').change(function() {
            var value = $.trim($("#Deathreg_dea_le_state option:selected").val());
            var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('Deathreg_dea_le_district', loaderUrl);
          //  $('#Deathreg_dea_le_district').hide().load(districtUrl + '?S=' + value, function() {
 			$('#Deathreg_dea_le_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																										 
               $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_district').focus();
                $('#Deathreg_dea_le_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#Deathreg_dea_le_sub_district").append(empty_subDistrict);

                $('#Deathreg_dea_le_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_cityvillage").append(empty_village);
            });
        });
    },
    deathDistrictChange: function(loaderUrl) {
        var _this = this;
        subdistrictUrl = deathRegisterSuccess.urlAjax + "/subDistrict";
        $('#Deathreg_dea_le_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_district option:selected").val());
  			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
          _this.showLoader('Deathreg_dea_le_sub_district', loaderUrl);
            //$('#Deathreg_dea_le_sub_district').hide().load(subdistrictUrl + '?d=' + value, function() {
			$('#Deathreg_dea_le_sub_district').hide().load(subdistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																														
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_sub_district').focus();
                $('#Deathreg_dea_le_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_cityvillage").append(empty_village);
            });
        });
    },
    deathSubDistrictChange: function(loaderUrl) {
        var _this = this;
        cityVillageUrl = deathRegisterSuccess.urlAjax + "/village";
        $('#Deathreg_dea_le_sub_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            Utilities.ajaxBlockUI();
            $.ajax({
                url: deathRegisterSuccess.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){/*
                    var gramPanchayatData = json_parse(response);
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatParent").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        deathLegalForm.fillGramPanchayatOptionsValues(panchayatDetailParam, villageNamesParam);  
                    }
                    else{*/
                        $("#gramPanchayatParent").attr('disabled', true);
                        $("#gramPanchayatParent").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('Deathreg_dea_le_cityvillage', loaderUrl);
                      //  $('#Deathreg_dea_le_cityvillage').hide().load(cityVillageUrl + '?s=' + value, function() {
 						$('#Deathreg_dea_le_cityvillage').hide().load(cityVillageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																																																					   
                           $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#Deathreg_dea_le_cityvillage').focus();
                        });
            
                   // }
          
                }
            });
      
      
        //      alert("uday shankar singh");
      
        });
    },
    deathgrampanchayatChange: function(loaderUrl) { 
        var _this = this;
        $('#gramPanchayatParent').change(function() {
            var value = $.trim($("#gramPanchayatParent option:selected").val());
            var sub = $.trim($("#Deathreg_dea_le_sub_district option:selected").val());
            _this.showLoader('Deathreg_dea_le_cityvillage', loaderUrl);
            gramurl = deathRegisterSuccess.urlAjax + "/grampanchayat";
            $('#Deathreg_dea_le_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#Deathreg_dea_le_cityvillage').focus();
             
            });
        });
    },
	
	//TO GET HOSPITALS ON CITY CHANGE
	
	deathcityvillagehospiatlChange:function(loaderUrl){                   // ADDED BY HIMANSHU
		var _this = this;
		$('#Deathreg_dea_le_cityvillage').change(function(){
			var value = $.trim($('#Deathreg_dea_le_cityvillage option:selected').val());
			 _this.showLoader('Deathreg_dea_le_hospital_name', loaderUrl);
			 hospurl = deathRegisterSuccess.urlAjax + "/hospital";
			 $('#Deathreg_dea_le_hospital_name').hide().load(hospurl+'?s='+value,function(){
				 $('.ajaxloader').hide();
				 $(this).fadeIn();
				 $('#Deathreg_dea_le_hospital_name').focus();
				 
				 });
			
			});
		
		},
	
	
	
	// TO GET THE REGISTRATION UNIT
	
	deathcityvillageregistrationunitChange: function(loaderUrl) {   // added by Himanshu  
        var _this = this;
      $('#Deathreg_dea_le_cityvillage').change(function() { 
	
			var state = $.trim($("#Deathreg_dea_le_state option:selected").val());
			var disrtict = $.trim($("#Deathreg_dea_le_district option:selected").val());
			var subdisrtict = $.trim($("#Deathreg_dea_le_sub_district option:selected").val());
            var value = $.trim($("#Deathreg_dea_le_cityvillage option:selected").val());
            _this.showLoader('Deathreg_dea_le_reg_unit', loaderUrl);
            registrationuniturl = deathRegisterSuccess.urlAjax + "/registration";
			console.log(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value);			
			$('#Deathreg_dea_le_reg_unit').hide().load(registrationuniturl + '?s=' + state +'&d=' + disrtict+'&sd=' + subdisrtict+'&v=' + value, function() {																							  
																										  
                    $('.ajaxloader').hide();
                    $(this).fadeIn();    
                    $('#Deathreg_dea_le_reg_unit').focus();
             
            });
        });
    },
	
	// TO GET THE REGISTRATION UNIT
	
    placeStateChange: function(loaderUrl) {
        var _this = this;
        districtUrl = deathRegisterSuccess.urlAjax + "/district";
        $('#Deathreg_dea_le_death_state').change(function() {
            var value = $.trim($("#Deathreg_dea_le_death_state option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('Deathreg_dea_le_death_district', loaderUrl);
           // $('#Deathreg_dea_le_death_district').hide().load(districtUrl + '?S=' + value, function() {
			$('#Deathreg_dea_le_death_district').hide().load(districtUrl + '?S='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																							 
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_death_district').focus();
                $('#Deathreg_dea_le_death_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#Deathreg_dea_le_death_sub_district").append(empty_subDistrict);

                $('#Deathreg_dea_le_death_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_death_cityvillage").append(empty_village);
            });
        });
    },
    placeDistrictChange: function(loaderUrl) {
        var _this = this;
        subdistrictUrl = deathRegisterSuccess.urlAjax + "/subDistrict";
        $('#Deathreg_dea_le_death_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_death_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('Deathreg_dea_le_death_sub_district', loaderUrl);
           // $('#Deathreg_dea_le_death_sub_district').hide().load(subdistrictUrl + '?d=' + value, function() {
			$('#Deathreg_dea_le_death_sub_district').hide().load(subdistrictUrl + '?d='+value+'&s=' + User_StateId+'&ud=' + User_DistId, function() {																									
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_death_sub_district').focus();
                $('#Deathreg_dea_le_death_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#Deathreg_dea_le_death_cityvillage").append(empty_village);
            });
        });
    },
    placeSubDistrictChange: function(loaderUrl) {
        var _this = this;
        cityVillageUrl = deathRegisterSuccess.urlAjax + "/village";
        $('#Deathreg_dea_le_death_sub_district').change(function() {
            var value = $.trim($("#Deathreg_dea_le_death_sub_district option:selected").val());
			var User_StateId = $.trim($("#userStateId").val());
			var User_DistId = $.trim($("#userDistrictId").val());
            _this.showLoader('Deathreg_dea_le_death_cityvillage', loaderUrl);
            //$('#Deathreg_dea_le_death_cityvillage').hide().load(cityVillageUrl + '?s=' + value, function() {
		    $('#Deathreg_dea_le_death_cityvillage').hide().load(cityVillageUrl + '?s='+value+'&d=' + User_StateId+'&ud=' + User_DistId, function() {																								 
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#Deathreg_dea_le_death_cityvillage').focus();
            });
        });
    },
    placegrampanchayatChange: function(loaderUrl) { 
        var _this = this;
        $('#gramPanchayatDeath').change(function() {
            var value = $.trim($("#gramPanchayatDeath option:selected").val());
            var sub = $.trim($("#Deathreg_dea_le_death_sub_district option:selected").val());
            _this.showLoader('Deathreg_dea_le_death_cityvillage', loaderUrl);
            gramurl = deathRegisterSuccess.urlAjax + "/grampanchayat";
            $('#Deathreg_dea_le_death_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#Deathreg_dea_le_death_cityvillage').focus();
             
            });
        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    },
    placeChange: function() {
        $("#Deathreg_dea_le_death_place").change(function() {
            var value = $(this).val();
            if (value == 1) {
                $('#hospital_address_checkbox').show();
            } else {
                $('#hospital_address_checkbox').hide();
            }
        })
    },
    informantCheckboxChange: function() {
        $("#addresschk3").click(function() {
            if ($("#addresschk3").attr('checked') == false) {
                $('#Deathreg_dea_le_informant_address').val('');
                $('#Deathreg_dea_le_informant_name').val('');
                return;
            }
            $('#Deathreg_dea_le_informant_address').val('');
            var hosp = $('#Deathreg_dea_le_death_place_name');
            if (hosp.val() == "") {
                var checkbox = document.getElementById('addresschk3');
                checkbox.checked = false;
                alert("Please select the hospital.");
            } else {
                $('#Deathreg_dea_le_informant_address').val($('#Deathreg_dea_le_death_place_name option:selected').html());
                $('#Deathreg_dea_le_informant_name').val('HOSPITAL');
            }

            var perm_add_checkbox = document.getElementById('addresschk2');
            perm_add_checkbox.checked = false;

        });
    },
    getDeceasedSelectedData: function(vil_id) {
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('Deathreg_dea_le_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('Deathreg_dea_le_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('Deathreg_dea_le_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    getPermSelectedData: function(vil_id) {
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('Deathreg_dea_le_perm_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('Deathreg_dea_le_perm_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('Deathreg_dea_le_perm_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    getDeathSelectedData: function(vil_id) {
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('Deathreg_dea_le_death_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('Deathreg_dea_le_death_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('Deathreg_dea_le_death_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    usersSelectedData: function(vil_id) {

        /*var edit_flag = $('#is_edit_flag').val();
         var urlTogetdata;
         if(typeof(edit_flag) != 'undefined' && edit_flag !='')
         urlTogetdata = "../../getSelectedState";
         else*/
        urlTogetdata = deathRegisterSuccess.urlAjax + "/getSelectedState";
        $.ajax({
            url: urlTogetdata + "?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                if (response != "null")
                {
                    var data = json_parse(response);
                    var village = document.getElementById('Deathreg_dea_le_death_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('Deathreg_dea_le_death_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            }
        });
        $.ajax({
            url: deathRegisterSuccess.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    }
}


/**
 * Inline script for deathRegisterStep2Success in birth module
 */
var deathRegisterStep2Success = {
    init: function(loaderUrl, urlAjax, subDistrictUrl) {
        this.urlAjax = urlAjax;
        //    if(is_edit){
        //      this.district_url = '../../district';
        //      this.sub_district_url = '../../subDistrict';
        //      this.village_url = '../../village';
        //      this.get_selected_data_url = '../../getSelectedState';
        //    }else{
        this.district_url = '../../district';
        this.sub_district_url = '../../subDistrict';
        this.village_url = '../../village';
        this.get_selected_data_url = 'getSelectedState';
         this.gram_url = '../../grampanchayat';
        //    }
        //dynamic change of state, district and subdistrict
        this.deceasedStateChange(loaderUrl);
        this.deceasedDistrictChange(loaderUrl);
        this.deceasedSubDistrictChange(loaderUrl);
        this.mothergrampanchayatChange(loaderUrl);
        this.subDistrictUrl = subDistrictUrl;
    },
    deceasedStateChange: function(loaderUrl) {
        var _this = this;
        districtUrl = deathRegisterStep2Success.urlAjax + "/district";
        $('#death_reg_step2_dea_st_state').change(function() {
            var value = $.trim($("#death_reg_step2_dea_st_state option:selected").val());
            _this.showLoader('death_reg_step2_dea_st_district', loaderUrl);
            $('#death_reg_step2_dea_st_district').hide().load(districtUrl + '?S=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#death_reg_step2_dea_st_district').focus();
                $('#death_reg_step2_dea_st_sub_district').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Sub District";
                $("#death_reg_step2_dea_st_sub_district").append(empty_subDistrict);

                $('#death_reg_step2_dea_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#death_reg_step2_dea_st_cityvillage").append(empty_village);
                
                $('#gramPanchayatMother').html('');
                var empty_gram = document.createElement('option');
                empty_gram.value = '';
                empty_gram.innerHTML = "Select Gram Panchayat";
                $("#gramPanchayatMother").append(empty_gram);
            });
        });
    },
     mothergrampanchayatChange: function(loaderUrl) {
        var _this = this;
        $('#gramPanchayatMother').change(function() { 
            var value = $.trim($("#gramPanchayatMother option:selected").val());
            var sub = $.trim($("#death_reg_step2_dea_st_sub_district option:selected").val());
            _this.showLoader('death_reg_step2_dea_st_cityvillage', loaderUrl);
            gramurl =deathRegisterStep2Success.urlAjax + "/grampanchayat";
            $('#death_reg_step2_dea_st_cityvillage').hide().load(gramurl + '?s='+sub+'&d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();    
                $('#death_reg_step2_dea_st_cityvillage').focus();
             
            });
        });
    },
    deceasedDistrictChange: function(loaderUrl) {
        var _this = this;
        subdistrictUrl = deathRegisterStep2Success.urlAjax + "/subDistrict";
        $('#death_reg_step2_dea_st_district').change(function() {
            var value = $.trim($("#death_reg_step2_dea_st_district option:selected").val());
            _this.showLoader('death_reg_step2_dea_st_sub_district', loaderUrl);
            $('#death_reg_step2_dea_st_sub_district').hide().load(subdistrictUrl + '?d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#death_reg_step2_dea_st_sub_district').focus();
                $('#death_reg_step2_dea_st_cityvillage').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Village/Town";
                $("#death_reg_step2_dea_st_cityvillage").append(empty_village);
            });
        });
    },
    deceasedSubDistrictChange: function(loaderUrl) {
        var _this = this;
        cityVillageUrl = deathRegisterStep2Success.urlAjax + "/village";
        $('#death_reg_step2_dea_st_sub_district').change(function() {
            var value = $.trim($("#death_reg_step2_dea_st_sub_district option:selected").val());
      
      
            Utilities.ajaxBlockUI();
            $.ajax({
                url: deathRegisterStep2Success.subDistrictUrl,
                type: "POST",
                data: ({
                    'subDistrict': value
                }),
                success: function(response){
                    var gramPanchayatData = json_parse(response);
                    if($.isEmptyObject(gramPanchayatData) == false){
                        $("#gramPanchayatMother").attr('disabled', false);
                        var panchayatDetailParam = gramPanchayatData[value]['panchayatDetail'];
                        var villageNamesParam = gramPanchayatData[value]['villageNames'];
                        StatisticalForm.fillGramPanchayatOptionsValuesNew(panchayatDetailParam, villageNamesParam, "#gramPanchayatMother", "#death_reg_step2_dea_st_cityvillage");  
                    }
                    else{
                        $("#gramPanchayatMother").attr('disabled', true);
                        $("#gramPanchayatMother").empty().append(
                            $('<option></option>').val("").html('Select Gram Panchayat')
                            );

                        _this.showLoader('death_reg_step2_dea_st_cityvillage', loaderUrl);
                        $('#death_reg_step2_dea_st_cityvillage').hide().load(cityVillageUrl + '?s=' + value, function() {
                            $('.ajaxloader').hide();
                            $(this).fadeIn();
                            $('#death_reg_step2_dea_st_cityvillage').focus();
                        });
                    }
                }
      
            });
      
      
        });
    },
    deceasedCopyAddress: function() {
        var _this = this;
        var legal_village = document.getElementById('legal_village');
        var vil_id = legal_village.value;
        $('#addresschk').click(function() {
            if ($('#addresschk').attr('checked') == false) {
                $('#death_reg_step2_dea_st_cityvillage').val('');
                $('#death_reg_step2_dea_st_sub_district').val('');
                return;
            }

            $.ajax({
                url: deathRegisterStep2Success.urlAjax + "/getSelectedState?village_id=" + vil_id,
                type: "GET",
                success: function(response) {
                    var data = json_parse(response);
                    var village = document.getElementById('death_reg_step2_dea_st_cityvillage');
                    $(village).empty();
                    var villages = data['villages'];
                    var selected_village = data['selected_village'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        if (selected_village == villages[i].id) {
                            village_option.selected = true;
                        }
                        village.appendChild(village_option);
                    }

                    var sub_district = document.getElementById('death_reg_step2_dea_st_sub_district');
                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    var selected_sub_district = data['selected_sub_dist'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        if (selected_sub_district == sub_districts[i].id) {
                            sub_district_option.selected = true;
                        }
                        sub_district.appendChild(sub_district_option);
                    }
                }
            });
            $.ajax({
                url: deathRegisterStep2Success.urlAjax + "/getVillageFlag?village_id=" + vil_id,
                type: "GET",
                success: function(response) {
                    var data = json_parse(response);
                    if (data == 1) {
                        $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                    } else if (data == 2) {
                        $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                    }

                }

            });
        });

    },
    getDeathSelectedData: function(vil_id) {

        //if village id is blank then don't execute below code  
        if (typeof(vil_id) == 'undefined' || vil_id == '')
            return;
        $.ajax({
            url: deathRegisterStep2Success.urlAjax + "/getSelectedState?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                var village = document.getElementById('death_reg_step2_dea_st_cityvillage');
                $(village).empty();
                var villages = data['villages'];
                var selected_village = data['selected_village'];
                for (var i = 0; i < villages.length; i++) {
                    var village_option = document.createElement('option');
                    village_option.value = villages[i].id;
                    village_option.innerHTML = villages[i].label;
                    if (selected_village == villages[i].id) {
                        village_option.selected = true;
                    }
                    village.appendChild(village_option);
                }

                var district = document.getElementById('death_reg_step2_dea_st_district');
                $(district).empty();
                var districts = data['districts'];
                var selected_district = data['selected_dist'];
                for (var i = 0; i < districts.length; i++) {
                    var district_option = document.createElement('option');
                    district_option.value = districts[i].id;
                    district_option.innerHTML = districts[i].label;
                    if (selected_district == districts[i].id) {
                        district_option.selected = true;
                    }
                    district.appendChild(district_option);
                }

                var sub_district = document.getElementById('death_reg_step2_dea_st_sub_district');
                $(sub_district).empty();
                var sub_districts = data['sub_districts'];
                var selected_sub_district = data['selected_sub_dist'];
                for (var i = 0; i < sub_districts.length; i++) {
                    var sub_district_option = document.createElement('option');
                    sub_district_option.value = sub_districts[i].id;
                    sub_district_option.innerHTML = sub_districts[i].label;
                    if (selected_sub_district == sub_districts[i].id) {
                        sub_district_option.selected = true;
                    }
                    sub_district.appendChild(sub_district_option);
                }
            }
        });
        $.ajax({
            url: deathRegisterStep2Success.urlAjax + "/getVillageFlag?village_id=" + vil_id,
            type: "GET",
            success: function(response) {
                var data = json_parse(response);
                if (data == 1) {
                    $('#death_reg_step2_dea_st_villagetown_flag_1').attr('checked', true);
                } else if (data == 2) {
                    $('#death_reg_step2_dea_st_villagetown_flag_2').attr('checked', true);
                }

            }

        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    }
}



/**
 * Inline script for addUsersSuccess in register module 
 */
var addUsersSuccess = {
    init: function(loaderUrl, gramPanchayat, registrationUnitList) {
        
        this.district_url = '../birth/district';
        this.sub_district_url = '../register/subDistrict';
        this.village_url = '../register/village';
        this.reg_unit_url = '../register/regUnit';

        this.districtChange(loaderUrl);
        this.subDistrictChange(loaderUrl);
        this.villageChange(loaderUrl);
        this.gramPanchayat = gramPanchayat;
        this.registrationUnitList = registrationUnitList;
    },
    districtChange: function(loaderUrl) {
        var _this = this;
        $('#registration_user_district').change(function() {
            var value = $.trim($("#registration_user_district option:selected").val());
            _this.showLoader('registration_user_sub_district', loaderUrl);
            $('#registration_user_sub_district').hide().load(urlAjax + '/subDistrict?d=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#registration_user_sub_district').focus();

                $('#registration_user_villagetown_name').html('');
                var empty_subDistrict = document.createElement('option');
                empty_subDistrict.value = '';
                empty_subDistrict.innerHTML = "Select Village/Town";
                $("#registration_user_villagetown_name").append(empty_subDistrict);

                $('#registration_user_registration_no').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Registration Unit";
                $("#registration_user_registration_no").append(empty_village);

            });
        });
    },
    subDistrictChange: function(loaderUrl) {
      
        var _this = this; 
        
        $('#registration_user_sub_district').change(function() {
            $("#villagetowngrampanchayat_flag_1" ).attr('checked',false);
            $("#villagetowngrampanchayat_flag_2" ).attr('checked',false);
        });
        $("#villagetowngrampanchayat_flag_2" ).change(function(){
            $('#registration_user_villagetown_flag_2').attr('checked',true);
            $("#registration_gram_panchayat").attr('disabled', false);
            $("#registration_user_villagetown_name").attr('disabled', true);
            var value = $.trim($("#registration_user_sub_district option:selected").val());
            var respDataVillage;
            Utilities.ajaxBlockUI();
            $.ajax({               
                url: addUsersSuccess.gramPanchayat,
                type: "POST",
                async: false,
                data: ({
                    'subDist': value
                }),
                success: function(response){
                    respDataVillage = json_parse(response);
                }        
            });   
            $("#registration_gram_panchayat").attr('disabled', false);
            $("#registration_user_villagetown_name").attr('disabled', true);
       
            $("#villageTownRadio").css({
                'display': 'none'
            });
            var mySelect1 = $('#registration_user_villagetown_name'); 
            mySelect1.find('option').remove();
            mySelect1.append($('<option></option>').val("").html("Select Town/Village"));
            
            // if($.isEmptyObject(respDataVillage) == false){ // where gram panchayat exists
               
        
            var mySelect = $('#registration_gram_panchayat');
            mySelect.find('option').remove();
            mySelect.append($('<option></option>').val("").html("Select Gram Panchayat"));
            if($.isEmptyObject(respDataVillage) == false){
                $.each(respDataVillage[value]['panchayatDetail'], function(index, value) {
                    mySelect.append($('<option></option>').val(index).html(value));
                });
            }
            var mySelect1 = $('#registration_user_registration_no');
            mySelect1.find('option').remove();
            mySelect1.append($('<option></option>').val("").html("Select Registration Unit"));
            $("#gramPanchayatVsVillgCheck").val("gramPanchayat"); // SETTING THE HIDDEN FIELD FOR FORM SUBMISSION VALIDAITON
        
            $("#registration_gram_panchayat").change(function(){
                var selectedGramPanchayat = $(this).val();
                if(selectedGramPanchayat != ''){
                    var mySelect = $('#registration_user_villagetown_name');                       
                    mySelect.val("");
                    var StateCode = $('#registration_user_state option:selected').val();
                    $.ajax({
                        url: addUsersSuccess.registrationUnitList,
                        type: "POST",
                        data: ({
                            'stateCode':StateCode,
                            'selGramPan': selectedGramPanchayat
                        }),
                        success: function(response){
                            var respData = json_parse(response);
                            if($.isEmptyObject(respData) == false){
                                var mySelect = $('#registration_user_registration_no');
                                mySelect.find('option').remove();
                                mySelect.append($('<option></option>').val("").html("Select Registration Unit"));
                                //                console.log(respData[selectedGramPanchayat])
                                $.each(respData[selectedGramPanchayat], function(index, value) {
                                    mySelect.append($('<option></option>').val(index).html(value));
                                });
                            }
                            else{
                                var mySelect = $('#registration_user_registration_no');
                                mySelect.find('option').remove();
                                mySelect.append($('<option></option>').val("").html("Select Registration Unit"));
                            }
                        }
                    });
                }

            });
         
            
            $("#gramPanchayatVsVillgCheck").val("village"); // SETTING THE HIDDEN FIELD FOR FORM SUBMISSION VALIDAITON

      
        }),
        $("#villagetowngrampanchayat_flag_1" ).change(function(){
            //$("#registration_gram_panchayat").val('');
            var mySelect = $('#registration_gram_panchayat');
            mySelect.find('option').remove();
            mySelect.append($('<option></option>').val("").html("Select Gram Panchayat"));
            $("#registration_gram_panchayat").attr('disabled', true);
            $("#registration_user_villagetown_name").attr('disabled', false);
            $('#registration_user_villagetown_flag_1').attr('checked',false);
            $('#registration_user_villagetown_flag_2').attr('checked',false);
            $("#villageTownRadio").css({
                'display': ''
            });
            
            var value = $.trim($("#registration_user_sub_district option:selected").val());
            _this.showLoader('registration_user_villagetown_name', loaderUrl);
            $('#registration_user_villagetown_name').hide().load(urlAjax + '/village?s=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#registration_user_villagetown_name').focus();

                $('#registration_user_registration_no').html('');
                var empty_village = document.createElement('option');
                empty_village.value = '';
                empty_village.innerHTML = "Select Registration Unit";
                $("#registration_user_registration_no").append(empty_village);
            });
        });
         
        
    },
    villageChange: function(loaderUrl) {
        var _this = this;
        $('#registration_user_villagetown_name').change(function() {
            var mySelect = $('#registration_gram_panchayat');                       
            mySelect.val("");
            var value = $.trim($("#registration_user_villagetown_name option:selected").val());
            _this.showLoader('registration_user_registration_no', loaderUrl);
            $('#registration_user_registration_no').hide().load(urlAjax + '/regUnit' + '?v=' + value, function() {
                $('.ajaxloader').hide();
                $(this).fadeIn();
                $('#registration_user_registration_no').focus();
            });
        });
    },
    showLoader: function(id, loaderUrl) {
        $('.ajaxloader').remove();
        var parent = ($('#' + id).parent());
        var loader = document.createElement('img');
        loader.src = loaderUrl;
        loader.className = "ajaxloader";
        parent.append(loader);

        $('.ajaxloader').fadeIn();
    },
    populateData: function(dist_id, sub_dist_id, regno, VillageTownName) {
        if (dist_id != '' && sub_dist_id != '') {
            $.ajax({
                url: urlAjax + "/placeData?dist_id=" + dist_id + "&sub_dist_id=" + sub_dist_id,
                async: false,
                type: "GET",
                success: function(response) {  
                    var data = json_parse(response);
                    //  if($.isEmptyObject(respDataVillage) == true){ // where gram panchayat not exsists
                    var village = document.getElementById('registration_user_villagetown_name');
                    var selected_village_option = document.getElementById('villageId').value;

                    $(village).empty();
                    var villages = data['villages'];
                    for (var i = 0; i < villages.length; i++) {
                        var village_option = document.createElement('option');
                        village_option.value = villages[i].id;
                        village_option.innerHTML = villages[i].label;
                        village.appendChild(village_option);
                    }
                    $('#registration_user_villagetown_name').val(VillageTownName);
                    if(VillageTownName)
                        $('#villagetowngrampanchayat_flag_1').attr('checked',true);
                    else
                        $('#villagetowngrampanchayat_flag_2').attr('checked',true);
                                      
                      

                    if($('#villagetowngrampanchayat_flag_2').is(':checked') == true){                       
                        var mySelect = $('#registration_user_villagetown_name');
                        mySelect.find('option').remove();
                        mySelect.append($('<option></option>').val("").html("Select Village/Town"));
                    }
                    //  }

                    var sub_district = document.getElementById('registration_user_sub_district');

                    $(sub_district).empty();
                    var sub_districts = data['sub_districts'];
                    for (var i = 0; i < sub_districts.length; i++) {
                        var sub_district_option = document.createElement('option');
                        sub_district_option.value = sub_districts[i].id;
                        sub_district_option.innerHTML = sub_districts[i].label;
                        sub_district.appendChild(sub_district_option);
                    }
                    //          console.log(sub_dist_id)
                    $('#registration_user_sub_district').val(sub_dist_id);
                }
            });
        }
    }
}


var Utilities = {
    ajaxBlockUI: function() {
        $(document).ajaxStart($.blockUI({
            message: '<div><div class="autoLoder"></div><div class="autoLoadMsg">Loading...</div></div>'
        })).ajaxStop($.unblockUI);
    },
    ajaxBlockForm: function() {
        $.blockUI({
            message: "<form id=\"frmBirthRegEdit\" name=\"frmBirthRegEdit\" method=\"post\" onSubmit=\"return validateUser();\">\n\
<table style=\"padding: 20px;\" width=\"90%\" height=\"40%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr><td width=\"22%\" style=\"padding: 10px;\" align=\"left\" class=\"login_field_text\" >User ID</td><td width=\"78%\" align=\"left\"><input type=\"text\" class=\"text-fields\" name=\"user_name\" id=\"Login_user_name\"/></td></tr><tr><td width=\"22%\" style=\"padding: 10px;\" align=\"left\" class=\"login_field_text\" >Password</td><td width=\"78%\" align=\"left\"><input type=\"password\" class=\"text-fields\" name=\"user_password\" id=\"Login_user_password\"></td></tr><tr><td colspan=\"2\" align=\"center\"><input type=\"submit\" value=\"Submit\" class=\"btn\"></input></td></tr></table></form>",
            css: {
                border: 'none', 
                height: '40%', 
                'cursor': 'auto', 
                'width': '30%'
            }
        });
    },
    datePicker: function(element, start_year) {
        if (start_year == null)
            start_year = 2011;

        var d = new Date();
        var cur_year = d.getFullYear() + 1;

        $(element).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd-mm-yy",
            nextText: "",
            prevText: "",
            yearRange: start_year + ":" + cur_year

        });
    }
}



var cms = {
    init: function(viewId, viewUrl) {
        Utilities.ajaxBlockUI();
        var _this = this;
        $.ajax({
            url: viewUrl,
            type: "POST",
            data: ({
                value: viewId
            }),
            success: function(response) {
                var result = json_parse(response);
                if (result != '') {
                    _this.fillData(result);
                }
            }
        })
        _this.docSubmitCheck();

    },
    fillData: function(result) {
        $.each(result['data'], function(key, item) {
            if (key == 'C_UPLOADED_FILE') {
                $("#PDF_FILE").removeClass('hideRow');
                $("#PDF_FILE").addClass('showRow');
                var pdfUploaded = "<br/><span id='uploadedPdf' style='color:red'></span>";
                $("#FILE_TD").append("</br>Uploaded File: " + pdfUploaded);
                $("#uploadedPdf").html(item);
                $("#" + key).html(item);

            } else {
                if (key == 'C_URL') {
                    $("#URL_LINK").removeClass('hideRow');
                    $("#URL_LINK").addClass('ShowRow');
                    $('#' + key).attr("value", item);
                }
                if (key == 'C_UPLOAD_TYPE') {
                    $("#C_UPLOAD_TYPE").val(item);
                }
                else {
                    $('#' + key).attr("value", item);
                }
            }
        });

    },
    cmsSelectCheck: function(selectId) {
        $(selectId).change(function() {
            var selectedValue = $(this).val();
            if (selectedValue != "") {
                if (selectedValue == 'Pdf') {
                    //          $("#PDF_LINK").css('display: block');
                    $("#PDF_FILE").removeClass('hideRow');
                    $("#PDF_FILE").addClass('showRow');
                    $("#URL_LINK").addClass('hideRow');
                }
                else if (selectedValue == 'Url') {
                    $("#URL_LINK").removeClass('hideRow');
                    $("#URL_LINK").addClass('ShowRow');
                    $("#PDF_FILE").addClass('hideRow');
                }
            }

        })
    },
    displayChangeInIt: function(dataUrl, elementId, currentStatus) {
        var _this = this;
        $.ajax({
            url: dataUrl,
            type: 'POST',
            data: ({
                elementId: elementId,
                currentStatus: currentStatus
            }),
            success: function(response) {
                var resultSet = json_parse(response)
                if (resultSet['status'] == 'DONE') {
                    _this.changeAttrLooks(resultSet);
                }

            }
        });
    },
    changeAttrLooks: function(resultSet) {
        var elementId = resultSet['elementId'];

        if (resultSet['newStatus'] == 1) {
            var cssObj = {
                'background-color': '#488214',
                'color': '#FFFFFF',
                '-webkit-border-radius': '3px',
                'border-radius': '3px'
            };
            $("#" + elementId).find('span').css(cssObj);
            $("#" + elementId).find('span').html('True');
        }
        else if (resultSet['newStatus'] == 0) {
            var cssObj = {
                'background-color': '#E04006',
                'color': '#FFFFFF',
                '-webkit-border-radius': '3px',
                'border-radius': '3px'
            };
            $("#" + elementId).find('span').css(cssObj);
            $("#" + elementId).find('span').html('False');
        }
    },
    docSubmitCheck: function() {
        $("#cmsForm").submit(function(event) {
            var formCheck = new Array();
            formCheck[0] = $("#C_MODULE_NAME");
            formCheck[1] = $("#C_TITLE");
            formCheck[2] = $("#C_UPLOAD_TYPE");

            if (formCheck[2] == 'Pdf') {
                formCheck[3] = $("#C_PDF_UPLOAD");
            } else if (formCheck[2] == 'Url') {
                formCheck[3] = $("#C_URL");
            }

            var errorCount = 0;
            var errorElement = new Array();
            for (var k = 0; k < formCheck.length; k++) {
                //        console.log(formCheck[k])
                var elementValue = formCheck[k].val();
                //        console.log(elementValue)
                if (elementValue == '') {
                    errorCount++;
                    errorElement[0] = formCheck[k];
                }
            }

            if (errorCount > 0) {
            //        console.log("formCheck")
            //        console.log(formCheck)
            //        console.log("formCheck")
            }

        //      event.preventDefault();
        });

    }

}
function validateUser() {
    var passval = $('#Login_user_password').val();
    var uname = $('#Login_user_name').val();
    // Utilities.ajaxBlockUI();
    $.ajax({
        url: "../auth/CheckCred?upass=" + passval + "&uname=" + uname,
        async: false,
        type: "GET",
        success: function(response) {
            var data = response;
            //alert(data);
            if ($.type(data) === "number")
                return true;
            else {
                alert('in else');
                location.href = data;
            }
        }
    });
}

