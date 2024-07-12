const year = document.getElementsByClassName('year');
const monthNum = document.getElementsByClassName('month');
const monthEng = document.getElementsByClassName('monthEng');
const calBody = document.getElementById('calBody');
const prevBtn = document.getElementsByClassName('leftArrow');
const nextBtn = document.getElementsByClassName('rightArrow');
const body = document.querySelector('body');

// 오늘 날짜를 가져온다.
let date = new Date();
// 오늘 날짜의 연도
let yearF = date.getFullYear();
//오늘 날짜의 월
let month = date.getMonth();

// 달력을 그리는 함수
function calendar () {

    // 해당 월을 가져왔을 때 영어로 표기하기 위한 월 배열
    const monthArr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // 각각 화면에 연도, 월 숫자, 월 영어로 표시된다. 
    year[0].innerText = yearF;
    monthNum[0].innerText = month + 1;
    monthEng[0].innerText = monthArr[month];

    // startDay는 해당 월의 1일이 무슨 요일인지 가져온다.
    // 작성월 기준 시작 요일은 월요일이라 1을 가져온다.
    let startDay = new Date(yearF, month, 1).getDay();
    // lastDate는 해당 월이 몇 일까지 있는지 확인하는 변수다.
    // Date객체에서 세 번째 인자로 0을 줌으로서 마지막 일을 가져온다.
    let lastDate = new Date(yearF, month + 1, 0).getDate();
    // endDay는 이번 달의 마지막 요일을 구한다. 
    let endDay = new Date(yearF, month + 1, 0).getDay();
    // prevMonthLastDate는 전 달의 마지막이 몇 일인지 구한다.
    let prevMonthLastDate = new Date(yearF, month, 0).getDate();

    calBody.innerHTML = "";

    // 현재 달의 빈 앞 부분을 전 달의 마지막 일들로 채운다.
    for ( let i = 0; i < startDay; i++ ) {
        let span = document.createElement('span');
        span.className = "date restDate";
        calBody.appendChild(span);
        span.innerText = i + prevMonthLastDate - startDay + 1
    }

    // 현재 달을 채운다.
    for ( let i = 1; i <= lastDate; i++ ) {
        let span = document.createElement('span');
        span.className = "date";
        calBody.appendChild(span);
        span.innerText = i;

        // 토요일이면 파란색, 일요일이면 빨간 색으로 폰트롤 칠한다.
        let c = new Date(yearF, month, i).getDay();
        if ( c === 6 ) {
            span.style.color = 'blue';
        } else if ( c === 0 ) {
            span.style.color = 'red';
        }

    }

    // 현재 달의 비어있는 뒷 부분을 다음 달의 일들로 채운다.
    for ( let i = 0; i < 6 - endDay; i++ ) {
        let span = document.createElement('span');
        span.className = "date restDate";
        calBody.appendChild(span);
        span.innerText = i + 1;
    }
};  

calendar();

// 버튼 클릭시 전 월로 이동
prevBtn[0].addEventListener('click', () => {
    month--;
    if ( month < 0) {
        month = 11;
        yearF--;
    }
    calendar();
});

// 버튼 클릭시 다음 달로 이동
nextBtn[0].addEventListener('click', () => {
    month++;
    if ( month > 11) {
        month = 0;
        yearF++;
    }
    calendar();
});