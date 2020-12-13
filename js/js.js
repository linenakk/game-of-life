const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const clearCanvas = document.getElementById('clearCanvas');
let MAS=[];
let timer;
ctx.fillStyle = "#FFCE73";

canvas.onclick = function(event){
	let x = event.offsetX; //определяю нахождение мыши относительно canvas
	let y = event.offsetY;//определяю нахождение мыши относительно canvas
	x = Math.floor(x/10); //300 /10 = 30 - перевожу поле из 300 пикселей, в поле из 30 КУБИКОВ по 10 пикс.
	y = Math.floor(y/10); //300 /10 = 
	MAS[y][x]=1;//заполнение игрового поля, куда
	drawField();
}

function goLife(){ //объявляю игрово поле
	let n=80, m=80;  //ось по ху
	for (let i=0; i<m; i++){ 	 // 
		MAS[i]=[];				 //Заполняю массивом поле
		for (let j=0; j<n; j++){ // 
			MAS[i][j]=0;		 // 
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 800, 800); //чищу все поле

	//запускаю перебор по массивам.
	for (let i=0; i<80; i++){
		for (let j=0; j<80; j++){
			if (MAS[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10, 10, 10, 10, 10, 10);
			}
		}
	}
}

function startLife(){
	//моделирование жизни. если у клетки 2-3 живых соседа, то живет. 
	let mas2 = [];
	for (let i=0; i<80; i++){ //
		mas2[i]=[]; //
		for (let j=0; j<80; j++){  // перебор массива
			let neighbors = 0;  //считаю кол-во соседей
			if (MAS[fpm(i)-1][j]==1) neighbors++;//верх. КРАЕВОЕ УСЛОВИЕ
			if (MAS[i][fpp(j)+1]==1) neighbors++;//право. КРАЕВОЕ УСЛОВИЕ
			if (MAS[fpp(i)+1][j]==1) neighbors++;//низ. КРАЕВОЕ УСЛОВИЕ
			if (MAS[i][fpm(j)-1]==1) neighbors++;//лево. КРАЕВОЕ УСЛОВИЕ
			//диагональ
			if (MAS[fpm(i)-1][fpp(j)+1]==1) neighbors++; // вправо вверх
			if (MAS[fpp(i)+1][fpp(j)+1]==1) neighbors++;//вправо вверх
			if (MAS[fpp(i)+1][fpm(j)-1]==1) neighbors++;//влево ввниз
			if (MAS[fpm(i)-1][fpm(j)-1]==1) neighbors++;//влево верх
			(neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0;   //проверка на соседей. еЕсли кол-во соседей =2 или 3
																			//то mas2 =1(зарождается жизнь), в противнорм случае =смерть 0
		}
	}
	MAS = mas2; //миру mas , присваиваю новое состояние (mas2)  и запускаю отрисовку 
	drawField();
	timer = setTimeout(startLife, 800);
}


function fpm(i){  //если при краевом массиве параметр =0, то возвращается 30
	if(i==0) return 80; 
	else return i;
}
function fpp(i){  //если при краевом массиве параметр =29, то возвращается 0
	if(i==79) return -1;
	else return i;
}

function RectCanvas(){

	document.location.reload();
		
}

document.getElementById('start').onclick = startLife;
document.getElementById('clearCanvas').onclick = RectCanvas;