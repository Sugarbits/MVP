<input type='text' id='text' value='0'/><button onclick="deal('+');">+</button><button onclick="deal('-');">-</button>
<script>
function deal(ch){
	var aim = document.getElementById('text');
	switch(ch){
		case '+':
		aim.value = parseInt(aim.value)+1;
		break;
		case '-':
		aim.value = parseInt(aim.value)-1;		
		break;
	}
}
</script>
