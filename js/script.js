//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = now * 50 + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')',
				'position': 'absolute' });

			next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack' });

});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = (1 - now) * 50 + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack' });

});

$(".submit").click(function () {
	return false;
});

//Category Selection
$('select#category').on('change', function() {
    if (this.value == "yes") {
        $("#category-options-show").show('slow');
    } else {
        $("#category-options-show").hide('slow');
    }
});

//MSME Selection
$('select#msme').on('change', function() {
    if (this.value == "yes") {
        $("#msme-options-show").show('slow');
    } else {
        $("#msme-options-show").hide('slow');
    }
});

	
	
$('table.default-table').addClass('nowrap').DataTable({
	"searching": false,
	"paging": false, 
	"info": false,         
	"lengthChange":false,
	responsive: true
});






uploadImage()
resetButton()

var queue = []
var fullStock = 10
var speedCloseNoti = 1000
function uploadImage() {
	
  var button = $('.images .pic')
  var uploader = $('<input type="file" name="files[]" accept="image/*" multiple />')
  var images = $('.images')
  
  button.on('click', function () {
	uploader.click()
  })
  
  uploader.on('change', function () {
	  var reader = new FileReader()
	  reader.onload = function(event) {
		images.prepend('<div class="img" style="background-image: url(\'' + event.target.result + '\');" rel="'+ event.target.result  +'"><span>remove</span></div>')
	  }
	  reader.readAsDataURL(uploader[0].files[0])

   })
  
  images.on('click', '.img', function () {
	$(this).remove()
  })

}

function submit() {  
  var button = $('#send')
  
  button.on('click', function () {
	if(!way) {
	//  var title = $('#title')
	//  var cate  = $('#category')
	  var images = $('.images .img')
	  var imageArr = []

	  
	  for(var i = 0; i < images.length; i++) {
		imageArr.push({url: $(images[i]).attr('rel')})
	  }
	  
	  var newStock = {
		title: title.val(),
		category: cate.val(),
		images: imageArr,
		type: 1
	  }
	  
	  saveToQueue(newStock)
	} else {
	  // discussion
	  var topic = $('#topic')
	  var message = $('#msg')
	  
	  var newStock = {
		title: topic.val(),
		message: message.val(),
		type: 2
	  }
	  
	  saveToQueue(newStock)
	}
  })
}

function resetButton() {
  var resetbtn = $('#reset')
  resetbtn.on('click', function () {
	reset()
  })
}


function reset() {
  var images = $('.images .img')
  for(var i = 0; i < images.length; i++) {
	$(images)[i].remove()
  }
  
}