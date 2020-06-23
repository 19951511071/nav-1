const $listwrap = $('.listwrap')
const $lastlist = $('.lastlist')
const $lastLi  =  $('.listwrap').find('li.lastlist')

const x = localStorage.getItem('x')
const XObject = JSON.parse(x)
let hashMap =  XObject || [{logo:'A',url:'https://www.acfun.cn'},
               {logo:'B',url:'https://www.bilibili.com'}
            ]
const simplifyUrl = (url)=>{
    return url.replace('https://','')
        .replace('http://' , '' ) 
        .replace('www.','')//删除www
        .replace(/\/.*/,'')//利用正则删除/号后面所有的字符
    
}
const render  = ()=>{
    $listwrap.find('li:not(.lastlist)').remove()
    hashMap.forEach((node,index) =>{
        console.log(index)
        let $li = $(`
            <li>
                <div class="iconContent">${node.logo}</div>
            <div class="text">${simplifyUrl(node.url)}</div>
            <div class='close'>
               <svg class="icon" aria-hidden="true">
                   <use xlink:href="#icon-close"></use>
              </svg>
            </div>
            
            </li>
    ` ).insertBefore($lastLi)   //最后一个li后面插入

        $li.on('click',()=>{
            window.open(node.url)
        })

        $li.on('click' ,'.close' , (e)=>{
            //阻止冒泡
            e.stopPropagation();
            hashMap.splice(index,1)
            //重新渲染
            render(); 

        } )

    })
}            
render();
$('.lastlist').on('click',()=>{
    let url = window.prompt('请输入网址');
    if(url.indexOf('http') !== 0){
        url = 'https://'+url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    render();
})
window.onbeforeunload = ()=>{
    //对象转换成字符串
    const string = JSON.stringify(hashMap)
    //字符串转存到本地localStorage
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const {key} = e   
    for(let i=0 ;i <hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    } 
})