function to_xy(arr){
	coordinates = projection(arr);
	const x = Math.trunc(coordinates[0]);
	const y = Math.trunc(coordinates[1]);
	return [x, y];
}

function find_train(id, items){
	for(var i=0;i<items.length;i++){
		if(id == items[i].properties.id){
			return items[i].geometry.coordinates;
		}
	}
}

function all_wagons_info(items){
	var wagons_info = '<div id="train_table">';
        wagons_info += '<table class="w3-table w3-bordered">';
		wagons_info += '<tr><th>Поезд</th>';
		wagons_info += '<th>Следование</th>';
		wagons_info += '<th>Состав</th></tr>';
		
		for(var i=0;i<items.length;i++){
			el = items[i].properties;
			from = "Барнаул";
			to = "Москва";
			wagons_info += '<tr id="'+el["id"]+'" class="train_row"><td>'+parse_train_num(el["id"])+'</td>';
			wagons_info += '<td><span class="from_style">'+from+'</span><br><span class="to_style">'+to+'</span></td>';
			wagons_info += '<td>'+wagon_info_detailed(el.wags)+'</td></tr>';
		}
            
		wagons_info += '</div>';
		
	d3.select("#info").html(wagons_info);
}

function wagon_info_detailed(wags){
	var total = 0;
	var di = ""
	
	for(var i=0;i<wags.length;i++){
		total += 1;
		di += '<div class="coal cargo"><span class="cargo_type">'+wags[i]+'</span> <span class="cargo_count">1</span></div>';
	}
	
	return "<b>" + total + "</b>" + di;
}

function parse_train_num(train_num){
	return train_num.split("-")[1];
}


var keep_color;
var keep_item;

function mark_train(d, el){
	if(keep_item != null){
		keep_item.attr("fill", keep_color);
	}
	
	keep_item = d3.select(el);
	keep_color = keep_item.attr("fill");
	keep_item.attr("fill", "#0096FF");
}

function mark_train2(d, el){
	if(keep_item != null){
		keep_item.attr("fill", keep_color);
	}
	
	keep_item = el;
	keep_color = keep_item.attr("fill");
	keep_item.transition().delay(400).attr("fill", "#0096FF");
}


function map_change_x1_x2(){
	$('.city_rank_4').css("fill", "#444");
	$('.city_rank_5').css("fill", "#444");
	$('.city_label_rank_4').css("fill", "#444");
	$('.city_label_rank_5').css("fill", "#444");
	$('text.place-label').css("font-size", "8px");
	
	//уменьшаем размеры точек городов
	d3.selectAll('.city_rank_0').attr("r", 4);
	d3.selectAll('.city_rank_2').attr("r", 3);
	d3.selectAll('.city_rank_3').attr("r", 2);
	d3.selectAll('.city_rank_4').attr("r", 2);
	d3.selectAll('.city_rank_5').attr("r", 2);
	
	//уменьшаем размеры поездов
	countriesGroup
		.selectAll("rect")
		.attr("x", d => to_xy(d.geometry.coordinates)[0] - tsize/4)
		.attr("y", d => to_xy(d.geometry.coordinates)[1] - tsize/4)
		.attr("width", tsize/2)
		.attr("height", tsize/2);
}


function map_change_x2_x1(){
	//прячем небольшие города с rank 4 и 5 (points + labels)
	$('.city_rank_4').css("fill", "none");
	$('.city_rank_5').css("fill", "none");
	$('.city_label_rank_4').css("fill", "none");
	$('.city_label_rank_5').css("fill", "none");
	$('text.place-label').css("font-size", "12px");
	
	//укрупняем размеры точек городов
	d3.selectAll('.city_rank_0').attr("r", 7);
	d3.selectAll('.city_rank_2').attr("r", 5);
	d3.selectAll('.city_rank_3').attr("r", 4);
	
	//увеличиваем размеры поездов
	countriesGroup
		.selectAll("rect")
		.attr("x", d => to_xy(d.geometry.coordinates)[0] - tsize/2)
		.attr("y", d => to_xy(d.geometry.coordinates)[1] - tsize/2)
		.attr("width", tsize)
		.attr("height", tsize);
}


function map_change_x2_x3(){
	$('.city_rank_6').css("fill", "#444");
	$('.city_rank_7').css("fill", "#444");
	$('.city_label_rank_6').css("fill", "#444");
	$('.city_label_rank_7').css("fill", "#444");
	$('text.place-label').css("font-size", "6px");
	
	d3.selectAll('.city_rank_6').attr("r", 1);
	d3.selectAll('.city_rank_7').attr("r", 1);
	
	//уменьшаем размеры поездов
	countriesGroup
		.selectAll("rect")
		.attr("x", d => to_xy(d.geometry.coordinates)[0] - tsize/4)
		.attr("y", d => to_xy(d.geometry.coordinates)[1] - tsize/4)
		.attr("width", tsize/2)
		.attr("height", tsize/2);
}


function map_change_x3_x2(){
	$('.city_rank_6').css("fill", "none");
	$('.city_rank_7').css("fill", "none");
	$('.city_label_rank_6').css("fill", "none");
	$('.city_label_rank_7').css("fill", "none");
	$('text.place-label').css("font-size", "8px");
	
	d3.selectAll('.city_rank_4').attr("r", 3);
	d3.selectAll('.city_rank_5').attr("r", 3);
	
	//уменьшаем размеры поездов
	countriesGroup
		.selectAll("rect")
		.attr("x", d => to_xy(d.geometry.coordinates)[0] - tsize/4)
		.attr("y", d => to_xy(d.geometry.coordinates)[1] - tsize/4)
		.attr("width", tsize/2)
		.attr("height", tsize/2);
}

function getRandom(max) {
  return Math.floor(Math.random() * max- max/2);
}