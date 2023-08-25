let totalPage = 1000;
let page_num = 10;
let block_num = 5;
let total_block = totalPage%20 == 0? totalPage/20 : totalPage/20+1;
let current_block = 1;
let data = new Array();

for(let i=1; i<=totalPage; i++){
    data[i] = {
        notice_num : i, 
        title: "제목" + i,
        count: i,
        like: i,
        writer: "작성자" + i,
        date : "2023-08-17"
    }
}

function post_data_print(block){

}

function block_print(front_block){

}

function before(){

}

function next(){
    
}